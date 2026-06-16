import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Shield, Truck } from "lucide-react";
import { getProduct, getByCategory, getProductsByIds } from "@/lib/catalog";
import { brl, compactSold } from "@/lib/format";
import ProductGrid from "@/components/ProductGrid";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  // relacionados: usa os escolhidos no admin; senão, os da mesma categoria
  const related = (
    product.relatedIds && product.relatedIds.length
      ? await getProductsByIds(product.relatedIds)
      : await getByCategory(product.category)
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  // miniaturas: usa as fotos reais do produto, ou a própria imagem
  const thumbs = product.images && product.images.length ? product.images : [product.image];

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
        <ProductGallery images={thumbs} name={product.name} />

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

          {/* ações */}
          <AddToCart
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            }}
          />
        </div>
      </div>

      {/* descrição */}
      <div className="bg-white rounded-sm shadow-card mt-4 p-6">
        <h2 className="uppercase text-gray-600 bg-gray-50 px-3 py-2 text-sm rounded-sm">
          Descrição do Produto
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mt-4 whitespace-pre-line">
          {product.description?.trim()
            ? product.description
            : `${product.name} — produto de alta qualidade com ótimo custo-benefício. Envio rápido e seguro a partir de ${product.location}. Garantia de satisfação e devolução grátis em até 7 dias.`}
        </p>
      </div>

      {related.length > 0 && (
        <ProductGrid products={related} title="Produtos Relacionados" />
      )}
    </div>
  );
}
