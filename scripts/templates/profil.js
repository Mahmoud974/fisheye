/**
 * Classe représentant le profil utilisateur d'un photographe.
 * @extends Photographer
 */
class ProfilUser extends Photographer {
  /**
   * Crée une instance de ProfilUser.
   * @param {Object} data - Les données du photographe.
   * @param {Object} photographerModel - Le modèle du photographe pour gérer les médias.
   */
  constructor(data, photographerModel) {
    super(data);
    this.pageUrl = window.location.href;
    this.id = new UrlPhotographer().getIdFromUrl();
    this.picture = `/assets/photographers/profil/${this.id}.png`;
    this.photographerModel = photographerModel;
    this.overlayClass = "overlay-visible";
    this.totalLikes = 0; // Total des likes de l'utilisateur
  }

  /**
   * Crée et renvoie l'élément de profil utilisateur.
   * @returns {HTMLElement} L'élément de profil utilisateur.
   */
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

    article.innerHTML = `
      <article>
        <legend class="box">
          <div>
            <h1>${this.name}</h1>
            <p>${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
          </div>
          <button class="contact-button" aria-label="Ouvrir le formulaire de contact">Contactez-moi</button>
          <img src="${this.picture}" alt="${this.name} portrait" alt="Logo" >
        </legend>
        <div class="sort">
          <p>Trier par</p>
          <nav id="sort-dropdown" class="dropdown" aria-expanded="false">
            <button class="dropbtn" data-sort="popularity" aria-haspopup="true" aria-expanded="false">
              <a href="#" data-sort="popularity">Popularité</a>
              <img src="assets/arrow.png" alt="" />
            </button>
            <div class="dropdown-content" role="menu">
              <ul>
                <li><a href="#" data-sort="date" role="menuitem">Date</a></li>
                <li><a href="#" data-sort="title" role="menuitem">Titre</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <section class="box_img">
          ${mediaHtml}
        </section>

        <!-- Container for contact form -->
        <div class="contact-form-container"></div>
        <div class="fixed-right">
          <div class="rectangle">
            <p id="total-likes">${this.totalLikes} <span><img src="/assets/icons/heart.png" alt="heart"  alt="heart" /></span></p>
            <p>${this.price}€ /jour</p>
          </div>
        </div>
      </article>
    `;

    main.appendChild(article);

    const contactButton = article.querySelector(".contact-button");
    contactButton.addEventListener("click", () =>
      new FormContact(this.name).showContactForm()
    );

    const dropdownButton = article.querySelector("#sort-dropdown .dropbtn");
    const dropdownContent = article.querySelector(
      "#sort-dropdown .dropdown-content"
    );
    dropdownButton.addEventListener("click", () => {
      const isExpanded =
        dropdownButton.getAttribute("aria-expanded") === "true";
      dropdownButton.setAttribute("aria-expanded", !isExpanded);
      dropdownContent.style.display = isExpanded ? "none" : "block";
    });

    dropdownButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dropdownButton.click();
      }
    });

    const sortOptions = article.querySelectorAll("#sort-dropdown a");
    sortOptions.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.preventDefault();
        const sortBy = event.target.getAttribute("data-sort");
        this.updateDropdownText(sortBy);
        this.sortMedia(sortBy, media);
      });

      option.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          option.click();
        }
      });
    });

    this.attachMediaEvents(media);

    return article;
  }

  /**
   * Trie les médias selon le critère spécifié et met à jour l'affichage.
   * @param {string} sortBy - Le critère de tri (popularity, date, title).
   * @param {Array} media - La liste des médias à trier.
   */
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

    this.attachMediaEvents(media);
  }

  /**
   * Attache des événements aux éléments médias et aux boutons de like.
   * @param {Array} media - La liste des médias.
   */
  /**
   * Attache des événements aux éléments médias et aux boutons de like.
   * @param {Array} media - La liste des médias.
   */
  attachMediaEvents(media) {
    const mediaItems = document.querySelectorAll(
      ".media-item img, .media-item-video video"
    );
    mediaItems.forEach((item, index) => {
      item.setAttribute("tabindex", "0");
      item.addEventListener("click", () => this.showCarousel(index, media));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.showCarousel(index, media);
        }
      });
    });

    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((button) => {
      // Ajouter aria-label et aria-pressed
      button.setAttribute("aria-label", "Ajouter un like");
      button.setAttribute("aria-pressed", "false");

      button.addEventListener("click", (event) => {
        const likesQuantitySpan = button.previousElementSibling;
        if (likesQuantitySpan) {
          let likes = parseInt(likesQuantitySpan.textContent, 10);

          if (button.getAttribute("data-liked") === "false") {
            likes += 1;
            this.totalLikes += 1;
            button.setAttribute("data-liked", "true");
            button.classList.add("clicked");
            button.setAttribute("aria-label", "Retirer un like");
            button.setAttribute("aria-pressed", "true");
          } else {
            likes -= 1;
            this.totalLikes -= 1;
            button.setAttribute("data-liked", "false");
            button.classList.remove("clicked");
            button.setAttribute("aria-label", "Ajouter un like");
            button.setAttribute("aria-pressed", "false");
          }

          likesQuantitySpan.textContent = likes;
          document.querySelector(
            "#total-likes"
          ).innerHTML = `${this.totalLikes} <span><img src="/assets/icons/heart.png" alt="heart" id="heart" /></span>`;
        } else {
          console.error("Likes quantity span not found for button.");
        }
      });
    });
  }

  /**
   * Met à jour le texte du bouton de tri avec l'option sélectionnée.
   * @param {string} selectedOption - L'option sélectionnée (popularity, date, title).
   */
  updateDropdownText(selectedOption) {
    const dropdownButton = document.querySelector("#sort-dropdown .dropbtn a");
    const dropdownOptions = document.querySelectorAll(
      "#sort-dropdown .dropdown-content a"
    );

    dropdownOptions.forEach((option) => {
      if (option.getAttribute("data-sort") === selectedOption) {
        const tempText = dropdownButton.textContent;
        dropdownButton.textContent = option.textContent;
        option.textContent = tempText;

        const tempDataSort = dropdownButton.getAttribute("data-sort");
        dropdownButton.setAttribute(
          "data-sort",
          option.getAttribute("data-sort")
        );
        option.setAttribute("data-sort", tempDataSort);
      }
    });
  }

  /**
   * Construit le HTML pour un élément média.
   * @param {Object} mediaItem - L'élément média.
   * @returns {string} Le HTML de l'élément média.
   */
  constructMediaHtml(mediaItem) {
    if (mediaItem.image) {
      return `
        <div class="media-item">
          <img src="assets/photographers/photos/${this.getMediaFolderName()}/${
        mediaItem.image
      }" alt="${mediaItem.title}" class="media-content" tabindex="0"/>
          <div class="bloc_title_img">
            <p class="title_img">${mediaItem.title}</p>
            <div class="boxLike">
              <span class="likes-quantity">${mediaItem.likes}</span>
              <button class="like-button" data-liked="false" >
                <div class="heart"></div>
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
          <div class="bloc_title_video">
            <p class="title_video">${mediaItem.title}</p>
            <div class="like-count">
              <span class="likes-quantity">${mediaItem.likes}</span>
              <button class="like-button" data-liked="false">
                <div class="heart"></div>
              </button>
            </div>
          </div>
        </div>
      `;
    }
    return "";
  }

  /**
   * Affiche le média dans le carousel à l'index spécifié.
   * @param {HTMLElement} container - Le conteneur du carousel.
   * @param {number} index - L'index du média à afficher.
   */
  showMedia(container, index) {
    const mediaItems = container.querySelectorAll(".carousel-media");

    if (index >= mediaItems.length) {
      index = 0;
    } else if (index < 0) {
      index = mediaItems.length - 1;
    }

    mediaItems[this.currentIndex].style.display = "none";
    mediaItems[index].style.display = "block";
    const titleElement = container.querySelector(".carousel-title");
    titleElement.textContent = this.media[index].title;
    this.currentIndex = index;
  }

  /**
   * Affiche le carousel en commençant par le média à l'index spécifié.
   * @param {number} startIndex - L'index du média de départ.
   * @param {Array} media - La liste des médias.
   */
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

  /**
   * Obtient le nom du dossier média en fonction du nom du photographe.
   * @returns {string} Le nom du dossier média.
   */
  getMediaFolderName() {
    return this.name === "Ellie-Rose Wilkens"
      ? this.name.split("-")[0]
      : this.name.split(" ")[0];
  }
}
