# Guía de la web

> **Regla de oro: todo lo que se cambia está en `data/site.json`** (y las fotos, en `img/`).
> Lo demás es el código.

## Antes de tocar nada

En VS Code, el tercer icono de la izquierda (**Control de código fuente**): si hay
notificaciones, pulsa **Sincronizar cambios** (*Sync*), para bajar lo que haya cambiado.

**VS Code te ayuda con los campos**: si pasas el ratón por encima de uno te dice qué es, y si
escribes uno mal lo subraya en rojo. Lo sabe por la primera línea del JSON (`"$schema": …`):
**no la borres**.

## Qué hay en `data/site.json`

| sección | dónde sale | qué hay |
|---|---|---|
| `links` | arriba | las cosas hechas: `{ "title": "…", "url": "https://…", "date": "03-2019" }`, en orden |
| `records` | abajo | el carrusel de discos: `image` (`"img/disco1.jpg"`), `caption`, `bgColor`, `btnColor`, `url` |
| `massages` | derecha | la foto (`image`), el título y su enlace (`title`, `instagram`), las dos tablas de precios (`prices` → `studio` y `home`, cada una con su `title` y sus `options`: `{ "duration": "1h", "price": "44€" }`) y los tipos de masaje (`types`) |
| `editorial` | izquierda | el texto, un párrafo por línea. Se puede poner un enlace: `<a href=\"mailto:…\">…</a>` |

El blog (abajo del todo) se actualiza solo cada domingo desde Substack: no hay que tocar nada.

## Guardar y subir

1. Guardar: **Cmd+S**.
2. Para verlo antes: **Go Live** abajo a la derecha (si algo está mal, sale en pantalla y dice
   dónde).
3. Subir: en **Control de código fuente**, escribe qué has cambiado, **Confirmar** y
   **Sincronizar cambios**. En un par de minutos está en la web.

## Si no se publica

La web no se rompe: se queda como estaba hasta que se arregla. El mensaje dice qué pasa:

- **"no es un JSON válido, línea 12"** → casi siempre **una coma**: que falta entre dos cosas, o
  que sobra después de la última. O unas comillas sin cerrar.
- **"\"titulo\" no es un campo de aquí (¿mal escrito?). Los que hay: title, url, date"** → un
  campo mal escrito: cópialo de la lista del mensaje.
- **"no encuentro img/disco4.jpg"** → la foto no está o se llama de otra forma.
