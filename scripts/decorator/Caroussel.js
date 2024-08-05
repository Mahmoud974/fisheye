/**
 * Classe représentant un Carousel.
 */
class Carousel {
  /**
   * Crée un Carousel.
   * @param {Array} media - Les éléments média à afficher dans le carousel.
   */
  constructor(media) {
    this.media = media;
    this.currentIndex = 0;
    this.initCarousel();
  }

  /**
   * Initialise le carousel.
   * Crée le conteneur du carousel et configure les écouteurs d'événements.
   * @private
   */
  initCarousel() {
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");
    carouselContainer.setAttribute("role", "dialog");
    carouselContainer.setAttribute("aria-labelledby", "carousel-title");
    carouselContainer.setAttribute("tabindex", "-1");

    carouselContainer.innerHTML = `
      <article class="carousel-overlay"></article>
      <article class="carousel">
        <button class="carousel-close" aria-label="Fermer" role="button">
          <img src="/assets/close.png" alt="Fermer" />
        </button>
        <button class="carousel-prev" aria-label="Précédent" role="button">&#10094;</button>
        <div class="carousel-content">
          ${this.media
            .map((mediaItem, index) => {
              if (mediaItem.image) {
                return `<img src="${
                  mediaItem.image
                }" class="carousel-media" style="display: ${
                  index === 0 ? "block" : "none"
                };" alt="${mediaItem.title}" tabindex="0">`;
              } else if (mediaItem.video) {
                return `<video src="${
                  mediaItem.video
                }" class="carousel-media" controls style="display: ${
                  index === 0 ? "block" : "none"
                };" aria-label="${mediaItem.title}" tabindex="0"></video>`;
              }
              return "";
            })
            .join("")}
        </div>
        <button class="carousel-next" aria-label="Suivant" role="button">&#10095;</button>
        <p id="carousel-title" class="carousel-title">${this.media[0].title}</p>
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

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.showPrevMedia(carouselContainer);
      } else if (event.key === "ArrowRight") {
        this.showNextMedia(carouselContainer);
      } else if (event.key === "Escape") {
        this.closeCarousel(carouselContainer);
      }
    });

    // S'assurer que le focus est sur le premier élément interactif
    closeButton.focus();

    // Gérer le cycle du focus à l'intérieur du carrousel
    this.trapFocus(carouselContainer);
  }

  /**
   * Ferme le carousel.
   * Supprime le conteneur du carousel du DOM.
   * @param {HTMLElement} container - Le conteneur du carousel.
   */
  closeCarousel(container) {
    if (container && container.parentNode === document.body) {
      document.body.removeChild(container);
    }
  }

  /**
   * Affiche l'élément média précédent.
   * @param {HTMLElement} container - Le conteneur du carousel.
   */
  showPrevMedia(container) {
    this.showMedia(container, this.currentIndex - 1);
  }

  /**
   * Affiche l'élément média suivant.
   * @param {HTMLElement} container - Le conteneur du carousel.
   */
  showNextMedia(container) {
    this.showMedia(container, this.currentIndex + 1);
  }

  /**
   * Affiche l'élément média à l'index donné.
   * @param {HTMLElement} container - Le conteneur du carousel.
   * @param {number} index - L'index de l'élément média à afficher.
   */
  showMedia(container, index) {
    const mediaItems = container.querySelectorAll(".carousel-media");

    if (mediaItems.length === 0) {
      console.error("Aucun élément média trouvé");
      return;
    }

    // Masquer tous les éléments média
    mediaItems.forEach((item) => (item.style.display = "none"));

    if (index >= mediaItems.length) {
      index = 0;
    } else if (index < 0) {
      index = mediaItems.length - 1;
    }

    // Afficher l'élément média actuel
    mediaItems[index].style.display = "block";
    const titleElement = container.querySelector("#carousel-title");
    titleElement.textContent = this.media[index].title;
    this.currentIndex = index;

    // Mettre le focus sur l'élément média affiché
    mediaItems[index].focus();
  }

  /**
   * Gère le cycle du focus à l'intérieur du carrousel.
   * @param {HTMLElement} container - Le conteneur du carousel.
   * @private
   */
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    container.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    });
  }
}
