"use client";

import { useState, useRef } from "react";
import { ImagePlus, X } from "lucide-react";

export default function ImagePicker({
  name,
  multiple = false,
  max,
}: {
  name: string;
  multiple?: boolean;
  max?: number;
}) {
  const limit = max ?? (multiple ? 6 : 1);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // mantém o input <file> em sincronia com a lista (pra enviar no form)
  function sync(next: File[]) {
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    if (inputRef.current) inputRef.current.files = dt.files;
    setFiles(next);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    sync([...files, ...picked].slice(0, limit));
  }

  function removeAt(i: number) {
    sync(files.filter((_, idx) => idx !== i));
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
        {files.map((f, i) => (
          <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(f)}
              alt={`preview ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute top-0.5 right-0.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5"
              aria-label="Remover"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {files.length < limit && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-20 h-20 rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand hover:text-brand flex flex-col items-center justify-center gap-1"
          >
            <ImagePlus size={20} />
            <span className="text-[10px]">
              {files.length ? "Adicionar" : multiple ? "Fotos" : "Foto"}
            </span>
          </button>
        )}
      </div>

      {multiple && (
        <p className="text-xs text-gray-400 mt-1">
          {files.length}/{limit} foto(s)
        </p>
      )}
    </div>
  );
}
