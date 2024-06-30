class UrlPhotographer {
  getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    return Number(id);
  }
}
