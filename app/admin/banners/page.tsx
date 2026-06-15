import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { addBanner, deleteBanner } from "@/lib/actions";
import ImagePicker from "@/components/admin/ImagePicker";
import { Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

async function getBanners() {
  try {
    return await prisma.banner.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return null;
  }
}

export default async function AdminBanners() {
  const banners = await getBanners();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Capas / Banners</h1>

      {/* upload */}
      <form action={addBanner} className="bg-white rounded-lg shadow-card p-6 space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enviar foto(s) de capa
          </label>
          <ImagePicker name="images" multiple />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posição</label>
            <select
              name="position"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand bg-white"
            >
              <option value="hero">Banner principal (carrossel)</option>
              <option value="side">Banner lateral</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição (alt)</label>
            <input
              name="alt"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
              placeholder="Ex: Promoção 6.15"
            />
          </div>
        </div>
        <button className="bg-brand hover:bg-brand-dark text-white rounded-md px-6 py-2.5 text-sm font-medium">
          Adicionar capa
        </button>
      </form>

      {/* lista */}
      {banners === null && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-4 text-sm">
          Banco de dados ainda não conectado. Configure <code>DATABASE_URL</code> no Railway.
        </div>
      )}

      {banners && banners.length > 0 && (
        <div className="space-y-3">
          {banners.map((b) => (
            <div key={b.id} className="bg-white rounded-lg shadow-card p-3 flex items-center gap-4">
              <div className="relative w-28 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
                <Image src={b.image} alt={b.alt || "banner"} fill className="object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <div className="text-gray-700">{b.alt || "(sem descrição)"}</div>
                <div className="text-xs text-gray-400">
                  {b.position === "side" ? "Lateral" : "Principal"}
                </div>
              </div>
              <form action={deleteBanner}>
                <input type="hidden" name="id" value={b.id} />
                <button className="text-gray-400 hover:text-brand p-2">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
