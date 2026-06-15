import Image from "next/image";
import { banners, sideBanners } from "@/data/products";

export default function Banner() {
  return (
    <section className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* carrossel principal (estático aqui; foco visual) */}
      <div className="lg:col-span-2 relative aspect-[1200/360] rounded-sm overflow-hidden shadow-card">
        <Image
          src={banners[0].image}
          alt={banners[0].alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((b, i) => (
            <span
              key={b.id}
              className={`w-2 h-2 rounded-full ${
                i === 0 ? "bg-brand" : "bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* banners laterais */}
      <div className="hidden lg:flex flex-col gap-3">
        {sideBanners.map((b) => (
          <div
            key={b.id}
            className="relative flex-1 rounded-sm overflow-hidden shadow-card"
          >
            <Image src={b.image} alt={b.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
