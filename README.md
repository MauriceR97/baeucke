# Malwettbewerb — Interliving Bäucke

Zwei Landingpages für den Bäucke-Malwettbewerb 2026, aufgebaut auf dem Bäucke-Designsystem.

## Adressen

| Seite | URL | Zweck |
|---|---|---|
| Einsendung | `/aktion/malwettbewerb/teilnahme/` | Wettbewerb vorstellen, Ausmalbild herunterladen, fertiges Bild hochladen |
| Abstimmung | `/aktion/malwettbewerb/abstimmen/` | Galerie aller Bilder, Stimmabgabe, Verlosung 100-€-Gutschein |

Beide Seiten liegen als `index.html` in ihrem Ordner. Webserver liefern diese
automatisch aus, deshalb steht **kein `index.html` in der Adresse**.

Der Aufruf der Startadresse `/` leitet ohne Zwischenseite direkt zur
Teilnahme-Seite weiter.

## Lokal ansehen

Die Seiten laden JSX über Babel im Browser und brauchen einen Webserver
(ein Doppelklick auf die HTML-Datei reicht nicht):

```bash
python3 -m http.server 8000
# dann http://localhost:8000/aktion/malwettbewerb/teilnahme/ öffnen
```

## Veröffentlichen (GitHub Pages)

1. Repository anlegen und diesen Ordner pushen.
2. **Settings → Pages → Source: Deploy from a branch**, Branch `main`, Ordner `/ (root)`.
3. Die Seiten sind dann erreichbar unter:
   `https://<user>.github.io/<repo>/aktion/malwettbewerb/teilnahme/`

Die Datei `.nojekyll` verhindert, dass GitHub Pages Dateien mit Unterstrich
(`_ds_bundle.js`) ignoriert – bitte nicht löschen.

**Hinweis:** Auf GitHub Pages liegt alles unterhalb des Repo-Namens. Für die
Adresse ohne Repo-Namen (`baeucke.de/aktion/malwettbewerb/teilnahme/`) tragen Sie
unter Settings → Pages eine eigene Domain ein oder laden den Inhalt direkt in das
entsprechende Verzeichnis Ihres Webservers.

## Aufbau

```
index.html                             Weiterleitung auf die Teilnahme-Seite
styles.css                             Einstiegspunkt des Designsystems
tokens/                                Farben, Typografie, Abstände, Radien, Schatten
_ds_bundle.js                          Kompilierte UI-Komponenten (Button, Input, Card …)
assets/logos/                          Logo in drei Varianten (gelb, grau, weiss)
aktion/malwettbewerb/teilnahme/        Einsende-Seite (+ eigener assets-Ordner)
aktion/malwettbewerb/abstimmen/        Abstimmungs-Seite (+ eigener assets-Ordner)
docs/                                  Google-Sheets-Tabellen, Apps Script, Anleitungen
```

Pro Seite gilt: `lib.jsx` enthält Daten und Hilfsfunktionen, `sections.jsx` die
Seitenabschnitte, `index.html` setzt alles zusammen.

## Formulare scharf schalten

Beide Formulare laufen ohne Konfiguration als Prototyp (Validierung und
Erfolgsmeldung, ohne zu speichern). Für den Echtbetrieb:

**Einsendungen** — `docs/malwettbewerb/Google-Sheets-Anleitung.md` befolgen, dann in
`aktion/malwettbewerb/teilnahme/UploadForm.jsx`:

```js
const SHEET_ENDPOINT = ''; // <-- /exec-URL hier
```

**Abstimmung** — `docs/abstimmung/Google-Sheets-Anleitung.md` befolgen, dann in
`aktion/malwettbewerb/abstimmen/Gallery.jsx`:

```js
const VOTE_ENDPOINT = ''; // <-- /exec-URL hier
```

## Bild-Uploads

Die hochgeladenen Bilder landen in dem Google-Drive-Ordner, dessen ID im Apps
Script hinterlegt ist; der Link dazu wird in die Tabelle geschrieben.

Jedes Foto wird **schon im Browser verkleinert**, bevor es hochgeht: max. 2000 px
lange Kante, rund 1 MB. Ohne diesen Schritt würden heutige Handyfotos (5–12 MB)
Apps Script überlasten und der Upload bräche ab. Anpassbar oben in
`aktion/malwettbewerb/teilnahme/UploadForm.jsx`:

```js
const MAX_KANTE = 2000;
const ZIEL_BYTES = 1024 * 1024;
```

Formate, die der Browser nicht verarbeiten kann (z. B. HEIC von iPhones), werden
unverändert durchgereicht.

## Bilder der Einsendungen pflegen

Die Galerie liest die Einsendungen aus `EINSENDUNGEN` in
`aktion/malwettbewerb/abstimmen/lib.jsx`:

```js
{ id: 'e01', vorname: 'Mia', alter: 7, stimmen: 0, bildLink: 'https://drive.google.com/…' }
```

Google-Drive-Links werden automatisch in ein anzeigbares Format umgewandelt.

## Offene Punkte

- **Datenschutzerklärung**: Der Link `#datenschutz` in den Formularen zeigt noch ins Leere.
- **Stimmenstand**: Wird von Hand in `lib.jsx` gepflegt, keine Live-Verbindung zur Tabelle.
- **Schriften und Icons** werden von Google Fonts bzw. unpkg geladen.
