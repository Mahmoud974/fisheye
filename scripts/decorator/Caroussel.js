class Carousel {
  constructor(media) {
    this.media = media;
    this.currentIndex = 0;
    this.initCarousel();
  }

  initCarousel() {
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");

    carouselContainer.innerHTML = `
      <article class="carousel-overlay"></article>
      <article class="carousel">
        <button class="carousel-close" aria-label="Close">
          <img src="/assets/close.png" alt="Close" />
        </button>
        <button class="carousel-prev" aria-label="Previous">&#10094;</button>
        <legend class="carousel-content">
          ${this.media
            .map((mediaItem, index) => {
              if (mediaItem.image) {
                return `<img src="${
                  mediaItem.image
                }" class="carousel-media carousel-image" style="display: ${
                  index === 0 ? "block" : "none"
                };" alt="${mediaItem.title}">`;
              } else if (mediaItem.video) {
                return `<video src="${
                  mediaItem.video
                }" class="carousel-media carousel-video" controls style="display: ${
                  index === 0 ? "block" : "none"
                };" alt="${mediaItem.title}"></video>`;
              }
              return "";
            })
            .join("")}
        </legend>
        <button class="carousel-next" aria-label="Next">&#10095;</button>
        <p class="carousel-title">${this.media[0].title}</p>
      </article>
    `;

    document.body.appendChild(carouselContainer);

    const overlay = carouselContainer.querySelector(".carousel-overlay");
    const closeButton = carouselContainer.querySelector(".carousel-close");
    const prevButton = carouselContainer.querySelector(".carousel-prev");
    const nextButton = carouselContainer.querySelector(".carousel-next");

    overlay.addEventListener("click", () =>
      this.closeCarousel(carouselContainer)
    );
    closeButton.addEventListener("click", () =>
      this.closeCarousel(carouselContainer)
    );
    prevButton.addEventListener("click", () =>
      this.showPrevMedia(carouselContainer)
    );
    nextButton.addEventListener("click", () =>
      this.showNextMedia(carouselContainer)
    );
  }

  closeCarousel(container) {
    if (container && container.parentNode === document.body) {
      document.body.removeChild(container);
    }
  }
}
//FONCTION GLOBAL JS
