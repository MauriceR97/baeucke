# Malwettbewerb — Interliving Bäucke

| Seite | URL |
|---|---|
| Einsendung | `/aktion/malwettbewerb/teilnahme/` |
| Abstimmung | `/aktion/malwettbewerb/abstimmen/` |

Beide liegen als `index.html` in ihrem Ordner – deshalb steht **kein** `index.html`
in der Adresse. Der Aufruf von `/` leitet direkt zur Teilnahme-Seite weiter.

## Einrichtung

Anleitung: `docs/Google-Sheets-Anleitung.md`. Ein Apps Script für beide Seiten,
eine Bereitstellung, eine `/exec`-Adresse – einzutragen an drei Stellen:

```js
// aktion/malwettbewerb/teilnahme/UploadForm.js
const SHEET_ENDPOINT = '';   // Bild-Einsendungen speichern

// aktion/malwettbewerb/abstimmen/Gallery.js
const VOTE_ENDPOINT = '';    // Stimmen entgegennehmen

// aktion/malwettbewerb/abstimmen/lib.js
const DATEN_URL = '';        // Bilder + Stimmenstand laden
```

Solange die Felder leer sind, laufen die Formulare im Testmodus (Validierung und
Erfolgsmeldung, ohne zu speichern).

## Galerie-Zustände

Die Abstimmungsseite zeigt, solange kein Bild freigegeben ist, ein Platzhalter-Feld
(„Hier erscheinen bald die eingereichten Werke“). Es verschwindet automatisch, sobald
in der Tabelle das erste Bild auf `Freigabe = Ja` steht. Eine leere Tabelle ist kein
Fehler – die rote Warnung erscheint nur, wenn die Tabelle wirklich nicht erreichbar ist.

## Datenschutz

Die Google-Tabelle bleibt **privat** und darf **nicht** über „Datei → Im Web
veröffentlichen“ freigegeben werden – sonst wären Elternnamen, E-Mail-Adressen
und Telefonnummern öffentlich abrufbar.

Die Galerie holt ihre Daten über das Apps Script, das mit Ihren Rechten läuft und
**nur** die öffentlichen Felder herausgibt: Bild-ID, Vorname des Kindes,
Bild-Link und Stimmenzahl. Kontaktdaten verlassen die Tabelle nie.

Neue Einsendungen stehen auf `Freigabe = Nein` und erscheinen **nicht** in der
Galerie. Erst wenn Sie den Wert auf „Ja“ setzen, wird das Bild öffentlich.
Vom Kind wird ausschließlich der **Vorname** veröffentlicht.

Datenschutz und Impressum sind auf `baeucke.de` verlinkt.

## Google-Rezensionen

Beide Seiten binden das Elfsight-Widget ein (App-ID `83aa18aa-…`). Das Skript
wird einmalig geladen, `async` und mit Lazy-Loading.

## Lokal ansehen

```bash
python3 -m http.server 8000
# dann http://localhost:8000/aktion/malwettbewerb/teilnahme/ öffnen
```

## Veröffentlichen (GitHub Pages)

1. Repository anlegen und diesen Ordner pushen.
2. **Settings → Pages → Source: Deploy from a branch**, Branch `main`, Ordner `/ (root)`.

`.nojekyll` verhindert, dass Pages Dateien mit Unterstrich (`_ds_bundle.js`)
ignoriert – bitte nicht löschen.

Für die Adresse ohne Repo-Namen (`baeucke.de/aktion/malwettbewerb/teilnahme/`)
unter Settings → Pages eine eigene Domain eintragen oder den Inhalt direkt in das
entsprechende Verzeichnis Ihres Webservers laden.

## Aufbau

```
index.html                        Weiterleitung auf die Teilnahme-Seite
styles.css  tokens/               Designsystem (Farben, Typografie, Abstände)
_ds_bundle.js                     UI-Komponenten (Button, Input, Card …)
assets/logos/                     Logo in drei Varianten
aktion/malwettbewerb/teilnahme/   Einsende-Seite
aktion/malwettbewerb/abstimmen/   Abstimmungs-Seite
docs/                             Apps Script + Anleitung
```

Pro Seite: `lib.js` = Daten und Helfer, `sections.js` = Abschnitte,
`index.html` setzt alles zusammen. Das JSX ist vorab übersetzt, im Browser läuft
kein Babel.

## Bild-Uploads

Jedes Foto wird **im Browser verkleinert**, bevor es hochgeht: max. 2000 px lange
Kante, rund 1 MB. Anpassbar oben in `teilnahme/UploadForm.js`:

```js
const MAX_KANTE = 2000;
const ZIEL_BYTES = 1024 * 1024;
```
