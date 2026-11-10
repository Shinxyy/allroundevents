# Allround Events

Een responsive Allround Events-website in gewone HTML, CSS en JavaScript. De openbare website bevat een preview van het Woonwaard Eindejaarsfeest en verwijst bezoekers door naar een externe Mijn events/SSO-pagina.

## Lokaal bekijken

Open `index.html` direct in de browser of start een eenvoudige webserver:

```bash
python3 -m http.server 4173
```

Open daarna `http://localhost:4173`.

## Mijn events-link instellen

Vervang in `site-config.js` de tijdelijke URL:

```js
window.ALLROUND_SITE_CONFIG = {
  myEventsUrl: "https://jouw-echte-sso-pagina.nl",
};
```

Alle knoppen naar Mijn events gebruiken automatisch deze ene URL. De website zelf bevat geen Microsoft- of SSO-authenticatiecode.

Het contactformulier is bewust nog niet aan een mailbox of CRM gekoppeld en communiceert dat ook in de interface.
