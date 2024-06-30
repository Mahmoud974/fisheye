class Photographer {
  constructor({ name, country, city, tagline, price, id }) {
    this.name = name;
    this.country = country;
    this.city = city;
    this.tagline = tagline;
    this.price = price;
    this.id = id;
  }
}

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
