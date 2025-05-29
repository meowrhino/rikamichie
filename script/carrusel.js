export const discs = [
  {
    image: "./img/disco1.jpg",
    caption: "árabe",
    bgColor: "#000",
    btnColor: "#f00",
  },
  {
    image: "./img/disco2.jpg",
    caption: "cat pop",
    bgColor: "#00f",
    btnColor: "#fff",
  },
  {
    image: "./img/disco3.jpg",
    caption: "sanson i dalila",
    bgColor: "#f0f",
    btnColor: "#fff",
  },
];

let currentIndex = 0;
let imgEl;
let captionEl;
let prevBtn;
let nextBtn;

// Controles para inicializaciones únicas
let listenersInitialized = false;
let observerInitialized = false;

export function initCarousel() {
  // Referencias al DOM
  imgEl     = document.getElementById("carousel-image");
  captionEl = document.getElementById("carousel-caption");
  prevBtn   = document.getElementById("prev-btn");
  nextBtn   = document.getElementById("next-btn");

  // 1) Enlazar listeners (solo una vez)
  if (!listenersInitialized) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        console.log("◀️ PREV CLICKED - new index:", currentIndex);
        updateCarousel();
      }
    });
    nextBtn.addEventListener("click", () => {
      if (currentIndex < discs.length - 1) {
        currentIndex++;
        console.log("▶️ NEXT CLICKED - new index:", currentIndex);
        updateCarousel();
      }
    });
    listenersInitialized = true;
  }

  // 2) Observer para estilizar grid-nav (.boton-nav) al crearse dinámicamente
  if (!observerInitialized) {
    const celdaAbajo = document.querySelector(".celda.abajo");
    if (celdaAbajo) {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          for (const node of mutation.addedNodes) {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.classList.contains("boton-nav")
            ) {
              node.style.color = discs[currentIndex].btnColor;
            }
          }
        }
      });
      observer.observe(celdaAbajo, { childList: true });
    }
    observerInitialized = true;
  }

  // 3) Siempre repintar vista al (re)iniciar
  updateCarousel();
}

function updateCarousel() {
  const disc = discs[currentIndex];

  // Imagen y texto
  imgEl.src = disc.image;
  captionEl.textContent = disc.caption;
  captionEl.style.color = disc.btnColor;

  // Fondo de la celda "abajo"
  const celdaAbajo = document.querySelector(".celda.abajo");
  if (celdaAbajo) {
    celdaAbajo.style.backgroundColor = disc.bgColor;
    // Estilizar botonos grid-nav existentes
    celdaAbajo.querySelectorAll(".boton-nav").forEach((btn) => {
      btn.style.color = disc.btnColor;
    });
  }

  // Colores de los botones del carrusel
  prevBtn.style.color = disc.btnColor;
  nextBtn.style.color = disc.btnColor;

  // Desactivar extremos
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === discs.length - 1;
}