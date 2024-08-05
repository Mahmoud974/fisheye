/**
 * Classe représentant une API spécifique aux photographes.
 * @extends Api
 */

class PhotographerApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getMovies() {
    return await this.get();
  }

  async fetchData() {
    try {
      const response = await fetch(this._url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Assuming PhotographerModel is a class you want to use to model the data
      return new PhotographerModel(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      return null;
    }
  }
}
