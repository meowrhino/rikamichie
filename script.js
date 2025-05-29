const app = document.getElementById("content");

// Aquí defines tu cuadrícula
const grid = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0],
  [0, 1, 0],
];

// Estado inicial
let posY = 1,
  posX = 1;

// Crea las pantallas en el DOM según la cuadrícula definida
function crearPantallas(grid) {
  const nombresEspeciales = {
    "0_1": "arriba",
    "1_0": "izquierda",
    "1_1": "centro",
    "1_2": "derecha",
    "2_1": "abajo",
    "3_1": "abajo_abajo",
  };

  for (let y = 0; y < grid.length; y++) {
    // Recorre filas
    for (let x = 0; x < grid[y].length; x++) {
      // Recorre columnas
      if (grid[y][x]) {
        // Solo si la celda está activa (valor 1)
        const celda = document.createElement("div");
        
        // Añadir clase especial según coordenadas (si existe)
        const clave = `${y}_${x}`;
        if (nombresEspeciales[clave]) {
            celda.classList.add(nombresEspeciales[clave]);
        }
        
        celda.classList.add("celda", `pos_${y}_${x}`); // Asigna clases para identificar celda
        celda.dataset.y = y; // Guarda coordenadas como atributos dataset
        celda.dataset.x = x;
        app.appendChild(celda); // Añade la celda al DOM
      }
    }
  }
}

function actualizarVista() {
  document
    .querySelectorAll(".celda")
    .forEach((c) => c.classList.remove("activa"));
  const activa = document.querySelector(`.pos_${posY}_${posX}`);
  activa.classList.add("activa");
  crearBotonesNavegacion(activa);
}

function crearBotonesNavegacion(celda) {
  document.querySelectorAll(".boton-nav").forEach((b) => b.remove());

  const dirs = [
    { dy: -1, dx: 0, clase: "arriba" },
    { dy: 1, dx: 0, clase: "abajo" },
    { dy: 0, dx: -1, clase: "izquierda" },
    { dy: 0, dx: 1, clase: "derecha" },
  ];

  dirs.forEach((d) => {
    const newY = posY + d.dy;
    const newX = posX + d.dx;

    if (grid[newY] && grid[newY][newX]) {
      const boton = document.createElement("button");
      boton.classList.add("boton-nav", d.clase);
      boton.textContent = d.clase;
      boton.onclick = () => {
        posY = newY;
        posX = newX;
        actualizarVista();
      };
      celda.appendChild(boton);
    }
  });
}

// Inicializar
crearPantallas(grid);
actualizarVista();
