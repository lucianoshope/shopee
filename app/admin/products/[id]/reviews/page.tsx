import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Trash2, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { addReview, deleteReview } from "@/lib/actions";
import ImagePicker from "@/components/admin/ImagePicker";
import StarPicker from "@/components/admin/StarPicker";

export const dynamic = "force-dynamic";

export default async function ProductReviewsAdmin({
  params,
}: {
  params: { id: string };
}) {
  let product;
  let reviews;
  try {
    product = await prisma.product.findUnique({ where: { id: params.id } });
    reviews = await prisma.review.findMany({
      where: { productId: params.id },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    product = null;
    reviews = [];
  }
  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href={`/admin/products/${product.id}/edit`}
        className="text-sm text-gray-500 hover:text-brand flex items-center gap-1 mb-3"
      >
        <ArrowLeft size={16} /> Voltar ao produto
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Avaliações</h1>
      <p className="text-gray-500 text-sm mb-6">{product.name}</p>

      {/* nova avaliação */}
      <form action={addReview} className="bg-white rounded-lg shadow-card p-6 space-y-4 mb-6">
        <input type="hidden" name="productId" value={product.id} />

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto de perfil</label>
            <ImagePicker name="avatar" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do cliente *</label>
            <input
              name="author"
              required
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
              placeholder="Ex: João S."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nota</label>
          <StarPicker name="rating" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comentário</label>
          <textarea
            name="text"
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            placeholder="Produto excelente, chegou rápido..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fotos do cliente (opcional)</label>
          <ImagePicker name="images" multiple />
        </div>

        <button className="bg-brand hover:bg-brand-dark text-white rounded-md px-6 py-2.5 text-sm font-medium">
          Adicionar avaliação
        </button>
      </form>

      {/* lista */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-card p-8 text-center text-gray-400">
          Nenhuma avaliação ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-lg shadow-card p-4 flex gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                {r.avatar && <Image src={r.avatar} alt={r.author} fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">{r.author}</span>
                  <form action={deleteReview}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="productId" value={product.id} />
                    <button className="text-gray-400 hover:text-brand">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
                <div className="flex text-yellow-400 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < r.rating ? "fill-yellow-400" : "fill-none text-gray-300"}
                    />
                  ))}
                </div>
                {r.text && <p className="text-sm text-gray-600">{r.text}</p>}
                {r.images.length > 0 && (
                  <div className="flex gap-1.5 mt-2">
                    {r.images.map((src, i) => (
                      <div key={i} className="relative w-14 h-14 rounded overflow-hidden border">
                        <Image src={src} alt={`foto ${i}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
