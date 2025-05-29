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

// 1) Creamos todas las pantallas vacías y les cargamos su HTML
function crearPantallas() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        const celda = document.createElement("div");
        celda.classList.add("celda", `pos_${y}_${x}`);
        celda.dataset.y = y;
        celda.dataset.x = x;
        app.appendChild(celda);

        const clave = `${y}_${x}`;
        const nombre = nombresEspeciales[clave];
        if (nombre) {
          // ** Aquí volvemos a añadir la clase especial: **
          celda.classList.add(nombre);
          cargarContenido(celda, `${nombre}.html`);
        }
      }
    }
  }
}

// Función auxiliar para hacer fetch y meter el HTML en la celda
function cargarContenido(celda, archivo) {
  fetch(archivo)
    .then(function (response) {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error HTTP: " + response.status);
      }
    })
    .then(function (html) {
      celda.innerHTML = html;
    })
    .catch(function (err) {
      celda.innerHTML = "<p>No pude cargar " + archivo + "</p>";
      console.error(err);
    });
}

// 2) Actualiza qué celda muestra la clase .activa
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

// 3) Crea los botones dentro de la celda activa
function crearBotonesNavegacion(celda) {
  // 3.1 Limpia botones previos
  let viejos = celda.querySelectorAll(".boton-nav");
  for (let i = 0; i < viejos.length; i++) {
    viejos[i].remove();
  }

  // 3.2 Direcciones y sus clases/textos
  let dirs = [
    { dy: -1, dx: 0, clase: "btn_arriba", label: "arriba" },
    { dy: 1, dx: 0, clase: "btn_abajo", label: "abajo" },
    { dy: 0, dx: -1, clase: "btn_izquierda", label: "izquierda" },
    { dy: 0, dx: 1, clase: "btn_derecha", label: "derecha" },
  ];

  // 3.3 Para cada dirección, comprobamos si existe esa celda
  for (let i = 0; i < dirs.length; i++) {
    let d = dirs[i];
    let nuevaY = posY + d.dy;
    let nuevaX = posX + d.dx;

    // ¿Está dentro del grid y es 1?
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
      console.log(`Botón creado: ${d.label} (${nuevaY}, ${nuevaX})`);
    }
  }
}

// 4) Inicio: creamos pantallas y marcamos la inicial
crearPantallas();
actualizarVista();
