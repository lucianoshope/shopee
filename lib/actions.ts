"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { saveUploads } from "./storage";
import { SESSION_COOKIE, sessionToken, checkPassword } from "./auth";

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
