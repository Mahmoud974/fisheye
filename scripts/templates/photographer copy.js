class PhotographerTemplate extends Photographer {
  constructor(data) {
    super(data);
    this.picture = `/assets/photographers/profil/${this.id}.png`;
  }

  getUserCardDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
      <a href="./photographer.html?id=${this.id}">
        <img src="${this.picture}" alt="${this.name} portrait">
      </a>
      <h2>${this.name}</h2>
      <p class='city'>${this.city}, ${this.country}</p>
      <p class='tagline'>${this.tagline}</p>
      <p class="price">${this.price}€/jour</p>
    `;

    return article;
  }
}
