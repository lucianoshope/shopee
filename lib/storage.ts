import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Diretório onde as fotos são salvas. No Railway, monte um Volume e aponte
// UPLOAD_DIR para o ponto de montagem (ex: /data/uploads). Localmente usa ./uploads.
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

function safeExt(type: string) {
  return ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" } as Record<string, string>)[type] || "jpg";
}

// salva um File (do FormData) no volume e retorna o caminho público servido por /api/uploads
export async function saveUpload(file: File): Promise<string> {
  if (!ALLOWED.includes(file.type)) {
    throw new Error("Formato inválido. Use JPG, PNG, WEBP ou GIF.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Imagem muito grande (máx 8MB).");
  }
  await mkdir(UPLOAD_DIR, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  const rand = Math.random().toString(36).slice(2, 10);
  const name = `${Date.now()}-${rand}.${safeExt(file.type)}`;
  await writeFile(path.join(UPLOAD_DIR, name), bytes);

  return `/api/uploads/${name}`;
}

export async function saveUploads(files: File[]): Promise<string[]> {
  const valid = files.filter((f) => f && f.size > 0);
  return Promise.all(valid.map(saveUpload));
}
