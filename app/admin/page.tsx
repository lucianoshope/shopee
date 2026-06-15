import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteProduct, seedCatalog } from "@/lib/actions";
import { brl } from "@/lib/format";
import { PackagePlus, Trash2, Pencil, DownloadCloud } from "lucide-react";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return null; // banco ainda não configurado
  }
}

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-md text-sm"
        >
          <PackagePlus size={18} /> Novo Produto
        </Link>
      </div>

      {products === null && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-4 text-sm">
          Banco de dados ainda não conectado. Configure a variável <code>DATABASE_URL</code> no Railway
          (adicione o plugin Postgres) e faça o deploy.
        </div>
      )}

      {products !== null && products.length === 0 && (
        <div className="bg-white rounded-lg shadow-card p-10 text-center">
          <p className="text-gray-400 mb-4">
            Nenhum produto ainda. Importe o catálogo de exemplo para começar a editar,
            ou crie um do zero.
          </p>
          <form action={seedCatalog}>
            <button className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-md text-sm">
              <DownloadCloud size={18} /> Importar catálogo de exemplo
            </button>
          </form>
        </div>
      )}

      {products && products.length > 0 && (
        <div className="bg-white rounded-lg shadow-card divide-y">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-3">
              <div className="relative w-14 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
                {p.images[0] && (
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-800 truncate">{p.name}</div>
                <div className="text-brand font-medium text-sm">{brl(p.price)}</div>
              </div>
              <span className="text-xs text-gray-400 hidden sm:block">
                {p.stock} em estoque
              </span>
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="text-gray-400 hover:text-brand p-2"
                title="Editar"
              >
                <Pencil size={18} />
              </Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={p.id} />
                <button className="text-gray-400 hover:text-brand p-2" title="Excluir">
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
