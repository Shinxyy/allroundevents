# Allround Events

Een compacte, responsive eventhub in gewone HTML, CSS en JavaScript. `index.html` toont het eventoverzicht; `woonwaard.html` is de eigen besloten-look eventpagina voor het Woonwaard Eindejaarsfeest.

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
  },
};
```

De algemene knoppen gebruiken `general`; de call-to-action op de Woonwaard-pagina gebruikt de event-specifieke `woonwaard`-URL. De website zelf bevat geen Microsoft- of SSO-authenticatiecode.
