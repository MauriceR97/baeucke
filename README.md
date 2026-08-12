# Malwettbewerb — Interliving Bäucke

Zwei Landingpages für den Bäucke-Malwettbewerb 2026, aufgebaut auf dem Bäucke-Designsystem.

| Seite | Pfad | Zweck |
|---|---|---|
| Einsendung | `campaigns/malwettbewerb/index.html` | Wettbewerb vorstellen, Ausmalbild herunterladen, fertiges Bild hochladen |
| Abstimmung | `campaigns/abstimmung/index.html` | Galerie aller Bilder, Stimmabgabe, Verlosung 100-€-Gutschein |

## Lokal ansehen

Die Seiten laden JSX über Babel im Browser und brauchen deshalb einen Webserver
(ein Doppelklick auf die HTML-Datei reicht nicht):

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Veröffentlichen (GitHub Pages)

1. Repository anlegen und diesen Ordner pushen.
2. **Settings → Pages → Source: Deploy from a branch**, Branch `main`, Ordner `/ (root)`.
3. Nach ein paar Minuten ist die Seite unter `https://<user>.github.io/<repo>/` erreichbar.

Die Datei `.nojekyll` verhindert, dass GitHub Pages Dateien mit Unterstrich
(`_ds_bundle.js`) ignoriert – bitte nicht löschen.

## Aufbau

```
index.html                  Übersicht mit Links auf beide Seiten
styles.css                  Einstiegspunkt des Designsystems (importiert tokens/)
tokens/                     Farben, Typografie, Abstände, Radien, Schatten
_ds_bundle.js               Kompilierte UI-Komponenten (Button, Input, Card …)
assets/logos/               Logo in drei Varianten (gelb, grau, weiss)
campaigns/malwettbewerb/    Einsende-Seite (index.html, lib.jsx, sections.jsx, UploadForm.jsx)
campaigns/abstimmung/       Abstimmungs-Seite (index.html, lib.jsx, sections.jsx, Gallery.jsx)
docs/                       Google-Sheets-Tabellen, Apps Script und Anleitungen
```

Pro Seite gilt: `lib.jsx` enthält Daten und Hilfsfunktionen, `sections.jsx` die
Seitenabschnitte, `index.html` setzt alles zusammen.

## Formulare scharf schalten

Beide Formulare laufen ohne Konfiguration als Prototyp (Validierung und
Erfolgsmeldung, ohne zu speichern). Für den Echtbetrieb:

**Einsendungen** — `docs/malwettbewerb/Google-Sheets-Anleitung.md` befolgen und die
Web-App-URL eintragen in `campaigns/malwettbewerb/UploadForm.jsx`:

```js
const SHEET_ENDPOINT = ''; // <-- /exec-URL hier
```

**Abstimmung** — `docs/abstimmung/Google-Sheets-Anleitung.md` befolgen und die URL
eintragen in `campaigns/abstimmung/Gallery.jsx`:

```js
const VOTE_ENDPOINT = ''; // <-- /exec-URL hier
```

## Bild-Uploads

Die hochgeladenen Bilder landen in dem Google-Drive-Ordner, dessen ID im Apps
Script hinterlegt ist; der Link dazu wird in die Tabelle geschrieben.

Jedes Foto wird **schon im Browser verkleinert**, bevor es hochgeht: max. 2000 px
lange Kante, rund 1 MB. Ohne diesen Schritt würden heutige Handyfotos (5–12 MB)
Apps Script überlasten und der Upload bräche ab. Die Werte lassen sich oben in
`campaigns/malwettbewerb/UploadForm.jsx` anpassen:

```js
const MAX_KANTE = 2000;
const ZIEL_BYTES = 1024 * 1024;
```

Formate, die der Browser nicht verarbeiten kann (z. B. HEIC von iPhones), werden
unverändert durchgereicht.

## Bilder der Einsendungen pflegen

Die Galerie liest die Einsendungen aus `EINSENDUNGEN` in
`campaigns/abstimmung/lib.jsx`. Pro Kind ein Eintrag mit Vorname, Alter,
Stimmenzahl und dem Bild-Link aus der Upload-Tabelle:

```js
{ id: 'e01', vorname: 'Mia', alter: 7, stimmen: 0, bildLink: 'https://drive.google.com/…' }
```

Google-Drive-Links werden automatisch in ein anzeigbares Format umgewandelt.

## Offene Punkte

- **Datenschutzerklärung**: Der Link `#datenschutz` in den Formularen zeigt noch ins Leere
  und muss auf die echte Seite gesetzt werden.
- **Stimmenstand**: Wird derzeit von Hand in `lib.jsx` gepflegt, es gibt keine
  Live-Verbindung zur Tabelle.
- **Schriften und Icons** werden von Google Fonts bzw. unpkg geladen; für einen
  Betrieb ohne externe Aufrufe müssten sie lokal hinterlegt werden.
