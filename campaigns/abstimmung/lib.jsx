/* Abstimmungs-Landingpage — Einsendungen & Helfer
 *
 * ► HIER DIE EINSENDUNGEN EINTRAGEN
 *   Die Werte kommen 1:1 aus der Google-Tabelle "Malwettbewerb-Einsendungen":
 *     vorname  = Spalte "Vorname Kind"
 *     alter    = Spalte "Alter Kind"
 *     bildLink = Spalte "Bild-Link"  (Google-Drive-Link aus dem Upload-Formular)
 *     stimmen  = Spalte "Stimmen"    (aktueller Stand aus der Tabelle)
 *     id       = fortlaufend, wird für die Stimmenzählung gebraucht
 *
 *   WICHTIG zum Bild-Link: Das Apps Script legt die Bilder in Drive ab und
 *   speichert einen Link der Form
 *       https://drive.google.com/file/d/DATEI_ID/view
 *   Solche Links lassen sich NICHT direkt als <img src> verwenden. Die Funktion
 *   bildUrl() unten wandelt sie automatisch in eine anzeigbare Adresse um
 *   (https://drive.google.com/thumbnail?id=DATEI_ID&sz=w1200).
 *   Voraussetzung: Die Datei muss in Drive für "Jeder mit dem Link" freigegeben
 *   sein – das erledigt das Apps Script beim Upload bereits automatisch.
 *
 *   Ein normaler Bild-Link (z. B. von einem eigenen Server) funktioniert
 *   ebenfalls und wird unverändert übernommen.
 */
