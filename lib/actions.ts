"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import QRCode from "qrcode";
import { prisma } from "./prisma";
import { saveUploads } from "./storage";
import { SESSION_COOKIE, sessionToken, checkPassword } from "./auth";
import { generatePix, zyropayConfigured } from "./zyropay";

// ---------- AUTH ----------
export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  cookies().set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
  redirect(next);
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------- PRODUTOS ----------
export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const price = parseFloat(String(formData.get("price") || "0"));
  if (!name || !price) {
    throw new Error("Nome e preço são obrigatórios.");
  }

  const oldPriceRaw = String(formData.get("oldPrice") || "");
  const oldPrice = oldPriceRaw ? parseFloat(oldPriceRaw) : null;
  const discount =
    oldPrice && oldPrice > price
      ? Math.round((1 - price / oldPrice) * 100)
      : null;

  const files = formData.getAll("images").filter((f): f is File => f instanceof File);
  const images = await saveUploads(files);

  await prisma.product.create({
    data: {
      name,
      description: String(formData.get("description") || "") || null,
      price,
      oldPrice,
      discount,
      stock: parseInt(String(formData.get("stock") || "100")) || 100,
      location: String(formData.get("location") || "São Paulo"),
      categoryId: String(formData.get("categoryId") || "") || null,
      freeShipping: formData.get("freeShipping") === "on",
      flashSale: formData.get("flashSale") === "on",
      images,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (id) await prisma.product.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------- BANNERS ----------
export async function addBanner(formData: FormData) {
  const files = formData.getAll("images").filter((f): f is File => f instanceof File);
  const images = await saveUploads(files);
  const position = String(formData.get("position") || "hero");
  const alt = String(formData.get("alt") || "") || null;

  await Promise.all(
    images.map((image, i) =>
      prisma.banner.create({ data: { image, alt, position, order: i } })
    )
  );

  revalidatePath("/");
  revalidatePath("/admin/banners");
  redirect("/admin/banners");
}

export async function deleteBanner(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (id) await prisma.banner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/banners");
}

// ---------- CHECKOUT (PIX Zyropay) ----------
type CartItem = { name: string; price: number; qty: number; image?: string };

export async function checkout(formData: FormData) {
  const customer = String(formData.get("customer") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  let items: CartItem[] = [];
  try {
    items = JSON.parse(String(formData.get("items") || "[]"));
  } catch {
    items = [];
  }
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  if (!total) throw new Error("Carrinho vazio.");

  // 1) cria o pedido pendente
  const order = await prisma.order.create({
    data: { customer, email, phone, total, items, status: "pending" },
  });

  // 2) gera a cobrança PIX (se o gateway estiver configurado)
  if (zyropayConfigured()) {
    try {
      const charge = await generatePix({
        value: Number(total.toFixed(2)),
        externalId: order.id,
      });
      const qr = await QRCode.toDataURL(charge.pix, { width: 320, margin: 1 });
      await prisma.order.update({
        where: { id: order.id },
        data: { pixCode: charge.pix, pixQr: qr, txid: charge.movId },
      });
    } catch (e) {
      // mantém o pedido; a tela mostra o erro
      await prisma.order.update({
        where: { id: order.id },
        data: { pixCode: null },
      });
    }
  }

  redirect(`/checkout/${order.id}`);
}
