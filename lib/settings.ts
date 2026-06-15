import { prisma } from "./prisma";

// chaves configuráveis pelo admin (também aceitas como variáveis de ambiente)
export const SETTING_KEYS = [
  "ZYROPAY_API_URL",
  "ZYROPAY_CLIENT_ID",
  "ZYROPAY_PASSWORD",
  "ZYROPAY_WEBHOOK_SECRET",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];

// valor: prioriza o que está salvo no banco; senão usa a variável de ambiente
export async function getSetting(key: SettingKey): Promise<string> {
  try {
    const row = await prisma.setting.findUnique({ where: { key } });
    if (row?.value) return row.value;
  } catch {
    /* banco indisponível — cai no env */
  }
  return process.env[key] || "";
}

export async function getAllSettings(): Promise<Record<SettingKey, string>> {
  let rows: { key: string; value: string }[] = [];
  try {
    rows = await prisma.setting.findMany();
  } catch {
    /* sem banco */
  }
  const map = new Map(rows.map((r) => [r.key, r.value]));
  const out = {} as Record<SettingKey, string>;
  for (const k of SETTING_KEYS) out[k] = map.get(k) || process.env[k] || "";
  return out;
}
