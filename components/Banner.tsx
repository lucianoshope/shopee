"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type BannerItem = {
  image?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  gradient?: string;
};

function BannerContent({ b, priority }: { b: BannerItem; priority?: boolean }) {
  if (b.image) {
    return (
      <Image
        src={b.image}
        alt={b.alt || ""}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 800px"
        className="object-cover"
      />
    );
  }
  return (
    <div
      className={`w-full h-full bg-gradient-to-r ${
        b.gradient || "from-brand to-brand-dark"
      } flex flex-col items-center justify-center text-white text-center px-4`}
    >
      {b.title && (
        <span className="text-sm md:text-2xl font-medium tracking-wide">{b.title}</span>
      )}
      {b.subtitle && (
        <span className="text-base md:text-3xl font-bold tracking-wide mt-1">
          {b.subtitle}
        </span>
      )}
    </div>
  );
}

export default function Banner({
  banners,
  sideBanners,
}: {
  banners: BannerItem[];
  sideBanners: BannerItem[];
}) {
  const [current, setCurrent] = useState(0);
  const total = banners.length || 1;

  // auto-play: troca de imagem a cada 3.5s
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % total), 3500);
    return () => clearInterval(t);
  }, [total]);

  const Dots = () => (
    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1">
      {banners.map((b, i) => (
        <button
          key={i}
          aria-label={`Slide ${i + 1}`}
          onClick={() => setCurrent(i)}
          className={`h-1.5 rounded-full transition-all ${
            i === current ? "bg-white w-4" : "bg-white/60 w-1.5"
          }`}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* MOBILE: banner full-width, colado na busca, rotativo */}
      <section className="md:hidden -mx-2 relative aspect-[1080/520] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((b, i) => (
            <div key={i} className="relative w-full h-full shrink-0">
              <BannerContent b={b} priority={i === 0} />
            </div>
          ))}
        </div>
        <Dots />
      </section>

      {/* DESKTOP: carrossel grande + banners laterais */}
      <section className="hidden md:grid mt-4 grid-cols-3 gap-3">
        <div className="col-span-2 relative aspect-[1200/360] rounded-sm overflow-hidden shadow-card">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {banners.map((b, i) => (
              <div key={i} className="relative w-full h-full shrink-0">
                <BannerContent b={b} priority={i === 0} />
              </div>
            ))}
          </div>
          <Dots />
        </div>

        <div className="flex flex-col gap-3">
          {sideBanners.map((b, i) => (
            <div
              key={i}
              className="relative flex-1 rounded-sm overflow-hidden shadow-card"
            >
              <BannerContent b={b} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
