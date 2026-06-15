import { Coins, Ticket, Radio, Boxes, Crown, Plane, Gamepad2, Gift } from "lucide-react";

const actions = [
  { label: "Moedas", icon: Coins, color: "bg-yellow-400 text-white" },
  { label: "Cupons", icon: Ticket, color: "bg-white text-brand border border-brand/30" },
  { label: "Live", icon: Radio, color: "bg-white text-blue-600 border border-blue-200" },
  { label: "Estoque na Shopee", icon: Boxes, color: "bg-white text-brand border border-brand/30" },
  { label: "Shopee VIP", icon: Crown, color: "bg-white text-yellow-500 border border-yellow-200" },
  { label: "Internacional", icon: Plane, color: "bg-white text-sky-600 border border-sky-200" },
  { label: "Games", icon: Gamepad2, color: "bg-white text-purple-600 border border-purple-200" },
  { label: "Prêmios", icon: Gift, color: "bg-white text-pink-600 border border-pink-200" },
];

export default function QuickActions() {
  return (
    <section className="bg-white rounded-sm shadow-card mt-3 md:mt-4 py-3">
      <div className="flex overflow-x-auto no-scrollbar gap-1 px-2 md:grid md:grid-cols-8 md:gap-2 md:px-4">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className="flex flex-col items-center gap-1.5 shrink-0 w-[72px] md:w-auto"
            >
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${a.color}`}>
                <Icon size={24} />
              </span>
              <span className="text-[11px] text-gray-600 text-center leading-tight line-clamp-2">
                {a.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
