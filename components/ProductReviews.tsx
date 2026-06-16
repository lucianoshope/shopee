import Image from "next/image";
import { Star, User } from "lucide-react";
import type { ReviewItem } from "@/lib/catalog";

function Stars({ n, size = 13 }: { n: number; size?: number }) {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < n ? "fill-yellow-400" : "fill-none text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function ProductReviews({ reviews }: { reviews: ReviewItem[] }) {
  if (!reviews.length) return null;

  const avg =
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="bg-white rounded-sm shadow-card mt-4 p-4 md:p-6">
      <h2 className="uppercase text-gray-600 bg-gray-50 px-3 py-2 text-sm rounded-sm">
        Avaliações do Produto
      </h2>

      {/* resumo */}
      <div className="flex items-center gap-4 mt-4 pb-4 border-b">
        <div className="text-center">
          <div className="text-3xl font-semibold text-brand">{avg.toFixed(1)}</div>
          <Stars n={Math.round(avg)} size={16} />
        </div>
        <span className="text-sm text-gray-500">
          {reviews.length} avaliaç{reviews.length === 1 ? "ão" : "ões"}
        </span>
      </div>

      {/* lista */}
      <div className="divide-y">
        {reviews.map((r) => (
          <div key={r.id} className="py-4 flex gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-gray-400">
              {r.avatar ? (
                <Image src={r.avatar} alt={r.author} fill className="object-cover" />
              ) : (
                <User size={18} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800">{r.author}</div>
              <Stars n={r.rating} />
              {r.text && <p className="text-sm text-gray-600 mt-1">{r.text}</p>}
              {r.images.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {r.images.map((src, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 rounded overflow-hidden border"
                    >
                      <Image src={src} alt={`foto ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
