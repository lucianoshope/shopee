import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/products";
import { getDiscounted } from "@/lib/catalog";
import { brl } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OficiaisPage() {
  const ofertas = await getDiscounted();

  return (
    <div className="max-w-container mx-auto pb-8 bg-[#f5f5f5]">
      {/* categorias */}
      <section className="bg-white px-3 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-brand font-bold text-lg">Categorias</h2>
          <Link href="/category/ofertas" className="text-xs text-gray-500 flex items-center">
            Ver Mais <ChevronRight size={14} />
          </Link>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-4 md:grid md:grid-cols-8">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              className="flex flex-col items-center gap-1.5 shrink-0 w-[72px] md:w-auto text-center"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden border">
                <Image src={c.image} alt={c.name} fill className="object-cover" />
              </div>
              <span className="text-[11px] text-gray-600 leading-tight line-clamp-2">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* banner roxo */}
      <section className="px-2 mt-2">
        <div className="relative aspect-[1000/520] md:aspect-[1200/360] rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white">
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <span className="bg-white text-brand text-xs font-semibold px-2 py-0.5 rounded w-fit">Lojas Oficiais</span>
            <h3 className="text-2xl md:text-3xl font-bold mt-3 leading-tight">
              Cuidado capilar<br />até 20% OFF
            </h3>
            <button className="bg-black/30 hover:bg-black/40 text-white text-sm rounded-full px-5 py-2 mt-4 w-fit">
              COMPRE AGORA
            </button>
          </div>
        </div>
      </section>

      {/* botão ofertas do dia */}
      <section className="px-2 mt-2">
        <button className="w-full bg-gradient-to-r from-brand to-brand-dark text-white font-semibold text-lg py-3 rounded-full shadow-card">
          Ofertas do Dia
        </button>
      </section>

      <p className="text-gray-700 font-medium px-3 mt-4">
        Aplique o cupom abaixo para garantir o melhor preço
      </p>

      {/* produtos com botão Compre Agora */}
      <section className="grid grid-cols-2 gap-2 px-2 mt-2">
        {ofertas.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow-card overflow-hidden flex flex-col">
            <Link href={`/product/${p.id}`} className="relative aspect-square">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
              {p.oldPrice && (
                <span className="absolute top-1.5 right-1.5 bg-white/95 border border-brand rounded px-1.5 py-0.5 text-right leading-tight">
                  <span className="block text-[9px] text-gray-400 line-through">DE {brl(p.oldPrice)}</span>
                  <span className="block text-brand text-xs font-bold">POR {brl(p.price)}</span>
                </span>
              )}
            </Link>
            <button className="bg-brand text-white text-sm font-medium py-2.5 m-2 mt-auto rounded">
              Compre Agora
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
