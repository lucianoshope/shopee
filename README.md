# Shopee Clone (frontend visual)

Clone visual estilo Shopee construído com **Next.js 14 (App Router) + Tailwind CSS**.
Foco atual: a interface. Dados são mockados em [`data/products.ts`](data/products.ts).
Schema Prisma/Supabase já incluído em [`prisma/schema.prisma`](prisma/schema.prisma) para evoluir depois.

> Projeto de estudo. Não é afiliado à Shopee — usa imagens placeholder (picsum.photos),
> sem logos ou assets de marca.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Páginas

| Rota                 | Descrição                                  |
|----------------------|--------------------------------------------|
| `/`                  | Home: banners, categorias, ofertas, grid   |
| `/product/[id]`      | Página de produto (galeria, preço, ações)  |
| `/category/[id]`     | Listagem com filtros e ordenação           |
| `/cart`              | Carrinho com resumo e checkout             |

## Estrutura

```
app/          páginas (App Router)
components/   Header, Footer, ProductCard, FlashSale, etc.
data/         dados mockados (trocar por Prisma depois)
lib/          helpers (formatação BRL)
prisma/       schema pronto pro Supabase
```

## Próximos passos (quando quiser ir além do visual)

1. Conectar Supabase: `DATABASE_URL` no `.env` + `npx prisma migrate dev`
2. Carrinho real com estado (Zustand/Context) + localStorage
3. Busca funcional e filtros aplicados
4. Autenticação (Supabase Auth) e painel do vendedor
5. Checkout/pagamento (Pix, cartão)
