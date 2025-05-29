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

function crearPantallas(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        const celda = document.createElement("div");
        celda.classList.add("celda", `pos_${y}_${x}`);
        celda.dataset.y = y;
        celda.dataset.x = x;
        app.appendChild(celda);
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
