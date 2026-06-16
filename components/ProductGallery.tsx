"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const src = images[active] || images[0];

  // fecha o lightbox com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div>
      {/* foto principal — clique abre ampliada */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative aspect-square w-full rounded-sm overflow-hidden border cursor-zoom-in block"
      >
        <Image src={src} alt={name} fill priority className="object-cover" />
      </button>

      {/* miniaturas — clique/hover troca a principal */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {images.map((t, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded-sm overflow-hidden border-2 ${
                i === active ? "border-brand" : "border-transparent hover:border-brand/50"
              }`}
            >
              <Image src={t} alt={`${name} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute top-4 right-4 text-white hover:text-white/70"
            onClick={() => setOpen(false)}
          >
            <X size={30} />
          </button>
          <div
            className="relative w-full max-w-2xl aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={name} fill className="object-contain" />
          </div>

          {/* miniaturas dentro do lightbox */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(i);
                  }}
                  className={`relative w-12 h-12 rounded overflow-hidden border-2 ${
                    i === active ? "border-white" : "border-white/30"
                  }`}
                >
                  <Image src={t} alt={`${name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
