// Camada de leitura do catálogo: tenta o banco; se vazio/indisponível, usa o mock.
import { prisma } from "./prisma";
import { products as mockProducts, type Product } from "@/data/products";

type DbProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  sold: number;
  rating: number;
  location: string;
  images: string[];
  freeShipping: boolean;
  flashSale: boolean;
  categoryId: string | null;
};

function mapDb(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    description: p.description ?? undefined,
    price: p.price,
    oldPrice: p.oldPrice ?? undefined,
    discount: p.discount ?? undefined,
    sold: p.sold,
    rating: p.rating,
    location: p.location,
    image: p.images[0] || "https://placehold.co/400x400/f5f5f5/ee4d2d?text=Produto",
    images: p.images.length ? p.images : undefined,
    category: p.categoryId ?? "",
    freeShipping: p.freeShipping,
    flashSale: p.flashSale,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    if (rows.length) return rows.map(mapDb);
  } catch {
    /* sem banco — usa mock */
  }
  return mockProducts;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const p = await prisma.product.findUnique({ where: { id } });
    if (p) return mapDb(p);
  } catch {
    /* sem banco */
  }
  return mockProducts.find((p) => p.id === id);
}

export async function getByCategory(categoryId: string): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { active: true, categoryId },
      orderBy: { createdAt: "desc" },
    });
    if (rows.length) return rows.map(mapDb);
  } catch {
    /* sem banco */
  }
  return mockProducts.filter((p) => p.category === categoryId);
}

export async function getFlashSale(): Promise<Product[]> {
  const all = await getProducts();
  const flash = all.filter((p) => p.flashSale);
  return (flash.length ? flash : all).slice(0, 6);
}

export async function getDiscounted(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.discount).slice(0, 6);
}
