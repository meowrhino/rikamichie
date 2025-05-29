export function initCarousel() {
  const discs = [
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
  const imgEl = document.getElementById("carousel-image");
  const captionEl = document.getElementById("carousel-caption");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  function updateCarousel() {
    const disc = discs[currentIndex];
    imgEl.src = disc.image;
    captionEl.textContent = disc.caption;
    document.body.style.backgroundColor = disc.bgColor;

    // 👇 Cambiar color de los botones
    prevBtn.style.color = disc.btnColor;
    nextBtn.style.color = disc.btnColor;

    // 👇 Si quieres que cambien también el color del texto/caption
    captionEl.style.color = disc.btnColor;

    // 🔥 Cambiar color de los botones de navegación (arriba, abajo, etc.)
    const celda = document.querySelector(".celda.abajo");
    if (celda) {
      const navButtons = celda.querySelectorAll(".boton-nav");
      navButtons.forEach((btn) => {
        btn.style.color = disc.btnColor;
      });
    }

    // Desactivar botones en extremos
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === discs.length - 1;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < discs.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Inicialización
  updateCarousel();
}
