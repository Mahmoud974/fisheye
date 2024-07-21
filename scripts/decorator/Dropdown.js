class Dropdown {
  constructor() {}

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
        <legend class="box">
          <div>
            <h1>${this.name}</h1>
            <p>${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
          </div>
          <button id="contact-button" aria-label="Ouvrir le formulaire de contact">Contactez-moi</button>
          <img src="${this.picture}" alt="Portrait de ${this.name}">
        </legend>
        <div class="sort">
          <p>Trier par</p>
          <nav id="sort-dropdown" class="dropdown" role="navigation" aria-haspopup="true">
         
            <div class="dropdown-content" id="sort-menu" role="menu" aria-hidden="true">
              <ul>
                <li role="menuitem"><a href="#" data-sort="date">Date</a></li>
                <li role="menuitem"><a href="#" data-sort="title">Titre</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <section class="box_img" aria-live="polite">
          ${mediaHtml}
        </section>
        <div id="contact-form-container"></div>
        <div class="fixed-right">
          <div class="rectangle">
            <p id="total-likes" aria-live="polite">${this.totalLikes} <span><img src="/assets/icons/heart.png" alt="icone coeur" id="heart" /></span></p>
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

    const dropdownButton = article.querySelector(".dropbtn");
    const sortMenu = article.querySelector("#sort-menu");

    dropdownButton.addEventListener("click", () => {
      const isExpanded =
        dropdownButton.getAttribute("aria-expanded") === "true" || false;
      dropdownButton.setAttribute("aria-expanded", !isExpanded);
      sortMenu.setAttribute("aria-hidden", isExpanded);
    });

    const sortOptions = article.querySelectorAll("#sort-dropdown a");
    sortOptions.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.preventDefault();
        const sortBy = event.target.getAttribute("data-sort");
        this.sortMedia(sortBy, media);
        dropdownButton.setAttribute("aria-expanded", "false");
        sortMenu.setAttribute("aria-hidden", "true");
      });
    });

    this.attachMediaEvents(media);

    return article;
  }
}
