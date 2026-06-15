import Link from "next/link";
import { Filter, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getByCategory, categories, products } from "@/data/products";

export function generateStaticParams() {
  return [...categories.map((c) => ({ id: c.id })), { id: "ofertas" }];
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const cat = categories.find((c) => c.id === params.id);
  const list =
    params.id === "ofertas"
      ? products.filter((p) => p.discount)
      : getByCategory(params.id);
  const title = cat?.name ?? (params.id === "ofertas" ? "Ofertas" : params.id);

  const sorts = ["Mais Relevantes", "Mais Recentes", "Mais Vendidos", "Preço"];

  return (
    <div className="max-w-container mx-auto px-4 py-4">
      <div className="text-xs text-gray-500 mb-3">
        <Link href="/" className="hover:text-brand">Início</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-700 capitalize">{title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
        {/* sidebar filtros */}
        <aside className="bg-white rounded-sm shadow-card p-4 h-fit hidden md:block">
          <h2 className="flex items-center gap-2 font-semibold text-gray-700 border-b pb-3">
            <Filter size={16} /> Filtros
          </h2>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Categorias</h3>
            <ul className="space-y-1.5 text-sm text-gray-500">
              {categories.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.id}`}
                    className={`hover:text-brand ${c.id === params.id ? "text-brand font-medium" : ""}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t pt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Faixa de Preço</h3>
            <div className="flex items-center gap-2">
              <input placeholder="Min" className="w-full border rounded-sm px-2 py-1 text-xs outline-none" />
              <span>-</span>
              <input placeholder="Max" className="w-full border rounded-sm px-2 py-1 text-xs outline-none" />
            </div>
            <button className="w-full bg-brand text-white text-sm py-1.5 rounded-sm mt-2 hover:bg-brand-dark">
              Aplicar
            </button>
          </div>

          <div className="mt-5 border-t pt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avaliação</h3>
            {[5, 4, 3].map((n) => (
              <div key={n} className="flex items-center gap-1 text-yellow-400 text-sm py-0.5 cursor-pointer hover:opacity-70">
                {Array.from({ length: n }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="text-gray-400 text-xs">e acima</span>
              </div>
            ))}
          </div>
        </aside>

        {/* lista */}
        <div>
          <div className="bg-white rounded-sm shadow-card px-4 py-2.5 flex items-center gap-3 text-sm">
            <span className="text-gray-500">Ordenar por</span>
            {sorts.map((s, i) => (
              <button
                key={s}
                className={`px-3 py-1.5 rounded-sm ${
                  i === 0 ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
            <span className="ml-auto text-gray-400 text-xs">
              {list.length} resultados
            </span>
          </div>

          {list.length === 0 ? (
            <div className="bg-white rounded-sm shadow-card mt-3 py-16 text-center text-gray-400">
              Nenhum produto encontrado nesta categoria.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-3">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
