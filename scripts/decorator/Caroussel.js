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
        <div class="carousel-content">
          ${this.media
            .map((mediaItem, index) => {
              if (mediaItem.image) {
                return `<img src="${
                  mediaItem.image
                }" class="carousel-media" style="display: ${
                  index === 0 ? "block" : "none"
                };" alt="${mediaItem.title}">`;
              } else if (mediaItem.video) {
                return `<video src="${
                  mediaItem.video
                }" class="carousel-media" controls style="display: ${
                  index === 0 ? "block" : "none"
                };" alt="${mediaItem.title}"></video>`;
              }
              return "";
            })
            .join("")}
        </div>
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

    document.addEventListener("keydown", async (event) => {
      if (event.key === "ArrowLeft") {
        this.showPrevMedia(carouselContainer);
      } else if (event.key === "ArrowRight") {
        this.showNextMedia(carouselContainer);
      } else if (event.key === "Escape") {
        this.closeCarousel(carouselContainer);
      }
    });
  }

  closeCarousel(container) {
    if (container && container.parentNode === document.body) {
      document.body.removeChild(container);
    }
  }

  showPrevMedia(container) {
    this.showMedia(container, this.currentIndex - 1);
  }

  showNextMedia(container) {
    this.showMedia(container, this.currentIndex + 1);
  }

  showMedia(container, index) {
    const mediaItems = container.querySelectorAll(".carousel-media");

    if (mediaItems.length === 0) {
      console.error("No media items found");
      return;
    }

    // Réinitialisez l'affichage des médias
    mediaItems.forEach((item) => (item.style.display = "none"));

    if (index >= mediaItems.length) {
      index = 0;
    } else if (index < 0) {
      index = mediaItems.length - 1;
    }

    // Affichez le média actuel
    mediaItems[index].style.display = "block";
    const titleElement = container.querySelector(".carousel-title");
    titleElement.textContent = this.media[index].title;
    this.currentIndex = index;
  }
}
