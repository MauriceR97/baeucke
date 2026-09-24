# Malwettbewerb — Interliving Bäucke

| Seite | URL | Zeitraum |
|---|---|---|
| Einsendung | `/aktion/malwettbewerb/teilnahme/` | bis 31.10.2026 |
| Abstimmung | `/aktion/malwettbewerb/abstimmen/` | bis 14.11.2026 |

Beide liegen als `index.html` in ihrem Ordner – deshalb steht **kein** `index.html`
in der Adresse. Der Aufruf von `/` leitet direkt zur Teilnahme-Seite weiter.

## Einrichtung

Anleitung: `docs/Google-Sheets-Anleitung.md`. Ein Apps Script für beide Seiten,
eine `/exec`-Adresse – einzutragen an drei Stellen:

```js
// aktion/malwettbewerb/teilnahme/UploadForm.js
const SHEET_ENDPOINT = '';   // Bild-Einsendungen speichern
// aktion/malwettbewerb/abstimmen/Gallery.js
const VOTE_ENDPOINT = '';    // Stimmen entgegennehmen
// aktion/malwettbewerb/abstimmen/lib.js
const DATEN_URL = '';        // Bilder + Stimmenstand laden
```

## Datenschutz

Die Google-Tabelle bleibt **privat**. Die Galerie holt ihre Daten über das Apps
Script, das **nur** Bild-ID, Vorname des Kindes, Bild-Link und Stimmenzahl
herausgibt. Neue Einsendungen stehen auf `Freigabe = Nein` und erscheinen erst
nach Freigabe. Datenschutz und Impressum sind auf `baeucke.de` verlinkt.

## Formulare

Alle Felder unterstützen Browser-Autofill (Name, E-Mail, Telefon, PLZ). Fotos
werden vor dem Upload im Browser auf max. 2000 px / ~1 MB verkleinert.

## Veröffentlichen

Inhalt ins Webroot legen bzw. GitHub Pages (Branch `main`, Ordner `/`).
`.nojekyll` nicht löschen.
