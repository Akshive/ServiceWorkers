// make sure service workers are supported

if (navigator.serviceWorker) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw_cached_site.js")
      .then((reg) => console.log("sw registered", reg))
      .catch((err) => console.log(err));
  });
}
