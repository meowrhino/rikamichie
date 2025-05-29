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

/**
 * Genera y coloca los botones de navegación dentro de la celda activa.
 * Cada botón recibe:
 *   - Una clase CSS distinta (.btn_arriba, .btn_abajo, …) para posicionarlo.
 *   - Un label amigable (“arriba”, “abajo”, …) como texto visible.
 */
function crearBotonesNavegacion(celda) {
  // 1) Eliminamos cualquier botón anterior antes de crear los nuevos
  document.querySelectorAll(".boton-nav").forEach((b) => b.remove());

  // 2) Definimos las direcciones posibles:
  //    dy/dx: desplazamiento en la cuadrícula
  //    clase: nombre de la clase CSS que aplica posición
  //    label: texto que verá el usuario
  const dirs = [
    { dy: -1, dx: 0, clase: "btn_arriba", label: "arriba" },
    { dy: 1, dx: 0, clase: "btn_abajo", label: "abajo" },
    { dy: 0, dx: -1, clase: "btn_izquierda", label: "izquierda" },
    { dy: 0, dx: 1, clase: "btn_derecha", label: "derecha" },
  ];

  // 3) Recorremos cada dirección para ver si hay celda activa en esa posición
  dirs.forEach((d) => {
    const newY = posY + d.dy; // fila destino
    const newX = posX + d.dx; // columna destino

    // 4) Solo creamos botón si esa posición existe en el grid y está activa (valor 1)
    if (grid[newY] && grid[newY][newX]) {
      // 5) Creamos el elemento <button>
      const boton = document.createElement("button");

      // 6) Le añadimos:
      //    - la clase genérica 'boton-nav'
      //    - la clase específica de posición (ej. 'btn_arriba')
      boton.classList.add("boton-nav", d.clase);

      // 7) Ponemos el texto que verá el usuario (ej. 'arriba')
      boton.textContent = d.label;

      // 8) Al hacer clic:
      //    a) Actualizamos posY/posX a la nueva posición
      //    b) Llamamos a actualizarVista() para cambiar de celda
      boton.onclick = () => {
        posY = newY;
        posX = newX;
        actualizarVista();
      };

      // 9) Insertamos el botón dentro de la celda activa
      celda.appendChild(boton);
    }
  });
}

// Inicializar
crearPantallas(grid);
actualizarVista();
