/**
 * Classe pour gérer les données des photographes et des médias.
 */

class PhotographerModel {
  /**
   * Crée une instance de PhotographerModel.
   * @param {Object} data - Les données à utiliser pour initialiser les instances de Photographer et Media.
   * @param {Object[]} data.photographers - La liste des photographes.
   * @param {Object[]} data.media - La liste des médias associés aux photographes.
   */
  constructor(data) {
    this.photographers = data.photographers.map(
      (photographer) => new Photographer(photographer)
    );
    this.media = data.media.map((media) => new Media(media));
  }

  getPhotographers() {
    return this.photographers;
  }

  getMediaByPhotographerId(photographerId) {
    return this.media.filter(
      (media) => media.photographerId === photographerId
    );
  }
}

const fetchData = new PhotographerApi("scripts/db/photographers.json");

async function displayPhotographerData(photographerModel, userId) {
  const photographersSection = document.querySelector(".photographer_section");

  // Ajouter les cartes de chaque photographe
  photographerModel.getPhotographers().forEach((photographer) => {
    const photographerModel = new PhotographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    if (photographersSection) photographersSection.appendChild(userCardDOM);
  });
}

async function displayProfilUser(photographerModel, userId) {
  let findUser = photographerModel.photographers.find(
    (photographer) => photographer.id === userId
  );

  if (!findUser) {
    const mediaUser = photographerModel.media.find(
      (mediaItem) => mediaItem.photographerId === userId
    );
    if (mediaUser) {
      findUser = photographerModel.photographers.find(
        (photographer) => photographer.id === mediaUser.photographerId
      );
      findUser = { ...findUser, media: mediaUser };
    }
  }

  if (findUser) {
    new ProfilUser(findUser, photographerModel).getUserProfilElement();
  }
}

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = parseInt(urlParams.get("id"));
  const photographerModel = await fetchData.fetchData();
  if (photographerModel) {
    displayProfilUser(photographerModel, userId);
    displayPhotographerData(photographerModel, userId);
  }
}

init();
