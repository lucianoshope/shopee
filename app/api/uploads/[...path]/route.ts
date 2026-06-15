import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { UPLOAD_DIR } from "@/lib/storage";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _req: Request,
  { params }: { params: { path: string[] } }
) {
  // junta e protege contra path traversal
  const rel = params.path.join("/");
  if (rel.includes("..") || rel.includes("/") || rel.includes("\\")) {
    return new NextResponse("Not found", { status: 404 });
  }
  const file = path.join(UPLOAD_DIR, rel);

  try {
    const data = await readFile(file);
    const ext = path.extname(file).toLowerCase();
    return new NextResponse(data, {
      headers: {
        "Content-Type": TYPES[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
