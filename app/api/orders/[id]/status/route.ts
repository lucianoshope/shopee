import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// usado pela tela de pagamento pra checar se o PIX já foi confirmado
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      select: { status: true },
    });
    return NextResponse.json({ status: order?.status ?? "unknown" });
  } catch {
    return NextResponse.json({ status: "unknown" });
  }
}
