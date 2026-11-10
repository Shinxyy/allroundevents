const siteConfig = window.ALLROUND_SITE_CONFIG || {};
const dashboardUrls = siteConfig.dashboardUrls || {};

document.querySelectorAll("[data-dashboard-link]").forEach((link) => {
  const eventKey = link.dataset.dashboardLink || "general";
  link.href = dashboardUrls[eventKey] || dashboardUrls.general || "https://mijn-events.example.com";
});
