/**
 * Classe pour extraire des informations depuis l'URL de la page.
 */
class UrlPhotographer {
  /**
   * Récupère l'identifiant du photographe à partir des paramètres de l'URL.
   * @returns {number} L'identifiant du photographe extrait de l'URL. Retourne NaN si l'identifiant n'est pas présent ou n'est pas un nombre.
   */
  getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    return Number(id);
  }
}
