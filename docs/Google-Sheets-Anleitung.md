# Einrichtung: Google-Tabelle verbinden

Beide Seiten (Einsendung und Abstimmung) arbeiten mit **einer** Tabelle und
**einem** Apps Script. Sie richten es also nur einmal ein.

Die fertige Tabelle liegt unter:
https://docs.google.com/spreadsheets/d/1xeyz5q568CeI_kyYY6fm6Cg7wDnjI8qoZFTWymr1O6g/

---

## 1. Spalten prüfen

**Blatt A – Einsendungen.** Diese Spaltenüberschriften werden gebraucht:

| Spalte | Zweck |
|---|---|
| Zeitstempel | wird automatisch gesetzt |
| **Bild-ID** | verbindet Bild und Stimmen (e001, e002 …) |
| Vorname Kind | wird in der Galerie angezeigt |
| Name Erziehungsberechtigte:r | Kontakt |
| E-Mail / Telefon | Gewinnbenachrichtigung |
| Bild-Link | Google-Drive-Link zum Bild |
| Einwilligung Datenschutz / Veröffentlichung | aus dem Formular |
| Stimmen | Zähler, wird automatisch erhöht |
| **Freigabe** | „Ja" = Bild erscheint in der Galerie |
| Status | für Ihre eigene Übersicht |

Die beiden **fett** markierten Spalten fehlen aktuell noch. Sie müssen sie nicht
von Hand anlegen – das Skript ergänzt sie beim ersten Lauf automatisch am Ende
der Kopfzeile. Wenn Sie sie lieber selbst an eine passende Stelle setzen: Die
Reihenfolge ist egal, das Skript arbeitet über die Überschriften.

**Blatt B – Abstimmende.** Hier passt bereits alles:
Zeitstempel · Bild-ID · Bild (Kind) · Vorname · Nachname · E-Mail · Telefon ·
PLZ · Möbelwunsch · Datenschutz · E-Mail-Werbung · Verlosung Gewinner

---

## 2. Drive-Ordner für die Bilder

In Google Drive einen Ordner anlegen (z. B. „Malwettbewerb Bilder"), öffnen und
die ID aus der Adresse kopieren:
`https://drive.google.com/drive/folders/` **`DIESE_ID`**

---

## 3. Apps Script einrichten

1. Tabelle öffnen → **Erweiterungen → Apps Script**
2. Den kompletten Inhalt von `google-apps-script.gs` einfügen und speichern
3. Oben bei `DRIVE_ORDNER_ID` die eben kopierte Ordner-ID eintragen
4. **Bereitstellen → Neue Bereitstellung → Web-App**
   - *Ausführen als:* **Ich**
   - *Zugriff:* **Jeder**
5. Bereitstellen, Berechtigungen bestätigen, die **Web-App-Adresse** kopieren
   (endet auf `/exec`)

---

## 4. Adresse in die Seiten eintragen

Dieselbe `/exec`-Adresse kommt an drei Stellen:

```js
// aktion/malwettbewerb/teilnahme/UploadForm.jsx
const SHEET_ENDPOINT = '';   // Bild-Einsendungen speichern

// aktion/malwettbewerb/abstimmen/Gallery.jsx
const VOTE_ENDPOINT = '';    // Stimmen entgegennehmen

// aktion/malwettbewerb/abstimmen/lib.jsx
const DATEN_URL = '';        // Bilder + Stimmenstand laden
```

Solange die Felder leer sind, laufen die Seiten im Testmodus (Validierung und
Erfolgsmeldung, ohne zu speichern).

---

## 5. Bilder freigeben

Neue Einsendungen bekommen automatisch `Freigabe = Nein` und erscheinen **nicht**
in der Galerie. Nach Ihrer Prüfung setzen Sie den Wert auf **Ja** – dann ist das
Bild öffentlich sichtbar und kann gewählt werden.

---

## Datenschutz

Die Tabelle bleibt **privat**. Bitte **nicht** über „Datei → Im Web
veröffentlichen" freigeben – damit wären alle Spalten inklusive Elternnamen,
E-Mail und Telefon öffentlich abrufbar.

Die Galerie holt ihre Daten über das Apps Script. Es läuft mit Ihren Rechten und
gibt ausschließlich die Felder heraus, die ohnehin auf der Seite stehen:
**Bild-ID, Vorname des Kindes, Bild-Link, Stimmenzahl.** Kontaktdaten
verlassen die Tabelle nie – auch nicht für jemanden, der die Adresse im
Quelltext der Seite findet.

Die Bilder selbst liegen in Drive und werden beim Upload auf „Jeder mit dem
Link" gestellt, damit sie angezeigt werden können. Über die Spalte `Freigabe`
steuern Sie, welche davon tatsächlich auf der Seite erscheinen.

**Doppelte Stimmen** werden anhand der E-Mail-Adresse verhindert.

---

## Verlosung ziehen

Gewinner:in unter allen Abstimmenden zufällig ermitteln – in einer freien Zelle
von Blatt B:

```
=INDEX(F2:F;RANDBETWEEN(1;ANZAHL2(F2:F)))
```
