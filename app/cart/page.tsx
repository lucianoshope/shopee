import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, Tag } from "lucide-react";
import { products } from "@/data/products";
import { brl } from "@/lib/format";

export default function CartPage() {
  const items = products.slice(0, 3).map((p, i) => ({ ...p, qty: i + 1 }));
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = 0;
  const discount = subtotal * 0.05;
  const total = subtotal + shipping - discount;

  return (
    <div className="max-w-container mx-auto px-4 py-4">
      {/* cabeçalho da tabela */}
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
            <Link href={`/product/${it.id}`} className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0">
                <Image src={it.image} alt={it.name} fill className="object-cover" />
              </div>
              <span className="text-sm text-gray-700 line-clamp-2">{it.name}</span>
            </Link>
            <span className="text-center text-gray-600 text-sm hidden md:block">
              {brl(it.price)}
            </span>
            <div className="flex items-center justify-center">
              <div className="flex items-center border rounded-sm">
                <button className="px-2 py-1 text-gray-500 hover:bg-gray-100"><Minus size={14} /></button>
                <span className="px-3 py-1 border-x text-sm">{it.qty}</span>
                <button className="px-2 py-1 text-gray-500 hover:bg-gray-100"><Plus size={14} /></button>
              </div>
            </div>
            <span className="text-center text-brand font-medium">
              {brl(it.price * it.qty)}
            </span>
            <button className="text-gray-400 hover:text-brand justify-self-end md:justify-self-center">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* cupom */}
      <div className="bg-white rounded-sm shadow-card mt-3 px-4 py-3 flex items-center gap-3">
        <Tag size={18} className="text-brand" />
        <input
          placeholder="Inserir código do cupom"
          className="flex-1 border rounded-sm px-3 py-2 text-sm outline-none focus:border-brand"
        />
        <button className="text-brand text-sm border border-brand px-4 py-2 rounded-sm hover:bg-brand-50">
          Aplicar
        </button>
      </div>

      {/* resumo / checkout */}
      <div className="bg-white rounded-sm shadow-card mt-3 sticky bottom-0 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex gap-8">
            <span>Subtotal</span>
            <span>{brl(subtotal)}</span>
          </div>
          <div className="flex gap-8">
            <span>Frete</span>
            <span className="text-green-600">{shipping === 0 ? "Grátis" : brl(shipping)}</span>
          </div>
          <div className="flex gap-8">
            <span>Cupom (5%)</span>
            <span className="text-brand">- {brl(discount)}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-gray-500 text-sm block">Total ({items.length} itens)</span>
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
