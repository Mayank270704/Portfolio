import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Server-only check for a file under `public/`.
 *
 * Lets a component render the real asset when it is present and a designed
 * fallback when it is not — so dropping a file into `public/` is all that is
 * needed to bring it in, with no code change and no request for an image that
 * does not exist.
 */
export function hasPublicAsset(publicPath: string): boolean {
  const relative = publicPath.replace(/^\//, "");
  if (!relative || relative.includes("..")) return false;

  try {
    return existsSync(path.join(process.cwd(), "public", relative));
  } catch {
    return false;
  }
}
