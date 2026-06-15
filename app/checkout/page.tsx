"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { checkout } from "@/lib/actions";
import { useCart } from "@/components/cart/CartContext";
import { brl } from "@/lib/format";

export default function CheckoutPage() {
  const { items, total, ready } = useCart();

  if (ready && items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={56} className="mx-auto text-gray-300" />
        <p className="text-gray-500 mt-4">Seu carrinho está vazio</p>
        <Link
          href="/"
          className="inline-block mt-4 bg-brand hover:bg-brand-dark text-white px-8 py-2.5 rounded-sm text-sm"
        >
          Ir às compras
        </Link>
      </div>
    );
  }

  const payload = items.map((it) => ({
    name: it.name,
    price: it.price,
    qty: it.qty,
    image: it.image,
  }));

  return (
    <div className="max-w-2xl mx-auto px-3 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Finalizar Compra</h1>

      {/* resumo */}
      <div className="bg-white rounded-lg shadow-card divide-y mb-4">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 p-3">
            <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 bg-gray-100">
              {it.image && (
                <Image src={it.image} alt={it.name} fill className="object-cover" />
              )}
            </div>
            <span className="flex-1 text-sm text-gray-700 line-clamp-1">{it.name}</span>
            <span className="text-xs text-gray-500">x{it.qty}</span>
            <span className="text-sm text-brand font-medium">{brl(it.price * it.qty)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between p-3">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-lg text-brand font-semibold">{brl(total)}</span>
        </div>
      </div>

      {/* dados + pagar */}
      <form action={checkout} className="bg-white rounded-lg shadow-card p-5 space-y-4">
        <input type="hidden" name="items" value={JSON.stringify(payload)} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
          <input
            name="customer"
            required
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            placeholder="Seu nome"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              name="email"
              type="email"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
              placeholder="voce@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              name="phone"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <button className="w-full bg-brand hover:bg-brand-dark text-white rounded-md py-3 font-medium transition-colors">
          Pagar com PIX • {brl(total)}
        </button>
      </form>
    </div>
  );
}
