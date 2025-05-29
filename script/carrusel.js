    export function initCarousel() {
    
    const discs = [
      {
        image: '../imgs/disco1.jpg',
        caption: 'árabe',
        bgColor: '#000'
      },
      {
        image: '../imgs/disco2.jpg',
        caption: 'cat pop',
        bgColor: '#00f'
      },
      {
        image: '../imgs/disco3.jpg',
        caption: 'sanson i dalila',
        bgColor: '#800'
      },

    ];

    let currentIndex = 0;
    const imgEl = document.getElementById('carousel-image');
    const captionEl = document.getElementById('carousel-caption');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function updateCarousel() {
      const disc = discs[currentIndex];
      imgEl.src = disc.image;
      captionEl.textContent = disc.caption;
      document.body.style.backgroundColor = disc.bgColor;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === discs.length - 1;
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < discs.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Inicialización
    updateCarousel();
}