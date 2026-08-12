/**
 * Malwettbewerb Interliving Bäucke — EIN Skript für beide Seiten.
 *
 * Da Einsendungen und Abstimmungen in derselben Tabelle liegen, genügt ein
 * einziges Skript und eine einzige Bereitstellung. Die /exec-Adresse wird an
 * drei Stellen eingetragen (siehe unten).
 *
 * ---------------------------------------------------------------------------
 * EINRICHTUNG
 * ---------------------------------------------------------------------------
 * 1. Tabelle öffnen → Erweiterungen → Apps Script → diesen Code einfügen
 * 2. Oben bei DRIVE_ORDNER_ID die ID des Drive-Ordners eintragen, in dem die
 *    Bilder landen sollen (Ordner anlegen, öffnen, ID aus der URL kopieren:
 *    https://drive.google.com/drive/folders/DIESE_ID)
 * 3. Bereitstellen → Neue Bereitstellung → Web-App
 *      Ausführen als: Ich     ·     Zugriff: Jeder
 * 4. Die /exec-Adresse eintragen in:
 *      teilnahme/UploadForm.jsx  →  SHEET_ENDPOINT
 *      abstimmen/Gallery.jsx     →  VOTE_ENDPOINT
 *      abstimmen/lib.jsx         →  DATEN_URL
 *
 * ---------------------------------------------------------------------------
 * WICHTIG ZUM DATENSCHUTZ
 * ---------------------------------------------------------------------------
 * Die Tabelle bleibt PRIVAT und darf NICHT über „Datei → Im Web veröffentlichen"
 * freigegeben werden. Die Galerie holt ihre Daten über doGet(), das nur die
 * öffentlichen Felder herausgibt (Bild-ID, Vorname, Bild-Link, Stimmen).
 * Elternname, E-Mail, Telefon und PLZ verlassen die Tabelle nie.
 *
 * ---------------------------------------------------------------------------
 * SPALTEN
 * ---------------------------------------------------------------------------
 * Das Skript schreibt anhand der ÜBERSCHRIFTEN, nicht anhand der Reihenfolge.
 * Sie dürfen Spalten also frei anordnen. Fehlende Pflichtspalten legt das
 * Skript beim ersten Lauf selbst an.
 */

const DRIVE_ORDNER_ID = 'HIER_DIE_ORDNER_ID_EINTRAGEN';

/* ====================================================================== *
 * Blätter finden – anhand der Überschriften, nicht des Namens
 * ====================================================================== */
function blattEinsendungen() { return findeBlatt(['bild-link', 'vorname kind'], ['einsendungen']); }
function blattAbstimmende()  { return findeBlatt(['möbelwunsch', 'nachname'],  ['abstimmende', 'abstimmung']); }

function findeBlatt(pflichtSpalten, namensVorschlaege) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const blaetter = ss.getSheets();
  // 1) Über die Überschriften
  for (var i = 0; i < blaetter.length; i++) {
    const kopf = kopfzeile(blaetter[i]);
    var alleDa = true;
    for (var s = 0; s < pflichtSpalten.length; s++) {
      if (kopf.indexOf(pflichtSpalten[s]) === -1) { alleDa = false; break; }
    }
    if (alleDa) return blaetter[i];
  }
  // 2) Über den Blattnamen
  for (var n = 0; n < namensVorschlaege.length; n++) {
    for (var b = 0; b < blaetter.length; b++) {
      if (blaetter[b].getName().toLowerCase().indexOf(namensVorschlaege[n]) !== -1) return blaetter[b];
    }
  }
  return null;
}

function kopfzeile(blatt) {
  if (blatt.getLastColumn() === 0) return [];
  return blatt.getRange(1, 1, 1, blatt.getLastColumn()).getValues()[0]
    .map(function (h) { return String(h).trim().toLowerCase(); });
}

/** Sucht eine Spalte über mehrere mögliche Schreibweisen. -1 wenn nicht da. */
function spalteVon(kopf, namen) {
  for (var i = 0; i < namen.length; i++) {
    const idx = kopf.indexOf(String(namen[i]).toLowerCase());
    if (idx !== -1) return idx;
  }
  return -1;
}

