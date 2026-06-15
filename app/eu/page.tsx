import {
  Settings, ShoppingCart, MessageSquareMore, ChevronRight, Crown, User, X,
  Wallet, BookmarkCheck, Truck, RefreshCcw, Gift, Coins, Ticket,
  CalendarClock, HandCoins, ShieldCheck, Users, Clock, RotateCcw, Heart,
} from "lucide-react";

const compras = [
  { label: "A Pagar", icon: Wallet },
  { label: "Preparando", icon: BookmarkCheck },
  { label: "A caminho", icon: Truck, count: 10 },
  { label: "Devolução/Reemb.", icon: RefreshCcw, count: 3 },
];

const carteira = [
  { label: "ShopeePay", icon: Wallet, action: "Ativar", outlined: true },
  { label: "Moedas", icon: Coins, action: "Faça check-in", dot: true },
  { label: "Cupons", icon: Ticket, action: "0 Cupom", dot: true },
];

const financeiros = [
  { label: "SParcelado", icon: CalendarClock, sub: "Em Até R$6.000" },
  { label: "SCrédito", icon: HandCoins, sub: "Em Até R$6.000", badge: "Novo" },
  { label: "Serviços e Seguros", icon: ShieldCheck },
];

const atividades = [
  { label: "ShopeeVIP", icon: Crown },
  { label: "Criadores & Afiliados", icon: Users },
  { label: "Visto Recentemente", icon: Clock },
  { label: "Globoplay", icon: RotateCcw },
  { label: "Comprar novamente", icon: ShoppingCart },
  { label: "Meus Favoritos", icon: Heart },
];

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-lg shadow-card mx-2 mt-2 p-4">{children}</div>;
}

export default function EuPage() {
  return (
    <div className="pb-6 bg-[#f5f5f5]">
      {/* header de perfil */}
      <div className="brand-gradient text-white px-4 pt-4 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40">
              <User size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">mohamedtrader</span>
                <span className="bg-yellow-300 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Crown size={11} /> Ouro
                </span>
              </div>
              <div className="text-xs text-white/90 mt-0.5">
                <strong>1</strong> Seguindo &nbsp; <strong>0</strong> Seguidores
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Settings size={22} />
            <span className="relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-white text-brand text-[9px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">33</span>
            </span>
            <MessageSquareMore size={22} />
          </div>
        </div>

        {/* faixa VIP */}
        <div className="bg-amber-50 text-amber-900 rounded-md mt-4 px-3 py-2 flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <span className="bg-yellow-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Crown size={11} /> VIP
            </span>
            R$10 OFF em cupons todo mês.
          </span>
          <ChevronRight size={18} />
        </div>
      </div>

      {/* atualizar nome */}
      <Card>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-gray-600">
            <User size={18} className="text-brand" />
            Atualizar nome de usuário <span className="text-blue-500">Atualizar agora</span>
          </span>
          <X size={16} className="text-gray-400" />
        </div>
      </Card>

      {/* minhas compras */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Minhas compras</h2>
          <span className="text-xs text-gray-500 flex items-center">Histórico <ChevronRight size={14} /></span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {compras.map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.label} className="flex flex-col items-center gap-1.5 text-center">
                <span className="relative text-gray-700">
                  <Icon size={26} strokeWidth={1.6} />
                  {c.count && (
                    <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">{c.count}</span>
                  )}
                </span>
                <span className="text-[11px] text-gray-600 leading-tight">{c.label}</span>
              </button>
            );
          })}
        </div>
        <div className="border-t mt-4 pt-3 flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-gray-700">
            <Gift size={18} className="text-brand" /> Gift card, recargas e mais
          </span>
          <span className="flex items-center text-brand font-medium">R$22 OFF <ChevronRight size={16} /></span>
        </div>
      </Card>

      {/* minha carteira */}
      <Card>
        <h2 className="font-semibold text-gray-800 mb-4">Minha carteira</h2>
        <div className="grid grid-cols-3 gap-2">
          {carteira.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="flex flex-col items-center gap-1 text-center">
                <span className="relative text-gray-700">
                  <Icon size={26} strokeWidth={1.6} />
                  {c.dot && <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-brand rounded-full" />}
                </span>
                <span className="text-xs text-gray-700">{c.label}</span>
                {c.outlined ? (
                  <span className="text-[11px] text-brand border border-brand rounded px-2 py-0.5 mt-0.5">{c.action}</span>
                ) : (
                  <span className="text-[11px] text-brand">{c.action}</span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* serviços financeiros */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Serviços financeiros</h2>
          <span className="text-xs text-gray-500 flex items-center">Ver mais <ChevronRight size={14} /></span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {financeiros.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="flex flex-col items-center gap-1 text-center">
                <span className="relative text-brand">
                  <Icon size={26} strokeWidth={1.6} />
                  {f.badge && (
                    <span className="absolute -top-2 left-4 bg-brand text-white text-[8px] font-semibold px-1 rounded-full rounded-bl-none">{f.badge}</span>
                  )}
                </span>
                <span className="text-xs text-gray-700 leading-tight">{f.label}</span>
                {f.sub && <span className="text-[10px] text-brand">{f.sub}</span>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* mais atividades */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Mais atividades</h2>
          <span className="text-xs text-gray-500 flex items-center">Ver tudo <ChevronRight size={14} /></span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {atividades.map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.label} className="flex items-center justify-between border rounded-lg px-3 py-3 text-sm text-gray-700">
                <span className="flex items-center gap-2">
                  <Icon size={20} className="text-brand" /> {a.label}
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
