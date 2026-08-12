# Teilnehmerdaten in Google Sheets sammeln

Diese Anleitung verbindet das Upload-Formular der Malwettbewerb-Landingpage mit einer
Google-Tabelle. Danach landet jede Einsendung automatisch als neue Zeile im Sheet,
das Bild wird in einen Google-Drive-Ordner gelegt.

---

## 1. Tabelle anlegen

1. `Teilnehmer-Tabelle.csv` (liegt neben dieser Datei) herunterladen.
2. In Google Drive: **Neu → Google Tabellen → Datei → Importieren** → die CSV auswählen.
3. Die zwei Beispielzeilen löschen – die Kopfzeile bleibt stehen.
4. Tabelle z. B. „Malwettbewerb 2026 – Einsendungen" nennen.

**Spalten:**

| Spalte | Inhalt |
|---|---|
| Zeitstempel | wird automatisch gesetzt |
| Vorname Kind | aus dem Formular |
| Alter Kind | 1–12 |
| Name Erziehungsberechtigte:r | aus dem Formular |
| E-Mail | für die Gewinnbenachrichtigung |
| Telefon | für Rückrufe |
| Bild-Dateiname | Originalname der Datei |
| Bild-Link | Google-Drive-Link zum hochgeladenen Bild |
| Einwilligung Datenschutz | Ja / Nein (Pflicht = immer Ja) |
| Einwilligung Veröffentlichung | Ja / Nein |
| Stimmen | Stimmen aus der Abstimmung – manuell oder per Formel |
| Platzierung | 1/2/3 nach dem Abstimmungszeitraum |
| Status | Neu / Geprüft / Veröffentlicht / Gewinner |

---

## 2. Apps Script als Empfänger einrichten

1. Im Sheet: **Erweiterungen → Apps Script**.
2. Den kompletten Inhalt von `google-apps-script.gs` einfügen und speichern.
3. Oben in der Datei `DRIVE_ORDNER_ID` eintragen: einen Drive-Ordner anlegen
   (z. B. „Malwettbewerb Bilder"), öffnen und die ID aus der URL kopieren
   (`https://drive.google.com/drive/folders/`**`DIESE_ID`**).
4. **Bereitstellen → Neue Bereitstellung → Typ „Web-App"**
   - *Ausführen als:* Ich
   - *Zugriff:* **Jeder**
5. Bereitstellen, Berechtigungen bestätigen, und die **Web-App-URL** kopieren
   (endet auf `/exec`).

---

## 3. Landingpage verbinden

In `campaigns/malwettbewerb/UploadForm.jsx` steht oben:

```js
const SHEET_ENDPOINT = ''; // <-- Web-App-URL hier eintragen
```

Die kopierte `/exec`-URL zwischen die Anführungszeichen setzen. Fertig – ab dann
schreibt jedes Absenden echte Daten ins Sheet.

Solange das Feld leer bleibt, verhält sich das Formular wie bisher als Prototyp
(Validierung + Erfolgsmeldung, ohne Speichern).

---

## Hinweise

- **Bildgröße:** Die Seite verkleinert jedes Foto schon im Browser auf max. 2000 px
  und rund 1 MB, bevor es hochgeladen wird. Das ist nötig, weil Handyfotos sonst
  zu groß für Apps Script sind und der Upload abbricht. Für Ausmalbilder ist die
  Qualität mehr als ausreichend. Einstellbar über `MAX_KANTE` und `ZIEL_BYTES`
  ganz oben in `UploadForm.jsx`.
- **Speicherort:** Die Bilder liegen in dem Google-Drive-Ordner, dessen ID Sie in
  `google-apps-script.gs` eingetragen haben. Bitte den Ordner nicht öffentlich
  freigeben – das Skript setzt pro Datei einen Link-Zugriff, damit die Bilder
  später in der Galerie angezeigt werden können.
- **Datenschutz:** Es werden personenbezogene Daten von Kindern erhoben. Bitte in der
  Datenschutzerklärung ergänzen (Zweck, Speicherdauer, Löschung nach dem Wettbewerb)
  und die Zugriffsrechte auf Sheet und Drive-Ordner eng halten.
- **Abstimmung:** Die Spalte „Stimmen" ist für die Auswertung vorgesehen. Eine
  öffentliche Abstimmung auf der Website ist noch nicht gebaut – sagt Bescheid, wenn
  wir das ergänzen sollen.
- **Alternative ohne Code:** Ein Google Formular mit Datei-Upload schreibt ebenfalls
  automatisch in ein Sheet. Das ist schneller einzurichten, sieht aber nicht nach
  Bäucke aus – daher hier die Variante mit eurem eigenen Formular.
