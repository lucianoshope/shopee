import Image from "next/image";
import Banner from "@/components/Banner";
import QuickActions from "@/components/QuickActions";
import FlashSale from "@/components/FlashSale";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getFlashSale } from "@/lib/catalog";
import { Truck, Ticket, RefreshCw, Headphones, Play } from "lucide-react";

export const dynamic = "force-dynamic";

const perks = [
  { icon: Truck, label: "Frete Grátis" },
  { icon: Ticket, label: "Cupons & Cashback" },
  { icon: RefreshCw, label: "7 dias para devolver" },
  { icon: Headphones, label: "Suporte 24h" },
];

const promoCards = [
  { title: "CUPONS ATÉ R$100 OFF", bg: "from-brand to-brand-dark", img: "https://placehold.co/200x200/d73211/ffffff?text=Cupons" },
  { title: "Grandes Marcas", bg: "from-rose-600 to-red-700", img: "https://placehold.co/200x200/9f1239/ffffff?text=Marcas" },
];

export default async function Home() {
  const [products, flash] = await Promise.all([getProducts(), getFlashSale()]);
  return (
    <div className="max-w-container mx-auto px-2 md:px-4 pb-8">
      <Banner />

      {/* faixa de benefícios — só desktop */}
      <section className="hidden md:grid bg-white rounded-sm shadow-card mt-4 grid-cols-4 divide-x">
        {perks.map((p) => (
          <div key={p.label} className="flex items-center justify-center gap-2 py-4 text-gray-600">
            <p.icon className="text-brand" size={22} />
            <span className="text-sm">{p.label}</span>
          </div>
        ))}
      </section>

      <QuickActions />

      {/* cards promocionais */}
      <section className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-4">
        {promoCards.map((c) => (
          <div
            key={c.title}
            className={`relative rounded-lg overflow-hidden bg-gradient-to-r ${c.bg} text-white p-3 md:p-4 flex items-center justify-between min-h-[96px] shadow-card`}
          >
            <div className="font-bold text-sm md:text-lg leading-tight max-w-[55%]">
              {c.title}
            </div>
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden">
              <Image src={c.img} alt={c.title} fill className="object-cover" />
            </div>
            <span className="absolute bottom-2 left-3 bg-white/90 text-brand rounded-full w-6 h-6 flex items-center justify-center">
              <Play size={14} fill="currentColor" />
            </span>
          </div>
        ))}
      </section>

      <FlashSale products={flash} />
      <ProductGrid products={products} title="Recomendados para Você" />
    </div>
  );
}
