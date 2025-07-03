// Array de objetos
export const itemsArriba = [
  {
    item: "img/arriba/1.jpg",
    titulo: "ensayo visual",
    link: "https://ejemplo.com/ensayo-visual",
    fecha: "2024-06"
  },
  {
    item: "img/arriba/2.jpg",
    titulo: "una postal desde el limbo",
    link: "https://ejemplo.com/postal",
    fecha: "2024-04"
  },
  {
    item: "img/arriba/3.jpg",
    titulo: "rituales domésticos",
    link: "https://ejemplo.com/rituales",
    fecha: "2023-11"
  },
  {
    item: "img/arriba/4.jpg",
    titulo: "carta a nadie",
    link: "https://ejemplo.com/carta",
    fecha: "2023-07"
  },
  {
    item: "img/arriba/5.jpg",
    titulo: "microclimas del deseo",
    link: "https://ejemplo.com/microclimas",
    fecha: "2023-05"
  },
  {
    item: "img/arriba/6.jpg",
    titulo: "pliegues del archivo",
    link: "https://ejemplo.com/pliegues",
    fecha: "2022-12"
  },
  {
    item: "img/arriba/7.jpg",
    titulo: "tejido espectral",
    link: "https://ejemplo.com/tejido",
    fecha: "2022-09"
  },
  {
    item: "img/arriba/8.jpg",
    titulo: "técnicas de desaparición",
    link: "https://ejemplo.com/desaparicion",
    fecha: "2022-06"
  },
  {
    item: "img/arriba/1.jpg",
    titulo: "ensayo visual",
    link: "https://ejemplo.com/ensayo-visual",
    fecha: "2024-06"
  },
  {
    item: "img/arriba/2.jpg",
    titulo: "una postal desde el limbo",
    link: "https://ejemplo.com/postal",
    fecha: "2024-04"
  },
  {
    item: "img/arriba/3.jpg",
    titulo: "rituales domésticos",
    link: "https://ejemplo.com/rituales",
    fecha: "2023-11"
  },
  {
    item: "img/arriba/4.jpg",
    titulo: "carta a nadie",
    link: "https://ejemplo.com/carta",
    fecha: "2023-07"
  },
  {
    item: "img/arriba/5.jpg",
    titulo: "microclimas del deseo",
    link: "https://ejemplo.com/microclimas",
    fecha: "2023-05"
  },
  {
    item: "img/arriba/6.jpg",
    titulo: "pliegues del archivo",
    link: "https://ejemplo.com/pliegues",
    fecha: "2022-12"
  },
  {
    item: "img/arriba/7.jpg",
    titulo: "tejido espectral",
    link: "https://ejemplo.com/tejido",
    fecha: "2022-09"
  },
  {
    item: "img/arriba/8.jpg",
    titulo: "técnicas de desaparición",
    link: "https://ejemplo.com/desaparicion",
    fecha: "2022-06"
  }
];

// Función para generar la vista
export function generarVistaArriba() {
  const layout = document.querySelector(".arriba-layout");
  if (!layout) return;

  // Crear contenedores si no existen
  let galeriaDiv = layout.querySelector(".arriba-galeria");
  let timelineDiv = layout.querySelector(".arriba-timeline");

  if (!galeriaDiv) {
    galeriaDiv = document.createElement("div");
    galeriaDiv.className = "arriba-galeria";
    layout.appendChild(galeriaDiv);
  }

  if (!timelineDiv) {
    timelineDiv = document.createElement("div");
    timelineDiv.className = "arriba-timeline";
    layout.appendChild(timelineDiv);
  }

  // Asignar proporciones
  galeriaDiv.style.height = "66.66vh";
  galeriaDiv.style.position = "relative";

  timelineDiv.style.height = "33.33vh";
  timelineDiv.style.overflowY = "auto";

  // GALERÍA (coordenadas aleatorias entre 5% y 85%)
  itemsArriba.forEach(item => {
    const a = document.createElement("a");
    a.href = item.link;
    a.target = "_blank";
    a.className = "galeria-item";

    a.innerHTML = `
      <img src="${item.item}" alt="${item.titulo}">
      <div class="texto">${item.titulo}</div>
    `;

    a.style.position = "absolute";
    a.style.top = `${Math.random() * 90 + 5}%`;
    a.style.left = `${Math.random() * 90 + 5}%`;
    a.style.transform = "translate(-50%, -50%)";
    a.style.textAlign = "center";

    galeriaDiv.appendChild(a);
  });

  // TIMELINE (ordenado por fecha descendente)
  itemsArriba
    .slice()
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .forEach(item => {
      const evento = document.createElement("div");
      evento.className = "evento";
      evento.innerHTML = `
        <sup>${item.fecha}</sup> <a href="${item.link}" target="_blank">${item.titulo}</a>
      `;
      timelineDiv.appendChild(evento);
    });
}