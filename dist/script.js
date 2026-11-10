const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const toast = document.querySelector("[data-toast]");
const siteConfig = window.ALLROUND_SITE_CONFIG || {};
let toastTimer;

document.querySelectorAll("[data-events-link]").forEach((link) => {
  link.href = siteConfig.myEventsUrl || "https://mijn-events.example.com";
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3500);
}

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.querySelector(".sr-only").textContent = isOpen ? "Menu sluiten" : "Menu openen";
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("[data-contact-message]").textContent =
    "Bedankt! Voor live gebruik moet dit formulier nog aan de Allround Events-mailbox worden gekoppeld.";
  showToast("Formulier gecontroleerd — de mailboxkoppeling ontbreekt nog.");
});

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
