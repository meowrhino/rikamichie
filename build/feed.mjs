// feed.mjs — trae el blog de Erika (Substack) a feed.json, lo que pinta la
// sección de abajo del todo. Lo corre la Action cada domingo
// (.github/workflows/update-feed.yml). Antes se lo pedía a un servidor en
// Render (index.js) que hacía lo mismo y tardaba en despertar.
//        node build/feed.mjs
import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

// con la cabecera de un navegador: sin ella, Substack contesta 403 a GitHub
const parser = new Parser({ headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36', Accept: 'application/rss+xml, application/xml;q=0.9, */*;q=0.8' } });
const feed = await parser.parseURL('https://rikamichie.substack.com/feed');
if (!feed.items?.length) throw new Error('el feed ha llegado vacío: no se toca feed.json');
writeFileSync(new URL('../feed.json', import.meta.url), JSON.stringify(feed));
console.log(`✓ feed.json: ${feed.items.length} entradas`);
