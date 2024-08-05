/**
 * Les Classe représentant des instances, les photographes un média (image ou vidéo) d'un photographe.
 */
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