const EINSENDUNGEN = [
  { id: 'e01', vorname: 'Mia',    alter: 7,  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png', stimmen: 128 },
  { id: 'e02', vorname: 'Jonas',  alter: 10, bildLink: 'assets/schritte-abstimmung.png', stimmen: 96 },
  { id: 'e03', vorname: 'Emilia', alter: 5,  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png', stimmen: 152 },
  { id: 'e04', vorname: 'Ben',    alter: 9,  bildLink: 'assets/schritte-abstimmung.png', stimmen: 74 },
  { id: 'e05', vorname: 'Lina',   alter: 11, bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png', stimmen: 111 },
  { id: 'e06', vorname: 'Paul',   alter: 6,  bildLink: 'assets/schritte-abstimmung.png', stimmen: 43 },
  { id: 'e07', vorname: 'Sophie', alter: 8,  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png', stimmen: 88 },
  { id: 'e08', vorname: 'Felix',  alter: 12, bildLink: 'assets/schritte-abstimmung.png', stimmen: 61 },
];

/* Wandelt einen Google-Drive-Link in eine direkt anzeigbare Bildadresse um. */
function bildUrl(link) {
  if (!link) return '';
  const s = String(link).trim();
  const m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)      // .../file/d/ID/view
        || s.match(/[?&]id=([a-zA-Z0-9_-]+)/)            // ...open?id=ID
        || s.match(/\/d\/([a-zA-Z0-9_-]+)/);             // .../d/ID
  return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1200` : s;
}

// Lucide-Icon-Helfer
function Ico({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) {
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
    } catch (e) { /* no-op */ }
  }, [name, size, color, strokeWidth]);
  return <span ref={ref} style={{ display: 'inline-flex', alignItems: 'center' }} />;
}

const KID = { blue: '#29ABE2', pink: '#EC6EA9', green: '#8DC63F', orange: '#F7931E', yellow: 'var(--baeucke-yellow)', red: 'var(--baeucke-red)' };

function Splat({ color, size = 90, style = {}, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute', pointerEvents: 'none', transform: `rotate(${rotate}deg)`, ...style }} aria-hidden="true">
      <path fill={color} d="M52 6c10-3 19 6 24 14s18 9 18 22-12 16-16 26-2 24-15 26-21-9-31-13S6 73 7 60s14-14 17-26S42 9 52 6z" />
    </svg>
  );
}

const PRIZES = [
  { place: '1. Preis', amount: '250 €', color: KID.orange, icon: 'Gift' },
  { place: '2. Preis', amount: '150 €', color: KID.green, icon: 'Gift' },
  { place: '3. Preis', amount: '50 €',  color: KID.blue,  icon: 'Gift' },
];

const VOTE_STEPS = [
  { n: '1', icon: 'Images',    title: 'Bilder ansehen', text: 'Schauen Sie sich alle eingesendeten Kunstwerke in Ruhe an – jedes Bild zeigt unser Möbelhaus in ganz eigenen Farben.' },
  { n: '2', icon: 'Heart',     title: 'Stimme abgeben', text: 'Klicken Sie bei Ihrem Lieblingsbild auf „Abstimmen“ und hinterlassen Sie kurz Ihre Kontaktdaten – damit nehmen Sie automatisch an der Verlosung teil. Pro Person ist eine Stimme möglich.' },
  { n: '3', icon: 'Trophy',    title: 'Gewinner erfahren', text: 'Nach Ende der Abstimmung ermitteln wir die drei Bilder mit den meisten Stimmen und verlosen unter allen Abstimmenden einen ', textStark: '100-€-Gutschein', textEnde: '.' },
];

const VOTE_FAQS = [
  { q: 'Wer darf abstimmen?', a: 'Jede und jeder – die Abstimmung ist öffentlich und kostenlos. Pro Person kann eine Stimme abgegeben werden.' },
  { q: 'Was kann ich als Abstimmende:r gewinnen?', a: 'Unter allen Abstimmenden verlosen wir einen Bäucke-Warengutschein im Wert von 100 €. Die Teilnahme erfolgt automatisch mit Ihrer Stimmabgabe – dafür benötigen wir Ihren Namen und Ihre E-Mail-Adresse. Der Gutschein ist nicht in bar auszahlbar.' },
  { q: 'Warum muss ich für die Abstimmung meine Kontaktdaten angeben?', a: 'Nur so können wir Sie benachrichtigen, wenn Sie den 100-€-Gutschein gewonnen haben, und sicherstellen, dass jede Person einmal abstimmt. Ihre Daten werden ausschließlich für die Abstimmung und die Verlosung verwendet.' },
  { q: 'Bis wann kann abgestimmt werden?', a: 'Die Abstimmung läuft bis zum 31.10.2026. Danach werden die Stimmen ausgezählt.' },
  { q: 'Wie werden die Gewinner:innen ermittelt?', a: 'Die drei Bilder mit den meisten Stimmen zum Ende der Abstimmung gewinnen. Die Familien werden über die beim Upload angegebenen Kontaktdaten benachrichtigt.' },
  { q: 'Was gibt es zu gewinnen?', a: 'Bäucke-Warengutscheine im Wert von 250 €, 150 € und 50 €. Die Gutscheine sind nicht in bar auszahlbar.' },
  { q: 'Warum wird nur der Vorname angezeigt?', a: 'Zum Schutz der Kinder veröffentlichen wir ausschließlich Vorname und Alter – und nur, wenn die Erziehungsberechtigten der Veröffentlichung zugestimmt haben.' },
];

const REVIEWS = [
  { text: 'Das beste Möbelhaus im Umkreis. Sehr freundliche Mitarbeiter – hier ist der Kunde noch König. Nur zu empfehlen!', who: 'Google-Rezension' },
  { text: 'Von der sehr guten, freundlichen Beratung bis zum Aufbau hat alles reibungslos geklappt. Sauber und zügig.', who: 'Google-Rezension' },
  { text: 'Die Mitarbeiter waren freundlich und sehr kompetent. Auch die Planung im Vorfeld verlief super.', who: 'Google-Rezension' },
];

const SEAL_URL = 'https://onecdn.io/media/0dd284cc-e063-4b0c-b923-0e83551b3245/md2x';

/* Auswahl für „Was würden Sie sich mit dem 100-€-Gutschein kaufen?“
   – orientiert an den Sortimentsbereichen des Möbelhauses. */
const MOEBEL_WUNSCH = [
  'Polstermöbel (Sofa, Sessel)',
  'Wohnzimmer (Wohnwand, Regal, Tisch)',
  'Speisezimmer (Esstisch, Stühle)',
  'Schlafzimmer (Bett, Schrank)',
  'Matratzen & Lattenroste',
  'Kinder- & Jugendzimmer',
  'Küche & Küchenzubehör',
  'Bad',
  'Flur & Diele (Garderobe)',
  'Homeoffice (Schreibtisch, Bürostuhl)',
  'Wohnaccessoires & Deko',
  'Heimtextilien (Teppich, Vorhänge)',
  'Leuchten',
  'Weiß noch nicht – lasse mich beraten',
];
const GOOGLE = { rating: '4,8', count: '1.161', url: 'https://www.google.com/search?q=Interliving+B%C3%A4ucke+Northeim+Bewertungen' };

function GoogleG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ display: 'block', flex: 'none' }} aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  );
}

Object.assign(window, { EINSENDUNGEN, bildUrl, Ico, KID, Splat, PRIZES, VOTE_STEPS, VOTE_FAQS, REVIEWS, SEAL_URL, GOOGLE, GoogleG, MOEBEL_WUNSCH });
