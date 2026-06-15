"use client";

import { useEffect } from "react";
import { useCart } from "./cart/CartContext";

// esvazia o carrinho quando o pedido já foi criado (tela de pagamento)
export default function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
