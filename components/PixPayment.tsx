"use client";

import { useState, useEffect } from "react";
import { Copy, Check, CheckCircle2, Loader2 } from "lucide-react";

export default function PixPayment({
  orderId,
  pixCode,
  qr,
  initialStatus,
}: {
  orderId: string;
  pixCode: string;
  qr: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [copied, setCopied] = useState(false);

  // pergunta o status do pedido a cada 4s até confirmar
  useEffect(() => {
    if (status === "paid") return;
    const t = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/status`, { cache: "no-store" });
        const data = await res.json();
        if (data.status && data.status !== status) setStatus(data.status);
      } catch {
        /* ignora falha de rede */
      }
    }, 4000);
    return () => clearInterval(t);
  }, [orderId, status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível */
    }
  }

  if (status === "paid") {
    return (
      <div className="bg-white rounded-lg shadow-card p-8 text-center">
        <CheckCircle2 className="text-green-500 mx-auto" size={56} />
        <h2 className="text-xl font-bold text-gray-800 mt-3">Pagamento confirmado!</h2>
        <p className="text-gray-500 text-sm mt-1">
          Seu pedido foi pago e já está sendo preparado. 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-card p-6 text-center">
      <h2 className="font-semibold text-gray-800">Pague com PIX</h2>
      <p className="text-gray-500 text-sm mb-4">
        Escaneie o QR Code ou copie o código abaixo.
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt="QR Code PIX" className="w-56 h-56 mx-auto rounded-md border" />

      <button
        onClick={copy}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white rounded-md py-2.5 text-sm font-medium transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copiado!" : "Copiar código PIX"}
      </button>

      <div className="mt-3 text-[11px] text-gray-500 break-all bg-gray-50 rounded p-2 select-all">
        {pixCode}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-amber-600 text-sm">
        <Loader2 size={16} className="animate-spin" />
        Aguardando pagamento...
      </div>
    </div>
  );
}