/** Legt fehlende Spalten am Ende der Kopfzeile an und gibt den neuen Kopf zurück. */
function ergaenzeSpalten(blatt, fehlende) {
  if (!fehlende.length) return kopfzeile(blatt);
  var spalte = blatt.getLastColumn();
  for (var i = 0; i < fehlende.length; i++) {
    blatt.getRange(1, spalte + 1 + i).setValue(fehlende[i]).setFontWeight('bold');
  }
  return kopfzeile(blatt);
}

/* ====================================================================== *
 * doPost – Einsendung ODER Stimme
 * ====================================================================== */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const d = JSON.parse(e.postData.contents);
    // "typ" kommt von der Seite mit; ältere Aufrufe ohne "typ" erkennen wir am Inhalt
    const typ = d.typ || (d.bildBase64 || d.kindVorname ? 'einsendung' : 'stimme');
    return typ === 'einsendung' ? speichereEinsendung(d) : speichereStimme(d);
  } catch (fehler) {
    return antwort({ ok: false, fehler: String(fehler) });
  } finally {
    lock.releaseLock();
  }
}

/* --- Bild-Einsendung ------------------------------------------------- */
function speichereEinsendung(d) {
  const blatt = blattEinsendungen();
  if (!blatt) return antwort({ ok: false, fehler: 'Blatt für Einsendungen nicht gefunden' });

  var kopf = kopfzeile(blatt);
  const fehlt = [];
  if (spalteVon(kopf, ['bild-id', 'id']) === -1) fehlt.push('Bild-ID');
  if (spalteVon(kopf, ['freigabe']) === -1) fehlt.push('Freigabe');
  kopf = ergaenzeSpalten(blatt, fehlt);

  // Bild in Drive ablegen
  var bildLink = '';
  var bildFehler = '';
  if (d.bildBase64 && d.bildName) {
    try {
      if (!DRIVE_ORDNER_ID || DRIVE_ORDNER_ID.indexOf('HIER_DIE') === 0) {
        throw new Error('DRIVE_ORDNER_ID ist noch nicht eingetragen');
      }
      const ordner = DriveApp.getFolderById(DRIVE_ORDNER_ID);
      const roh = Utilities.base64Decode(String(d.bildBase64).split(',').pop());
      const datei = ordner.createFile(Utilities.newBlob(roh, d.bildTyp || 'image/jpeg', d.bildName));
      datei.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      bildLink = datei.getUrl();
    } catch (f) {
      bildFehler = String(f);   // Einsendung trotzdem speichern
    }
  }

  const zeile = blatt.getLastRow() + 1;
  const bildId = 'e' + ('00' + (zeile - 1)).slice(-3);

  const werte = {};
  werte[spalteVon(kopf, ['zeitstempel'])]                          = Utilities.formatDate(new Date(), 'Europe/Berlin', 'yyyy-MM-dd HH:mm');
  werte[spalteVon(kopf, ['bild-id', 'id'])]                        = bildId;
  werte[spalteVon(kopf, ['vorname kind', 'vorname'])]              = d.kindVorname || '';
  werte[spalteVon(kopf, ['name erziehungsberechtigte:r', 'name erziehungsberechtigte', 'elternteil'])] = d.elternName || '';
  werte[spalteVon(kopf, ['e-mail', 'email'])]                      = d.email || '';
  werte[spalteVon(kopf, ['telefon'])]                              = d.telefon || '';
  werte[spalteVon(kopf, ['bild-dateiname', 'dateiname'])]          = d.bildName || '';
  werte[spalteVon(kopf, ['bild-link', 'bildlink'])]                = bildLink;
  werte[spalteVon(kopf, ['einwilligung datenschutz', 'datenschutz'])]        = d.einwilligungDaten ? 'Ja' : 'Nein';
  werte[spalteVon(kopf, ['einwilligung veröffentlichung', 'veröffentlichung'])] = d.einwilligungVeroeffentlichung ? 'Ja' : 'Nein';
  werte[spalteVon(kopf, ['stimmen'])]                              = 0;
  werte[spalteVon(kopf, ['freigabe'])]                             = 'Nein';   // erst nach Prüfung auf "Ja"
  werte[spalteVon(kopf, ['status'])]                               = bildFehler ? ('Bildfehler: ' + bildFehler) : 'Neu';

  schreibeZeile(blatt, zeile, kopf.length, werte);
  return antwort({ ok: !bildFehler, fehler: bildFehler || undefined, bildId: bildId });
}

