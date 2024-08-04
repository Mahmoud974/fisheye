/**
 * Classe représentant le modèle de carte utilisateur pour un photographe, héritant de la classe Photographer.
 * @extends Photographer
 */
class PhotographerTemplate extends Photographer {
  /**
   * Crée une instance de PhotographerTemplate.
   * @param {Object} data - Les données du photographe.
   */
  constructor(data) {
    super(data);
    this.picture = `/assets/photographers/profil/${this.id}.png`;
  }

  /**
   * Crée et retourne l'élément HTML de la carte utilisateur du photographe.
   * @returns {HTMLElement} L'article HTML représentant la carte du photographe.
   */
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
