// Zero-dependency static server for the exported site in ./out
// Used by `npm start` / `npm run preview` — mirrors what a static host serves.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve(process.cwd(), "out");
const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || "127.0.0.1";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
};

if (!existsSync(ROOT)) {
  console.error("No ./out directory found. Run `npm run build` first.");
  process.exit(1);
}

function resolveFile(urlPath) {
  // strip query/hash, decode, and block path traversal outside ROOT
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const safe = normalize(clean).replace(/^(\.\.[/\\])+/, "");
  let file = join(ROOT, safe);

  if (!file.startsWith(ROOT)) return null; // traversal attempt

  if (existsSync(file) && statSync(file).isDirectory()) {
    file = join(file, "index.html");
  }
  // extensionless pretty URL -> try .html (trailingSlash: true output)
  if (!existsSync(file) && !extname(file)) {
    const html = `${file}.html`;
    if (existsSync(html)) return html;
    const index = join(file, "index.html");
    if (existsSync(index)) return index;
  }
  return existsSync(file) ? file : null;
}

createServer((req, res) => {
  const file = resolveFile(req.url || "/");

  if (!file) {
    const notFound = join(ROOT, "404.html");
    res.writeHead(404, { "content-type": TYPES[".html"] });
    if (existsSync(notFound)) createReadStream(notFound).pipe(res);
    else res.end("404 Not Found");
    return;
  }

  const type = TYPES[extname(file).toLowerCase()] || "application/octet-stream";
  const immutable = file.includes(`${"/_next/"}/`) || file.includes("/_next/");
  res.writeHead(200, {
    "content-type": type,
    "cache-control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
  });
  createReadStream(file).pipe(res);
}).listen(PORT, HOST, () => {
  console.log(`Serving ./out at http://${HOST}:${PORT}`);
});
