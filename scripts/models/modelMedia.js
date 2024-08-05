/**
 * Les Classe représentant des instances, les média (image ou vidéo) d'un photographe.
 */
class Media {
  constructor({ photographerId, title, image, video, likes, date, price }) {
    this.photographerId = photographerId;
    this.image = image;
    this.video = video;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.title = title;
  }
}
