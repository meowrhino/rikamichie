// Array de objetos
export const itemsArriba = [
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10"
  },
  
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

  timelineDiv.style.height = "100vh";
  timelineDiv.style.overflowY = "auto";

  // GALERÍA (coordenadas aleatorias entre 5% y 85%)
  /*
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
*/
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