/* ====================================================================== *
 * pruefeEinrichtung – im Editor ausführen, um die Einrichtung zu testen.
 * Das Ergebnis steht danach im Ausführungsprotokoll.
 * ====================================================================== */
function pruefeEinrichtung() {
  const zeilen = [];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  zeilen.push('Tabelle: ' + ss.getName());
  zeilen.push('Blätter: ' + ss.getSheets().map(function (b) { return b.getName(); }).join(', '));

  const bEin = blattEinsendungen();
  zeilen.push(bEin ? '✓ Blatt Einsendungen erkannt: "' + bEin.getName() + '"'
                   : '✗ Blatt Einsendungen NICHT gefunden – nötig sind die Spalten "Vorname Kind" und "Bild-Link"');
  if (bEin) zeilen.push('   Spalten: ' + kopfzeile(bEin).join(' | '));

  const bAbs = blattAbstimmende();
  zeilen.push(bAbs ? '✓ Blatt Abstimmende erkannt: "' + bAbs.getName() + '"'
                   : '✗ Blatt Abstimmende NICHT gefunden – nötig sind die Spalten "Nachname" und "Möbelwunsch"');

  try {
    if (!DRIVE_ORDNER_ID || DRIVE_ORDNER_ID.indexOf('HIER_DIE') === 0) throw new Error('noch nicht eingetragen');
    const o = DriveApp.getFolderById(DRIVE_ORDNER_ID);
    zeilen.push('✓ Drive-Ordner erreichbar: "' + o.getName() + '"');
  } catch (f) {
    zeilen.push('✗ Drive-Ordner NICHT erreichbar: ' + f);
  }

  const text = zeilen.join('\n');
  Logger.log(text);
  return text;
}

/* --- Stimme ---------------------------------------------------------- */
function speichereStimme(d) {
  const blatt = blattAbstimmende();
  if (!blatt) return antwort({ ok: false, fehler: 'Blatt für Abstimmende nicht gefunden' });

  const kopf = kopfzeile(blatt);
  const sMail = spalteVon(kopf, ['e-mail', 'email']);

  // Doppelte Stimmen je E-Mail verhindern
  if (sMail !== -1 && blatt.getLastRow() > 1) {
    const mails = blatt.getRange(2, sMail + 1, blatt.getLastRow() - 1, 1).getValues();
    const doppelt = mails.some(function (r) {
      return String(r[0]).trim().toLowerCase() === String(d.email || '').trim().toLowerCase();
    });
    if (doppelt) return antwort({ ok: false, grund: 'bereits_abgestimmt' });
  }

  const werte = {};
  werte[spalteVon(kopf, ['zeitstempel'])]                = Utilities.formatDate(new Date(), 'Europe/Berlin', 'yyyy-MM-dd HH:mm');
  werte[spalteVon(kopf, ['bild-id', 'id'])]              = d.bildId || '';
  werte[spalteVon(kopf, ['bild (kind)', 'bild kind'])]   = d.bildVorname || '';
  werte[spalteVon(kopf, ['vorname'])]                    = d.vorname || '';
  werte[spalteVon(kopf, ['nachname'])]                   = d.nachname || '';
  werte[sMail]                                           = d.email || '';
  werte[spalteVon(kopf, ['telefon'])]                    = d.telefon || '';
  werte[spalteVon(kopf, ['plz'])]                        = d.plz || '';
  werte[spalteVon(kopf, ['möbelwunsch', 'moebelwunsch'])] = d.wunsch || '';
  werte[spalteVon(kopf, ['datenschutz'])]                = d.datenschutz ? 'Ja' : 'Nein';
  werte[spalteVon(kopf, ['e-mail-werbung', 'werbung'])]  = d.werbung ? 'Ja' : 'Nein';

  schreibeZeile(blatt, blatt.getLastRow() + 1, kopf.length, werte);
  zaehlerErhoehen(d.bildId);
  return antwort({ ok: true });
}

