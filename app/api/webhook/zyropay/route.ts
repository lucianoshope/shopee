import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateWebhook } from "@/lib/zyropay";

export const dynamic = "force-dynamic";

// Zyropay envia POST aqui quando o PIX é confirmado (type: "PixIn", status: "CONFIRMED").
// Cadastre esta URL no painel da Zyropay: https://<sua-app>/api/webhook/zyropay
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  if (!validateWebhook(body)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // externalId é o id do nosso pedido (enviado ao gerar o PIX)
  const orderId = body.externalId;
  const isPaid = body.type === "PixIn" && body.status === "CONFIRMED";

  if (orderId && isPaid) {
    try {
      await prisma.order.updateMany({
        where: { id: orderId, status: "pending" },
        data: { status: "paid", paidAt: new Date(), txid: body.movId || undefined },
      });
    } catch {
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }
  }

  // sempre 200 pra Zyropay não reenviar indefinidamente
  return NextResponse.json({ received: true });
}
