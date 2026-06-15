import Link from "next/link";
import Image from "next/image";
import { Plane } from "lucide-react";
import type { Product } from "@/data/products";
import { brl, compactSold } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const intl = product.location === "Importado";
  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-sm shadow-card hover:shadow-cardhover transition-shadow overflow-hidden block"
    >
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          className="object-cover"
        />
        {product.discount && (
          <span className="absolute top-0 right-0 bg-[#ffd9cc] text-brand text-xs font-bold px-1.5 py-1 rounded-bl-md">
            -{product.discount}%
          </span>
        )}
        {intl && (
          <span className="absolute bottom-0 left-0 bg-black/55 text-white text-[10px] font-medium px-1.5 py-0.5 flex items-center gap-1">
            <Plane size={11} /> VENDEDOR INTERNACIONAL
          </span>
        )}
      </div>

      <div className="p-2">
        <h3 className="text-sm text-gray-800 line-clamp-2 min-h-[2.5rem] leading-tight">
          {product.freeShipping && (
            <span className="bg-brand-light text-brand text-[10px] px-1 rounded-sm mr-1 align-middle">
              Frete Grátis
            </span>
          )}
          {product.name}
        </h3>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-brand font-medium">
            <span className="text-xs">R$</span>
            <span className="text-lg">
              {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </span>
          <span className="text-gray-400 text-[11px]">no Pix</span>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-400">
          {product.oldPrice && (
            <span className="line-through">{brl(product.oldPrice)}</span>
          )}
          <span className="ml-auto">{compactSold(product.sold)} vendidos</span>
        </div>
      </div>
    </Link>
  );
}
