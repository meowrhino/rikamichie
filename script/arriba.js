// Array de objetos
export const itemsArriba = [
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
  {
    titulo: "Ofrena Musical con Pol Roig",
    link: "https://graf.cat/events/event/ofrena-musical-pol-roig-i-erika-michi/",
    fecha: "2024-10",
  },
];

export function generarVistaArriba() {
  const timelineDiv = document.querySelector(".arriba-timeline");
  if (!timelineDiv) return;

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