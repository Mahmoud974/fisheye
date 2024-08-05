/**
 * Classe représentant un formulaire de contact.
 */
class FormContact {
  /**
   * Crée une instance de FormContact.
   * @param {string} name - Le nom de la personne à contacter.
   */
  constructor(name) {
    this.name = name;
    this.overlayClass = "overlay-visible"; // Classe CSS pour l'arrière-plan opaque blanc
  }

  /**
   * Affiche le formulaire de contact.
   */
  showContactForm() {
    const contactFormContainer = document.querySelector(
      "#contact-form-container"
    );
    contactFormContainer.innerHTML = this.displayForm();

    document.body.classList.add(this.overlayClass);

    const closeButton = document.querySelector("#close-form");
    closeButton.addEventListener("click", () => this.closeContactForm());

    closeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === "Escape") {
        this.closeContactForm();
      }
    });

    const form = document.querySelector("#contact-form");
    form.addEventListener("submit", (event) => this.handleSubmit(event));

    document.addEventListener("click", this.handleClickOutsideForm);

    const firstNameInput = document.getElementById("prenom");
    if (firstNameInput) {
      firstNameInput.focus();
    }

    form.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        const focusableElements = form.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        let index = Array.prototype.indexOf.call(
          focusableElements,
          event.target
        );
        if (index === focusableElements.length - 1) {
          closeButton.focus();
          event.preventDefault();
        }
      }
    });
  }

  /**
   * Retourne le formulaire de contact au format HTML.
   * @returns {string} Le formulaire de contact en HTML.
   */
  displayForm() {
    return `
      <section class="contact-box" tabindex="-1">
        <header class='title'>
          <h2>Contactez-moi<br/>${this.name}</h2>
          <p id="close-form" aria-label="Fermer le formulaire" tabindex="0">×</p>
        </header>
        <form id="contact-form" aria-describedby="contact-form-description">
          <article class="form-group">
            <label for="prenom" >Prénom:</label>
            <input type="text" id="prenom" name="prenom" required aria-required="true" aria-describedby="prenom-description">
          </article>
          <article class="form-group">
            <label for="nom">Nom:</label>
            <input type="text" id="nom" name="nom" required aria-required="true" aria-describedby="nom-description">
          </article>
          <article class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required aria-labelledby="email">
          </article>
          <article class="form-group">
            <label for="message">Votre message:</label>
            <textarea id="message" name="message" rows="5" required aria-required="true" aria-describedby="message-description"></textarea>
          </article>
          <button type="submit">Envoyer</button>
        </form>
      </section>
    `;
  }

  /**
   * Ferme le formulaire de contact.
   */
  closeContactForm() {
    const contactFormContainer = document.querySelector(
      "#contact-form-container"
    );
    contactFormContainer.innerHTML = "";

    // Supprime la classe d'overlay de body
    document.body.classList.remove(this.overlayClass);

    document.removeEventListener("click", this.handleClickOutsideForm);
  }

  /**
   * Gère la soumission du formulaire.
   * @param {Event} event - L'événement de soumission du formulaire.
   */
  handleSubmit(event) {
    event.preventDefault();

    const firstName = document.getElementById("prenom").value.trim();
    const lastName = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!firstName || !lastName || !email || !message) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    } else {
      console.log(firstName + " " + lastName + " " + email + " " + message);
    }
    // Actions à effectuer après la soumission du formulaire (ici, juste fermer le formulaire)
    this.closeContactForm();
  }
}
