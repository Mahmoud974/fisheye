class ProfilUser extends Photographer {
  constructor(data, photographerModel) {
    super(data);
    this.pageUrl = window.location.href;
    this.id = new UrlPhotographer().getIdFromUrl();
    this.picture = `/assets/photographers/profil/${this.id}.png`;
    this.photographerModel = photographerModel;
    this.overlayClass = "overlay-visible";
    this.totalLikes = 0; // Total des likes de l'utilisateur
  }

  getUserProfilElement() {
    const main = document.querySelector("main");
    const article = document.createElement("article");
    const media = this.photographerModel.getMediaByPhotographerId(this.id);
    media.forEach((mediaItem) => {
      this.totalLikes += mediaItem.likes;
    });

    const mediaHtml = media
      .map((mediaItem) => this.constructMediaHtml(mediaItem))
      .join("");

    // Construct article HTML
    article.innerHTML = `
      <article>
        <div class="box">
          <div>
            <h1>${this.name}</h1>
            <p>${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
          </div>
          <button id="contact-button" aria-label="Ouvrir le formulaire de contact">Contactez-moi</button>
          <img src="${this.picture}" alt="${this.name} portrait">
        </div>
        <div class="sort">
          <p>Trier par</p>
          <nav id="sort-dropdown">
            <ul>
              <li class="Lev-1">
                <a href="#" data-sort="popularity">Popularité</a>
                <ul>
                  <li><a href="#" data-sort="date">Date</a></li>
                  <li><a href="#" data-sort="title">Titre</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <section class="box_img">
          ${mediaHtml}
        </section>
    
        <!-- Container for contact form -->
        <div id="contact-form-container"></div>
        <div class="fixed-right">
          <div class="rectangle">
            <p id="total-likes">${this.totalLikes} <span><img src="/assets/icons/heart.png" alt="heart" id="heart" /></span></p>
            <p>${this.price}€ /jour</p>
          </div>
        </div>
      </article>
    `;

    main.appendChild(article);

    const contactButton = article.querySelector("#contact-button");
    contactButton.addEventListener("click", () =>
      new FormContact(this.name).showContactForm()
    );

    const sortOptions = article.querySelectorAll("#sort-dropdown a");
    sortOptions.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.preventDefault();
        const sortBy = event.target.getAttribute("data-sort");
        this.sortMedia(sortBy, media);
      });
    });

    this.attachMediaEvents(media);

    return article;
  }

  attachMediaEvents(media) {
    // Add events for media items
    const mediaItems = document.querySelectorAll(
      ".media-item img, .media-item-video video"
    );
    mediaItems.forEach((item, index) => {
      item.addEventListener("click", () => this.showCarousel(index, media));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.showCarousel(index, media);
        }
      });
    });

    // Add events for like buttons
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const button = event.target;
        const likesQuantitySpan = button.previousElementSibling;
        let likes = parseInt(likesQuantitySpan.textContent, 10);

        if (button.getAttribute("data-liked") === "false") {
          likes += 1;
          this.totalLikes += 1;
          button.setAttribute("data-liked", "true");
          button.classList.add("clicked");
        } else {
          likes -= 1;
          this.totalLikes -= 1;
          button.setAttribute("data-liked", "false");
          button.classList.remove("clicked");
        }

        likesQuantitySpan.textContent = likes;
        document.querySelector(
          "#total-likes"
        ).innerHTML = `${this.totalLikes} <span><img src="/assets/icons/heart.png" alt="heart" id="heart" /></span>`;
      });
    });
  }

  constructMediaHtml(mediaItem) {
    if (mediaItem.image) {
      return `
        <div class="media-item">
          <img src="assets/photographers/photos/${this.getMediaFolderName()}/${
        mediaItem.image
      }" alt="${mediaItem.title}" class="media-content" tabindex="0"/>
          <div id="bloc_title_img">
            <p class="title_img">${mediaItem.title}</p>
            <div>
              <span class="likes-quantity">${mediaItem.likes}</span>
              <button class="like-button" data-liked="false">
              ♥
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (mediaItem.video) {
      return `
        <div class="media-item-video">
          <video controls class="media-content" width="400" height="300" tabindex="0">
            <source src="assets/photographers/photos/${this.getMediaFolderName()}/${
        mediaItem.video
      }" type="video/mp4">
          </video>
          <div id="bloc_title_video">
            <p class="title_video">${mediaItem.title}</p>
            <div class="like-count">
              <span class="likes-quantity">${mediaItem.likes}</span>
               <button class="like-button" data-liked="false">♥
              </button>
            </div>
          </div>
        </div>
      `;
    }
    return ""; // Handle other types if needed
  }

  showCarousel(startIndex, media) {
    const mediaItems = media.map((mediaItem) => {
      if (mediaItem.image) {
        return {
          image: `assets/photographers/photos/${this.getMediaFolderName()}/${
            mediaItem.image
          }`,
          title: mediaItem.title,
        };
      } else if (mediaItem.video) {
        return {
          video: `assets/photographers/photos/${this.getMediaFolderName()}/${
            mediaItem.video
          }`,
          title: mediaItem.title,
        };
      }
    });

    const carousel = new Carousel(mediaItems);
    const carouselContainer = document.querySelector(".carousel-container");
    if (carouselContainer) {
      carousel.showMedia(carouselContainer, startIndex);
    } else {
      console.error("Carousel container not found in the DOM.");
    }
  }

  sortMedia(sortBy, media) {
    if (sortBy === "popularity") {
      media.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "date") {
      media.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "title") {
      media.sort((a, b) => a.title.localeCompare(b.title));
    }

    const boxImgSection = document.querySelector(".box_img");
    boxImgSection.innerHTML = media
      .map((mediaItem) => this.constructMediaHtml(mediaItem))
      .join("");

    // Re-attach events for media items and like buttons
    this.attachMediaEvents(media);
  }

  getMediaFolderName() {
    return this.name === "Ellie-Rose Wilkens"
      ? this.name.split("-")[0]
      : this.name.split(" ")[0];
  }
}
