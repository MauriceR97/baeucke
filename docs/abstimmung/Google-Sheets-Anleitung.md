# Stimmen & Teilnehmerdaten der Abstimmung in Google Sheets

Diese Anleitung verbindet die Abstimmungsseite mit einer Google-Tabelle.
Danach landet jede abgegebene Stimme mit den Kontaktdaten als neue Zeile im Sheet.

---

## 1. Tabelle anlegen

1. `Abstimmung-Teilnehmer.xlsx` (liegt neben dieser Datei) herunterladen.
2. In Google Drive hochladen → **Rechtsklick → Öffnen mit → Google Tabellen**.
   Dadurch wird daraus eine echte Google-Tabelle.
3. Die zwei Beispielzeilen löschen – die Kopfzeile bleibt stehen.
4. Tabelle z. B. „Malwettbewerb 2026 – Abstimmung" nennen.

**Spalten im Blatt „Abstimmende":**

| Spalte | Inhalt |
|---|---|
| Zeitstempel | wird automatisch gesetzt |
| Bild-ID | für welches Bild gestimmt wurde (z. B. `e03`) |
| Bild (Kind) | Vorname des Kindes, dessen Bild gewählt wurde |
| Vorname / Nachname | der abstimmenden Person |
| E-Mail | für die Gewinnbenachrichtigung, dient auch der Doppel-Prüfung |
| Telefon | Rückruf |
| PLZ | Einzugsgebiet |
| Möbelwunsch | Auswahl aus dem Dropdown |
| Datenschutz | Pflicht-Einwilligung (immer „Ja") |
| E-Mail-Werbung | freiwillige Einwilligung für Aktionen & Angebote |
| Verlosung Gewinner | von Hand markieren, wer den 100-€-Gutschein gewinnt |

**Tipp für die Verlosung:** Gewinner:in zufällig ziehen mit
`=INDEX(F2:F;RANDBETWEEN(1;ANZAHL2(F2:F)))` in einer freien Zelle.

---

## 2. Stimmenzähler mitpflegen (optional, empfohlen)

Damit die Reihenfolge auf der Seite stimmt, kann dasselbe Skript den Zähler
der Einsendungen mitführen. Dazu im gleichen Spreadsheet ein zweites Blatt
namens **`Einsendungen`** anlegen mit mindestens den Spalten `Bild-ID` und
`Stimmen` – am einfachsten aus `../malwettbewerb/Malwettbewerb-Einsendungen.xlsx`
übernehmen und eine Spalte `Bild-ID` (e01, e02, …) ergänzen.

---

## 3. Apps Script einrichten

1. Im Sheet: **Erweiterungen → Apps Script**.
2. Inhalt von `google-apps-script.gs` (liegt neben dieser Datei) einfügen, speichern.
3. **Bereitstellen → Neue Bereitstellung → Web-App**
   - *Ausführen als:* Ich
   - *Zugriff:* **Jeder**
4. Bereitstellen, Berechtigungen bestätigen, **Web-App-URL** kopieren (endet auf `/exec`).

Das Skript verhindert doppelte Stimmen: Ist eine E-Mail-Adresse schon
eingetragen, wird die Stimme abgelehnt (`bereits_abgestimmt`).

---

## 4. Seite verbinden

In `campaigns/abstimmung/Gallery.jsx` steht oben:

```js
const VOTE_ENDPOINT = ''; // <-- Web-App-URL hier eintragen
```

Die `/exec`-URL zwischen die Anführungszeichen setzen. Fertig.

Solange das Feld leer bleibt, funktioniert die Abstimmung als Prototyp
(eine Stimme pro Gerät im Browser-Speicher, ohne Übertragung).

---

## Hinweise

- **Stimmenstand auf der Seite:** Die angezeigten Zahlen kommen aus der Spalte
  `stimmen` in `campaigns/abstimmung/lib.jsx`. Tragen Sie dort regelmäßig den
  Stand aus der Tabelle ein – ein automatisches Auslesen ist bewusst nicht
  gebaut, damit die Seite ohne Live-Verbindung funktioniert.
- **Datenschutz:** Bitte in der Datenschutzerklärung ergänzen, dass Name,
  E-Mail, Telefon und PLZ für Abstimmung und Verlosung verarbeitet werden,
  wie lange sie gespeichert bleiben und dass die Werbe-Einwilligung jederzeit
  widerrufbar ist. Den Link im Formular (`#datenschutz`) auf die echte Seite setzen.
- **Bilder:** Die Bild-Links der Kinderbilder pflegen Sie in `lib.jsx`
  unter `EINSENDUNGEN` (Spalte „Bild-Link" aus der Upload-Tabelle).
