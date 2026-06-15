import { saveSettings } from "@/lib/actions";
import { getAllSettings } from "@/lib/settings";
import { CheckCircle2, KeyRound } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSettings({
  searchParams,
}: {
  searchParams: { saved?: string };
}) {
  const s = await getAllSettings();
  const webhookUrl = "https://SEU-DOMINIO/api/webhook/zyropay";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Configurações</h1>
      <p className="text-gray-500 text-sm mb-6">
        Credenciais do gateway PIX (Zyropay). Solicite com a Zyropay (suporte@zyropay.com).
      </p>

      {searchParams.saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-3 text-sm mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} /> Configurações salvas!
        </div>
      )}

      <form action={saveSettings} className="bg-white rounded-lg shadow-card p-6 space-y-5">
        <div className="flex items-center gap-2 text-brand font-medium">
          <KeyRound size={18} /> Gateway PIX — Zyropay
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL da API</label>
          <input
            name="ZYROPAY_API_URL"
            defaultValue={s.ZYROPAY_API_URL}
            placeholder="https://gateway-zyropay-api.rancher.codefabrik.dev"
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
          <input
            name="ZYROPAY_CLIENT_ID"
            defaultValue={s.ZYROPAY_CLIENT_ID}
            placeholder="seu clientId"
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha (password)</label>
          <input
            name="ZYROPAY_PASSWORD"
            type="password"
            defaultValue={s.ZYROPAY_PASSWORD}
            placeholder="••••••••"
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Webhook Secret (securityParaphrase)
          </label>
          <input
            name="ZYROPAY_WEBHOOK_SECRET"
            defaultValue={s.ZYROPAY_WEBHOOK_SECRET}
            placeholder="texto secreto pra validar o webhook"
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <p className="text-xs text-gray-400 mt-1">
            Cadastre o mesmo valor no painel da Zyropay junto com a URL de notificação:
            <br />
            <code className="text-gray-500">{webhookUrl}</code>
          </p>
        </div>

        <button className="bg-brand hover:bg-brand-dark text-white rounded-md px-6 py-2.5 text-sm font-medium">
          Salvar configurações
        </button>
      </form>
    </div>
  );
}
