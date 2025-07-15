// Referencia al contenedor principal
const app = document.getElementById("content");

// Definimos la cuadrícula (1 = pantalla activa, 0 = hueco)
const grid = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0],
  [0, 1, 0],
];

// Mapa de coordenadas → nombre de archivo (sin extensión)
const nombresEspeciales = {
  "0_1": "arriba",
  "1_0": "izquierda",
  "1_1": "centro",
  "1_2": "derecha",
  "2_1": "abajo",
  "3_1": "abajo_abajo",
};

// Posición inicial
let posY = 1;
let posX = 1;

// === FUNCIONES ===

function crearPantallas() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        const celda = document.createElement("div");
        celda.classList.add("celda", `pos_${y}_${x}`);
        celda.dataset.y = y;
        celda.dataset.x = x;

        const wrapper = document.createElement("div");
        wrapper.classList.add("contenido");
        celda.appendChild(wrapper);
        app.appendChild(celda);

        const clave = `${y}_${x}`;
        const nombre = nombresEspeciales[clave];
        const enlace = `paginas/${nombre}.html`;
        if (nombre) {
          celda.classList.add(nombre);
          cargarContenido(wrapper, enlace);
        }
      }
    }
  }
}

function cargarContenido(wrapper, archivo) {
  fetch(archivo)
    .then((response) => {
      if (!response.ok) throw new Error("Error HTTP: " + response.status);
      return response.text();
    })
    .then((html) => {
      wrapper.innerHTML = html;

      // Inyectar el feed de Substack si es la celda de la izquierda
      if (archivo.endsWith("izquierda.html")) {
        const cont = wrapper.querySelector(".lista_libros");
        const contIndice = wrapper
          .closest(".celda")
          ?.parentElement.querySelector(".izq_2 .indice_libros");
        if (cont) {
          cont.innerHTML = "<p>⏳ Cargando posts...</p>";
          fetch("https://rikamichie.onrender.com/feed")
            .then((r) => {
              console.log("Fetch lanzado, status:", r.status);
              if (!r.ok)
                throw new Error("Respuesta de red incorrecta: " + r.status);
              return r.json();
            })
            .then((feed) => {
              if (!feed || !feed.items) {
                cont.innerHTML = "<p>No hay posts para mostrar.</p>";
                return;
              }
              const items = feed.items.slice(0, 5);

              // Render posts respetando párrafos
              cont.innerHTML = items
                .map(
                  (post, i) => `
      <div class="post" id="post-${i}">
        <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
        <p><em>${new Date(post.pubDate).toLocaleDateString()}</em></p>
        <div>${htmlConParrafosYTitulos(
          post["content:encodedSnippet"] || ""
        )}</div>
      </div>
    `
                )
                .join("");

              // Genera índice de anchors en .izq_2 si existe
              if (contIndice) {
                contIndice.innerHTML = `
            <ul>
              ${items
                .map(
                  (post, i) => `<li><a href="#post-${i}">${post.title}</a></li>`
                )
                .join("")}
            </ul>
          `;
              }
            })
            .catch((err) => {
              console.error("Error al cargar feed:", err);
              cont.innerHTML = "<p>Error al cargar posts :(</p>";
            });
        }
      }

      if (archivo.endsWith("abajo.html")) {
        setTimeout(() => {
          initCarousel();
          console.log("initCarousel lanzado desde abajo.html");
          actualizarVista(); // 🔥 fuerza a generar botones otra vez
        }, 50); // con un poco de delay para asegurarse
      }

      if (archivo.endsWith("arriba.html")) {
        import("./script/arriba.js")
          .then((mod) => {
            setTimeout(() => {
              mod.generarVistaArriba();
              console.log("generarVistaArriba lanzado desde arriba.html");
              actualizarVista();
            }, 50);
          })
          .catch((err) => console.error("Error al cargar arriba.js:", err));
      }
    })
    .catch((err) => {
      wrapper.innerHTML = `<p>No pude cargar ${archivo}</p>`;
      console.error(err);
    });
}

// ...fuera de la función cargarContenido, añade esta utilidad: (obsolete)
/*
function htmlConParrafos(texto) {
  if (/<p>/i.test(texto)) return texto;
  return texto
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}
    */

function htmlConParrafosYTitulos(texto) {
  // Si ya hay <p> devolvemos tal cual
  if (/<p>/i.test(texto)) return texto;

  // Buscamos líneas que sean títulos, ej: palabras que empiezan mayúscula y el resto minúscula, seguidas de \n
  return texto
    .split(/\n{2,}/)
    .map((p) => {
      // Si la línea tiene pinta de título, la convertimos a h4
      const tituloRegex = /^[A-ZÁÉÍÓÚÜ][\w\s-]+$/;
      let lineas = p.split("\n").map((linea) => {
        if (tituloRegex.test(linea.trim())) {
          return `<h4>${linea.trim()}</h4>`;
        } else {
          return linea.trim();
        }
      });
      return `<p>${lineas.join("<br>")}</p>`;
    })
    .join("");
}

function actualizarVista() {
  let todas = document.querySelectorAll(".celda");
  for (let i = 0; i < todas.length; i++) {
    todas[i].classList.remove("activa");
  }

  let selector = ".pos_" + posY + "_" + posX;
  let activa = document.querySelector(selector);

  if (activa) {
    // 1. Si es la celda .abajo y aún no hay color dinámico aplicado...
    if (activa.classList.contains("abajo") && window.discs) {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", window.discs[0].bgColor); // primer disco
    } else {
      // 2. Para el resto: usar --theme-color del CSS como siempre
      const themeColor = getComputedStyle(activa)
        .getPropertyValue("--theme-color")
        .trim();
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", themeColor);
    }

    activa.classList.add("activa");
    crearBotonesNavegacion(activa);
  }
}

function crearBotonesNavegacion(celda) {
  let viejos = celda.querySelectorAll(".boton-nav");
  for (let i = 0; i < viejos.length; i++) {
    viejos[i].remove();
  }

  let dirs = [
    { dy: -1, dx: 0, clase: "btn_arriba", label: "arriba" },
    { dy: 1, dx: 0, clase: "btn_abajo", label: "abajo" },
    { dy: 0, dx: -1, clase: "btn_izquierda", label: "izquierda" },
    { dy: 0, dx: 1, clase: "btn_derecha", label: "derecha" },
  ];

  for (let i = 0; i < dirs.length; i++) {
    let d = dirs[i];
    let nuevaY = posY + d.dy;
    let nuevaX = posX + d.dx;

    if (grid[nuevaY] && grid[nuevaY][nuevaX] === 1) {
      let boton = document.createElement("button");
      boton.classList.add("boton-nav");
      boton.classList.add(d.clase);
      boton.textContent = d.label;

      boton.onclick = function () {
        posY = nuevaY;
        posX = nuevaX;
        actualizarVista();
      };

      celda.appendChild(boton);
    }
  }
}

// === IMPORTS Y EJECUCIÓN FINAL ===
import { initCarousel, discs } from "./script/carrusel.js";

crearPantallas();
actualizarVista();
