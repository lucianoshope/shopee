import { login } from "@/lib/actions";
import { Lock } from "lucide-react";

export default function AdminLogin({
  searchParams,
}: {
  searchParams: { error?: string; next?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
      <form
        action={login}
        className="bg-white rounded-lg shadow-card p-8 w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center">
            <Lock size={22} />
          </span>
          <h1 className="text-xl font-bold text-brand mt-3">Shopee Admin</h1>
          <p className="text-gray-500 text-sm">Acesso ao painel</p>
        </div>

        <input type="hidden" name="next" value={searchParams.next || "/admin"} />

        <label className="block text-sm text-gray-600 mb-1">Senha</label>
        <input
          type="password"
          name="password"
          autoFocus
          required
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          placeholder="••••••••"
        />

        {searchParams.error && (
          <p className="text-brand text-sm mt-2">Senha incorreta.</p>
        )}

        <button className="w-full bg-brand hover:bg-brand-dark text-white rounded-md py-2.5 mt-5 font-medium transition-colors">
          Entrar
        </button>
      </form>
    </div>
  );
}
