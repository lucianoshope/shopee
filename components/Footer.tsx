const columns = [
  {
    title: "Atendimento ao Cliente",
    links: ["Central de Ajuda", "Como Comprar", "Métodos de Pagamento", "Frete", "Devolução e Reembolso", "Garantia"],
  },
  {
    title: "Sobre",
    links: ["Sobre Nós", "Políticas", "Privacidade", "Programa de Afiliados", "Marketplace", "Trabalhe Conosco"],
  },
  {
    title: "Pagamento",
    links: ["Cartão de Crédito", "Pix", "Boleto", "Carteira Digital"],
  },
  {
    title: "Siga-nos",
    links: ["Facebook", "Instagram", "TikTok", "YouTube"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-brand mt-8">
      <div className="max-w-container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-gray-700 font-semibold text-sm uppercase mb-3">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li
                  key={l}
                  className="text-gray-500 text-sm hover:text-brand cursor-pointer"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="max-w-container mx-auto px-4 py-6 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Shopee Clone — Projeto de estudo. Não afiliado à Shopee.
          <br />
          Construído com Next.js + Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
