// Integração com o gateway PIX Zyropay.
// Docs: https://docs.zyropay.io

const BASE =
  process.env.ZYROPAY_API_URL ||
  "https://gateway-zyropay-api.rancher.codefabrik.dev";

export function zyropayConfigured(): boolean {
  return !!(process.env.ZYROPAY_CLIENT_ID && process.env.ZYROPAY_PASSWORD);
}

// cache do token JWT em memória (vale ~8h conforme a doc)
let cached: { token: string; exp: number } | null = null;

async function getToken(): Promise<string> {
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;

  const res = await fetch(`${BASE}/cli/client/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: process.env.ZYROPAY_CLIENT_ID,
      password: process.env.ZYROPAY_PASSWORD,
    }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  const token = json?.data?.token;
  if (!json?.success || !token) {
    throw new Error("Falha ao autenticar na Zyropay. Verifique CLIENT_ID/PASSWORD.");
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
  const token = await getToken();

  const res = await fetch(`${BASE}/cli/payment/pix/generate-pix`, {
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
export function validateWebhook(body: { securityParaphrase?: string }): boolean {
  const secret = process.env.ZYROPAY_WEBHOOK_SECRET;
  if (!secret) return true;
  return body?.securityParaphrase === secret;
}
