"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart/CartContext";

export default function CartButton() {
  const { count, ready } = useCart();
  return (
    <Link href="/cart" className="relative shrink-0">
      <ShoppingCart size={26} />
      {ready && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-brand text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
