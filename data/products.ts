// Dados de exemplo (mock). Depois trocar por consultas Prisma/Supabase.
// Imagens via picsum.photos (placeholder livre) para não usar assets de marca.

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number; // %
  sold: number;
  rating: number; // 0-5
  location: string;
  image: string;
  images?: string[]; // todas as fotos (produtos do banco)
  description?: string;
  category: string;
  freeShipping?: boolean;
  flashSale?: boolean;
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

const img = (seed: string) =>
  `https://picsum.photos/seed/${seed}/400/400`;

export const categories: Category[] = [
  { id: "moda-feminina", name: "Moda Feminina", image: img("cat1") },
  { id: "moda-masculina", name: "Moda Masculina", image: img("cat2") },
  { id: "celulares", name: "Celulares e Acessórios", image: img("cat3") },
  { id: "eletronicos", name: "Eletrônicos", image: img("cat4") },
  { id: "casa", name: "Casa e Decoração", image: img("cat5") },
  { id: "beleza", name: "Beleza", image: img("cat6") },
  { id: "infantil", name: "Bebês e Crianças", image: img("cat7") },
  { id: "esportes", name: "Esportes e Lazer", image: img("cat8") },
  { id: "games", name: "Games e Consoles", image: img("cat9") },
  { id: "automotivo", name: "Automotivo", image: img("cat10") },
  { id: "pet", name: "Pet Shop", image: img("cat11") },
  { id: "livros", name: "Livros e Papelaria", image: img("cat12") },
];

const names = [
  "Fone de Ouvido Bluetooth TWS Sem Fio",
  "Camiseta Básica Algodão Premium Unissex",
  "Smartwatch Relógio Inteligente D20",
  "Tênis Esportivo Masculino Running",
  "Carregador Turbo USB-C 65W Fast Charge",
  "Kit Skincare Facial Vitamina C",
  "Mochila Notebook Impermeável 40L",
  "Caixa de Som Bluetooth Portátil à Prova d'água",
  "Cadeira Gamer Ergonômica Reclinável",
  "Câmera de Segurança Wifi 1080p HD",
  "Luminária LED de Mesa Recarregável",
  "Garrafa Térmica Inox 1L Mantém Temperatura",
  "Teclado Mecânico RGB Gamer",
  "Mouse Sem Fio Recarregável Silencioso",
  "Air Fryer Fritadeira Elétrica 4L",
  "Conjunto de Panelas Antiaderente 5 Peças",
  "Jogo de Lençol Casal 4 Peças Algodão",
  "Perfume Importado Masculino 100ml",
  "Óculos de Sol Polarizado UV400",
  "Suporte de Celular Veicular Magnético",
];

const locations = [
  "São Paulo", "Rio de Janeiro", "Minas Gerais", "Paraná",
  "Santa Catarina", "Bahia", "Importado", "Goiás",
];

function makeProducts(): Product[] {
  return Array.from({ length: 40 }, (_, i) => {
    const base = names[i % names.length];
    const price = Math.round((9 + ((i * 37) % 480)) * 100) / 100 + 0.9;
    const discount = [0, 0, 10, 15, 20, 25, 30, 40, 50, 60][i % 10];
    const oldPrice =
      discount > 0
        ? Math.round((price / (1 - discount / 100)) * 100) / 100
        : undefined;
    const cat = categories[i % categories.length].id;
    return {
      id: `p${i + 1}`,
      name: `${base}${i >= names.length ? " - Edição " + (i + 1) : ""}`,
      price,
      oldPrice,
      discount: discount || undefined,
      sold: (i * 137) % 9999,
      rating: Math.min(5, 4 + ((i % 10) / 10)),
      location: locations[i % locations.length],
      image: `https://picsum.photos/seed/prod${i + 1}/400/400`,
      category: cat,
      freeShipping: i % 3 === 0,
      flashSale: i % 4 === 0,
    };
  });
}

export const products: Product[] = makeProducts();

export const flashSaleProducts = products.filter((p) => p.flashSale).slice(0, 6);

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getByCategory(catId: string) {
  return products.filter((p) => p.category === catId);
}

export const banners = [
  { id: 1, image: "https://picsum.photos/seed/banner1/1200/360", alt: "Promoção 6.15" },
  { id: 2, image: "https://picsum.photos/seed/banner2/1200/360", alt: "Frete Grátis" },
  { id: 3, image: "https://picsum.photos/seed/banner3/1200/360", alt: "Ofertas do Dia" },
];

export const sideBanners = [
  { id: 1, image: "https://picsum.photos/seed/side1/600/175", alt: "Cupons" },
  { id: 2, image: "https://picsum.photos/seed/side2/600/175", alt: "Cashback" },
];
