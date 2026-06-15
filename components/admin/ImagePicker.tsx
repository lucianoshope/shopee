"use client";

import { useState, useRef } from "react";
import { ImagePlus, X } from "lucide-react";

export default function ImagePicker({
  name,
  multiple = false,
}: {
  name: string;
  multiple?: boolean;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        multiple={multiple}
        onChange={onChange}
        className="hidden"
      />

      <div className="flex flex-wrap gap-2">
        {previews.map((src, i) => (
          <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`preview ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-20 h-20 rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand hover:text-brand flex flex-col items-center justify-center gap-1"
        >
          <ImagePlus size={20} />
          <span className="text-[10px]">{multiple ? "Fotos" : "Foto"}</span>
        </button>
      </div>

      {previews.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setPreviews([]);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="text-xs text-gray-400 hover:text-brand mt-2 flex items-center gap-1"
        >
          <X size={12} /> limpar seleção
        </button>
      )}
    </div>
  );
}
