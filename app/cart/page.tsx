"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { brl } from "@/lib/format";

export default function CartPage() {
  const { items, remove, setQty, total, ready } = useCart();

  if (ready && items.length === 0) {
    return (
      <div className="max-w-container mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300" />
        <p className="text-gray-500 mt-4">Seu carrinho está vazio</p>
        <Link
          href="/"
          className="inline-block mt-4 bg-brand hover:bg-brand-dark text-white px-8 py-2.5 rounded-sm text-sm"
        >
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-2 md:px-4 py-4">
      {/* cabeçalho — desktop */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 bg-white rounded-sm shadow-card px-4 py-3 text-sm text-gray-500">
        <span>Produto</span>
        <span className="text-center">Preço Unitário</span>
        <span className="text-center">Quantidade</span>
        <span className="text-center">Subtotal</span>
        <span>Ações</span>
      </div>

      <div className="bg-white rounded-sm shadow-card mt-3 divide-y">
        {items.map((it) => (
          <div
            key={it.id}
            className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0 bg-gray-100">
                {it.image && (
                  <Image src={it.image} alt={it.name} fill className="object-cover" />
                )}
              </div>
              <span className="text-sm text-gray-700 line-clamp-2">{it.name}</span>
            </div>
            <span className="text-center text-gray-600 text-sm hidden md:block">
              {brl(it.price)}
            </span>
            <div className="flex items-center justify-center">
              <div className="flex items-center border rounded-sm">
                <button
                  onClick={() => setQty(it.id, it.qty - 1)}
                  className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 py-1 border-x text-sm">{it.qty}</span>
                <button
                  onClick={() => setQty(it.id, it.qty + 1)}
                  className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <span className="text-center text-brand font-medium">
              {brl(it.price * it.qty)}
            </span>
            <button
              onClick={() => remove(it.id)}
              className="text-gray-400 hover:text-brand justify-self-end md:justify-self-center"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* resumo / checkout */}
      <div className="bg-white rounded-sm shadow-card mt-3 sticky bottom-16 md:bottom-0 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600">
          <div className="flex gap-8">
            <span>Frete</span>
            <span className="text-green-600">Grátis</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-gray-500 text-sm block">
              Total ({items.length} {items.length === 1 ? "item" : "itens"})
            </span>
            <span className="text-brand text-2xl font-semibold">{brl(total)}</span>
          </div>
          <Link
            href="/checkout"
            className="bg-brand hover:bg-brand-dark text-white px-12 py-3 rounded-sm text-base transition-colors"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
}
