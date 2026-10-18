# Traspaso: la versión nueva a la copia de Erika

Erika tiene su copia, `rikamichie/web`, que publica `rikamichie.com` con GitHub
Pages (*legacy*: sirve los ficheros de `main` tal cual), y la edita ella desde VS
Code (sus últimos cambios, en febrero de 2026). Cada domingo una Action trae su
blog de Substack a `feed.json` pidiéndoselo a un servidor en Render
(`blog-scrapper-jmsb.onrender.com`). Nosotros solo podemos leer su repo.

**Su contenido está aquí** (traído el 2026-10-18, hasta `ad336ef`; `feed.json`
lo actualiza la Action). Lo que haya cambiado desde entonces hay que traerlo antes.

Las dos copias publican en GitHub Pages con la misma Action
(`.github/workflows/deploy.yml`) y el build decide por el dueño del repo: en
`meowrhino`, github.io sin indexar; en la suya, rikamichie.com. El feed ya no
pasa por Render: `build/feed.mjs` lee Substack directamente.

Tiempo: unos 15 minutos. Para Erika cambia el fichero: de `data.json` a
`data/site.json`, con los nombres en inglés (`links`, `records`, `massages`,
`editorial`). Su nota `HOWTO.txt` pasa a ser `GUIA.md`.

## Antes

- [ ] `main` de meowrhino al día y sin cambios a medias (`git status` limpio).
- [ ] ¿Ha tocado algo Erika desde `ad336ef`? (los commits de `github-actions` son el feed)
      `gh api repos/rikamichie/web/commits --jq '.[] | select(.commit.author.name != "github-actions") | .sha[0:7]+" "+.commit.message' | head -3`.
      Si sí, pasar sus cambios a `data/site.json` antes.
- [ ] Que nos dé permiso de escribir (Settings → Collaborators → `meowrhino`, *Write*), o
      hacer el paso 2 desde su cuenta.

## 1. Su Pages, a Actions (ella: hace falta ser admin)

- [ ] En `rikamichie/web`: **Settings → Pages → Source: GitHub Actions**. El dominio
      (`rikamichie.com`) se queda como está.

## 2. La versión nueva a su `main`

- [ ] `git push https://github.com/rikamichie/web.git <sha-de-su-main>:refs/heads/antes`
- [ ] `git push --force-with-lease=main:<sha-de-su-main> https://github.com/rikamichie/web.git main`
- [ ] En su repo, pestaña **Actions**: la de `build & deploy` en verde. Y lanzar una vez la del
      feed (**Actualizar feed JSON…** → *Run workflow*): tiene que acabar publicando sola.

## 3. Comprobar en rikamichie.com

- [ ] Las seis secciones (arriba, abajo, derecha, izquierda, el blog).
- [ ] `view-source:`: `canonical` con rikamichie.com, **sin** `noindex`, y el texto en el
      `<noscript>`.
- [ ] `/robots.txt` dice `Allow` y `/sitemap.xml`.

## 4. Erika en su ordenador

- [ ] **Sincronizar** (la estructura cambia) y un cambio pequeño siguiendo [GUIA.md](GUIA.md).

## 5. Al acabar

- [ ] El servidor de Render (`blog-scrapper-jmsb`) ya no hace falta: se puede apagar.
- [ ] Fila de rikamichie en `JAMstack/inventario.md` con las dos direcciones.
