/* ============================================================
   build.mjs — data/site.json + las páginas → dist/, la web tal cual se
   publica.        node build/build.mjs

   La web es una cuadrícula de secciones que pinta el JS. El build revisa
   data/site.json, escribe en el HTML lo que se lee sin JS (el texto, las
   cosas hechas, los masajes y los últimos posts del blog), la imagen al
   compartir (1200×630, sharp) y las direcciones del sitio donde se publica.

   Si algo está mal (una coma, un campo mal escrito, una imagen que no está)
   para y dice qué, y no se publica nada: la web se queda como estaba.
   ============================================================ */

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { leerJSON, validar } from '../script/validar.js';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const OUT = join(ROOT, 'dist');
const at = (...p) => join(ROOT, ...p);
const fail = (msg) => { console.error(`\n✗ ${msg}\n\nNo se ha publicado nada: la web sigue como estaba.\n`); process.exit(1); };

/* ---------- leer y revisar ---------- */

const rel = 'data/site.json';
if (!existsSync(at(rel))) fail(`no encuentro ${rel}`);
let site;
try { site = leerJSON(readFileSync(at(rel), 'utf8'), rel); } catch (e) { fail(e.message); }
const errors = validar(site, JSON.parse(readFileSync(at('schema/site.json'), 'utf8')), rel);
if (!errors.length) {
  for (const f of [site.massages.image, ...site.records.map((r) => r.image)]) if (!existsSync(at(f))) errors.push(`${rel}: no encuentro ${f}`);
}
if (errors.length) fail(errors.join('\n✗ '));
let feed = { items: [] };
try { feed = JSON.parse(readFileSync(at('feed.json'), 'utf8')); } catch { console.warn('⚠ feed.json no se puede leer: el blog sale vacío'); }

/* Dónde se publica (las dos copias en GitHub Pages). En nuestra copia
   (meowrhino), meowrhino.github.io/<repo>/ y sin indexar; en la de Erika, o
   en local, la raíz con el dominio de site.json → "url", y se indexa. */
const ours = process.env.GITHUB_REPOSITORY_OWNER === 'meowrhino';
const repo = (process.env.GITHUB_REPOSITORY || '/').split('/')[1];
const SITE = ours ? `https://meowrhino.github.io/${repo}` : String(site.url || '').replace(/\/+$/, '');
const INDEX = !ours && !!site.url;

/* ---------- la imagen al compartir, con sharp: la de los masajes ---------- */

let og = null;
try {
  const sharp = (await import('sharp')).default;
  const cached = at('.cache', 'og', 'home.jpg');
  if (!(existsSync(cached) && statSync(cached).mtimeMs >= statSync(at(site.massages.image)).mtimeMs)) {
    mkdirSync(dirname(cached), { recursive: true });
    await sharp(at(site.massages.image)).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 85, mozjpeg: true }).toFile(cached);
  }
  og = cached;
} catch (e) {
  console.warn(`⚠ sin la imagen para compartir (${e.code || e.message}): sale la foto tal cual. Se arregla con: npm ci`);
}

/* ---------- la página ---------- */

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function swap(html, find, replace) {
  if (!find.test(html)) fail(`no encuentro ${find} en index.html: el build lo necesita para escribir la página.`);
  return html.replace(find, replace);
}
const m = site.massages;
const table = (p) => `<h3>${esc(p.title)}</h3><ul>${p.options.map((o) => `<li>${esc(o.duration)}: ${esc(o.price)}</li>`).join('')}</ul>`;
let html = readFileSync(at('index.html'), 'utf8');
html = swap(html, /<html lang="es">/, '<html lang="es" data-built>');
html = html.replaceAll('https://rikamichie.com', SITE);
if (og) html = html.replaceAll(`${SITE}/${m.image}`, `${SITE}/og/home.jpg`);
html = swap(html, /(<meta name="viewport"[^>]*>)/, `$1\n    <meta name="robots" content="${INDEX ? 'index,follow' : 'noindex'}">`);
// fuera el preconnect a Google Fonts: no se usa ninguna
html = html.replace(/\s*<!-- Preconnect para mejorar performance -->\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/, '');
// lo que lee quien no ejecuta JS (buscadores, vistas previas de enlaces)
html = swap(html, /(<div id="content"><\/div>)/, `$1
    <noscript>
        <h1>Erika Michi</h1>
${site.editorial.map((p) => `        <p>${p}</p>`).join('\n')}
        <h2>${esc(m.title)}</h2>
        ${table(m.prices.studio)}${table(m.prices.home)}
        <ul>${site.links.map((l) => `<li><a href="${esc(l.url)}">${esc(l.title)}</a>${l.date ? ` (${esc(l.date)})` : ''}</li>`).join('')}</ul>
        <h2>blog</h2>
        <ul>${(feed.items || []).slice(0, 10).map((i) => `<li><a href="${esc(i.link)}">${esc(i.title)}</a></li>`).join('')}</ul>
    </noscript>`);

/* ---------- escribir dist/ ---------- */

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const f of ['style.css', 'script.js', 'script', 'paginas', 'img', 'fonts', 'data', 'feed.json']) cpSync(at(f), join(OUT, f), { recursive: true, filter: (x) => !x.endsWith('.DS_Store') });
writeFileSync(join(OUT, 'index.html'), html);
if (og) { mkdirSync(join(OUT, 'og'), { recursive: true }); cpSync(og, join(OUT, 'og', 'home.jpg')); }
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc></url>
</urlset>
`);
writeFileSync(join(OUT, 'robots.txt'), INDEX ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
writeFileSync(join(OUT, '.nojekyll'), '');

console.log(`✓ dist/: la web, con ${(feed.items || []).length} posts del blog${INDEX ? ` · se indexa (${SITE})` : ' · sin indexar'}`);
