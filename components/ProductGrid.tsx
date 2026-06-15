import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

export default function ProductGrid({
  products,
  title = "Mais Procurados",
}: {
  products: Product[];
  title?: string;
}) {
  return (
    <section className="mt-4">
      {title && (
        <div className="border-b-2 border-brand bg-white rounded-t-sm">
          <h2 className="text-center text-brand uppercase font-medium py-3 tracking-wide">
            {title}
          </h2>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-white text-brand border border-brand/40 hover:bg-brand-50 px-16 py-2.5 text-sm rounded-sm transition-colors">
          Ver mais
        </button>
      </div>
    </section>
  );
}
