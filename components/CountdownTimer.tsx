"use client";

import { useState, useEffect } from "react";

// tempo restante até o fim do dia (a oferta "reinicia" todo dia à meia-noite)
function getTimeLeft() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  return {
    h: Math.floor(diff / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownTimer() {
  // começa nulo p/ evitar divergência de hidratação; preenche no cliente
  const [t, setT] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    setT(getTimeLeft());
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = t ? [pad(t.h), pad(t.m), pad(t.s)] : ["00", "00", "00"];

  return (
    <div className="flex items-center gap-1">
      {blocks.map((b, i) => (
        <span
          key={i}
          className="bg-black text-white text-sm font-bold px-1.5 py-0.5 rounded-sm tabular-nums"
        >
          {b}
        </span>
      ))}
    </div>
  );
}
