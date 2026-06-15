import Banner from "@/components/Banner";
import QuickActions from "@/components/QuickActions";
import FlashSale from "@/components/FlashSale";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getFlashSale, getBanners } from "@/lib/catalog";
import { Truck, Ticket, RefreshCw, Headphones, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

const perks = [
  { icon: Truck, label: "Frete Grátis" },
  { icon: Ticket, label: "Cupons & Cashback" },
  { icon: RefreshCw, label: "7 dias para devolver" },
  { icon: Headphones, label: "Suporte 24h" },
];

export default async function Home() {
  const [products, flash, banners] = await Promise.all([
    getProducts(),
    getFlashSale(),
    getBanners(),
  ]);
  return (
    <div className="max-w-container mx-auto px-2 md:px-4 pb-8">
      <Banner banners={banners.hero} sideBanners={banners.side} />

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

      {/* cards promocionais (CSS puro, sem imagens) */}
      <section className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-4">
        {/* Cupons */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ee4d2d] to-[#d73211] text-white p-3 md:p-4 min-h-[110px] flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-brand rounded-md px-2 py-1 text-center shrink-0 shadow">
              <div className="text-[8px] font-semibold leading-none">Oficial</div>
              <div className="text-xs md:text-sm font-extrabold leading-none mt-0.5">
                R$100<br />OFF
              </div>
            </div>
            <div className="font-extrabold text-sm md:text-xl leading-tight">
              CUPONS ATÉ<br />R$100 OFF
            </div>
          </div>
          <button className="self-start bg-white text-brand text-[11px] md:text-sm font-semibold rounded-full px-3 md:px-4 py-1 mt-2 flex items-center gap-1">
            COMPRE AGORA <ChevronRight size={14} />
          </button>
        </div>

        {/* Grandes Marcas */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#b3122b] to-[#7a0d1d] text-white p-3 md:p-4 min-h-[110px] flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="font-bold text-base md:text-2xl leading-tight">
              Grandes<br />Marcas
            </div>
            <div className="text-right leading-tight">
              <div className="text-[10px] line-through text-white/70">R$630,00</div>
              <div className="text-xs">
                POR <span className="text-lg font-extrabold">R$468</span>
                <span className="text-xs font-bold align-top">,28</span>
              </div>
              <span className="inline-block bg-yellow-300 text-red-700 text-[9px] font-bold px-1.5 rounded mt-0.5">
                NO PIX
              </span>
            </div>
          </div>
          <button className="self-start bg-white text-[#b3122b] text-[11px] md:text-sm font-semibold rounded-full px-3 md:px-4 py-1 mt-2 flex items-center gap-1">
            COMPRE AGORA <ChevronRight size={14} />
          </button>
        </div>
      </section>

      <FlashSale products={flash} />
      <ProductGrid products={products} title="Recomendados para Você" />
    </div>
  );
}
