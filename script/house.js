/* house.js — data/site.json (la forma de la casa) → la del data.json de antes,
   que es la que leen arriba.js, carrusel.js, derecha.js e izquierda.js. Lo
   usan script/carga.js y el build. No toca el disco. */

const prices = (x) => ({ titulo: x.title, opciones: x.options.map((o) => ({ duracion: o.duration, precio: o.price })) });

export function toOld(site) {
  const m = site.massages;
  return {
    arriba: { links: site.links.map((l) => ({ titulo: l.title, link: l.url, fecha: l.date ?? '' })) },
    abajo: { discos: site.records.map((r) => ({ image: `./${r.image}`, caption: r.caption, bgColor: r.bgColor, btnColor: r.btnColor, link: r.url })) },
    derecha: {
      imagen: m.image,
      titulo: { texto: m.title, url: m.instagram },
      precios: { poetaCabanyes: prices(m.prices.studio), domicilio: prices(m.prices.home) },
      tiposMasaje: { titulo: m.types.title, tipos: m.types.list.map((t) => ({ nombre: t.name, descripcion: t.text ?? '' })) },
    },
    izquierda: { texto: Object.fromEntries(site.editorial.map((p, i) => [`parrafo${i + 1}`, p])) },
  };
}
