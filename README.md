# Rikamichie - Sistema de Grid Navegable

Sistema de navegación web basado en grids configurables con contenido editable mediante JSON.

## 🎯 Características

- **Grid flexible**: Define cualquier layout mediante una matriz bidimensional
- **Navegación intuitiva**: Botones direccionales que se generan automáticamente
- **Contenido editable**: Todo el contenido se gestiona desde `data/site.json` (para Erika: [GUIA.md](GUIA.md); traspaso: [TRASPASO.md](TRASPASO.md); si el build falla: [CLAUDE.md](CLAUDE.md))
- **Modular**: Cada sección tiene su propio script y puede funcionar independientemente
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## 📁 Estructura del proyecto

```
rikamichie/
├── data/site.json         # Todo el contenido editable (schema/site.json dice los campos)
├── build/build.mjs        # → dist/: revisa el JSON, escribe lo que se lee sin JS y la og (sharp)
├── build/feed.mjs         # trae el blog de Substack a feed.json (la Action, cada domingo)
├── index.html             # Punto de entrada
├── script.js              # Sistema principal de grid y navegación
├── style.css              # Estilos globales y por sección
├── paginas/               # HTML de cada sección
│   ├── arriba.html
│   ├── centro.html
│   ├── izquierda.html
│   ├── derecha.html
│   ├── abajo.html
│   └── abajo_abajo.html
├── script/                # Scripts modulares por sección
│   ├── arriba.js         # Timeline de eventos
│   ├── izquierda.js      # Texto introductorio
│   ├── derecha.js        # Información de servicios
│   └── carrusel.js       # Carrusel de discos
└── img/                   # Imágenes del proyecto
```

## 🎨 Configuración del Grid

El grid se define en `script.js` mediante una matriz:

```javascript
const grid = [
  [0, 1, 0],  // Fila 0: solo la celda central activa
  [1, 1, 1],  // Fila 1: todas las celdas activas (cruz)
  [0, 1, 0],  // Fila 2: solo la celda central activa
  [0, 1, 0],  // Fila 3: solo la celda central activa
];
```

- `1` = celda activa (navegable)
- `0` = celda vacía (no navegable)

### Ejemplos de layouts alternativos

#### Grid circular 5x5

```javascript
const grid = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
];
```

#### Grid en L

```javascript
const grid = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 1],
];
```

#### Grid diagonal

```javascript
const grid = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
```

## 📝 Configuración del contenido (data/site.json)

Todo el contenido editable está en `data/site.json`, con los nombres de la casa (en inglés);
`script/house.js` lo pasa a la forma del `data.json` de antes (`arriba`, `abajo`, `derecha`,
`izquierda`), que es la que leen los scripts de cada sección. Qué lleva cada campo:
`schema/site.json` (VS Code lo enseña al pasar el ratón) y [GUIA.md](GUIA.md).

| en `data/site.json` | sección | script |
|---|---|---|
| `links` | arriba: las cosas hechas | `script/arriba.js` |
| `records` | abajo: el carrusel de discos | `script/carrusel.js` |
| `massages` | derecha: masajes y precios | `script/derecha.js` |
| `editorial` | izquierda: el texto | `script/izquierda.js` |

El blog (`feed.json`) lo trae `build/feed.mjs` de Substack cada domingo (Action
`update-feed.yml`), y al subirlo se vuelve a publicar la web.

En la vista previa (Live Server, sin build), `script/carga.js` revisa el JSON con su esquema y
enseña en pantalla lo que esté mal, como el build.

## 🔧 Cómo añadir una nueva celda

1. **Actualizar el grid** en `script.js`:
   ```javascript
   const grid = [
     [0, 1, 0],
     [1, 1, 1],
     [0, 1, 1],  // Nueva fila con celda adicional
   ];
   ```

2. **Asignar nombre** a la nueva celda:
   ```javascript
   const nombresEspeciales = {
     "0_1": "arriba",
     "1_0": "izquierda",
     "1_1": "centro",
     "1_2": "derecha",
     "2_1": "abajo",
     "2_2": "nueva_seccion",  // Nueva celda
   };
   ```

3. **Crear HTML** en `paginas/nueva_seccion.html`

4. **Crear script** (opcional) en `script/nueva_seccion.js`

5. **Añadir estilos** en `style.css`:
   ```css
   .celda.nueva_seccion {
     --bg-color: #fff;
     --text-color: #000;
     --btn-color: #000;
   }
   ```

6. **Añadir datos** en `data/site.json` (y su campo en `schema/site.json` y `script/house.js`).

## 🚀 Uso

1. Clona el repositorio
2. Edita `data/site.json` con tu contenido
3. Personaliza el grid en `script.js` si quieres cambiar el layout
4. Live Server sobre la carpeta (la vista previa); la web tal cual se publica: `npm ci && node build/build.mjs` → `dist/`

## 🎨 Personalización de estilos

Cada celda puede tener sus propias variables CSS:

```css
.celda.nombre_seccion {
  --bg-color: #ffffff;      /* Color de fondo */
  --text-color: #000000;    /* Color del texto */
  --btn-color: #ff0000;     /* Color de botones */
  --theme-color: #ff0000;   /* Color del tema del navegador */
}
```

## 📱 Responsive

El sistema usa unidades `dvw` y `dvh` para adaptarse a diferentes pantallas. Los tamaños de fuente usan `clamp()` para escalar automáticamente.

## 🔄 Sistema de navegación

- Los botones de navegación se generan automáticamente según las celdas disponibles
- Solo aparecen botones para direcciones válidas (celdas con valor `1` en el grid)
- La navegación es fluida con transiciones CSS

## 💡 Tips

- Mantén el grid simple para facilitar la navegación
- Usa nombres descriptivos en `nombresEspeciales`
- Agrupa contenido relacionado en secciones cercanas
- Prueba diferentes layouts para encontrar el que mejor se adapte a tu contenido

## 📄 Licencia

Este proyecto es de código abierto. Úsalo y modifícalo como quieras.
