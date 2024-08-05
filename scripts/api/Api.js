/**
 * Classe représentant une API.
 */
class Api {
  /**
   * Crée une instance de Api.
   * @param {string} url - L'URL de l'API.
   */
  constructor(url) {
    this._url = url;
  }

  /**
   * Effectue une requête GET à l'API.
   * @returns {Promise<Object>} Une promesse qui se résout avec les données de l'API.
   */
  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => console.log("an error occurs", err));
  }
}
