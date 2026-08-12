/* Abstimmungs-Landingpage — Einsendungen & Helfer
 *
 * ==========================================================================
 * A) EMPFOHLEN: Daten über das Apps Script laden (datenschutzfreundlich)
 * ==========================================================================
 * Die Google-Tabelle bleibt PRIVAT und wird NICHT im Web veröffentlicht.
 * Stattdessen liefert das Apps Script nur die öffentlichen Felder aus:
 * Bild-ID, Vorname des Kindes, Bild-Link und Stimmenstand.
 * Namen der Eltern, E-Mail, Telefon und PLZ verlassen die Tabelle nie.
 *
 *  1. google-apps-script.gs im Tabellen-Skript einfügen (enthält doGet + doPost)
 *  2. Bereitstellen → Neue Bereitstellung → Web-App
 *     (Ausführen als: Ich · Zugriff: Jeder)
 *  3. Die /exec-Adresse unten bei DATEN_URL eintragen –
 *     dieselbe Adresse wie VOTE_ENDPOINT in Gallery.jsx
 *
 * Benötigte Spaltenüberschriften im Blatt "Einsendungen":
 *     Bild-ID | Vorname Kind | Bild-Link | Stimmen
 * Optional zusätzlich: Freigabe — dann werden nur Zeilen mit "Ja" ausgeliefert,
 * so lassen sich Einsendungen vor der Veröffentlichung prüfen.
 *
 * Solange das Feld leer bleibt, zeigt die Seite die Beispiel-Einträge unten.
 * ==========================================================================
 */
const DATEN_URL = 'https://script.google.com/macros/s/AKfycbzbBBQDIVeypku4N6a7r5-4YtCEJthtA4EQeJAtkD10mi0PlZxQrhVaLy8uEMEDh7STRw/exec';

/* ==========================================================================
 * B) ALTERNATIVE: Einträge von Hand pflegen
 * ==========================================================================
 * Die Werte kommen 1:1 aus der Google-Tabelle "Malwettbewerb-Einsendungen":
 *   vorname  = Spalte "Vorname Kind"
 *   bildLink = Spalte "Bild-Link"  (Google-Drive-Link aus dem Upload-Formular)
 *   stimmen  = Spalte "Stimmen"    (aktueller Stand aus der Tabelle)
 *   id       = fortlaufend, wird für die Stimmenzählung gebraucht
 *
 * WICHTIG zum Bild-Link: Das Apps Script legt die Bilder in Drive ab und
 * speichert einen Link der Form https://drive.google.com/file/d/DATEI_ID/view
 * Solche Links lassen sich NICHT direkt als <img src> verwenden – bildUrl()
 * wandelt sie automatisch in eine anzeigbare Adresse um. Voraussetzung: Die
 * Datei ist in Drive für "Jeder mit dem Link" freigegeben; das erledigt das
 * Apps Script beim Upload bereits.
 *
 * Ein normaler Bild-Link (z. B. vom eigenen Server) wird unverändert genutzt.
 */
const EINSENDUNGEN = [{
  id: 'e01',
  vorname: 'Mia',
  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png',
  stimmen: 128
}, {
  id: 'e02',
  vorname: 'Jonas',
  bildLink: 'assets/schritte-abstimmung.jpg',
  stimmen: 96
}, {
  id: 'e03',
  vorname: 'Emilia',
  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png',
  stimmen: 152
}, {
  id: 'e04',
  vorname: 'Ben',
  bildLink: 'assets/schritte-abstimmung.jpg',
  stimmen: 74
}, {
  id: 'e05',
  vorname: 'Lina',
  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png',
  stimmen: 111
}, {
  id: 'e06',
  vorname: 'Paul',
  bildLink: 'assets/schritte-abstimmung.jpg',
  stimmen: 43
}, {
  id: 'e07',
  vorname: 'Sophie',
  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png',
  stimmen: 88
}, {
  id: 'e08',
  vorname: 'Felix',
  bildLink: 'assets/schritte-abstimmung.jpg',
  stimmen: 61
}];