function schreibeZeile(blatt, zeile, breite, werte) {
  const reihe = [];
  for (var i = 0; i < breite; i++) reihe.push(werte[i] !== undefined ? werte[i] : '');
  blatt.getRange(zeile, 1, 1, breite).setValues([reihe]);
}

/** Erhöht die Spalte „Stimmen" der passenden Einsendung um 1. */
function zaehlerErhoehen(bildId) {
  if (!bildId) return;
  const blatt = blattEinsendungen();
  if (!blatt) return;
  const kopf = kopfzeile(blatt);
  const sId = spalteVon(kopf, ['bild-id', 'id']);
  const sStimmen = spalteVon(kopf, ['stimmen']);
  if (sId === -1 || sStimmen === -1) return;
  const werte = blatt.getDataRange().getValues();
  for (var i = 1; i < werte.length; i++) {
    if (String(werte[i][sId]).trim() === String(bildId).trim()) {
      const zelle = blatt.getRange(i + 1, sStimmen + 1);
      zelle.setValue((Number(zelle.getValue()) || 0) + 1);
      return;
    }
  }
}

/* ====================================================================== *
 * doGet – Galerie-Daten (NUR öffentliche Felder)
 * ====================================================================== */
function doGet(e) {
  const callback = e && e.parameter ? e.parameter.callback : null;
  try {
    const blatt = blattEinsendungen();
    if (!blatt) return antwort({ ok: false, fehler: 'Blatt für Einsendungen nicht gefunden' }, callback);

    const werte = blatt.getDataRange().getValues();
    if (werte.length < 2) return antwort({ ok: true, bilder: [] }, callback);

    const kopf = werte[0].map(function (h) { return String(h).trim().toLowerCase(); });
    const sId    = spalteVon(kopf, ['bild-id', 'id']);
    const sName  = spalteVon(kopf, ['vorname kind', 'vorname']);
    const sBild  = spalteVon(kopf, ['bild-link', 'bildlink']);
    const sStim  = spalteVon(kopf, ['stimmen']);
    const sFrei  = spalteVon(kopf, ['freigabe']);
    if (sName === -1 || sBild === -1) {
      return antwort({ ok: false, fehler: 'Spalten "Vorname Kind" / "Bild-Link" fehlen' }, callback);
    }

    const bilder = [];
    for (var r = 1; r < werte.length; r++) {
      const z = werte[r];
      const bild = String(z[sBild] || '').trim();
      if (!bild) continue;                                        // ohne Bild keine Anzeige
      if (sFrei !== -1) {
        const frei = String(z[sFrei] || '').trim();
        if (!/^(ja|j|yes|x|wahr|true)$/i.test(frei)) continue;     // nur freigegebene Bilder
      }
      bilder.push({
        id: (sId !== -1 && String(z[sId] || '').trim()) || 'e' + ('00' + r).slice(-3),
        vorname: String(z[sName] || '').trim(),
        bildLink: bild,
        stimmen: sStim === -1 ? 0 : (parseInt(String(z[sStim] || '').replace(/\D/g, ''), 10) || 0)
      });
    }
    // Bewusst KEINE Elternnamen, E-Mail-Adressen, Telefonnummern oder PLZ.
    return antwort({ ok: true, bilder: bilder }, callback);
  } catch (fehler) {
    return antwort({ ok: false, fehler: String(fehler) }, callback);
  }
}

/** JSON zurückgeben – optional als JSONP, falls ein callback übergeben wurde. */
function antwort(objekt, callback) {
  const text = JSON.stringify(objekt);
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + text + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}
