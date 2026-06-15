export function brl(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function compactSold(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")} mil`;
  return String(n);
}
