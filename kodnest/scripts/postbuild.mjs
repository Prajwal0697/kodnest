import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.cwd(), 'dist');
const indexHtml = path.join(dist, 'index.html');
const spaFallback = path.join(dist, '200.html');

if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, spaFallback);
}

