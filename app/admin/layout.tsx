import Link from "next/link";
import { logout } from "@/lib/actions";
import { LayoutDashboard, PackagePlus, Images, Settings, LogOut, Store } from "lucide-react";

export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Produtos", icon: LayoutDashboard },
  { href: "/admin/products/new", label: "Novo Produto", icon: PackagePlus },
  { href: "/admin/banners", label: "Capas / Banners", icon: Images },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col md:flex-row">
      {/* sidebar */}
      <aside className="md:w-60 bg-white border-r flex md:flex-col md:min-h-screen">
        <div className="p-4 border-b hidden md:block">
          <span className="text-brand text-xl font-extrabold">Shopee Admin</span>
        </div>
        <nav className="flex md:flex-col flex-1 overflow-x-auto">
          {nav.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand whitespace-nowrap"
              >
                <Icon size={18} /> {n.label}
              </Link>
            );
          })}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand whitespace-nowrap"
          >
            <Store size={18} /> Ver loja
          </Link>
        </nav>
        <form action={logout} className="p-2 md:border-t">
          <button className="flex items-center gap-2 px-2 py-2 text-sm text-gray-500 hover:text-brand w-full">
            <LogOut size={18} /> Sair
          </button>
        </form>
      </aside>

      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
