/**
 * Malwettbewerb Interliving Bäucke — Empfänger für Formular-Einsendungen.
 *
 * Einrichtung: siehe Google-Sheets-Anleitung.md
 * 1. Diesen Code in Apps Script des Sheets einfügen
 * 2. DRIVE_ORDNER_ID unten eintragen
 * 3. Bereitstellen als Web-App (Zugriff: Jeder) und die /exec-URL in
 *    UploadForm.jsx bei SHEET_ENDPOINT eintragen
 */

const DRIVE_ORDNER_ID = 'HIER_DIE_ORDNER_ID_EINTRAGEN';
const TABELLENBLATT = 'Tabellenblatt1';

function doPost(e) {
  try {
    const daten = JSON.parse(e.postData.contents);
    const blatt = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABELLENBLATT)
      || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Bild in Drive ablegen
    let bildLink = '';
    if (daten.bildBase64 && daten.bildName) {
      const ordner = DriveApp.getFolderById(DRIVE_ORDNER_ID);
      const roh = Utilities.base64Decode(daten.bildBase64.split(',').pop());
      const blob = Utilities.newBlob(roh, daten.bildTyp || 'image/jpeg', daten.bildName);
      const datei = ordner.createFile(blob);
      datei.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      bildLink = datei.getUrl();
    }

    blatt.appendRow([
      Utilities.formatDate(new Date(), 'Europe/Berlin', 'yyyy-MM-dd HH:mm'),
      daten.kindVorname || '',
      daten.kindAlter || '',
      daten.elternName || '',
      daten.email || '',
      daten.telefon || '',
      daten.bildName || '',
      bildLink,
      daten.einwilligungDaten ? 'Ja' : 'Nein',
      daten.einwilligungVeroeffentlichung ? 'Ja' : 'Nein',
      0,    // Stimmen
      '',   // Platzierung
      'Neu' // Status
    ]);

    return ausgabe({ ok: true });
  } catch (fehler) {
    return ausgabe({ ok: false, fehler: String(fehler) });
  }
}

function ausgabe(objekt) {
  return ContentService.createTextOutput(JSON.stringify(objekt))
    .setMimeType(ContentService.MimeType.JSON);
}
