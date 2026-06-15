import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { brl } from "@/lib/format";
import PixPayment from "@/components/PixPayment";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CheckoutOrderPage({
  params,
}: {
  params: { id: string };
}) {
  let order;
  try {
    order = await prisma.order.findUnique({ where: { id: params.id } });
  } catch {
    order = null;
  }
  if (!order) notFound();

  return (
    <div className="max-w-md mx-auto px-3 py-6">
      <div className="text-center mb-4">
        <span className="text-gray-500 text-sm">Pedido</span>
        <div className="text-brand text-2xl font-semibold">{brl(order.total)}</div>
        <span className="text-xs text-gray-400">#{order.id.slice(-8)}</span>
      </div>

      {order.pixCode && order.pixQr ? (
        <PixPayment
          orderId={order.id}
          pixCode={order.pixCode}
          qr={order.pixQr}
          initialStatus={order.status}
        />
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-amber-800 text-sm">
          <AlertTriangle size={20} className="mb-2" />
          Não foi possível gerar a cobrança PIX. Verifique as credenciais da Zyropay
          (<code>ZYROPAY_CLIENT_ID</code> e <code>ZYROPAY_PASSWORD</code>) nas variáveis do Railway.
        </div>
      )}

      <Link href="/" className="block text-center text-gray-400 text-sm mt-4 hover:text-brand">
        Voltar à loja
      </Link>
    </div>
  );
}
