"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Clapperboard, Bell, User } from "lucide-react";

const tabs = [
  { href: "/", label: "Início", icon: Home },
  { href: "/oficiais", label: "Oficiais", icon: Store },
  { href: "/live", label: "Live e Vídeo", icon: Clapperboard, badge: "Novo" },
  { href: "/notificacoes", label: "Notificações", icon: Bell, count: 3 },
  { href: "/eu", label: "Eu", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {tabs.map((t) => {
          const active = pathname === t.href;
          const Icon = t.icon;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={`relative flex flex-col items-center justify-center gap-0.5 py-1.5 text-[10px] ${
                  active ? "text-brand" : "text-gray-500"
                }`}
              >
                <span className="relative">
                  <Icon size={24} strokeWidth={active ? 2.2 : 1.8} />
                  {t.count && (
                    <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] px-1 flex items-center justify-center">
                      {t.count}
                    </span>
                  )}
                  {t.badge && (
                    <span className="absolute -top-2 left-3 bg-brand text-white text-[8px] font-semibold rounded-full rounded-bl-none px-1 leading-tight">
                      {t.badge}
                    </span>
                  )}
                </span>
                <span className="leading-none">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
