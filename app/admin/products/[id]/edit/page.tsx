import Image from "next/image";
import { notFound } from "next/navigation";
import { updateProduct } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { categories as mockCategories } from "@/data/products";
import ImagePicker from "@/components/admin/ImagePicker";

export const dynamic = "force-dynamic";

async function getCategories() {
  try {
    const cats = await prisma.category.findMany({ orderBy: { name: "asc" } });
    if (cats.length) return cats.map((c) => ({ id: c.id, name: c.name }));
  } catch {
    /* sem banco */
  }
  return mockCategories.map((c) => ({ id: c.id, name: c.name }));
}

async function getProductList() {
  try {
    return await prisma.product.findMany({
      select: { id: true, name: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function EditProduct({ params }: { params: { id: string } }) {
  let product;
  try {
    product = await prisma.product.findUnique({ where: { id: params.id } });
  } catch {
    product = null;
  }
  if (!product) notFound();

  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProductList(),
  ]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Produto</h1>

      <form action={updateProduct} className="bg-white rounded-lg shadow-card p-6 space-y-5">
        <input type="hidden" name="id" value={product.id} />

        {/* fotos atuais */}
        {product.images.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fotos atuais</label>
            <div className="flex flex-wrap gap-2">
              {product.images.map((src, i) => (
                <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border">
                  <Image src={src} alt={`foto ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* novas fotos (substituem as atuais) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trocar fotos (opcional — substitui as atuais)
          </label>
          <ImagePicker name="images" multiple />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
          <input
            name="name"
            required
            defaultValue={product.name}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={product.description ?? ""}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$) *</label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={product.price}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço antigo</label>
            <input
              name="oldPrice"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product.oldPrice ?? ""}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              name="categoryId"
              defaultValue={product.categoryId ?? ""}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand bg-white"
            >
              <option value="">Sem categoria</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
            <input
              name="stock"
              type="number"
              min="0"
              defaultValue={product.stock}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enviado de</label>
            <input
              name="location"
              defaultValue={product.location}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Itens vendidos
            </label>
            <input
              name="sold"
              type="number"
              min="0"
              defaultValue={product.sold}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="freeShipping"
              defaultChecked={product.freeShipping}
              className="accent-brand"
            />{" "}
            Frete grátis
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="flashSale"
              defaultChecked={product.flashSale}
              className="accent-brand"
            />{" "}
            Oferta relâmpago
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="international"
              defaultChecked={product.international}
              className="accent-brand"
            />{" "}
            Vendedor internacional
          </label>
        </div>

        {/* relacionados */}
        {allProducts.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Produtos relacionados (opcional)
            </label>
            <select
              name="relatedIds"
              multiple
              size={6}
              defaultValue={product.relatedIds}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {allProducts
                .filter((p) => p.id !== product.id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Segure Ctrl (ou Cmd no Mac) para escolher vários. Se deixar vazio, usa os da mesma categoria.
            </p>
          </div>
        )}

        <button className="w-full bg-brand hover:bg-brand-dark text-white rounded-md py-3 font-medium transition-colors">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
