const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const loginModal = document.querySelector("#login-modal");
const portalModal = document.querySelector("#portal-modal");
const loginForm = document.querySelector("#login-form");
const formMessage = document.querySelector("[data-form-message]");
const toast = document.querySelector("[data-toast]");

const storage = {
  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The experience still works when browser storage is unavailable.
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore blocked storage.
    }
  },
};

let currentUser = storage.get("allroundEventsUser");
let isRegistered = storage.get("allroundEventsRegistered", false);
let toastTimer;

function setBodyModalState() {
  document.body.classList.toggle("modal-open", Boolean(document.querySelector("dialog[open]")));
}

function openDialog(dialog) {
  if (!dialog) return;
  document.querySelectorAll("dialog[open]").forEach((openModal) => {
    if (openModal !== dialog) openModal.close();
  });
  if (!dialog.open) dialog.showModal();
  setBodyModalState();
}

function closeDialog(dialog) {
  if (dialog?.open) dialog.close();
  setBodyModalState();
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3500);
}

function getFirstName(email) {
  const localPart = email.split("@")[0] || "";
  const cleanName = localPart.split(/[._-]/)[0].replace(/\d+/g, "");
  return cleanName ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1) : "";
}

function updatePortal() {
  const firstName = currentUser ? getFirstName(currentUser.email) : "";
  document.querySelectorAll("[data-user-firstname]").forEach((element) => {
    element.textContent = firstName;
  });
  document.querySelectorAll("[data-user-email]").forEach((element) => {
    element.textContent = currentUser?.email || "je e-mailadres";
  });

  const registerButton = document.querySelector("[data-register]");
  const cancelButton = document.querySelector("[data-cancel-registration]");
  const confirmation = document.querySelector("[data-confirmation]");
  const status = document.querySelector("[data-event-status]");

  if (registerButton) registerButton.hidden = isRegistered;
  if (cancelButton) cancelButton.hidden = !isRegistered;
  if (confirmation) confirmation.hidden = !isRegistered;
  if (status) {
    status.textContent = isRegistered ? "Aangemeld" : "Uitgenodigd";
    status.classList.toggle("registered", isRegistered);
  }
}

function openAccount() {
  if (currentUser) {
    updatePortal();
    openDialog(portalModal);
  } else {
    openDialog(loginModal);
    window.setTimeout(() => document.querySelector("#email")?.focus(), 50);
  }
}

document.querySelectorAll("[data-open-login]").forEach((button) => {
  button.addEventListener("click", openAccount);
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (clickedOutside) closeDialog(dialog);
  });
  dialog.addEventListener("close", setBodyModalState);
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  if (!loginForm.checkValidity()) {
    formMessage.textContent = "Vul een geldig e-mailadres en minimaal 4 tekens als wachtwoord in.";
    loginForm.reportValidity();
    return;
  }

  const formData = new FormData(loginForm);
  currentUser = { email: String(formData.get("email")).trim() };
  storage.set("allroundEventsUser", currentUser);
  updatePortal();
  closeDialog(loginModal);
  openDialog(portalModal);
  loginForm.reset();
});

document.querySelector("[data-toggle-password]")?.addEventListener("click", (event) => {
  const passwordInput = document.querySelector("#password");
  const button = event.currentTarget;
  const shouldShow = passwordInput.type === "password";
  passwordInput.type = shouldShow ? "text" : "password";
  button.setAttribute("aria-label", shouldShow ? "Wachtwoord verbergen" : "Wachtwoord tonen");
});

document.querySelector("[data-demo-help]")?.addEventListener("click", () => {
  formMessage.textContent = "Voor deze demo kun je ieder geldig e-mailadres gebruiken met een wachtwoord van minimaal 4 tekens.";
});

document.querySelector("[data-register]")?.addEventListener("click", () => {
  isRegistered = true;
  storage.set("allroundEventsRegistered", true);
  updatePortal();
  showToast("Gelukt! Je bent aangemeld voor het Woonwaard Eindejaarsfeest.");
});

document.querySelector("[data-cancel-registration]")?.addEventListener("click", () => {
  isRegistered = false;
  storage.set("allroundEventsRegistered", false);
  updatePortal();
  showToast("Je aanmelding is geannuleerd. Je kunt je altijd opnieuw aanmelden.");
});

document.querySelector("[data-logout]")?.addEventListener("click", () => {
  currentUser = null;
  storage.remove("allroundEventsUser");
  closeDialog(portalModal);
  showToast("Je bent uitgelogd.");
});

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

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 30);
}

function updateCountdown() {
  const target = new Date("2026-12-17T17:30:00+01:00").getTime();
  const difference = Math.max(0, target - Date.now());
  const days = Math.floor(difference / 86_400_000);
  const hours = Math.floor((difference % 86_400_000) / 3_600_000);
  const minutes = Math.floor((difference % 3_600_000) / 60_000);

  document.querySelector("[data-days]").textContent = String(days).padStart(2, "0");
  document.querySelector("[data-hours]").textContent = String(hours).padStart(2, "0");
  document.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, "0");
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
updateCountdown();
window.setInterval(updateCountdown, 60_000);
updatePortal();
