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

      if (archivo.endsWith("abajo.html")) {
        setTimeout(() => {
          initCarousel();
          console.log("initCarousel lanzado desde abajo.html");
          actualizarVista(); // 🔥 fuerza a generar botones otra vez
        }, 50); // con un poco de delay para asegurarse
        
      }
    })
    .catch((err) => {
      wrapper.innerHTML = `<p>No pude cargar ${archivo}</p>`;
      console.error(err);
    });
}

function actualizarVista() {
  let todas = document.querySelectorAll(".celda");
  for (let i = 0; i < todas.length; i++) {
    todas[i].classList.remove("activa");
  }

  let selector = ".pos_" + posY + "_" + posX;
  let activa = document.querySelector(selector);
  if (activa) {
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
