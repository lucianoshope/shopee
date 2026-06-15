import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/products";

export default function CategoryNav() {
  return (
    <section className="bg-white rounded-sm shadow-card mt-4">
      <h2 className="text-gray-500 text-sm uppercase px-5 py-4 border-b">
        Categorias
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.id}`}
            className="flex flex-col items-center gap-2 p-4 border-r border-b hover:shadow-cardhover transition-shadow text-center"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src={c.image} alt={c.name} fill className="object-cover" />
            </div>
            <span className="text-xs text-gray-700 leading-tight line-clamp-2">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
