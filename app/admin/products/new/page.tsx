import { createProduct } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { categories as mockCategories } from "@/data/products";
import ImagePicker from "@/components/admin/ImagePicker";

export const dynamic = "force-dynamic";

async function getCategories() {
  try {
    const cats = await prisma.category.findMany({ orderBy: { name: "asc" } });
    if (cats.length) return cats.map((c) => ({ id: c.id, name: c.name }));
  } catch {
    /* sem banco ainda */
  }
  // fallback: usa os nomes do mock (id = slug por enquanto)
  return mockCategories.map((c) => ({ id: c.id, name: c.name }));
}

export default async function NewProduct() {
  const categories = await getCategories();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Novo Produto</h1>

      <form action={createProduct} className="bg-white rounded-lg shadow-card p-6 space-y-5">
        {/* fotos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fotos do produto
          </label>
          <ImagePicker name="images" multiple />
        </div>

        {/* nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
          <input
            name="name"
            required
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            placeholder="Ex: Fone Bluetooth TWS"
          />
        </div>

        {/* descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            name="description"
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            placeholder="Detalhes do produto..."
          />
        </div>

        {/* preços */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$) *</label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
              placeholder="0,00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço antigo (opcional)
            </label>
            <input
              name="oldPrice"
              type="number"
              step="0.01"
              min="0"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
              placeholder="para mostrar desconto"
            />
          </div>
        </div>

        {/* categoria + estoque */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              name="categoryId"
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
              defaultValue={100}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        {/* local */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enviado de</label>
          <input
            name="location"
            defaultValue="São Paulo"
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        {/* flags */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="freeShipping" className="accent-brand" /> Frete grátis
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="flashSale" className="accent-brand" /> Oferta relâmpago
          </label>
        </div>

        <button className="w-full bg-brand hover:bg-brand-dark text-white rounded-md py-3 font-medium transition-colors">
          Salvar Produto
        </button>
      </form>
    </div>
  );
}
