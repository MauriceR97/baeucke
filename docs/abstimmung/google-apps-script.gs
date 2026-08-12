/**
 * Malwettbewerb Interliving Bäucke — Empfänger für die ABSTIMMUNG.
 *
 * Schreibt jede Stimme in das Tabellenblatt "Abstimmende" und erhöht
 * gleichzeitig den Stimmenzähler im Blatt "Einsendungen".
 *
 * Einrichtung:
 * 1. Tabelle "Abstimmung-Teilnehmer.xlsx" in Google Drive importieren
 * 2. Erweiterungen → Apps Script, diesen Code einfügen
 * 3. Bereitstellen → Neue Bereitstellung → Web-App
 *    (Ausführen als: Ich · Zugriff: Jeder)
 * 4. Die /exec-URL in campaigns/abstimmung/Gallery.jsx bei
 *    VOTE_ENDPOINT eintragen
 */

const BLATT_ABSTIMMENDE = 'Abstimmende';
const BLATT_EINSENDUNGEN = 'Einsendungen'; // optional, für den Stimmenzähler

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const blatt = ss.getSheetByName(BLATT_ABSTIMMENDE) || ss.getSheets()[0];

    // Doppelte Stimmen je E-Mail verhindern
    const mails = blatt.getRange(2, 6, Math.max(blatt.getLastRow() - 1, 1), 1).getValues();
    const schonAbgestimmt = mails.some(function (r) {
      return String(r[0]).trim().toLowerCase() === String(d.email || '').trim().toLowerCase();
    });
    if (schonAbgestimmt) return ausgabe({ ok: false, grund: 'bereits_abgestimmt' });

    blatt.appendRow([
      Utilities.formatDate(new Date(), 'Europe/Berlin', 'yyyy-MM-dd HH:mm'),
      d.bildId || '',
      d.bildVorname || '',
      d.vorname || '',
      d.nachname || '',
      d.email || '',
      d.telefon || '',
      d.plz || '',
      d.wunsch || '',
      d.datenschutz ? 'Ja' : 'Nein',
      d.werbung ? 'Ja' : 'Nein',
      ''  // Verlosung Gewinner
    ]);

    zaehlerErhoehen(ss, d.bildId);
    return ausgabe({ ok: true });
  } catch (fehler) {
    return ausgabe({ ok: false, fehler: String(fehler) });
  } finally {
    lock.releaseLock();
  }
}

/** Erhöht die Spalte "Stimmen" im Blatt der Einsendungen um 1. */
function zaehlerErhoehen(ss, bildId) {
  const blatt = ss.getSheetByName(BLATT_EINSENDUNGEN);
  if (!blatt || !bildId) return;
  const werte = blatt.getDataRange().getValues();
  const kopf = werte[0].map(String);
  const spalteId = kopf.indexOf('Bild-ID');
  const spalteStimmen = kopf.indexOf('Stimmen');
  if (spalteId === -1 || spalteStimmen === -1) return;
  for (let i = 1; i < werte.length; i++) {
    if (String(werte[i][spalteId]) === String(bildId)) {
      const zelle = blatt.getRange(i + 1, spalteStimmen + 1);
      zelle.setValue((Number(zelle.getValue()) || 0) + 1);
      return;
    }
  }
}

function ausgabe(objekt) {
  return ContentService.createTextOutput(JSON.stringify(objekt))
    .setMimeType(ContentService.MimeType.JSON);
}
