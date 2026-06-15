"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { banners, sideBanners } from "@/data/products";

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const total = banners.length;

  // auto-play: troca de imagem a cada 3.5s
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % total), 3500);
    return () => clearInterval(t);
  }, [total]);

  const Dots = () => (
    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1">
      {banners.map((b, i) => (
        <button
          key={b.id}
          aria-label={`Slide ${i + 1}`}
          onClick={() => setCurrent(i)}
          className={`h-1.5 rounded-full transition-all ${
            i === current ? "bg-brand w-4" : "bg-white/70 w-1.5"
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
            <div key={b.id} className="relative w-full h-full shrink-0">
              <Image
                src={b.image}
                alt={b.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
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
            {banners.map((b) => (
              <div key={b.id} className="relative w-full h-full shrink-0">
                <Image src={b.image} alt={b.alt} fill sizes="800px" className="object-cover" />
              </div>
            ))}
          </div>
          <Dots />
        </div>

        <div className="flex flex-col gap-3">
          {sideBanners.map((b) => (
            <div key={b.id} className="relative flex-1 rounded-sm overflow-hidden shadow-card">
              <Image src={b.image} alt={b.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
