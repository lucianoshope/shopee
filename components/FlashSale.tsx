import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { brl } from "@/lib/format";
import CountdownTimer from "./CountdownTimer";

export default function FlashSale({ products }: { products: Product[] }) {
  const flashSaleProducts = products;
  return (
    <section className="bg-white rounded-sm shadow-card mt-4 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <h2 className="text-brand text-xl font-bold uppercase tracking-wide">
            ⚡ Ofertas Relâmpago
          </h2>
          <CountdownTimer />
        </div>
        <Link
          href="/category/ofertas"
          className="text-brand text-sm flex items-center hover:underline"
        >
          Ver tudo <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {flashSaleProducts.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="group relative"
          >
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
              {p.discount && (
                <span className="absolute top-0 right-0 bg-yellow-300 text-brand-dark text-[10px] font-bold px-1">
                  -{p.discount}%
                </span>
              )}
            </div>
            <div className="text-brand font-semibold text-sm mt-1">
              {brl(p.price)}
            </div>
            <div className="relative h-4 bg-brand-light rounded-full overflow-hidden mt-1">
              <div
                className="absolute inset-y-0 left-0 bg-brand rounded-full"
                style={{ width: `${30 + (p.sold % 60)}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-medium">
                Vendendo rápido
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
