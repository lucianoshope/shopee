import Link from "next/link";
import {
  Search,
  Bell,
  HelpCircle,
  Globe,
  Camera,
  MessageSquareMore,
  ShoppingBag,
} from "lucide-react";
import CartButton from "./CartButton";

const topLinks = ["Central do Vendedor", "Baixar", "Seguir Shopee"];

const hotSearches = [
  "fone bluetooth",
  "camiseta",
  "smartwatch",
  "tênis",
  "air fryer",
  "cadeira gamer",
];

export default function Header() {
  return (
    <header className="brand-gradient text-white sticky top-0 z-40">
      {/* top bar — só desktop */}
      <div className="max-w-container mx-auto px-4 hidden md:flex items-center justify-between text-xs py-1.5">
        <div className="flex items-center gap-3 opacity-90">
          {topLinks.map((l) => (
            <span key={l} className="hover:text-white/80 cursor-pointer">
              {l}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 opacity-90">
          <span className="flex items-center gap-1 cursor-pointer hover:text-white/80">
            <Bell size={14} /> Notificações
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-white/80">
            <HelpCircle size={14} /> Ajuda
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-white/80">
            <Globe size={14} /> Português
          </span>
          <span className="cursor-pointer hover:text-white/80">Cadastrar</span>
          <span className="cursor-pointer hover:text-white/80">Login</span>
        </div>
      </div>

      {/* main bar */}
      <div className="max-w-container mx-auto px-3 md:px-4 flex items-center gap-3 md:gap-8 py-2.5 md:py-3">
        {/* logo — só desktop */}
        <Link href="/" className="hidden md:flex items-center gap-2 shrink-0">
          <span className="bg-white rounded-lg p-1.5 flex items-center justify-center">
            <ShoppingBag size={24} className="text-brand" />
          </span>
          <span className="text-3xl font-extrabold tracking-tight">Shopee</span>
        </Link>

        <div className="flex-1">
          <div className="bg-white rounded-full md:rounded-sm flex items-center p-1">
            <Search size={18} className="text-brand ml-2 md:hidden" />
            <input
              type="text"
              placeholder="Buscar na Shopee"
              className="flex-1 px-2 md:px-3 py-1.5 md:py-2 text-sm text-brand placeholder:text-brand/80 md:text-gray-800 md:placeholder:text-gray-400 outline-none bg-transparent"
            />
            <button className="p-1 text-brand md:text-gray-400 md:hover:text-brand mr-1">
              <Camera size={20} />
            </button>
            <button className="hidden md:flex bg-brand hover:bg-brand-dark text-white px-6 py-2 rounded-sm transition-colors">
              <Search size={18} />
            </button>
          </div>
          <div className="hidden md:flex gap-3 mt-1 text-xs text-white/90 overflow-hidden">
            {hotSearches.map((s) => (
              <span key={s} className="hover:underline cursor-pointer whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* carrinho + chat */}
        <CartButton />
        <Link href="/chat" className="relative shrink-0">
          <MessageSquareMore size={26} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full border border-brand" />
        </Link>
      </div>
    </header>
  );
}
