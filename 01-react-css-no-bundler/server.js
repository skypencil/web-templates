import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
    let pathname = decodeURIComponent(req.url.split("?")[0]);

    if (pathname === "/") pathname = "/index.html";

    const filePath = path.join(ROOT, pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not found");
            return;
        }

        const ext = path.extname(filePath);
        res.writeHead(200, {
            "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",
        });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`→ http://localhost:${PORT}`);
});
