import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShoppingCart, Shield, Truck, Minus, Plus, Heart } from "lucide-react";
import { getProduct, getByCategory, products } from "@/data/products";
import { brl, compactSold } from "@/lib/format";
import ProductGrid from "@/components/ProductGrid";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const related = getByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  const thumbs = Array.from({ length: 5 }, (_, i) =>
    `https://picsum.photos/seed/${product.id}-${i}/120/120`
  );

  return (
    <div className="max-w-container mx-auto px-4 py-4">
      {/* breadcrumb */}
      <div className="text-xs text-gray-500 mb-3">
        <Link href="/" className="hover:text-brand">Início</Link>
        <span className="mx-1">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-brand capitalize">
          {product.category.replace("-", " ")}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="bg-white rounded-sm shadow-card p-4 md:p-6 grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6">
        {/* galeria */}
        <div>
          <div className="relative aspect-square rounded-sm overflow-hidden border">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          </div>
          <div className="flex gap-2 mt-3">
            {thumbs.map((t, i) => (
              <div
                key={i}
                className={`relative w-16 h-16 rounded-sm overflow-hidden border-2 cursor-pointer ${
                  i === 0 ? "border-brand" : "border-transparent hover:border-brand/50"
                }`}
              >
                <Image src={t} alt={`thumb ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* infos */}
        <div>
          <h1 className="text-xl font-medium text-gray-800 leading-snug">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="flex items-center gap-1 text-brand border-r pr-4">
              <span className="underline">{product.rating.toFixed(1)}</span>
              <Star size={14} fill="currentColor" />
            </span>
            <span className="text-gray-600 border-r pr-4">
              <strong>{compactSold(product.sold)}</strong> Avaliações
            </span>
            <span className="text-gray-600">
              <strong>{compactSold(product.sold)}</strong> Vendidos
            </span>
          </div>

          <div className="bg-gray-50 rounded-sm p-4 mt-4 flex items-center gap-3">
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-base">
                {brl(product.oldPrice)}
              </span>
            )}
            <span className="text-brand text-3xl font-semibold">
              {brl(product.price)}
            </span>
            {product.discount && (
              <span className="bg-brand text-white text-xs font-bold px-2 py-1 rounded-sm">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className="mt-5 space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <span className="w-24 text-gray-400">Frete</span>
              <span className="flex items-center gap-2">
                <Truck size={18} className="text-green-600" />
                {product.freeShipping ? "Frete Grátis" : "Frete a calcular"} • Enviado de {product.location}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 text-gray-400">Garantia</span>
              <span className="flex items-center gap-2">
                <Shield size={18} className="text-brand" /> Devolução grátis em 7 dias
              </span>
            </div>
          </div>

          {/* quantidade */}
          <div className="flex items-center gap-3 mt-6 text-sm">
            <span className="w-24 text-gray-400">Quantidade</span>
            <div className="flex items-center border rounded-sm">
              <button className="px-2 py-1.5 text-gray-500 hover:bg-gray-100"><Minus size={14} /></button>
              <span className="px-4 py-1 border-x">1</span>
              <button className="px-2 py-1.5 text-gray-500 hover:bg-gray-100"><Plus size={14} /></button>
            </div>
            <span className="text-gray-400 text-xs">999 disponíveis</span>
          </div>

          {/* ações */}
          <div className="flex flex-wrap gap-3 mt-7">
            <button className="flex items-center gap-2 bg-brand-light text-brand border border-brand px-6 py-3 rounded-sm hover:bg-brand/10 transition-colors">
              <ShoppingCart size={20} /> Adicionar ao Carrinho
            </button>
            <Link
              href="/cart"
              className="bg-brand hover:bg-brand-dark text-white px-10 py-3 rounded-sm transition-colors"
            >
              Comprar Agora
            </Link>
            <button className="flex items-center gap-1 text-gray-500 px-3 hover:text-brand">
              <Heart size={20} /> Favoritar
            </button>
          </div>
        </div>
      </div>

      {/* descrição */}
      <div className="bg-white rounded-sm shadow-card mt-4 p-6">
        <h2 className="uppercase text-gray-600 bg-gray-50 px-3 py-2 text-sm rounded-sm">
          Descrição do Produto
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mt-4">
          {product.name} — produto de alta qualidade com ótimo custo-benefício.
          Envio rápido e seguro a partir de {product.location}. Garantia de
          satisfação e devolução grátis em até 7 dias. Aproveite a oferta enquanto
          durar o estoque! (Texto de exemplo — dados mockados.)
        </p>
        <ul className="text-sm text-gray-600 mt-4 list-disc pl-5 space-y-1">
          <li>Material: premium e durável</li>
          <li>Garantia: 7 dias para devolução</li>
          <li>Envio: {product.freeShipping ? "frete grátis" : "frete a calcular"}</li>
          <li>Avaliação média: {product.rating.toFixed(1)} ⭐</li>
        </ul>
      </div>

      {related.length > 0 && (
        <ProductGrid products={related} title="Produtos Relacionados" />
      )}
    </div>
  );
}
