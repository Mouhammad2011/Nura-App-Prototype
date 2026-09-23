// Dependency-free local server for testing Nura at http://localhost:5173.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 5173);
const mime = {
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg'
};

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^[/\\]+/, '');
  const file = path.resolve(root, relative);
  const blocked = relative.split(/[\\/]+/).some(segment => segment.startsWith('.')) || /^(functions|firebase)([\\/]|$)/i.test(relative);
  if (blocked || (!file.startsWith(root + path.sep) && file !== path.join(root, 'index.html'))) {
    response.writeHead(403).end('Forbidden'); return;
  }
  fs.readFile(file, (error, body) => {
    if (error) { response.writeHead(error.code === 'ENOENT' ? 404 : 500).end(error.code === 'ENOENT' ? 'Not found' : 'Server error'); return; }
    response.writeHead(200, {'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control':'no-store'});
    response.end(body);
  });
}).listen(port, '127.0.0.1', () => console.log(`Nura is running at http://localhost:${port}`));
