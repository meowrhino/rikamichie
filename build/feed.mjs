// feed.mjs — trae el blog de Erika (Substack) a feed.json, lo que pinta la
// sección de abajo del todo. Lo corre la Action cada domingo
// (.github/workflows/update-feed.yml). Antes se lo pedía a un servidor en
// Render (index.js) que hacía lo mismo y tardaba en despertar.
//        node build/feed.mjs
import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

const feed = await new Parser().parseURL('https://rikamichie.substack.com/feed');
if (!feed.items?.length) throw new Error('el feed ha llegado vacío: no se toca feed.json');
writeFileSync(new URL('../feed.json', import.meta.url), JSON.stringify(feed));
console.log(`✓ feed.json: ${feed.items.length} entradas`);
