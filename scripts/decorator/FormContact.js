class FormContact {
  showContactForm() {
    const contactFormContainer = document.querySelector(
      "#contact-form-container"
    );
    contactFormContainer.innerHTML = this.displayForm();
    document.body.classList.add(this.overlayClass);
    const closeButton = document.querySelector("#close-form");
    closeButton.addEventListener("click", () => this.closeContactForm());
    const form = document.querySelector("#contact-form");
    form.addEventListener("submit", (event) => this.handleSubmit(event));
    document.addEventListener("click", this.handleClickOutsideForm);
  }

  displayForm() {
    return `
      <section class="contact-box">
        <legen class='title'>
          <h2>Contactez-moi<br/>${this.name}</h2>
          <p id="close-form" aria-label="Fermer le formulaire">×</p>
        </legen>
        <form id="contact-form" aria-describedby="contact-form-description">
          <legend class="form-group">
            <label for="prenom">Prénom:</label>
            <input type="text" id="prenom" name="prenom" required aria-labelledby="prenom">
          </legend>
          <legend class="form-group">
            <label for="nom">Nom:</label>
            <input type="text" id="nom" name="nom" required aria-labelledby="nom">
          </legend>
          <legend class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required aria-labelledby="email">
          </legend>
          <legend class="form-group">
            <label for="message">Votre message:</label>
            <textarea id="message" name="message" rows="5" required aria-labelledby="message"></textarea>
          </legend>
          <button type="submit">Envoyer</button>
        </form>

      </section>
    `;
  }

  closeContactForm() {
    const contactFormContainer = document.querySelector(
      "#contact-form-container"
    );
    contactFormContainer.innerHTML = "";
    document.body.classList.remove(this.overlayClass);
    document.removeEventListener("click", this.handleClickOutsideForm);
  }

  handleClickOutsideForm(event) {
    const contactForm = document.querySelector(".contact-box");
    if (!contactForm.contains(event.target)) {
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const firstName = document.getElementById("prenom").value.trim();
    const lastName = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!firstName || !lastName || !email || !message) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }
    console.log(firstName + " " + lastName + " " + email);

    this.closeContactForm();
  }
}
