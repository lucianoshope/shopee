"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart, type CartItem } from "./cart/CartContext";

export default function AddToCart({ product }: { product: Omit<CartItem, "qty"> }) {
  const { add } = useCart();
  const router = useRouter();

  function buyNow() {
    add(product, 1);
    router.push("/checkout");
  }

  return (
    <div className="flex flex-wrap gap-3 mt-7">
      <button
        onClick={() => add(product, 1)}
        className="flex items-center gap-2 bg-brand-light text-brand border border-brand px-6 py-3 rounded-sm hover:bg-brand/10 transition-colors"
      >
        <ShoppingCart size={20} /> Adicionar ao Carrinho
      </button>
      <button
        onClick={buyNow}
        className="bg-brand hover:bg-brand-dark text-white px-10 py-3 rounded-sm transition-colors"
      >
        Comprar Agora
      </button>
      <button className="flex items-center gap-1 text-gray-500 px-3 hover:text-brand">
        <Heart size={20} /> Favoritar
      </button>
    </div>
  );
}
