# Allround Events

Een responsive Allround Events-website in gewone HTML, CSS en JavaScript. De openbare website bevat een preview van het Woonwaard Eindejaarsfeest. Persoonlijke uitnodigingen en registratie staan achter Microsoft Entra SSO.

## Lokaal bekijken

Open `index.html` direct in de browser of start een eenvoudige webserver:

```bash
python3 -m http.server 4173
```

Open daarna `http://localhost:4173`.

## Microsoft SSO configureren

1. Maak in het Microsoft Entra-beheercentrum een app-registratie voor een **Single-page application (SPA)**.
2. Kies accounts in één organisatiemap of accounts in iedere organisatiemap, afhankelijk van de gewenste toegang.
3. Voeg de live URL en `http://localhost:4173/` toe als redirect URI.
4. Kopieer de Application (client) ID naar `auth-config.js`.
5. Gebruik `organizations` als tenant voor alle werk-/schoolaccounts, of vul één Directory (tenant) ID in.

De website gebruikt de officiële Microsoft Authentication Library for JavaScript (`MSAL Browser 2.35.0`) als lokaal meegeleverde asset.

## Productiekoppelingen

De front-end toont events pas na een geldige Microsoft-sessie. Voor echte toegangscontrole moeten uitnodigingen en registraties vanuit een beveiligde API worden geladen die het Microsoft-token server-side controleert. In deze preview wordt de registratiestatus per account alleen lokaal opgeslagen.

Het contactformulier is bewust nog niet aan een mailbox of CRM gekoppeld en communiceert dat ook in de interface.
test