/* Wandelt einen Google-Drive-Link in eine direkt anzeigbare Bildadresse um. */
function bildUrl(link) {
  if (!link) return '';
  const s = String(link).trim();
  const m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) // .../file/d/ID/view
  || s.match(/[?&]id=([a-zA-Z0-9_-]+)/) // ...open?id=ID
  || s.match(/\/d\/([a-zA-Z0-9_-]+)/); // .../d/ID
  return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1200` : s;
}

/* Lädt die Einsendungen über das Apps Script (nur öffentliche Felder).
   Rückgabe: Array wie EINSENDUNGEN – oder null (leere URL / Fehler). */
async function ladeEinsendungen() {
  if (!DATEN_URL) return null;
  try {
    let daten;
    try {
      const antwort = await fetch(DATEN_URL, {
        cache: 'no-store'
      });
      if (!antwort.ok) throw new Error('HTTP ' + antwort.status);
      daten = await antwort.json();
    } catch (netzfehler) {
      daten = await ladePerJsonp(DATEN_URL); // Ausweichweg, falls fetch blockiert
    }
    if (!daten || !daten.ok || !Array.isArray(daten.bilder) || !daten.bilder.length) return null;
    return daten.bilder.map((b, i) => ({
      id: String(b.id || 'e' + String(i + 1).padStart(2, '0')),
      vorname: String(b.vorname || '').trim(),
      bildLink: String(b.bildLink || '').trim(),
      stimmen: parseInt(String(b.stimmen || '').replace(/\D/g, ''), 10) || 0
    })).filter(b => b.bildLink);
  } catch (fehler) {
    console.warn('Einsendungen konnten nicht geladen werden:', fehler);
    return null;
  }
}

/* Ausweichweg ohne fetch (umgeht CORS-Einschränkungen älterer Browser). */
function ladePerJsonp(url) {
  return new Promise((fertig, fehlschlag) => {
    const name = '__baeucke_cb_' + Date.now();
    const skript = document.createElement('script');
    const aufraeumen = () => {
      delete window[name];
      skript.remove();
    };
    const timer = setTimeout(() => {
      aufraeumen();
      fehlschlag(new Error('Zeitüberschreitung'));
    }, 12000);
    window[name] = daten => {
      clearTimeout(timer);
      aufraeumen();
      fertig(daten);
    };
    skript.onerror = () => {
      clearTimeout(timer);
      aufraeumen();
      fehlschlag(new Error('Laden fehlgeschlagen'));
    };
    skript.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + name;
    document.body.appendChild(skript);
  });
}

// Lucide-Icon-Helfer
function Ico({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const lib = window.lucide;
    const node = lib && lib.icons ? lib.icons[name] : null;
    if (!ref.current || !node || !lib.createElement) return;
    try {
      const svg = lib.createElement(node);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('stroke', color);
      svg.setAttribute('stroke-width', strokeWidth);
      ref.current.replaceChildren(svg);
    } catch (e) {/* no-op */}
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  });
}
const KID = {
  blue: '#29ABE2',
  pink: '#EC6EA9',
  green: '#8DC63F',
  orange: '#F7931E',
  yellow: 'var(--baeucke-yellow)',
  red: 'var(--baeucke-red)'
};
function Splat({
  color,
  size = 90,
  style = {},
  rotate = 0
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    style: {
      position: 'absolute',
      pointerEvents: 'none',
      transform: `rotate(${rotate}deg)`,
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fill: color,
    d: "M52 6c10-3 19 6 24 14s18 9 18 22-12 16-16 26-2 24-15 26-21-9-31-13S6 73 7 60s14-14 17-26S42 9 52 6z"
  }));
}
const PRIZES = [{
  place: '1. Preis',
  amount: '250 €',
  color: KID.orange,
  icon: 'Gift'
}, {
  place: '2. Preis',
  amount: '150 €',
  color: KID.green,
  icon: 'Gift'
}, {
  place: '3. Preis',
  amount: '50 €',
  color: KID.blue,
  icon: 'Gift'
}];
const VOTE_STEPS = [{
  n: '1',
  icon: 'Images',
  title: 'Bilder ansehen',
  text: 'Schauen Sie sich alle eingesendeten Kunstwerke in Ruhe an – jedes Bild zeigt unser Möbelhaus in ganz eigenen Farben.'
}, {
  n: '2',
  icon: 'Heart',
  title: 'Stimme abgeben',
  text: 'Klicken Sie bei Ihrem Lieblingsbild auf „Abstimmen“ und hinterlassen Sie kurz Ihre Kontaktdaten – damit nehmen Sie automatisch an der Verlosung teil. Pro Person ist eine Stimme möglich.'
}, {
  n: '3',
  icon: 'Trophy',
  title: 'Gewinner erfahren',
  text: 'Nach Ende der Abstimmung ermitteln wir die drei Bilder mit den meisten Stimmen und verlosen unter allen Abstimmenden einen ',
  textStark: '100-€-Gutschein',
  textEnde: '.'
}];
const VOTE_FAQS = [{
  q: 'Wer darf abstimmen?',
  a: 'Jede und jeder – die Abstimmung ist öffentlich und kostenlos. Pro Person kann eine Stimme abgegeben werden.'
}, {
  q: 'Was kann ich als Abstimmende:r gewinnen?',
  a: 'Unter allen Abstimmenden verlosen wir einen Bäucke-Warengutschein im Wert von 100 €. Die Teilnahme erfolgt automatisch mit Ihrer Stimmabgabe – dafür benötigen wir Ihren Namen und Ihre E-Mail-Adresse. Der Gutschein ist nicht in bar auszahlbar.'
}, {
  q: 'Warum muss ich für die Abstimmung meine Kontaktdaten angeben?',
  a: 'Nur so können wir Sie benachrichtigen, wenn Sie den 100-€-Gutschein gewonnen haben, und sicherstellen, dass jede Person einmal abstimmt. Ihre Daten werden ausschließlich für die Abstimmung und die Verlosung verwendet.'
}, {
  q: 'Bis wann kann abgestimmt werden?',
  a: 'Die Abstimmung läuft bis zum 31.10.2026. Danach werden die Stimmen ausgezählt.'
}, {
  q: 'Wie werden die Gewinner:innen ermittelt?',
  a: 'Die drei Bilder mit den meisten Stimmen zum Ende der Abstimmung gewinnen. Die Familien werden über die beim Upload angegebenen Kontaktdaten benachrichtigt.'
}, {
  q: 'Was gibt es zu gewinnen?',
  a: 'Bäucke-Warengutscheine im Wert von 250 €, 150 € und 50 €. Die Gutscheine sind nicht in bar auszahlbar.'
}, {
  q: 'Warum wird nur der Vorname angezeigt?',
  a: 'Zum Schutz der Kinder veröffentlichen wir ausschließlich den Vornamen – und nur, wenn die Erziehungsberechtigten der Veröffentlichung zugestimmt haben.'
}];
const REVIEWS = [{
  text: 'Das beste Möbelhaus im Umkreis. Sehr freundliche Mitarbeiter – hier ist der Kunde noch König. Nur zu empfehlen!',
  who: 'Google-Rezension'
}, {
  text: 'Von der sehr guten, freundlichen Beratung bis zum Aufbau hat alles reibungslos geklappt. Sauber und zügig.',
  who: 'Google-Rezension'
}, {
  text: 'Die Mitarbeiter waren freundlich und sehr kompetent. Auch die Planung im Vorfeld verlief super.',
  who: 'Google-Rezension'
}];
const SEAL_URL = 'https://onecdn.io/media/0dd284cc-e063-4b0c-b923-0e83551b3245/md2x';

/* Auswahl für „Was würden Sie sich mit dem 100-€-Gutschein kaufen?“
   – orientiert an den Sortimentsbereichen des Möbelhauses. */
const MOEBEL_WUNSCH = ['Polstermöbel (Sofa, Sessel)', 'Wohnzimmer (Wohnwand, Regal, Tisch)', 'Speisezimmer (Esstisch, Stühle)', 'Schlafzimmer (Bett, Schrank)', 'Matratzen & Lattenroste', 'Kinder- & Jugendzimmer', 'Küche & Küchenzubehör', 'Bad', 'Flur & Diele (Garderobe)', 'Homeoffice (Schreibtisch, Bürostuhl)', 'Wohnaccessoires & Deko', 'Heimtextilien (Teppich, Vorhänge)', 'Leuchten', 'Weiß noch nicht – lasse mich beraten'];
const GOOGLE = {
  rating: '4,8',
  count: '1.161',
  url: 'https://www.google.com/search?q=Interliving+B%C3%A4ucke+Northeim+Bewertungen'
};
function GoogleG({
  size = 22
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: {
      display: 'block',
      flex: 'none'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#FFC107",
    d: "M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF3D00",
    d: "M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#4CAF50",
    d: "M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#1976D2",
    d: "M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
  }));
}
Object.assign(window, {
  EINSENDUNGEN,
  ladeEinsendungen,
  DATEN_URL,
  bildUrl,
  Ico,
  KID,
  Splat,
  PRIZES,
  VOTE_STEPS,
  VOTE_FAQS,
  REVIEWS,
  SEAL_URL,
  GOOGLE,
  GoogleG,
  MOEBEL_WUNSCH
});