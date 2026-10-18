// carga.js — lee data/site.json y lo pasa a la forma del data.json de antes
// (script/house.js).
//
// Las páginas que escribe el build llevan data-built en <html>. Sin él es la
// vista previa (Live Server, sin build): el JSON se revisa con su esquema
// (schema/site.json) como hace el build, y lo que esté mal sale en pantalla.

import { toOld } from './house.js';
import { leerJSON, validar } from './validar.js';

const BUILT = document.documentElement.hasAttribute('data-built');

async function get(path) {
  const res = await fetch(path, { cache: BUILT ? 'default' : 'no-store' });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  try { return leerJSON(await res.text(), path); } catch (e) { showErrors([e.message]); throw e; }
}

function showErrors(errors) {
  let box = document.getElementById('errores-vista-previa');
  if (!box) {
    box = document.createElement('pre');
    box.id = 'errores-vista-previa';
    box.style.cssText = 'position:fixed;inset:0;z-index:99999;margin:0;padding:2rem;overflow:auto;white-space:pre-wrap;'
      + 'background:#fff;color:#000;font:15px/1.5 monospace;';
    box.textContent = 'esto no se publicaría:\n\n';
    document.body.append(box);
  }
  box.textContent += errors.map((e) => `✗ ${e}`).join('\n') + '\n\narréglalo, guarda, y la página se recarga sola.\n';
}

export async function loadSite() {
  const site = await get('./data/site.json');
  if (!BUILT) {
    const errors = validar(site, await get('./schema/site.json'), 'data/site.json');
    if (errors.length) { showErrors(errors); throw new Error(errors.join('\n')); }
  }
  return toOld(site);
}
