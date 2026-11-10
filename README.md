# Allround Events

Een compacte, responsive eventhub in gewone HTML, CSS en JavaScript. `index.html` toont het eventoverzicht. Iedere case heeft een eigen besloten-look eventpagina:

- `woonwaard.html` — Woonwaard Eindejaarsfeest
- `winterlicht.html` — winteravond voor Borealis Works
- `future-forward.html` — bedrijfssummit voor Northstar Labs
- `summer-social.html` — teamfestival voor Coastline Collective

## Lokaal bekijken

Open `index.html` direct in de browser of start een eenvoudige webserver:

```bash
python3 -m http.server 4173
```

Open daarna `http://localhost:4173`.

## Mijn events-link instellen

Vervang in `site-config.js` de tijdelijke dashboard-URL's:

```js
window.ALLROUND_SITE_CONFIG = {
  dashboardUrls: {
    general: "https://jouw-echte-sso-pagina.nl",
    woonwaard: "https://jouw-echte-sso-pagina.nl/woonwaard-2026",
    winterlicht: "https://jouw-echte-sso-pagina.nl/winterlicht-2027",
    future: "https://jouw-echte-sso-pagina.nl/future-forward-2027",
    summer: "https://jouw-echte-sso-pagina.nl/summer-social-2027",
  },
};
```

De algemene knoppen gebruiken `general`; iedere eventpagina gebruikt de gelijknamige event-URL. De website zelf bevat geen Microsoft- of SSO-authenticatiecode.
