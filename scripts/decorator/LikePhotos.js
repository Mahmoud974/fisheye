/**
 * Classe pour gérer les photos avec la possibilité de les aimer.
 */
class LikePhotos {
  /**
   * Trie les médias et met à jour l'affichage.
   * @param {string} sortBy - Critère de tri des médias (ex. : 'title').
   */
  sortMedia(sortBy) {
    // Trier les médias selon le critère spécifié
    const sortedMedia = this.photographerModel.sortMediaByTitle(this.id);

    // Sélectionner la section contenant les médias
    const boxImgSection = document.querySelector(".box_img");

    // Mettre à jour le contenu HTML avec les médias triés
    boxImgSection.innerHTML = sortedMedia
      .map((mediaItem) => {
        if (mediaItem.image) {
          return `
          <article class="media-item">
            <img src="assets/photographers/photos/${this.getMediaFolderName()}/${
            mediaItem.image
          }"
                 alt="${mediaItem.title}" class="media-content" tabindex="0"/>
            <legend id="bloc_title_img">
              <p class="title_img">${mediaItem.title}</p>
              <legend>
                <span class="likes-quantity">${mediaItem.likes}</span>
                <button class="like-button" data-liked="false">❤️</button>
              </legend>
            </legend>
          </article>
        `;
        } else if (mediaItem.video) {
          return `
          <div class="media-item-video">
            <video controls class="media-content" width="400" height="300" tabindex="0">
              <source src="assets/photographers/photos/${this.getMediaFolderName()}/${
            mediaItem.video
          }"
                      type="video/mp4">
            </video>
            <div id="bloc_title_video">
              <p class="title_video">${mediaItem.title}</p>
              <div>
                <span class="likes-quantity">${mediaItem.likes}</span>
                <button class="like-button" data-liked="false">❤️</button>
              </div>
            </div>
          </div>
        `;
        }
        return ""; // Gérer d'autres types si nécessaire
      })
      .join("");

    // Ré-attacher les écouteurs d'événements pour les boutons "j'aime"
    const likeButtons = boxImgSection.querySelectorAll(".like-button");
    likeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const button = event.target;
        const likesQuantitySpan = button.previousElementSibling;
        let likes = parseInt(likesQuantitySpan.textContent, 10);

        if (button.getAttribute("data-liked") === "false") {
          likes += 1;
          button.setAttribute("data-liked", "true");
          button.classList.add("clicked");
        } else {
          likes -= 1;
          button.setAttribute("data-liked", "false");
          button.classList.remove("clicked");
        }

        likesQuantitySpan.textContent = likes;
        // Mettre à jour le nombre total de j'aime si nécessaire
      });
    });

    // Ré-attacher les écouteurs d'événements pour les éléments multimédia
    const mediaItems = boxImgSection.querySelectorAll(
      ".media-item img, .media-item-video video"
    );
    mediaItems.forEach((item, index) => {
      item.addEventListener("click", () =>
        this.showCarousel(index, sortedMedia)
      );
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.showCarousel(index, sortedMedia);
        }
      });
    });
  }
}
