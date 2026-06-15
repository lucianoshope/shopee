// Integração com o gateway PIX Zyropay.
// Credenciais vêm das Configurações do admin (banco) ou das variáveis de ambiente.
// Docs: https://docs.zyropay.io

import { getSetting } from "./settings";

const DEFAULT_BASE = "https://gateway-zyropay-api.rancher.codefabrik.dev";

async function config() {
  return {
    base: (await getSetting("ZYROPAY_API_URL")) || DEFAULT_BASE,
    clientId: await getSetting("ZYROPAY_CLIENT_ID"),
    password: await getSetting("ZYROPAY_PASSWORD"),
  };
}

export async function zyropayConfigured(): Promise<boolean> {
  const c = await config();
  return !!(c.clientId && c.password);
}

// cache do token JWT em memória (vale ~8h conforme a doc)
let cached: { token: string; exp: number } | null = null;

async function getToken(): Promise<string> {
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;

  const { base, clientId, password } = await config();
  const res = await fetch(`${base}/cli/client/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, password }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  const token = json?.data?.token;
  if (!json?.success || !token) {
    throw new Error("Falha ao autenticar na Zyropay. Verifique as credenciais.");
  }

  // extrai exp do JWT
  let exp = Date.now() + 7 * 60 * 60 * 1000;
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    if (payload.exp) exp = payload.exp * 1000;
  } catch {
    /* mantém o default */
  }

  cached = { token, exp };
  return token;
}

export type PixCharge = {
  pix: string; // copia-e-cola (EMV)
  paymentId: string;
  movId: string;
};

// gera uma cobrança PIX. value em reais (ex: 19.90). expiration em segundos (0 = 24h)
export async function generatePix(params: {
  value: number;
  externalId: string;
  expiration?: number;
}): Promise<PixCharge> {
  const { base } = await config();
  const token = await getToken();

  const res = await fetch(`${base}/cli/payment/pix/generate-pix`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      value: params.value,
      expiration: params.expiration ?? 0,
      externalId: params.externalId,
    }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  const data = json?.data;
  if (!json?.success || !data?.pix) {
    const msg = json?.errors ? JSON.stringify(json.errors) : "Falha ao gerar PIX.";
    throw new Error(msg);
  }

  return { pix: data.pix, paymentId: data.paymentId, movId: data.movId };
}

// valida o webhook comparando o securityParaphrase com o secret configurado.
// Se nenhum secret estiver definido, aceita (útil em teste).
export async function validateWebhook(body: {
  securityParaphrase?: string;
}): Promise<boolean> {
  const secret = await getSetting("ZYROPAY_WEBHOOK_SECRET");
  if (!secret) return true;
  return body?.securityParaphrase === secret;
}
