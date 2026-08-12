/* Malwettbewerb landing — shared helpers, playful palette, data */

// Lucide icon helper (correct UMD API + defensive guards)
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

// Playful accent palette (from the flyer's paint splats)
const KID = {
  blue: '#29ABE2',
  pink: '#EC6EA9',
  green: '#8DC63F',
  orange: '#F7931E',
  yellow: 'var(--baeucke-yellow)',
  red: 'var(--baeucke-red)',
};

// A soft paint blob (organic, not a perfect circle)
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
  { place: '3. Preis', amount: '50 €', color: KID.blue, icon: 'Gift' },
];

const STEPS = [
  { n: '1', icon: 'Palette', title: 'Ausmalbild ausdrucken', text: 'Laden Sie das Ausmalbild mit unserem Möbelhaus herunter und drucken Sie es für Ihr Kind aus – dann kann es losmalen und sich Farben für Gebäude, Wiese und Himmel aussuchen.' },
  { n: '2', icon: 'Upload', title: 'Bild hochladen', text: 'Laden Sie ein Foto oder einen Scan des fertig ausgemalten Bildes bis spätestens ', textStark: '30.09.2026', textEnde: ' hier hoch.' },
  { n: '3', icon: 'Star', title: 'Preise gewinnen', text: 'Mit etwas Glück gehört Ihr Kind zu den Gewinnern und freut sich über einen ', textStark: 'Bäucke-Warengutschein!' },
];

const FAQS = [
  { q: 'Wer darf mitmachen?', a: 'Alle Kinder bis einschließlich 12 Jahre. Die Teilnahme ist kostenlos.' },
  { q: 'Bis wann kann das Bild eingereicht werden?', a: 'Einsendeschluss ist der 30.09.2026. Bilder, die später hochgeladen werden, können leider nicht berücksichtigt werden.' },
  { q: 'Wie reichen wir das Bild ein?', a: 'Ein Elternteil oder eine erziehungsberechtigte Person lädt ein Foto oder einen Scan des fertig ausgemalten Bildes über das Formular auf dieser Seite hoch.' },
  { q: 'Was kann mein Kind gewinnen?', a: 'Bäucke-Warengutscheine im Wert von 250 €, 150 € und 50 €. Die Gutscheine sind nicht in bar auszahlbar.' },
  { q: 'Wie werden die Gewinner:innen ermittelt?', a: 'Alle eingereichten Bilder werden veröffentlicht und können anschließend online bewertet werden. Die drei Bilder mit den meisten Stimmen gewinnen – gewertet wird der Stand zum Ende der Abstimmung.' },
  { q: 'Wie werden die Gewinner benachrichtigt?', a: 'Die Gewinner werden nach dem Einsendeschluss per E-Mail oder Telefon über die angegebenen Kontaktdaten informiert.' },
];

const REVIEWS = [
  { text: 'Das beste Möbelhaus im Umkreis. Sehr freundliche Mitarbeiter – hier ist der Kunde noch König. Nur zu empfehlen!', who: 'Google-Rezension' },
  { text: 'Von der sehr guten, freundlichen Beratung bis zum Aufbau hat alles reibungslos geklappt. Sauber und zügig.', who: 'Google-Rezension' },
  { text: 'Die Mitarbeiter waren freundlich und sehr kompetent. Auch die Planung im Vorfeld verlief super.', who: 'Google-Rezension' },
];

const SEAL_URL = 'https://onecdn.io/media/0dd284cc-e063-4b0c-b923-0e83551b3245/md2x';

const GOOGLE = {
  rating: '4,8',
  count: '1.161',
  url: 'https://www.google.com/search?q=Interliving+B%C3%A4ucke+Northeim+Bewertungen',
};

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

Object.assign(window, { Ico, KID, Splat, PRIZES, STEPS, FAQS, REVIEWS, SEAL_URL, GOOGLE, GoogleG });
