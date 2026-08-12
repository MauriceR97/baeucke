/* @ds-bundle: {"format":4,"namespace":"DesignSystem_9f5cef","components":[{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"campaigns/abstimmung/Gallery.jsx":"57cc693f52b6","campaigns/abstimmung/lib.jsx":"6314dd73b9c5","campaigns/abstimmung/sections.jsx":"10f18cbb5766","campaigns/malwettbewerb/UploadForm.jsx":"ff4993e3c5e3","campaigns/malwettbewerb/UploadForm.standalone.jsx":"a864a6028522","campaigns/malwettbewerb/lib.jsx":"ac6b05f57694","campaigns/malwettbewerb/sections.jsx":"e4730a5c2d3a","campaigns/malwettbewerb/sections.standalone.jsx":"0ee673a5199b","components/commerce/ProductCard.jsx":"a134d609d229","components/core/Badge.jsx":"266013e364a3","components/core/Button.jsx":"b7271761dd74","components/core/Card.jsx":"8c4a13ab2a02","components/core/IconButton.jsx":"f7a8c88affda","components/core/Input.jsx":"c40ac230913b","components/core/Tag.jsx":"511d79e47c18","ui_kits/website/Footer.jsx":"53e929c3cf3d","ui_kits/website/Header.jsx":"56710cc7ca4c","ui_kits/website/Hero.jsx":"5d96c6096389","ui_kits/website/ProductRail.jsx":"df268044a528","ui_kits/website/Screens.jsx":"5cd63755bb13","ui_kits/website/Sections.jsx":"cb67be2bbbac","ui_kits/website/lib.jsx":"c97fb5014a10"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_9f5cef = window.DesignSystem_9f5cef || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// campaigns/abstimmung/Gallery.jsx
try { (() => {
/* Abstimmungs-Landingpage — Galerie, Stimmabgabe & aktuelle Führung */

const VOTE_KEY = 'baeucke-malwettbewerb-stimme';

// Google-Sheets-Anbindung: Web-App-URL aus Apps Script hier eintragen
// (siehe Google-Sheets-Anleitung.md). Leer = Prototyp ohne Speichern.
const VOTE_ENDPOINT = '';

/* Gemeinsamer Zustand: eigene Stimme + Rangliste */
function useVoting() {
  const {
    EINSENDUNGEN,
    ladeEinsendungen
  } = window;
  const [eintraege, setEintraege] = React.useState(EINSENDUNGEN);
  const [ladeStatus, setLadeStatus] = React.useState(window.DATEN_URL ? 'laedt' : 'demo');
  const [meineStimme, setMeineStimme] = React.useState(null);
  const [anfrageFuer, setAnfrageFuer] = React.useState(null);

  // Einsendungen aus der Google-Tabelle nachladen (falls eingerichtet)
  React.useEffect(() => {
    let aktiv = true;
    ladeEinsendungen().then(liste => {
      if (!aktiv) return;
      if (liste) {
        setEintraege(liste);
        setLadeStatus('live');
      } else setLadeStatus(window.DATEN_URL ? 'fehler' : 'demo');
    });
    return () => {
      aktiv = false;
    };
  }, []);
  React.useEffect(() => {
    try {
      const v = localStorage.getItem(VOTE_KEY);
      if (v) setMeineStimme(v);
    } catch (e) {}
    const onChange = () => {
      try {
        setMeineStimme(localStorage.getItem(VOTE_KEY));
      } catch (e) {}
    };
    window.addEventListener('baeucke-vote', onChange);
    return () => window.removeEventListener('baeucke-vote', onChange);
  }, []);

  // Öffnet das Formular – abgestimmt wird erst nach Angabe der Kontaktdaten
  const abstimmen = id => {
    if (!meineStimme) setAnfrageFuer(id);
  };
  const abbrechen = () => setAnfrageFuer(null);
  const bestaetigen = daten => {
    const id = anfrageFuer;
    if (!id) return;
    if (VOTE_ENDPOINT) {
      const bild = eintraege.find(e => e.id === id) || {};
      fetch(VOTE_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          typ: 'stimme',
          ...daten,
          bildId: id,
          bildVorname: bild.vorname || ''
        })
      }).catch(function () {});
    }
    try {
      localStorage.setItem(VOTE_KEY, id);
    } catch (e) {}
    setMeineStimme(id);
    setAnfrageFuer(null);
    window.dispatchEvent(new Event('baeucke-vote'));
  };

  // Stand aus der Tabelle + die eigene, noch nicht übertragene Stimme
  const rangliste = React.useMemo(() => {
    return eintraege.map(e => ({
      ...e,
      gesamt: (e.stimmen || 0) + (meineStimme === e.id ? 1 : 0)
    })).sort((a, b) => b.gesamt - a.gesamt || String(a.vorname).localeCompare(String(b.vorname)));
  }, [meineStimme, eintraege]);
  return {
    meineStimme,
    abstimmen,
    rangliste,
    anfrageFuer,
    abbrechen,
    bestaetigen,
    ladeStatus
  };
}

/* Einzelne Bildkarte */
function ArtCard({
  e,
  platz,
  meineStimme,
  abstimmen,
  onZoom,
  gross
}) {
  const {
    bildUrl,
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  const url = bildUrl(e.bildLink);
  const gewaehlt = meineStimme === e.id;
  const medal = ['#F7931E', '#B8B8B8', '#D89C5E'][platz - 1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: `1px solid ${gewaehlt ? 'var(--baeucke-yellow)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: gewaehlt || gross ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transition: 'var(--transition-base)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => url && onZoom(e),
    "aria-label": `Bild von ${e.vorname} vergrößern`,
    style: {
      position: 'relative',
      aspectRatio: '4 / 3',
      border: 'none',
      padding: 0,
      background: '#EDEAE3',
      cursor: url ? 'zoom-in' : 'default',
      overflow: 'hidden'
    }
  }, url ? /*#__PURE__*/React.createElement("img", {
    src: url,
    alt: `Ausgemaltes Bild von ${e.vorname}, $`,
    loading: "lazy",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      color: 'var(--neutral-400)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "ImageOff",
    size: 30,
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 800,
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "Bild-Link fehlt")), platz && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: medal,
      color: 'var(--neutral-800)',
      fontWeight: 800,
      fontSize: gross ? 'var(--text-sm)' : 'var(--text-xs)',
      padding: gross ? '7px 14px' : '5px 11px',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Trophy",
    size: gross ? 16 : 13,
    color: "var(--neutral-800)"
  }), " Platz ", platz), gewaehlt && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--baeucke-yellow)',
      color: 'var(--neutral-800)',
      fontWeight: 800,
      fontSize: 'var(--text-xs)',
      padding: '6px 12px',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Check",
    size: 14,
    color: "var(--neutral-800)",
    strokeWidth: 3
  }), " Ihre Stimme")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: gross ? 'var(--space-5)' : 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: gross ? 'var(--text-xl)' : 'var(--text-lg)',
      color: 'var(--text-strong)',
      lineHeight: 1.2
    }
  }, e.vorname), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      fontSize: gross ? 'var(--text-h3)' : 'var(--text-xl)',
      color: 'var(--text-strong)',
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums'
    }
  }, e.gesamt), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Stimmen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, gewaehlt ? /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: gross ? 'md' : 'sm',
    fullWidth: true,
    disabled: true,
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Check",
      size: 16
    })
  }, "Abgestimmt") : /*#__PURE__*/React.createElement(Button, {
    variant: meineStimme ? 'ghost' : 'primary',
    size: gross ? 'md' : 'sm',
    fullWidth: true,
    disabled: !!meineStimme,
    onClick: () => onZoom(e),
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Heart",
      size: 16
    })
  }, meineStimme ? 'Stimme vergeben' : 'Abstimmen'))));
}

/* Kontaktdaten-Abfrage vor der Stimmabgabe (+ Verlosung 100 €) */
function VoteModal({
  bild,
  onClose,
  onBestaetigen
}) {
  const {
    Ico,
    bildUrl
  } = window;
  const {
    Input,
    Button
  } = window.DesignSystem_9f5cef;
  const [v, setV] = React.useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    plz: '',
    wunsch: ''
  });
  const [ok, setOk] = React.useState(false);
  const [werbung, setWerbung] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const set = k => e => setV(s => ({
    ...s,
    [k]: e.target.value
  }));
  const senden = ev => {
    ev.preventDefault();
    const err = {};
    if (!v.vorname.trim()) err.vorname = 'Bitte geben Sie Ihren Vornamen an.';
    if (!v.nachname.trim()) err.nachname = 'Bitte geben Sie Ihren Nachnamen an.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) err.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (!v.telefon.trim()) err.telefon = 'Bitte geben Sie eine Telefonnummer an.';
    if (!/^\d{5}$/.test(v.plz.trim())) err.plz = 'Bitte geben Sie eine 5-stellige PLZ an.';
    if (!ok) err.ok = 'Bitte bestätigen Sie die Datenschutzerklärung.';
    setErrors(err);
    if (Object.keys(err).length === 0) onBestaetigen({
      ...v,
      datenschutz: ok,
      werbung
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 80,
      background: 'rgba(35,35,35,0.66)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 'var(--space-5)',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onClick: e => e.stopPropagation(),
    onSubmit: senden,
    noValidate: true,
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      width: 'min(560px, 100%)',
      padding: 'var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      margin: 'auto 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, bildUrl(bild.bildLink) && /*#__PURE__*/React.createElement("img", {
    src: bildUrl(bild.bildLink),
    alt: "",
    style: {
      width: 64,
      height: 48,
      objectFit: 'cover',
      borderRadius: 'var(--radius-sm)',
      flex: 'none',
      background: '#EDEAE3'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Stimme f\xFCr ", bild.vorname), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--text-h3)'
    }
  }, "Nur noch ein Schritt"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Schlie\xDFen",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "X",
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      background: 'var(--yellow-50)',
      border: '1px solid var(--yellow-200)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--baeucke-yellow)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Gift",
    size: 22,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "Gewinnspiel:"), " Mit deiner Stimme nimmst du an der Verlosung eines 100 \u20AC Gutscheins teil \u2013 und erh\xE4ltst nach dem Absenden eine kleine \xDCberraschung von uns. \uD83C\uDF81")), /*#__PURE__*/React.createElement("div", {
    className: "f-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Vorname",
    placeholder: "Vorname",
    value: v.vorname,
    onChange: set('vorname'),
    error: errors.vorname
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Nachname",
    placeholder: "Nachname",
    value: v.nachname,
    onChange: set('nachname'),
    error: errors.nachname
  })), /*#__PURE__*/React.createElement(Input, {
    label: "E-Mail",
    type: "email",
    placeholder: "ihre@email.de",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Mail",
      size: 18
    }),
    value: v.email,
    onChange: set('email'),
    error: errors.email
  }), /*#__PURE__*/React.createElement("div", {
    className: "f-row",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Telefon",
    placeholder: "0151 \u2026",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Phone",
      size: 18
    }),
    value: v.telefon,
    onChange: set('telefon'),
    error: errors.telefon
  }), /*#__PURE__*/React.createElement(Input, {
    label: "PLZ",
    placeholder: "37154",
    inputMode: "numeric",
    maxLength: 5,
    value: v.plz,
    onChange: set('plz'),
    error: errors.plz
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "wunsch",
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginBottom: 6
    }
  }, "Was w\xFCrden Sie sich mit dem 100-\u20AC-Gutschein kaufen?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: 'var(--surface-card)',
      border: '1.5px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '0 8px 0 14px',
      minHeight: 46
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: "wunsch",
    value: v.wunsch,
    onChange: set('wunsch'),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 'var(--text-md)',
      color: v.wunsch ? 'var(--text-body)' : 'var(--text-faint)',
      padding: '12px 0',
      cursor: 'pointer',
      appearance: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Bitte ausw\xE4hlen \u2026"), (window.MOEBEL_WUNSCH || []).map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m))), /*#__PURE__*/React.createElement(Ico, {
    name: "ChevronDown",
    size: 18,
    color: "var(--text-muted)"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOk(!ok),
    style: {
      flex: 'none',
      width: 24,
      height: 24,
      marginTop: 1,
      borderRadius: 'var(--radius-sm)',
      border: `2px solid ${ok ? 'var(--neutral-800)' : errors.ok ? 'var(--red-500)' : 'var(--border-default)'}`,
      background: ok ? 'var(--neutral-800)' : 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-base)'
    }
  }, ok && /*#__PURE__*/React.createElement(Ico, {
    name: "Check",
    size: 16,
    color: "#fff",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 1.45
    }
  }, "Ich habe die ", /*#__PURE__*/React.createElement("a", {
    href: "#datenschutz",
    onClick: ev => ev.stopPropagation(),
    style: {
      color: 'var(--text-strong)',
      fontWeight: 700,
      textDecoration: 'underline'
    }
  }, "Datenschutzerkl\xE4rung"), " gelesen und bin damit einverstanden, dass meine Daten zur Durchf\xFChrung der Abstimmung und der Verlosung gespeichert und verarbeitet werden.*")), errors.ok && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0 36px',
      fontSize: 'var(--text-xs)',
      color: 'var(--red-500)',
      fontWeight: 600
    }
  }, errors.ok)), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setWerbung(!werbung),
    style: {
      flex: 'none',
      width: 24,
      height: 24,
      marginTop: 1,
      borderRadius: 'var(--radius-sm)',
      border: `2px solid ${werbung ? 'var(--neutral-800)' : 'var(--border-default)'}`,
      background: werbung ? 'var(--neutral-800)' : 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-base)'
    }
  }, werbung && /*#__PURE__*/React.createElement(Ico, {
    name: "Check",
    size: 16,
    color: "#fff",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 1.45
    }
  }, "M\xF6bel B\xE4ucke darf mich per E-Mail \xFCber Aktionen und Angebote informieren. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "(Freiwillig, jederzeit widerrufbar.)"))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Heart",
      size: 18
    })
  }, "Stimme abgeben"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)',
      textAlign: 'center'
    }
  }, "* Pflichtfeld. Pro Person ist eine Stimme m\xF6glich. Der Gutschein ist nicht in bar auszahlbar.")));
}

/* Großansicht mit Teilen-Funktion und Abstimm-Button */
function Lightbox({
  e,
  onClose,
  meineStimme,
  abstimmen
}) {
  const {
    bildUrl,
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  const [kopiert, setKopiert] = React.useState(false);
  const link = React.useMemo(() => {
    try {
      const u = new URL(window.location.href);
      u.hash = '';
      u.searchParams.set('bild', e.id);
      return u.toString();
    } catch (err) {
      return window.location.href;
    }
  }, [e.id]);
  const text = `Schau dir das Bild von ${e.vorname} ($) beim Bäucke-Malwettbewerb an und stimme ab:`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`;
  const kopieren = async () => {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(link);else {
        const ta = document.createElement('textarea');
        ta.value = link;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2200);
    } catch (err) {/* no-op */}
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'rgba(35,35,35,0.72)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 'var(--space-5)',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: ev => ev.stopPropagation(),
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden',
      maxWidth: 'min(880px, 100%)',
      width: '100%',
      margin: 'auto 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: bildUrl(e.bildLink),
    alt: `Ausgemaltes Bild von ${e.vorname}`,
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      maxHeight: '62vh',
      objectFit: 'contain',
      background: '#EDEAE3'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Schlie\xDFen",
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      background: 'rgba(255,255,255,0.94)',
      boxShadow: 'var(--shadow-sm)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "X",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 'var(--text-h3)',
      color: 'var(--text-strong)',
      lineHeight: 1.15
    }
  }, e.vorname), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, e.gesamt, " Stimmen")), meineStimme === e.id ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'var(--green-100)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4) var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "CircleCheck",
    size: 22,
    color: "var(--green-500)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Sie haben f\xFCr dieses Bild abgestimmt \u2013 vielen Dank!")) : meineStimme ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'var(--neutral-100)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4) var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Info",
    size: 20,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, "Sie haben Ihre Stimme bereits abgegeben.")) : /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Heart",
      size: 18
    }),
    onClick: () => abstimmen(e.id)
  }, "F\xFCr dieses Bild abstimmen"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginBottom: 12
    }
  }, "Bild teilen und andere zum Abstimmen einladen"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: waLink,
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "MessageCircle",
      size: 18
    })
  }, "Per WhatsApp teilen")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: kopieren,
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: kopiert ? 'Check' : 'Link',
      size: 18
    })
  }, kopiert ? 'Link kopiert' : 'Link kopieren'))))));
}

/* Alle Bilder – die drei Führenden stehen größer an erster Stelle */
function Gallery() {
  const {
    Ico
  } = window;
  const {
    meineStimme,
    abstimmen,
    rangliste,
    anfrageFuer,
    abbrechen,
    bestaetigen,
    ladeStatus
  } = window.__voting;
  const [lightbox, setLightbox] = React.useState(null);
  const top3 = rangliste.slice(0, 3);
  const rest = rangliste.slice(3);
  const anfrageBild = anfrageFuer ? rangliste.find(e => e.id === anfrageFuer) : null;

  // Geteilten Link (?bild=<id>) auswerten: passendes Bild direkt groß öffnen
  const deepLinkErledigt = React.useRef(false);
  React.useEffect(() => {
    if (deepLinkErledigt.current || rangliste.length === 0) return;
    deepLinkErledigt.current = true;
    let id = null;
    try {
      id = new URLSearchParams(window.location.search).get('bild');
    } catch (err) {
      return;
    }
    if (!id) return;
    const treffer = rangliste.find(e => e.id === id);
    if (!treffer) return; // unbekannte/veraltete Kennung → normale Galerie
    setLightbox(treffer);
    const el = document.getElementById('galerie');
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 16
    });
  }, [rangliste]);
  return /*#__PURE__*/React.createElement("section", {
    id: "galerie",
    style: {
      background: '#FDFBF3'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Die Kunstwerke"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 8px'
    }
  }, "Alle ", rangliste.length, " Bilder"), ladeStatus === 'laedt' ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Die Einsendungen werden geladen \u2026") : /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      margin: 0
    }
  }, meineStimme ? 'Vielen Dank – Ihre Stimme ist gespeichert. Aktuell führen diese drei Bilder.' : 'Aktuell führen diese drei Bilder. Klicken Sie auf ein Bild, um es größer zu sehen.'), ladeStatus === 'fehler' && /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 'var(--space-3)',
      marginBottom: 0,
      background: 'var(--red-100)',
      borderRadius: 'var(--radius-md)',
      padding: '8px 16px',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--red-700)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "TriangleAlert",
    size: 16,
    color: "var(--red-700)"
  }), " Die Tabelle ist gerade nicht erreichbar \u2013 angezeigt wird der zuletzt hinterlegte Stand."), !meineStimme && /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 'var(--space-4)',
      marginBottom: 0,
      background: 'var(--yellow-50)',
      border: '1px solid var(--yellow-200)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 18px',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Gift",
    size: 16,
    color: "var(--neutral-800)"
  }), " Unter allen Abstimmenden verlosen wir einen 100-\u20AC-Gutschein")), /*#__PURE__*/React.createElement("div", {
    className: "top-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-6)',
      alignItems: 'start',
      marginBottom: 'var(--space-10)'
    }
  }, top3.map((e, i) => /*#__PURE__*/React.createElement(ArtCard, {
    key: e.id,
    e: e,
    platz: i + 1,
    gross: true,
    meineStimme: meineStimme,
    abstimmen: abstimmen,
    onZoom: setLightbox
  }))), rest.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "gal-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-5)'
    }
  }, rest.map(e => /*#__PURE__*/React.createElement(ArtCard, {
    key: e.id,
    e: e,
    platz: null,
    meineStimme: meineStimme,
    abstimmen: abstimmen,
    onZoom: setLightbox
  })))), lightbox && /*#__PURE__*/React.createElement(Lightbox, {
    e: lightbox,
    onClose: () => setLightbox(null),
    meineStimme: meineStimme,
    abstimmen: abstimmen
  }), anfrageBild && /*#__PURE__*/React.createElement(VoteModal, {
    bild: anfrageBild,
    onClose: abbrechen,
    onBestaetigen: bestaetigen
  }));
}
Object.assign(window, {
  useVoting,
  ArtCard,
  VoteModal,
  Lightbox,
  Gallery
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "campaigns/abstimmung/Gallery.jsx", error: String((e && e.message) || e) }); }

// campaigns/abstimmung/lib.jsx
try { (() => {
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
const DATEN_URL = '';

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
  bildLink: 'assets/schritte-abstimmung.png',
  stimmen: 96
}, {
  id: 'e03',
  vorname: 'Emilia',
  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png',
  stimmen: 152
}, {
  id: 'e04',
  vorname: 'Ben',
  bildLink: 'assets/schritte-abstimmung.png',
  stimmen: 74
}, {
  id: 'e05',
  vorname: 'Lina',
  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png',
  stimmen: 111
}, {
  id: 'e06',
  vorname: 'Paul',
  bildLink: 'assets/schritte-abstimmung.png',
  stimmen: 43
}, {
  id: 'e07',
  vorname: 'Sophie',
  bildLink: '../malwettbewerb/assets/ausmalbild-beispiel.png',
  stimmen: 88
}, {
  id: 'e08',
  vorname: 'Felix',
  bildLink: 'assets/schritte-abstimmung.png',
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "campaigns/abstimmung/lib.jsx", error: String((e && e.message) || e) }); }

// campaigns/abstimmung/sections.jsx
try { (() => {
/* Abstimmungs-Landingpage — Sektionen */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({
    top: el.getBoundingClientRect().top + window.pageYOffset - 16,
    behavior: 'smooth'
  });
}
function Header() {
  const {
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '12px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "hd-logo",
    src: "../../assets/logos/Logo-Baeucke-gelb.svg",
    alt: "Interliving B\xE4ucke",
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hide-sm",
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, "Abstimmung bis 31.10.2026"), /*#__PURE__*/React.createElement(Button, {
    className: "cta-desktop",
    variant: "primary",
    onClick: () => scrollToId('galerie')
  }, "Jetzt abstimmen und 100-\u20AC-Gutschein gewinnen"), /*#__PURE__*/React.createElement(Button, {
    className: "baeucke-cta cta-mobile",
    variant: "primary",
    size: "sm",
    onClick: () => scrollToId('galerie')
  }, "Jetzt abstimmen"))));
}
function Hero() {
  const {
    Ico,
    KID,
    Splat,
    EINSENDUNGEN
  } = window;
  const palette = [KID.red, KID.orange, KID.yellow, KID.green, KID.blue, KID.pink];
  const wort = 'deine Stimme';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--yellow-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(assets/hero-kind-malt.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center 42%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-scrim",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, #FFFFFF, #FFFFFFD9, #FFFFFFC8, #FFFFFF1E, #FFFFFF00)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 90,
      background: 'linear-gradient(to bottom, rgba(247,247,246,0) 0%, var(--surface-page) 100%)'
    }
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.blue,
    size: 120,
    style: {
      top: 40,
      left: -30,
      opacity: 0.16
    },
    rotate: 20
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.pink,
    size: 90,
    style: {
      top: 130,
      right: 70,
      opacity: 0.16
    },
    rotate: -15
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-wrap",
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-20) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy",
    style: {
      maxWidth: 620
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--baeucke-yellow)',
      color: 'var(--neutral-800)',
      fontWeight: 800,
      fontSize: 'var(--text-sm)',
      padding: '7px 16px',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Sparkles",
    size: 16,
    color: "var(--neutral-800)"
  }), " ", EINSENDUNGEN.length, " Bilder sind eingegangen"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '20px 0 18px',
      fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
      fontWeight: 900,
      lineHeight: 1.04,
      letterSpacing: '-0.02em'
    }
  }, "Der gro\xDFe Malwettbewerb hat stattgefunden \u2013 jetzt z\xE4hlt", ' ', wort.split('').map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: palette[i % palette.length]
    }
  }, c)), "!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xl)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, "Viele Kinder haben unser M\xF6belhaus in ihren sch\xF6nsten Farben gestaltet. Schauen Sie sich alle Kunstwerke an und stimmen Sie f\xFCr Ihr Lieblingsbild \u2013 die drei Bilder mit den meisten Stimmen gewinnen."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 24,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: 'var(--neutral-800)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 20px',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-md)',
      background: 'var(--baeucke-yellow)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Gift",
    size: 24,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.25
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 800,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--baeucke-yellow)'
    }
  }, "Ihr Gewinn f\xFCrs Abstimmen"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 900,
      color: '#fff'
    }
  }, "100-\u20AC-Gutschein")))))));
}
function Countdown() {
  const {
    Ico
  } = window;
  const target = new Date('2026-10-31T23:59:59').getTime();
  const calc = () => {
    const d = Math.max(0, target - Date.now());
    return {
      Tage: Math.floor(d / 86400000),
      Stunden: Math.floor(d / 3600000 % 24),
      Minuten: Math.floor(d / 60000 % 60),
      Sekunden: Math.floor(d / 1000 % 60)
    };
  };
  const [t, setT] = React.useState(calc());
  React.useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--baeucke-yellow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-8)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--neutral-800)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "CalendarClock",
    size: 26,
    color: "var(--neutral-800)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 'var(--text-xl)',
      color: '#363636'
    }
  }, "Die Abstimmung l\xE4uft noch!")), /*#__PURE__*/React.createElement("div", {
    className: "cd-row",
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, Object.entries(t).map(([label, val]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      background: 'rgba(255,255,255,0.30)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 16px',
      minWidth: 74,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 900,
      color: '#363636',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, String(val).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--neutral-600)',
      marginTop: 6
    }
  }, label))))));
}
function Steps() {
  const {
    Ico,
    KID,
    VOTE_STEPS
  } = window;
  const colors = [KID.pink, KID.blue, KID.green];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: '#F7F3DD'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      paddingBottom: 'calc(var(--section-y) + 60px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "steps-split",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "So stimmen Sie ab"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "In drei Schritten zur Stimme")), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, VOTE_STEPS.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s.n,
    style: {
      position: 'relative',
      display: 'flex',
      gap: 'var(--space-5)',
      paddingBottom: i === VOTE_STEPS.length - 1 ? 0 : 'var(--space-8)'
    }
  }, i < VOTE_STEPS.length - 1 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 26.5,
      top: 56,
      bottom: 0,
      borderLeft: '3px dashed var(--neutral-300)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      flex: 'none',
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-pill)',
      background: colors[i],
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
      fontSize: 'var(--text-h4)',
      boxShadow: 'var(--shadow-md)',
      border: '4px solid #F7F3DD'
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: colors[i],
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)'
    }
  }, s.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)',
      maxWidth: 460
    }
  }, s.text, s.textStark && /*#__PURE__*/React.createElement("b", null, s.textStark), s.textEnde)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/schritte-abstimmung.png",
    alt: "Zwei ausgemalte Bilder des B\xE4ucke M\xF6belhauses \u2013 welches gef\xE4llt Ihnen besser?",
    style: {
      display: 'block',
      width: '100%',
      maxWidth: 700,
      height: 'auto'
    }
  })))), /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 1440 90",
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -1,
      width: '100%',
      height: 90,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#FDFBF3",
    d: "M0,52 C240,96 480,4 720,34 C960,64 1200,88 1440,44 L1440,90 L0,90 Z"
  })));
}
function Prizes() {
  const {
    Ico,
    PRIZES
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    id: "preise",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Ihr Gewinn f\xFCr das Abstimmen"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 8px'
    }
  }, "100-\u20AC-Gutschein f\xFCr Sie"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Jede Stimme nimmt automatisch an der Verlosung teil.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-10)',
      flexWrap: 'wrap',
      background: 'var(--neutral-800)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-12)',
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      flex: 1,
      minWidth: 280
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 92,
      height: 92,
      flex: 'none',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--baeucke-yellow)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Gift",
    size: 46,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      color: 'rgba(255,255,255,0.75)'
    }
  }, "Warengutschein in H\xF6he von"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'clamp(3.25rem, 8vw, 4.75rem)',
      fontWeight: 900,
      color: 'var(--baeucke-yellow)',
      lineHeight: 1.02
    }
  }, "100 \u20AC"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 280
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 6px',
      color: '#fff',
      fontSize: 'var(--text-lg)',
      fontWeight: 700
    }
  }, "Unter allen Abstimmenden verlost"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'rgba(255,255,255,0.85)',
      fontSize: 'var(--text-md)'
    }
  }, "Geben Sie einfach Ihre Stimme f\xFCr Ihr Lieblingsbild ab \u2013 dazu ben\xF6tigen wir nur Ihren Namen und Ihre E-Mail-Adresse. Der Gutschein ist nicht in bar auszahlbar."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 'var(--space-16)',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Palette",
    size: 20,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 800,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#A04E00'
    }
  }, "Und f\xFCr die Kinder"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--text-h4)'
    }
  }, "Das gewinnen die drei Bilder mit den meisten Stimmen"))), /*#__PURE__*/React.createElement("div", {
    className: "prize-row",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-4)'
    }
  }, PRIZES.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.place,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      background: '#F6F2E1',
      border: '1px solid rgba(238,200,3,0.20)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: p.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: p.icon,
    size: 22,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 800,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, p.place), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h4)',
      fontWeight: 900,
      color: 'var(--text-strong)',
      lineHeight: 1.1
    }
  }, p.amount))))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      marginTop: 'var(--space-4)'
    }
  }, "* Gutscheine sind nicht in bar auszahlbar. Die Familien werden \xFCber die beim Upload angegebenen Kontaktdaten benachrichtigt."));
}
function Stars({
  size = 18
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2,
      color: '#F7A800',
      fontSize: size,
      lineHeight: 1
    }
  }, '★★★★★'.split('').map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, s)));
}
function Reviews() {
  const {
    Ico,
    REVIEWS,
    SEAL_URL,
    GOOGLE,
    GoogleG
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#F7F7F7'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Das sagen unsere Kunden"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Ausgezeichnet bewertet bei Google")), /*#__PURE__*/React.createElement("img", {
    src: SEAL_URL,
    alt: "Auszeichnung / Siegel",
    style: {
      height: 110,
      width: 'auto',
      flex: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5) var(--space-6)',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(GoogleG, {
    size: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)'
    }
  }, "Google", /*#__PURE__*/React.createElement("br", null), "Bewertungen")), /*#__PURE__*/React.createElement("div", {
    className: "hide-sm",
    style: {
      width: 1,
      height: 44,
      background: 'var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'clamp(2.25rem, 5vw, 2.75rem)',
      fontWeight: 900,
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, GOOGLE.rating), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, GOOGLE.count, " Rezensionen"))), /*#__PURE__*/React.createElement("a", {
    href: GOOGLE.url,
    target: "_blank",
    rel: "noopener",
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--text-strong)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, "Alle Bewertungen ansehen ", /*#__PURE__*/React.createElement(Ico, {
    name: "ExternalLink",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "step-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-5)'
    }
  }, REVIEWS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Stars, null), /*#__PURE__*/React.createElement(Ico, {
    name: "Quote",
    size: 22,
    color: "var(--border-default)"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)',
      flex: 1
    }
  }, "\u201E", r.text, "\u201C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "User",
    size: 18,
    color: "var(--neutral-700)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, r.who)))))));
}
function StoreInfo() {
  const {
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  const hours = [{
    label: 'Möbelhaus',
    rows: ['Mo.–Fr. 9.30–19.00 Uhr', 'Sa. 9.30–18.00 Uhr']
  }, {
    label: 'Lager',
    rows: ['Mo.–Fr. 9.30–17.00 Uhr', 'Sa. 10.00–14.00 Uhr']
  }, {
    label: 'Büro',
    rows: ['Mo.–Sa. 8.00–17.30 Uhr']
  }];
  const mapSrc = 'https://www.google.com/maps?q=M%C3%B6belhaus%20B%C3%A4ucke%20%C3%9Cber%20dem%20Hellewege%2012%2037154%20Northeim&output=embed';
  return /*#__PURE__*/React.createElement("section", {
    id: "besuch",
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Besuchen Sie uns"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Ihr M\xF6belhaus in Northeim")), /*#__PURE__*/React.createElement("div", {
    className: "hero-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 'var(--space-8)',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      minHeight: 360
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "Standort Interliving B\xE4ucke",
    src: mapSrc,
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
    style: {
      width: '100%',
      height: '100%',
      minHeight: 360,
      border: 0,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "MapPin",
    size: 20,
    color: "var(--baeucke-yellow)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "M\xF6belhaus B\xE4ucke GmbH & Co. KG", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, "\xDCber dem Hellewege 12 \xB7 37154 Northeim"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, hours.map(h => /*#__PURE__*/React.createElement("div", {
    key: h.label,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Clock",
    size: 15,
    color: "var(--text-muted)"
  }), " ", h.label), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, h.rows.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'block'
    }
  }, r))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Phone",
    size: 16,
    color: "var(--baeucke-yellow)"
  }), " 05551 / 9735-0"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Mail",
    size: 16,
    color: "var(--baeucke-yellow)"
  }), " info@baeucke.de")), /*#__PURE__*/React.createElement("a", {
    href: "https://www.google.com/maps/dir/?api=1&destination=M%C3%B6belhaus%20B%C3%A4ucke%20Northeim",
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Navigation",
      size: 18
    }),
    fullWidth: true
  }, "Route planen"))))));
}
function FAQ() {
  const {
    Ico,
    VOTE_FAQS
  } = window;
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    style: {
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Teilnahmebedingungen & FAQ"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "H\xE4ufige Fragen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, VOTE_FAQS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(open === i ? -1 : i),
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      padding: 'var(--space-5) var(--space-6)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)'
    }
  }, f.q, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      color: 'var(--baeucke-yellow)',
      transform: open === i ? 'rotate(180deg)' : 'none',
      transition: 'var(--transition-base)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "ChevronDown",
    size: 22
  }))), open === i && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-6) var(--space-5)',
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)'
    }
  }, f.a))))));
}
function Footer() {
  const {
    Ico
  } = window;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--neutral-800)',
      color: 'var(--neutral-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/Logo-Baeucke-weiss.svg",
    alt: "Interliving B\xE4ucke",
    style: {
      height: 44,
      alignSelf: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'rgba(255,255,255,0.75)',
      fontSize: 'var(--text-sm)'
    }
  }, "M\xF6belhaus B\xE4ucke GmbH & Co. KG \xB7 \xDCber dem Hellewege 12 \xB7 37154 Northeim")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,0.8)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Phone",
    size: 16
  }), " 05551 / 9735-0"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Mail",
    size: 16
  }), " info@baeucke.de"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Globe",
    size: 16
  }), " www.baeucke.de"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '16px var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      fontSize: 'var(--text-xs)',
      color: 'rgba(255,255,255,0.6)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 M\xF6belhaus B\xE4ucke GmbH & Co. KG"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", null, "Teilnahmebedingungen"), /*#__PURE__*/React.createElement("span", null, "Datenschutz"), /*#__PURE__*/React.createElement("span", null, "Impressum")))));
}
Object.assign(window, {
  scrollToId,
  Header,
  Hero,
  Countdown,
  Steps,
  Prizes,
  Stars,
  Reviews,
  StoreInfo,
  FAQ,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "campaigns/abstimmung/sections.jsx", error: String((e && e.message) || e) }); }

// campaigns/malwettbewerb/UploadForm.jsx
try { (() => {
/* Malwettbewerb landing — upload form (formal "Sie", validation + success) */

// Google-Sheets-Anbindung: Web-App-URL aus Apps Script hier eintragen (siehe
// Google-Sheets-Anleitung.md). Leer = Prototyp-Modus ohne Speichern.
const SHEET_ENDPOINT = '';

// Bilder werden vor dem Upload im Browser verkleinert: Handyfotos sind oft
// 5–12 MB und würden Apps Script sprengen. 2000 px lange Kante reicht für
// Ausmalbilder völlig aus.
const MAX_KANTE = 2000;
const ZIEL_BYTES = 1024 * 1024; // ~1 MB

function verkleinern(datei) {
  return new Promise(fertig => {
    // Formate, die der Browser evtl. nicht zeichnen kann (z. B. HEIC) → Original behalten
    if (!/^image\/(jpeg|png|webp)$/i.test(datei.type)) {
      fertig(datei);
      return;
    }
    const url = URL.createObjectURL(datei);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const faktor = Math.min(1, MAX_KANTE / Math.max(img.width, img.height));
      if (faktor === 1 && datei.size <= ZIEL_BYTES) {
        fertig(datei);
        return;
      }
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * faktor);
      c.height = Math.round(img.height * faktor);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, c.width, c.height); // weißer Grund statt schwarz bei PNG
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const stufen = [0.85, 0.75, 0.65, 0.55];
      let i = 0;
      const versuch = () => {
        c.toBlob(blob => {
          if (!blob) {
            fertig(datei);
            return;
          }
          if (blob.size > ZIEL_BYTES && i < stufen.length - 1) {
            i++;
            versuch();
            return;
          }
          const name = datei.name.replace(/\.[^.]+$/, '') + '.jpg';
          fertig(new File([blob], name, {
            type: 'image/jpeg'
          }));
        }, 'image/jpeg', stufen[i]);
      };
      versuch();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      fertig(datei);
    };
    img.src = url;
  });
}
function UploadForm() {
  const {
    Ico,
    KID,
    Splat
  } = window;
  const {
    Input,
    Button
  } = window.DesignSystem_9f5cef;
  const [v, setV] = React.useState({
    child: '',
    parent: '',
    email: '',
    phone: ''
  });
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [consentData, setConsentData] = React.useState(false);
  const [consentPub, setConsentPub] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [drag, setDrag] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [pruefe, setPruefe] = React.useState(false);
  const fileRef = React.useRef(null);
  const set = k => e => setV(s => ({
    ...s,
    [k]: e.target.value
  }));
  const takeFile = async f => {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setErrors(e => ({
        ...e,
        file: 'Bitte laden Sie eine Bilddatei hoch (JPG oder PNG).'
      }));
      return;
    }
    setErrors(e => ({
      ...e,
      file: undefined
    }));
    setPruefe(true);
    const klein = await verkleinern(f);
    setFile(klein);
    setPreview(URL.createObjectURL(klein));
    setPruefe(false);
  };
  const validate = () => {
    const e = {};
    if (!v.child.trim()) e.child = 'Bitte geben Sie den Vornamen des Kindes an.';
    if (!v.parent.trim()) e.parent = 'Bitte geben Sie Ihren Namen an.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (!v.phone.trim()) e.phone = 'Bitte geben Sie eine Telefonnummer an.';
    if (!file) e.file = 'Bitte laden Sie ein Foto des ausgemalten Bildes hoch.';
    if (!consentData) e.consentData = 'Ihre Einwilligung ist für die Teilnahme erforderlich.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = ev => {
    ev.preventDefault();
    if (!validate()) return;
    const done = () => {
      setSending(false);
      setSent(true);
      window.scrollTo({
        top: document.getElementById('upload').getBoundingClientRect().top + window.pageYOffset - 16,
        behavior: 'smooth'
      });
    };
    if (!SHEET_ENDPOINT) {
      done();
      return;
    } // Prototyp-Modus
    setSending(true);
    const reader = new FileReader();
    reader.onload = () => {
      fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          typ: 'einsendung',
          kindVorname: v.child,
          elternName: v.parent,
          email: v.email,
          telefon: v.phone,
          bildName: file && file.name,
          bildTyp: file && file.type,
          bildBase64: reader.result,
          einwilligungDaten: consentData,
          einwilligungVeroeffentlichung: consentPub
        })
      }).then(done).catch(done);
    };
    reader.onerror = done;
    reader.readAsDataURL(file);
  };
  const checkboxRow = (checked, setChecked, err, children) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setChecked(!checked),
    style: {
      flex: 'none',
      width: 24,
      height: 24,
      marginTop: 1,
      borderRadius: 'var(--radius-sm)',
      border: `2px solid ${checked ? 'var(--neutral-800)' : err ? 'var(--red-500)' : 'var(--border-default)'}`,
      background: checked ? 'var(--neutral-800)' : 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-base)'
    }
  }, checked && /*#__PURE__*/React.createElement(Ico, {
    name: "Check",
    size: 16,
    color: "#fff",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 1.45
    }
  }, children)), err && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0 36px',
      fontSize: 'var(--text-xs)',
      color: 'var(--red-500)',
      fontWeight: 600
    }
  }, err));
  return /*#__PURE__*/React.createElement("section", {
    id: "upload",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(assets/upload-hintergrund.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(247,247,246,0.72) 0%, rgba(247,247,246,0.55) 45%, rgba(247,247,246,0.72) 100%)'
    }
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.yellow,
    size: 120,
    style: {
      top: 60,
      right: -20,
      opacity: 0.16
    },
    rotate: -20
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.pink,
    size: 90,
    style: {
      bottom: 40,
      left: 20,
      opacity: 0.14
    },
    rotate: 25
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 760,
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      border: '4px solid #FCF1B8',
      background: '#FCF1B8',
      fontSize: '15px'
    }
  }, "Bild einreichen"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 8px'
    }
  }, "Fertiges Bild hochladen"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Das Formular f\xFCllt bitte ein Elternteil oder eine erziehungsberechtigte Person aus.")), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-md)',
      padding: 'var(--space-12)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 76,
      margin: '0 auto 18px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--green-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "PartyPopper",
    size: 38,
    color: "var(--green-500)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 10px'
    }
  }, "Vielen Dank f\xFCr die Einsendung!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      maxWidth: 460,
      margin: '0 auto'
    }
  }, "Das Bild von ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, v.child), " ist bei uns eingegangen. Nach dem Einsendeschluss am 30.09.2026 benachrichtigen wir die Gewinner \xFCber Ihre angegebenen Kontaktdaten. Wir dr\xFCcken die Daumen!"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      setSent(false);
      setV({
        child: '',
        parent: '',
        email: '',
        phone: ''
      });
      setFile(null);
      setPreview(null);
      setConsentData(false);
      setConsentPub(false);
    }
  }, "Weiteres Bild einreichen"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    className: "form-card",
    style: {
      background: 'var(--surface-card)',
      border: '1.5px solid #EEC803',
      borderRadius: 'var(--radius-xl)',
      boxShadow: '0 4px 12px 0 rgba(35,35,35,0.36)',
      padding: 'var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Vorname des Kindes",
    placeholder: "z. B. Mia",
    value: v.child,
    onChange: set('child'),
    error: errors.child
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Ihr Name (Erziehungsberechtigte:r)",
    placeholder: "Vor- und Nachname",
    value: v.parent,
    onChange: set('parent'),
    error: errors.parent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    },
    className: "f-row"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "E-Mail",
    type: "email",
    placeholder: "ihre@email.de",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Mail",
      size: 18
    }),
    value: v.email,
    onChange: set('email'),
    error: errors.email
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telefon",
    placeholder: "0151 \u2026",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Phone",
      size: 18
    }),
    value: v.phone,
    onChange: set('phone'),
    error: errors.phone
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginBottom: 6
    }
  }, "Foto des ausgemalten Bildes"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/*",
    hidden: true,
    onChange: e => takeFile(e.target.files[0])
  }), /*#__PURE__*/React.createElement("div", {
    onClick: () => fileRef.current && fileRef.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      takeFile(e.dataTransfer.files[0]);
    },
    style: {
      cursor: 'pointer',
      border: `2px dashed ${errors.file ? 'var(--red-500)' : drag ? 'var(--neutral-700)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-lg)',
      background: drag ? 'var(--yellow-50)' : 'var(--surface-page)',
      padding: 'var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      textAlign: 'center',
      transition: 'var(--transition-base)'
    }
  }, pruefe ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Loader",
    size: 26,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Bild wird vorbereitet \u2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "Einen Moment bitte")) : preview ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: preview,
    alt: "Vorschau",
    style: {
      maxHeight: 160,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--green-500)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "CircleCheck",
    size: 16,
    color: "var(--green-500)"
  }), " ", file && file.name, " \u2014 zum \xC4ndern klicken")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "ImageUp",
    size: 26,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Foto hierher ziehen oder klicken"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "JPG oder PNG \xB7 ein Foto oder Scan des fertigen Bildes"))), errors.file && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--text-xs)',
      color: 'var(--red-500)',
      fontWeight: 600
    }
  }, errors.file)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      marginTop: 4
    }
  }, checkboxRow(consentData, setConsentData, errors.consentData, /*#__PURE__*/React.createElement(React.Fragment, null, "Ich bin einverstanden, dass die angegebenen Daten zur Durchf\xFChrung des Malwettbewerbs gespeichert und verarbeitet werden. ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "(Pflicht)"))), checkboxRow(consentPub, setConsentPub, null, /*#__PURE__*/React.createElement(React.Fragment, null, "Ich bin damit einverstanden, dass das eingereichte Bild von Interliving B\xE4ucke (z. B. auf Website und Social Media) ver\xF6ffentlicht werden darf. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "(optional)")))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    fullWidth: true,
    disabled: sending || pruefe,
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      name: sending ? 'Loader' : 'Send',
      size: 18
    })
  }, sending ? 'Wird gesendet …' : pruefe ? 'Bild wird vorbereitet …' : 'Bild jetzt einreichen'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)',
      textAlign: 'center'
    }
  }, "Mit dem Absenden best\xE4tigen Sie, dass das Kind das 12. Lebensjahr noch nicht \xFCberschritten hat."))));
}
Object.assign(window, {
  UploadForm
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "campaigns/malwettbewerb/UploadForm.jsx", error: String((e && e.message) || e) }); }

// campaigns/malwettbewerb/UploadForm.standalone.jsx
try { (() => {
/* Malwettbewerb landing — upload form (formal "Sie", validation + success) */

// Google-Sheets-Anbindung: Web-App-URL aus Apps Script hier eintragen (siehe
// Google-Sheets-Anleitung.md). Leer = Prototyp-Modus ohne Speichern.
const SHEET_ENDPOINT = '';

// Bilder werden vor dem Upload im Browser verkleinert: Handyfotos sind oft
// 5–12 MB und würden Apps Script sprengen. 2000 px lange Kante reicht für
// Ausmalbilder völlig aus.
const MAX_KANTE = 2000;
const ZIEL_BYTES = 1024 * 1024; // ~1 MB

function verkleinern(datei) {
  return new Promise(fertig => {
    // Formate, die der Browser evtl. nicht zeichnen kann (z. B. HEIC) → Original behalten
    if (!/^image\/(jpeg|png|webp)$/i.test(datei.type)) {
      fertig(datei);
      return;
    }
    const url = URL.createObjectURL(datei);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const faktor = Math.min(1, MAX_KANTE / Math.max(img.width, img.height));
      if (faktor === 1 && datei.size <= ZIEL_BYTES) {
        fertig(datei);
        return;
      }
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * faktor);
      c.height = Math.round(img.height * faktor);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, c.width, c.height); // weißer Grund statt schwarz bei PNG
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const stufen = [0.85, 0.75, 0.65, 0.55];
      let i = 0;
      const versuch = () => {
        c.toBlob(blob => {
          if (!blob) {
            fertig(datei);
            return;
          }
          if (blob.size > ZIEL_BYTES && i < stufen.length - 1) {
            i++;
            versuch();
            return;
          }
          const name = datei.name.replace(/\.[^.]+$/, '') + '.jpg';
          fertig(new File([blob], name, {
            type: 'image/jpeg'
          }));
        }, 'image/jpeg', stufen[i]);
      };
      versuch();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      fertig(datei);
    };
    img.src = url;
  });
}
function UploadForm() {
  const {
    Ico,
    KID,
    Splat
  } = window;
  const {
    Input,
    Button
  } = window.DesignSystem_9f5cef;
  const [v, setV] = React.useState({
    child: '',
    parent: '',
    email: '',
    phone: ''
  });
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [consentData, setConsentData] = React.useState(false);
  const [consentPub, setConsentPub] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [drag, setDrag] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [pruefe, setPruefe] = React.useState(false);
  const fileRef = React.useRef(null);
  const set = k => e => setV(s => ({
    ...s,
    [k]: e.target.value
  }));
  const takeFile = async f => {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setErrors(e => ({
        ...e,
        file: 'Bitte laden Sie eine Bilddatei hoch (JPG oder PNG).'
      }));
      return;
    }
    setErrors(e => ({
      ...e,
      file: undefined
    }));
    setPruefe(true);
    const klein = await verkleinern(f);
    setFile(klein);
    setPreview(URL.createObjectURL(klein));
    setPruefe(false);
  };
  const validate = () => {
    const e = {};
    if (!v.child.trim()) e.child = 'Bitte geben Sie den Vornamen des Kindes an.';
    if (!v.parent.trim()) e.parent = 'Bitte geben Sie Ihren Namen an.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (!v.phone.trim()) e.phone = 'Bitte geben Sie eine Telefonnummer an.';
    if (!file) e.file = 'Bitte laden Sie ein Foto des ausgemalten Bildes hoch.';
    if (!consentData) e.consentData = 'Ihre Einwilligung ist für die Teilnahme erforderlich.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = ev => {
    ev.preventDefault();
    if (!validate()) return;
    const done = () => {
      setSending(false);
      setSent(true);
      window.scrollTo({
        top: document.getElementById('upload').getBoundingClientRect().top + window.pageYOffset - 16,
        behavior: 'smooth'
      });
    };
    if (!SHEET_ENDPOINT) {
      done();
      return;
    } // Prototyp-Modus
    setSending(true);
    const reader = new FileReader();
    reader.onload = () => {
      fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          typ: 'einsendung',
          kindVorname: v.child,
          elternName: v.parent,
          email: v.email,
          telefon: v.phone,
          bildName: file && file.name,
          bildTyp: file && file.type,
          bildBase64: reader.result,
          einwilligungDaten: consentData,
          einwilligungVeroeffentlichung: consentPub
        })
      }).then(done).catch(done);
    };
    reader.onerror = done;
    reader.readAsDataURL(file);
  };
  const checkboxRow = (checked, setChecked, err, children) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setChecked(!checked),
    style: {
      flex: 'none',
      width: 24,
      height: 24,
      marginTop: 1,
      borderRadius: 'var(--radius-sm)',
      border: `2px solid ${checked ? 'var(--neutral-800)' : err ? 'var(--red-500)' : 'var(--border-default)'}`,
      background: checked ? 'var(--neutral-800)' : 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-base)'
    }
  }, checked && /*#__PURE__*/React.createElement(Ico, {
    name: "Check",
    size: 16,
    color: "#fff",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 1.45
    }
  }, children)), err && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0 36px',
      fontSize: 'var(--text-xs)',
      color: 'var(--red-500)',
      fontWeight: 600
    }
  }, err));
  return /*#__PURE__*/React.createElement("section", {
    id: "upload",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(' + window.__resources.uploadBg + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(247,247,246,0.72) 0%, rgba(247,247,246,0.55) 45%, rgba(247,247,246,0.72) 100%)'
    }
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.yellow,
    size: 120,
    style: {
      top: 60,
      right: -20,
      opacity: 0.16
    },
    rotate: -20
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.pink,
    size: 90,
    style: {
      bottom: 40,
      left: 20,
      opacity: 0.14
    },
    rotate: 25
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 760,
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      border: '4px solid #FCF1B8',
      background: '#FCF1B8',
      fontSize: '15px'
    }
  }, "Bild einreichen"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 8px'
    }
  }, "Fertiges Bild hochladen"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Das Formular f\xFCllt bitte ein Elternteil oder eine erziehungsberechtigte Person aus.")), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-md)',
      padding: 'var(--space-12)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 76,
      margin: '0 auto 18px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--green-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "PartyPopper",
    size: 38,
    color: "var(--green-500)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 10px'
    }
  }, "Vielen Dank f\xFCr die Einsendung!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      maxWidth: 460,
      margin: '0 auto'
    }
  }, "Das Bild von ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, v.child), " ist bei uns eingegangen. Nach dem Einsendeschluss am 30.09.2026 benachrichtigen wir die Gewinner \xFCber Ihre angegebenen Kontaktdaten. Wir dr\xFCcken die Daumen!"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      setSent(false);
      setV({
        child: '',
        parent: '',
        email: '',
        phone: ''
      });
      setFile(null);
      setPreview(null);
      setConsentData(false);
      setConsentPub(false);
    }
  }, "Weiteres Bild einreichen"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    className: "form-card",
    style: {
      background: 'var(--surface-card)',
      border: '1.5px solid #EEC803',
      borderRadius: 'var(--radius-xl)',
      boxShadow: '0 4px 12px 0 rgba(35,35,35,0.36)',
      padding: 'var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Vorname des Kindes",
    placeholder: "z. B. Mia",
    value: v.child,
    onChange: set('child'),
    error: errors.child
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Ihr Name (Erziehungsberechtigte:r)",
    placeholder: "Vor- und Nachname",
    value: v.parent,
    onChange: set('parent'),
    error: errors.parent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    },
    className: "f-row"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "E-Mail",
    type: "email",
    placeholder: "ihre@email.de",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Mail",
      size: 18
    }),
    value: v.email,
    onChange: set('email'),
    error: errors.email
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telefon",
    placeholder: "0151 \u2026",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Phone",
      size: 18
    }),
    value: v.phone,
    onChange: set('phone'),
    error: errors.phone
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginBottom: 6
    }
  }, "Foto des ausgemalten Bildes"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/*",
    hidden: true,
    onChange: e => takeFile(e.target.files[0])
  }), /*#__PURE__*/React.createElement("div", {
    onClick: () => fileRef.current && fileRef.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      takeFile(e.dataTransfer.files[0]);
    },
    style: {
      cursor: 'pointer',
      border: `2px dashed ${errors.file ? 'var(--red-500)' : drag ? 'var(--neutral-700)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-lg)',
      background: drag ? 'var(--yellow-50)' : 'var(--surface-page)',
      padding: 'var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      textAlign: 'center',
      transition: 'var(--transition-base)'
    }
  }, pruefe ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Loader",
    size: 26,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Bild wird vorbereitet \u2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "Einen Moment bitte")) : preview ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: preview,
    alt: "Vorschau",
    style: {
      maxHeight: 160,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--green-500)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "CircleCheck",
    size: 16,
    color: "var(--green-500)"
  }), " ", file && file.name, " \u2014 zum \xC4ndern klicken")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "ImageUp",
    size: 26,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Foto hierher ziehen oder klicken"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "JPG oder PNG \xB7 ein Foto oder Scan des fertigen Bildes"))), errors.file && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--text-xs)',
      color: 'var(--red-500)',
      fontWeight: 600
    }
  }, errors.file)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      marginTop: 4
    }
  }, checkboxRow(consentData, setConsentData, errors.consentData, /*#__PURE__*/React.createElement(React.Fragment, null, "Ich bin einverstanden, dass die angegebenen Daten zur Durchf\xFChrung des Malwettbewerbs gespeichert und verarbeitet werden. ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "(Pflicht)"))), checkboxRow(consentPub, setConsentPub, null, /*#__PURE__*/React.createElement(React.Fragment, null, "Ich bin damit einverstanden, dass das eingereichte Bild von Interliving B\xE4ucke (z. B. auf Website und Social Media) ver\xF6ffentlicht werden darf. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "(optional)")))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    fullWidth: true,
    disabled: sending || pruefe,
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      name: sending ? 'Loader' : 'Send',
      size: 18
    })
  }, sending ? 'Wird gesendet …' : pruefe ? 'Bild wird vorbereitet …' : 'Bild jetzt einreichen'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)',
      textAlign: 'center'
    }
  }, "Mit dem Absenden best\xE4tigen Sie, dass das Kind das 12. Lebensjahr noch nicht \xFCberschritten hat."))));
}
Object.assign(window, {
  UploadForm
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "campaigns/malwettbewerb/UploadForm.standalone.jsx", error: String((e && e.message) || e) }); }

// campaigns/malwettbewerb/lib.jsx
try { (() => {
/* Malwettbewerb landing — shared helpers, playful palette, data */

// Lucide icon helper (correct UMD API + defensive guards)
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

// Playful accent palette (from the flyer's paint splats)
const KID = {
  blue: '#29ABE2',
  pink: '#EC6EA9',
  green: '#8DC63F',
  orange: '#F7931E',
  yellow: 'var(--baeucke-yellow)',
  red: 'var(--baeucke-red)'
};

// A soft paint blob (organic, not a perfect circle)
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
const STEPS = [{
  n: '1',
  icon: 'Palette',
  title: 'Ausmalbild ausdrucken',
  text: 'Laden Sie das Ausmalbild mit unserem Möbelhaus herunter und drucken Sie es für Ihr Kind aus – dann kann es losmalen und sich Farben für Gebäude, Wiese und Himmel aussuchen.'
}, {
  n: '2',
  icon: 'Upload',
  title: 'Bild hochladen',
  text: 'Laden Sie ein Foto oder einen Scan des fertig ausgemalten Bildes bis spätestens ',
  textStark: '30.09.2026',
  textEnde: ' hier hoch.'
}, {
  n: '3',
  icon: 'Star',
  title: 'Preise gewinnen',
  text: 'Mit etwas Glück gehört Ihr Kind zu den Gewinnern und freut sich über einen ',
  textStark: 'Bäucke-Warengutschein!'
}];
const FAQS = [{
  q: 'Wer darf mitmachen?',
  a: 'Alle Kinder bis einschließlich 12 Jahre. Die Teilnahme ist kostenlos.'
}, {
  q: 'Bis wann kann das Bild eingereicht werden?',
  a: 'Einsendeschluss ist der 30.09.2026. Bilder, die später hochgeladen werden, können leider nicht berücksichtigt werden.'
}, {
  q: 'Wie reichen wir das Bild ein?',
  a: 'Ein Elternteil oder eine erziehungsberechtigte Person lädt ein Foto oder einen Scan des fertig ausgemalten Bildes über das Formular auf dieser Seite hoch.'
}, {
  q: 'Was kann mein Kind gewinnen?',
  a: 'Bäucke-Warengutscheine im Wert von 250 €, 150 € und 50 €. Die Gutscheine sind nicht in bar auszahlbar.'
}, {
  q: 'Wie werden die Gewinner:innen ermittelt?',
  a: 'Alle eingereichten Bilder werden veröffentlicht und können anschließend online bewertet werden. Die drei Bilder mit den meisten Stimmen gewinnen – gewertet wird der Stand zum Ende der Abstimmung.'
}, {
  q: 'Wie werden die Gewinner benachrichtigt?',
  a: 'Die Gewinner werden nach dem Einsendeschluss per E-Mail oder Telefon über die angegebenen Kontaktdaten informiert.'
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
  Ico,
  KID,
  Splat,
  PRIZES,
  STEPS,
  FAQS,
  REVIEWS,
  SEAL_URL,
  GOOGLE,
  GoogleG
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "campaigns/malwettbewerb/lib.jsx", error: String((e && e.message) || e) }); }

// campaigns/malwettbewerb/sections.jsx
try { (() => {
/* Malwettbewerb landing — page sections */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({
    top: el.getBoundingClientRect().top + window.pageYOffset - 16,
    behavior: 'smooth'
  });
}
function Header() {
  const {
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '12px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "hd-logo",
    src: "../../assets/logos/Logo-Baeucke-gelb.svg",
    alt: "Interliving B\xE4ucke",
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hide-sm",
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, "Einsendeschluss 30.09.2026"), /*#__PURE__*/React.createElement(Button, {
    className: "baeucke-cta",
    variant: "primary",
    size: "sm",
    onClick: () => scrollToId('upload')
  }, "Jetzt teilnehmen"))));
}
function Voucher() {
  const {
    Ico
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "voucher-ticket",
    style: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      maxWidth: 470,
      borderRadius: 16,
      boxShadow: 'var(--shadow-lg)',
      transform: 'rotate(-1.4deg)',
      background: 'var(--surface-card)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "voucher-stub",
    style: {
      background: 'var(--baeucke-yellow)',
      padding: '18px 22px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 800,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--neutral-800)'
    }
  }, "Gewinn"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '2.5rem',
      fontWeight: 900,
      color: 'var(--neutral-800)',
      lineHeight: 1,
      letterSpacing: '-0.02em'
    }
  }, "250\u2009\u20AC")), /*#__PURE__*/React.createElement("div", {
    className: "voucher-perf",
    style: {
      position: 'relative',
      width: 0,
      borderLeft: '2px dashed var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -9,
      left: -9,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: 'var(--yellow-50)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -9,
      left: -9,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: 'var(--yellow-50)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "voucher-body",
    style: {
      flex: 1,
      minWidth: 0,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v-kicker",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--text-xs)',
      fontWeight: 800,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Gift",
    size: 15,
    color: "var(--baeucke-yellow)"
  }), " Geschenkgutschein"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 800,
      color: 'var(--text-strong)',
      lineHeight: 1.1
    }
  }, "Interliving B\xE4ucke"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, "Einl\xF6sbar auf das gesamte Sortiment."), /*#__PURE__*/React.createElement("span", {
    className: "v-code",
    style: {
      marginTop: 4,
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--text-faint)',
      fontFamily: 'monospace'
    }
  }, "GUTSCHEIN \xB7 MALWETTBEWERB 2026"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "1. Preis 250 \u20AC"), " \xB7 2. Preis 150 \u20AC \xB7 3. Preis 50 \u20AC"));
}
function Hero() {
  const {
    Ico,
    KID,
    Splat
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  const title = 'Malwettbewerb';
  const palette = [KID.red, KID.orange, KID.yellow, KID.green, KID.blue, KID.pink];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--yellow-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(assets/hero-aquarell.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(100deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.28) 68%, rgba(255,255,255,0.1) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 90,
      background: 'linear-gradient(to bottom, rgba(247,247,246,0) 0%, var(--surface-page) 100%)'
    }
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.blue,
    size: 130,
    style: {
      top: 40,
      left: -30,
      opacity: 0.18
    },
    rotate: 20
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.pink,
    size: 90,
    style: {
      top: 120,
      right: 60,
      opacity: 0.18
    },
    rotate: -15
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.green,
    size: 110,
    style: {
      bottom: -20,
      left: '45%',
      opacity: 0.15
    },
    rotate: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter) var(--space-16)',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 'var(--space-12)',
      alignItems: 'center'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--baeucke-yellow)',
      color: 'var(--neutral-800)',
      fontWeight: 800,
      fontSize: 'var(--text-sm)',
      padding: '7px 16px',
      borderRadius: 'var(--radius-pill)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Sparkles",
    size: 16,
    color: "var(--neutral-800)"
  }), " F\xFCr Kinder bis einschlie\xDFlich 12 Jahre"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '20px 0 18px',
      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: '-0.02em'
    }
  }, title.split('').map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: palette[i % palette.length]
    }
  }, c))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xl)',
      color: 'var(--text-body)',
      maxWidth: 540,
      marginBottom: 8
    }
  }, "Ihr Kind gestaltet unser ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "M\xF6belhaus"), " in seinen sch\xF6nsten Farben \u2013 und gewinnt mit etwas Gl\xFCck einen Warengutschein."), /*#__PURE__*/React.createElement(Voucher, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Download",
      size: 18
    }),
    onClick: () => scrollToId('download')
  }, "Ausmalbild herunterladen"), /*#__PURE__*/React.createElement(Button, {
    variant: "ink",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Upload",
      size: 18
    }),
    onClick: () => scrollToId('upload')
  }, "Bild hochladen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '6px solid var(--surface-card)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/hero-beispiel.png",
    alt: "Beispiel: ausgemaltes B\xE4ucke-M\xF6belhaus",
    style: {
      display: 'block',
      width: '100%',
      maxWidth: 534,
      height: 'auto',
      borderRadius: 'calc(var(--radius-xl) - 6px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 31,
      right: 14,
      background: 'var(--baeucke-yellow)',
      color: 'var(--neutral-800)',
      fontWeight: 800,
      fontSize: 'var(--text-sm)',
      padding: '8px 14px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      transform: 'rotate(6deg)'
    }
  }, "So kann es aussehen!")))));
}
function Countdown() {
  const {
    Ico
  } = window;
  const target = new Date('2026-09-30T23:59:59').getTime();
  const calc = () => {
    const d = Math.max(0, target - Date.now());
    return {
      Tage: Math.floor(d / 86400000),
      Stunden: Math.floor(d / 3600000 % 24),
      Minuten: Math.floor(d / 60000 % 60),
      Sekunden: Math.floor(d / 1000 % 60)
    };
  };
  const [t, setT] = React.useState(calc());
  React.useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--baeucke-yellow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-8)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--neutral-800)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "CalendarClock",
    size: 26,
    color: "var(--neutral-800)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 'var(--text-xl)',
      color: '#363636'
    }
  }, "Noch Zeit zum Mitmachen!")), /*#__PURE__*/React.createElement("div", {
    className: "cd-row",
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, Object.entries(t).map(([label, val]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      background: 'rgba(255,255,255,0.30)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 16px',
      minWidth: 74,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 900,
      color: '#363636',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, String(val).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--neutral-600)',
      marginTop: 6
    }
  }, label))))));
}
function Prizes() {
  const {
    Ico,
    PRIZES
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    id: "preise",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Tolle Gutscheine zu gewinnen"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Interliving B\xE4ucke Malwettbewerb"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px auto 0',
      maxWidth: 620,
      color: 'var(--text-body)',
      fontSize: 'var(--text-lg)'
    }
  }, "Ihr Kind malt unser M\xF6belhaus so bunt aus, wie es m\xF6chte \u2013 und Sie laden das fertige Bild bis zum ", /*#__PURE__*/React.createElement("b", null, "30.09.2026"), " hier hoch. Unter allen Einsendungen vergeben wir drei B\xE4ucke-Warengutscheine.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-6)'
    },
    className: "prize-grid"
  }, PRIZES.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.place,
    style: {
      position: 'relative',
      background: i === 0 ? 'rgba(238,200,3,0.12)' : '#F6F2E1',
      border: '1px solid rgba(238,200,3,0.20)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-8)',
      boxShadow: i === 0 ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      textAlign: 'center',
      transform: i === 0 ? 'scale(1.03)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      margin: '0 auto 18px',
      borderRadius: 'var(--radius-lg)',
      background: p.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: p.icon,
    size: 36,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 800,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, p.place), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      margin: '8px 0 2px'
    }
  }, "Warengutschein in H\xF6he von"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'clamp(2.5rem, 5vw, 3.25rem)',
      fontWeight: 900,
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, p.amount)))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      marginTop: 'var(--space-6)'
    }
  }, "* Gutscheine sind nicht in bar auszahlbar."));
}
function Steps() {
  const {
    Ico,
    KID,
    STEPS
  } = window;
  const colors = [KID.pink, KID.blue, KID.green];
  const flaeche = '#F6F2E1';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: flaeche
    }
  }, /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 1440 70",
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: -1,
      width: '100%',
      height: 70,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: "var(--surface-page)",
    d: "M0,0 L1440,0 L1440,26 C1200,62 960,8 720,34 C480,60 240,4 0,40 Z"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      paddingTop: 'calc(var(--section-y) + 40px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "steps-split",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "So nehmen Sie teil"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "In drei Schritten zum Gewinn")), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, STEPS.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s.n,
    style: {
      position: 'relative',
      display: 'flex',
      gap: 'var(--space-5)',
      paddingBottom: i === STEPS.length - 1 ? 0 : 'var(--space-8)'
    }
  }, i < STEPS.length - 1 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 26.5,
      top: 56,
      bottom: 0,
      borderLeft: '3px dashed var(--neutral-300)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      flex: 'none',
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-pill)',
      background: colors[i],
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
      fontSize: 'var(--text-h4)',
      boxShadow: 'var(--shadow-md)',
      border: `4px solid ${flaeche}`
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: colors[i],
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)'
    }
  }, s.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)',
      maxWidth: 460
    }
  }, s.text, s.textStark && /*#__PURE__*/React.createElement("b", null, s.textStark), s.textEnde)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/schritte-kinder.png",
    alt: "Zwei Kinder zeigen stolz ihre bunt ausgemalten Bilder des B\xE4ucke M\xF6belhauses",
    style: {
      display: 'block',
      width: '100%',
      maxWidth: 598,
      height: 'auto',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      transform: 'rotate(-2.5deg)'
    }
  })))));
}
function Doodles() {
  const {
    Ico
  } = window;
  const items = [{
    n: 'Sun',
    x: '1%',
    y: '6%',
    s: 78,
    r: -8
  }, {
    n: 'Cloud',
    x: '13%',
    y: '1%',
    s: 44,
    r: 6
  }, {
    n: 'Flower2',
    x: '3%',
    y: '30%',
    s: 34,
    r: 12
  }, {
    n: 'Sparkles',
    x: '9%',
    y: '52%',
    s: 56,
    r: -20
  }, {
    n: 'Leaf',
    x: '2%',
    y: '72%',
    s: 40,
    r: -28
  }, {
    n: 'Star',
    x: '12%',
    y: '88%',
    s: 30,
    r: 18
  }, {
    n: 'Flower',
    x: '22%',
    y: '4%',
    s: 52,
    r: 14
  }, {
    n: 'PenTool',
    x: '25%',
    y: '94%',
    s: 34,
    r: -12
  }, {
    n: 'Leaf',
    x: '34%',
    y: '86%',
    s: 62,
    r: 40
  }, {
    n: 'Cloud',
    x: '38%',
    y: '2%',
    s: 68,
    r: -6
  }, {
    n: 'Heart',
    x: '46%',
    y: '93%',
    s: 28,
    r: 22
  }, {
    n: 'Sparkles',
    x: '50%',
    y: '3%',
    s: 32,
    r: 10
  }, {
    n: 'Star',
    x: '57%',
    y: '90%',
    s: 44,
    r: -16
  }, {
    n: 'Flower',
    x: '61%',
    y: '1%',
    s: 36,
    r: 24
  }, {
    n: 'Brush',
    x: '69%',
    y: '92%',
    s: 40,
    r: -24
  }, {
    n: 'Palette',
    x: '73%',
    y: '3%',
    s: 58,
    r: 12
  }, {
    n: 'Flower2',
    x: '80%',
    y: '86%',
    s: 50,
    r: -8
  }, {
    n: 'Sun',
    x: '86%',
    y: '2%',
    s: 34,
    r: 16
  }, {
    n: 'Leaf',
    x: '94%',
    y: '26%',
    s: 54,
    r: 34
  }, {
    n: 'Sparkles',
    x: '97%',
    y: '8%',
    s: 30,
    r: -14
  }, {
    n: 'Cloud',
    x: '92%',
    y: '50%',
    s: 40,
    r: 8
  }, {
    n: 'Star',
    x: '96%',
    y: '68%',
    s: 36,
    r: -20
  }, {
    n: 'Flower',
    x: '89%',
    y: '94%',
    s: 30,
    r: 18
  }, {
    n: 'Rainbow',
    x: '31%',
    y: '48%',
    s: 34,
    r: 0
  }, {
    n: 'Pencil',
    x: '66%',
    y: '44%',
    s: 28,
    r: -18
  }];
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: it.x,
      top: it.y,
      transform: `rotate(${it.r}deg)`,
      color: 'var(--yellow-300)',
      opacity: it.s > 50 ? 0.55 : 0.68
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: it.n,
    size: it.s,
    strokeWidth: 1.5,
    color: "var(--yellow-300)"
  }))));
}
function Download() {
  const {
    Ico,
    Splat,
    KID
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  return /*#__PURE__*/React.createElement("section", {
    id: "download",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Doodles, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--baeucke-yellow)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-12)',
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 'var(--space-12)',
      alignItems: 'center'
    },
    className: "dl-grid dl-panel"
  }, /*#__PURE__*/React.createElement(Splat, {
    color: "#fff",
    size: 140,
    style: {
      bottom: -40,
      right: -30,
      opacity: 0.25
    },
    rotate: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/ausmalbild-beispiel-neu.png",
    alt: "Ausmalbild-Vorlage zum Ausdrucken",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--neutral-800)',
      margin: '0 0 12px'
    }
  }, "Laden Sie das Ausmalbild herunter"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--neutral-800)',
      opacity: 0.85,
      fontSize: 'var(--text-lg)',
      marginBottom: 24
    }
  }, "Drucken Sie die Vorlage aus \u2013 und Ihr Kind kann unser M\xF6belhaus mit Wiese, Himmel und allem Drum und Dran bunt gestalten. Je kreativer, desto besser!"), /*#__PURE__*/React.createElement("a", {
    href: "assets/ausmalbild-vorlage.png",
    download: "Baeucke-Malwettbewerb-Ausmalbild.png",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ink",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Download",
      size: 18
    })
  }, "Ausmalbild herunterladen")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--neutral-800)',
      opacity: 0.7,
      fontSize: 'var(--text-sm)',
      marginTop: 14,
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Info",
    size: 14
  }), " \xA0Am besten auf festem Papier im Format DIN A4 ausdrucken.")))));
}
function FAQ() {
  const {
    Ico,
    FAQS
  } = window;
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    style: {
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Teilnahmebedingungen & FAQ"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "H\xE4ufige Fragen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, FAQS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(open === i ? -1 : i),
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      padding: 'var(--space-5) var(--space-6)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)'
    }
  }, f.q, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      color: 'var(--baeucke-yellow)',
      transform: open === i ? 'rotate(180deg)' : 'none',
      transition: 'var(--transition-base)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "ChevronDown",
    size: 22
  }))), open === i && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-6) var(--space-5)',
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)'
    }
  }, f.a))))));
}
function Stars({
  size = 18
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2,
      color: '#F7A800',
      fontSize: size,
      lineHeight: 1
    }
  }, '★★★★★'.split('').map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, s)));
}
function Reviews() {
  const {
    Ico,
    REVIEWS,
    SEAL_URL,
    GOOGLE,
    GoogleG
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Das sagen unsere Kunden"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Ausgezeichnet bewertet bei Google")), /*#__PURE__*/React.createElement("img", {
    src: SEAL_URL,
    alt: "Auszeichnung / Siegel",
    style: {
      height: 110,
      width: 'auto',
      flex: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      background: 'var(--surface-page)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5) var(--space-6)',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(GoogleG, {
    size: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)'
    }
  }, "Google", /*#__PURE__*/React.createElement("br", null), "Bewertungen")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 44,
      background: 'var(--border-subtle)'
    },
    className: "hide-sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'clamp(2.25rem, 5vw, 2.75rem)',
      fontWeight: 900,
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, GOOGLE.rating), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, GOOGLE.count, " Rezensionen"))), /*#__PURE__*/React.createElement("a", {
    href: GOOGLE.url,
    target: "_blank",
    rel: "noopener",
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--text-strong)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, "Alle Bewertungen ansehen ", /*#__PURE__*/React.createElement(Ico, {
    name: "ExternalLink",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-5)'
    },
    className: "step-grid"
  }, REVIEWS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--surface-page)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Stars, null), /*#__PURE__*/React.createElement(Ico, {
    name: "Quote",
    size: 22,
    color: "var(--border-default)"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)',
      flex: 1
    }
  }, "\u201E", r.text, "\u201C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "User",
    size: 18,
    color: "var(--neutral-700)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, r.who)))))));
}
function StoreInfo() {
  const {
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  const hours = [{
    label: 'Möbelhaus',
    rows: ['Mo.–Fr. 9.30–19.00 Uhr', 'Sa. 9.30–18.00 Uhr']
  }, {
    label: 'Lager',
    rows: ['Mo.–Fr. 9.30–17.00 Uhr', 'Sa. 10.00–14.00 Uhr']
  }, {
    label: 'Büro',
    rows: ['Mo.–Sa. 8.00–17.30 Uhr']
  }];
  const mapSrc = 'https://www.google.com/maps?q=M%C3%B6belhaus%20B%C3%A4ucke%20%C3%9Cber%20dem%20Hellewege%2012%2037154%20Northeim&output=embed';
  return /*#__PURE__*/React.createElement("section", {
    id: "besuch",
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Besuchen Sie uns"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Ihr M\xF6belhaus in Northeim")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 'var(--space-8)',
      alignItems: 'stretch'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      minHeight: 360
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "Standort Interliving B\xE4ucke",
    src: mapSrc,
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
    style: {
      width: '100%',
      height: '100%',
      minHeight: 360,
      border: 0,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "MapPin",
    size: 20,
    color: "var(--baeucke-yellow)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "M\xF6belhaus B\xE4ucke GmbH & Co. KG", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, "\xDCber dem Hellewege 12 \xB7 37154 Northeim"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, hours.map(h => /*#__PURE__*/React.createElement("div", {
    key: h.label,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Clock",
    size: 15,
    color: "var(--text-muted)"
  }), " ", h.label), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, h.rows.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'block'
    }
  }, r))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Phone",
    size: 16,
    color: "var(--baeucke-yellow)"
  }), " 05551 / 9735-0"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Mail",
    size: 16,
    color: "var(--baeucke-yellow)"
  }), " info@baeucke.de")), /*#__PURE__*/React.createElement("a", {
    href: "https://www.google.com/maps/dir/?api=1&destination=M%C3%B6belhaus%20B%C3%A4ucke%20Northeim",
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Navigation",
      size: 18
    }),
    fullWidth: true
  }, "Route planen"))))));
}
function Footer() {
  const {
    Ico
  } = window;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--neutral-800)',
      color: 'var(--neutral-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/Logo-Baeucke-weiss.svg",
    alt: "Interliving B\xE4ucke",
    style: {
      height: 44,
      alignSelf: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'rgba(255,255,255,0.75)',
      fontSize: 'var(--text-sm)'
    }
  }, "M\xF6belhaus B\xE4ucke GmbH & Co. KG \xB7 \xDCber dem Hellewege 12 \xB7 37154 Northeim")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,0.8)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Phone",
    size: 16
  }), " 05551 / 9735-0"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Mail",
    size: 16
  }), " info@baeucke.de"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Globe",
    size: 16
  }), " www.baeucke.de"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '16px var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      fontSize: 'var(--text-xs)',
      color: 'rgba(255,255,255,0.6)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 M\xF6belhaus B\xE4ucke GmbH & Co. KG"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", null, "Teilnahmebedingungen"), /*#__PURE__*/React.createElement("span", null, "Datenschutz"), /*#__PURE__*/React.createElement("span", null, "Impressum")))));
}
Object.assign(window, {
  scrollToId,
  Header,
  Hero,
  Countdown,
  Prizes,
  Steps,
  Download,
  Reviews,
  StoreInfo,
  FAQ,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "campaigns/malwettbewerb/sections.jsx", error: String((e && e.message) || e) }); }

// campaigns/malwettbewerb/sections.standalone.jsx
try { (() => {
/* Malwettbewerb landing — page sections */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({
    top: el.getBoundingClientRect().top + window.pageYOffset - 16,
    behavior: 'smooth'
  });
}
function Header() {
  const {
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '12px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "hd-logo",
    src: window.__resources.logoGelb,
    alt: "Interliving B\xE4ucke",
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hide-sm",
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, "Einsendeschluss 30.09.2026"), /*#__PURE__*/React.createElement(Button, {
    className: "baeucke-cta",
    variant: "primary",
    size: "sm",
    onClick: () => scrollToId('upload')
  }, "Jetzt teilnehmen"))));
}
function Voucher() {
  const {
    Ico
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "voucher-ticket",
    style: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      maxWidth: 470,
      borderRadius: 16,
      boxShadow: 'var(--shadow-lg)',
      transform: 'rotate(-1.4deg)',
      background: 'var(--surface-card)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "voucher-stub",
    style: {
      background: 'var(--baeucke-yellow)',
      padding: '18px 22px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 800,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--neutral-800)'
    }
  }, "Gewinn"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '2.5rem',
      fontWeight: 900,
      color: 'var(--neutral-800)',
      lineHeight: 1,
      letterSpacing: '-0.02em'
    }
  }, "250\u2009\u20AC")), /*#__PURE__*/React.createElement("div", {
    className: "voucher-perf",
    style: {
      position: 'relative',
      width: 0,
      borderLeft: '2px dashed var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -9,
      left: -9,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: 'var(--yellow-50)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -9,
      left: -9,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: 'var(--yellow-50)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "voucher-body",
    style: {
      flex: 1,
      minWidth: 0,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v-kicker",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--text-xs)',
      fontWeight: 800,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Gift",
    size: 15,
    color: "var(--baeucke-yellow)"
  }), " Geschenkgutschein"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 800,
      color: 'var(--text-strong)',
      lineHeight: 1.1
    }
  }, "Interliving B\xE4ucke"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, "Einl\xF6sbar auf das gesamte Sortiment."), /*#__PURE__*/React.createElement("span", {
    className: "v-code",
    style: {
      marginTop: 4,
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--text-faint)',
      fontFamily: 'monospace'
    }
  }, "GUTSCHEIN \xB7 MALWETTBEWERB 2026"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "1. Preis 250 \u20AC"), " \xB7 2. Preis 150 \u20AC \xB7 3. Preis 50 \u20AC"));
}
function Hero() {
  const {
    Ico,
    KID,
    Splat
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  const title = 'Malwettbewerb';
  const palette = [KID.red, KID.orange, KID.yellow, KID.green, KID.blue, KID.pink];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--yellow-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(' + window.__resources.aquarell + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(100deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.28) 68%, rgba(255,255,255,0.1) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 90,
      background: 'linear-gradient(to bottom, rgba(247,247,246,0) 0%, var(--surface-page) 100%)'
    }
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.blue,
    size: 130,
    style: {
      top: 40,
      left: -30,
      opacity: 0.18
    },
    rotate: 20
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.pink,
    size: 90,
    style: {
      top: 120,
      right: 60,
      opacity: 0.18
    },
    rotate: -15
  }), /*#__PURE__*/React.createElement(Splat, {
    color: KID.green,
    size: 110,
    style: {
      bottom: -20,
      left: '45%',
      opacity: 0.15
    },
    rotate: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter) var(--space-16)',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 'var(--space-12)',
      alignItems: 'center'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--baeucke-yellow)',
      color: 'var(--neutral-800)',
      fontWeight: 800,
      fontSize: 'var(--text-sm)',
      padding: '7px 16px',
      borderRadius: 'var(--radius-pill)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Sparkles",
    size: 16,
    color: "var(--neutral-800)"
  }), " F\xFCr Kinder bis einschlie\xDFlich 12 Jahre"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '20px 0 18px',
      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: '-0.02em'
    }
  }, title.split('').map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: palette[i % palette.length]
    }
  }, c))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xl)',
      color: 'var(--text-body)',
      maxWidth: 540,
      marginBottom: 8
    }
  }, "Ihr Kind gestaltet unser ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "M\xF6belhaus"), " in seinen sch\xF6nsten Farben \u2013 und gewinnt mit etwas Gl\xFCck einen Warengutschein."), /*#__PURE__*/React.createElement(Voucher, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Download",
      size: 18
    }),
    onClick: () => scrollToId('download')
  }, "Ausmalbild herunterladen"), /*#__PURE__*/React.createElement(Button, {
    variant: "ink",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Upload",
      size: 18
    }),
    onClick: () => scrollToId('upload')
  }, "Bild hochladen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '6px solid var(--surface-card)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources.heroBeispiel,
    alt: "Beispiel: ausgemaltes B\xE4ucke-M\xF6belhaus",
    style: {
      display: 'block',
      width: '100%',
      maxWidth: 534,
      height: 'auto',
      borderRadius: 'calc(var(--radius-xl) - 6px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 31,
      right: 14,
      background: 'var(--baeucke-yellow)',
      color: 'var(--neutral-800)',
      fontWeight: 800,
      fontSize: 'var(--text-sm)',
      padding: '8px 14px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      transform: 'rotate(6deg)'
    }
  }, "So kann es aussehen!")))));
}
function Countdown() {
  const {
    Ico
  } = window;
  const target = new Date('2026-09-30T23:59:59').getTime();
  const calc = () => {
    const d = Math.max(0, target - Date.now());
    return {
      Tage: Math.floor(d / 86400000),
      Stunden: Math.floor(d / 3600000 % 24),
      Minuten: Math.floor(d / 60000 % 60),
      Sekunden: Math.floor(d / 1000 % 60)
    };
  };
  const [t, setT] = React.useState(calc());
  React.useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--baeucke-yellow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-8)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--neutral-800)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "CalendarClock",
    size: 26,
    color: "var(--neutral-800)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 'var(--text-xl)',
      color: '#363636'
    }
  }, "Noch Zeit zum Mitmachen!")), /*#__PURE__*/React.createElement("div", {
    className: "cd-row",
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, Object.entries(t).map(([label, val]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      background: 'rgba(255,255,255,0.30)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 16px',
      minWidth: 74,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 900,
      color: '#363636',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, String(val).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--neutral-600)',
      marginTop: 6
    }
  }, label))))));
}
function Prizes() {
  const {
    Ico,
    PRIZES
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    id: "preise",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Tolle Gutscheine zu gewinnen"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Interliving B\xE4ucke Malwettbewerb"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px auto 0',
      maxWidth: 620,
      color: 'var(--text-body)',
      fontSize: 'var(--text-lg)'
    }
  }, "Ihr Kind malt unser M\xF6belhaus so bunt aus, wie es m\xF6chte \u2013 und Sie laden das fertige Bild bis zum ", /*#__PURE__*/React.createElement("b", null, "30.09.2026"), " hier hoch. Unter allen Einsendungen vergeben wir drei B\xE4ucke-Warengutscheine.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-6)'
    },
    className: "prize-grid"
  }, PRIZES.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.place,
    style: {
      position: 'relative',
      background: i === 0 ? 'rgba(238,200,3,0.12)' : '#F6F2E1',
      border: '1px solid rgba(238,200,3,0.20)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-8)',
      boxShadow: i === 0 ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      textAlign: 'center',
      transform: i === 0 ? 'scale(1.03)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      margin: '0 auto 18px',
      borderRadius: 'var(--radius-lg)',
      background: p.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: p.icon,
    size: 36,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 800,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, p.place), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      margin: '8px 0 2px'
    }
  }, "Warengutschein in H\xF6he von"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'clamp(2.5rem, 5vw, 3.25rem)',
      fontWeight: 900,
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, p.amount)))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      marginTop: 'var(--space-6)'
    }
  }, "* Gutscheine sind nicht in bar auszahlbar."));
}
function Steps() {
  const {
    Ico,
    KID,
    STEPS
  } = window;
  const colors = [KID.pink, KID.blue, KID.green];
  const flaeche = '#F6F2E1';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: flaeche
    }
  }, /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 1440 70",
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: -1,
      width: '100%',
      height: 70,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: "var(--surface-page)",
    d: "M0,0 L1440,0 L1440,26 C1200,62 960,8 720,34 C480,60 240,4 0,40 Z"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      paddingTop: 'calc(var(--section-y) + 40px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "steps-split",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "So nehmen Sie teil"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "In drei Schritten zum Gewinn")), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, STEPS.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s.n,
    style: {
      position: 'relative',
      display: 'flex',
      gap: 'var(--space-5)',
      paddingBottom: i === STEPS.length - 1 ? 0 : 'var(--space-8)'
    }
  }, i < STEPS.length - 1 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 26.5,
      top: 56,
      bottom: 0,
      borderLeft: '3px dashed var(--neutral-300)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      flex: 'none',
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-pill)',
      background: colors[i],
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
      fontSize: 'var(--text-h4)',
      boxShadow: 'var(--shadow-md)',
      border: `4px solid ${flaeche}`
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: colors[i],
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)'
    }
  }, s.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)',
      maxWidth: 460
    }
  }, s.text, s.textStark && /*#__PURE__*/React.createElement("b", null, s.textStark), s.textEnde)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources.schritteKinder,
    alt: "Zwei Kinder zeigen stolz ihre bunt ausgemalten Bilder des B\xE4ucke M\xF6belhauses",
    style: {
      display: 'block',
      width: '100%',
      maxWidth: 598,
      height: 'auto',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      transform: 'rotate(-2.5deg)'
    }
  })))));
}
function Doodles() {
  const {
    Ico
  } = window;
  const items = [{
    n: 'Sun',
    x: '1%',
    y: '6%',
    s: 78,
    r: -8
  }, {
    n: 'Cloud',
    x: '13%',
    y: '1%',
    s: 44,
    r: 6
  }, {
    n: 'Flower2',
    x: '3%',
    y: '30%',
    s: 34,
    r: 12
  }, {
    n: 'Sparkles',
    x: '9%',
    y: '52%',
    s: 56,
    r: -20
  }, {
    n: 'Leaf',
    x: '2%',
    y: '72%',
    s: 40,
    r: -28
  }, {
    n: 'Star',
    x: '12%',
    y: '88%',
    s: 30,
    r: 18
  }, {
    n: 'Flower',
    x: '22%',
    y: '4%',
    s: 52,
    r: 14
  }, {
    n: 'PenTool',
    x: '25%',
    y: '94%',
    s: 34,
    r: -12
  }, {
    n: 'Leaf',
    x: '34%',
    y: '86%',
    s: 62,
    r: 40
  }, {
    n: 'Cloud',
    x: '38%',
    y: '2%',
    s: 68,
    r: -6
  }, {
    n: 'Heart',
    x: '46%',
    y: '93%',
    s: 28,
    r: 22
  }, {
    n: 'Sparkles',
    x: '50%',
    y: '3%',
    s: 32,
    r: 10
  }, {
    n: 'Star',
    x: '57%',
    y: '90%',
    s: 44,
    r: -16
  }, {
    n: 'Flower',
    x: '61%',
    y: '1%',
    s: 36,
    r: 24
  }, {
    n: 'Brush',
    x: '69%',
    y: '92%',
    s: 40,
    r: -24
  }, {
    n: 'Palette',
    x: '73%',
    y: '3%',
    s: 58,
    r: 12
  }, {
    n: 'Flower2',
    x: '80%',
    y: '86%',
    s: 50,
    r: -8
  }, {
    n: 'Sun',
    x: '86%',
    y: '2%',
    s: 34,
    r: 16
  }, {
    n: 'Leaf',
    x: '94%',
    y: '26%',
    s: 54,
    r: 34
  }, {
    n: 'Sparkles',
    x: '97%',
    y: '8%',
    s: 30,
    r: -14
  }, {
    n: 'Cloud',
    x: '92%',
    y: '50%',
    s: 40,
    r: 8
  }, {
    n: 'Star',
    x: '96%',
    y: '68%',
    s: 36,
    r: -20
  }, {
    n: 'Flower',
    x: '89%',
    y: '94%',
    s: 30,
    r: 18
  }, {
    n: 'Rainbow',
    x: '31%',
    y: '48%',
    s: 34,
    r: 0
  }, {
    n: 'Pencil',
    x: '66%',
    y: '44%',
    s: 28,
    r: -18
  }];
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: it.x,
      top: it.y,
      transform: `rotate(${it.r}deg)`,
      color: 'var(--yellow-300)',
      opacity: it.s > 50 ? 0.55 : 0.68
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: it.n,
    size: it.s,
    strokeWidth: 1.5,
    color: "var(--yellow-300)"
  }))));
}
function Download() {
  const {
    Ico,
    Splat,
    KID
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  return /*#__PURE__*/React.createElement("section", {
    id: "download",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Doodles, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--baeucke-yellow)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-12)',
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 'var(--space-12)',
      alignItems: 'center'
    },
    className: "dl-grid dl-panel"
  }, /*#__PURE__*/React.createElement(Splat, {
    color: "#fff",
    size: 140,
    style: {
      bottom: -40,
      right: -30,
      opacity: 0.25
    },
    rotate: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources.beispielNeu,
    alt: "Ausmalbild-Vorlage zum Ausdrucken",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--neutral-800)',
      margin: '0 0 12px'
    }
  }, "Laden Sie das Ausmalbild herunter"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--neutral-800)',
      opacity: 0.85,
      fontSize: 'var(--text-lg)',
      marginBottom: 24
    }
  }, "Drucken Sie die Vorlage aus \u2013 und Ihr Kind kann unser M\xF6belhaus mit Wiese, Himmel und allem Drum und Dran bunt gestalten. Je kreativer, desto besser!"), /*#__PURE__*/React.createElement("a", {
    href: window.__resources.vorlage,
    download: "Baeucke-Malwettbewerb-Ausmalbild.png",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ink",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Download",
      size: 18
    })
  }, "Ausmalbild herunterladen")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--neutral-800)',
      opacity: 0.7,
      fontSize: 'var(--text-sm)',
      marginTop: 14,
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Info",
    size: 14
  }), " \xA0Am besten auf festem Papier im Format DIN A4 ausdrucken.")))));
}
function FAQ() {
  const {
    Ico,
    FAQS
  } = window;
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    style: {
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Teilnahmebedingungen & FAQ"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "H\xE4ufige Fragen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, FAQS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(open === i ? -1 : i),
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      padding: 'var(--space-5) var(--space-6)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)'
    }
  }, f.q, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      color: 'var(--baeucke-yellow)',
      transform: open === i ? 'rotate(180deg)' : 'none',
      transition: 'var(--transition-base)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "ChevronDown",
    size: 22
  }))), open === i && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-6) var(--space-5)',
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)'
    }
  }, f.a))))));
}
function Stars({
  size = 18
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2,
      color: '#F7A800',
      fontSize: size,
      lineHeight: 1
    }
  }, '★★★★★'.split('').map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, s)));
}
function Reviews() {
  const {
    Ico,
    REVIEWS,
    SEAL_URL,
    GOOGLE,
    GoogleG
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Das sagen unsere Kunden"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Ausgezeichnet bewertet bei Google")), /*#__PURE__*/React.createElement("img", {
    src: window.__resources.seal,
    alt: "Auszeichnung / Siegel",
    style: {
      height: 110,
      width: 'auto',
      flex: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      background: 'var(--surface-page)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5) var(--space-6)',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(GoogleG, {
    size: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)'
    }
  }, "Google", /*#__PURE__*/React.createElement("br", null), "Bewertungen")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 44,
      background: 'var(--border-subtle)'
    },
    className: "hide-sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'clamp(2.25rem, 5vw, 2.75rem)',
      fontWeight: 900,
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, GOOGLE.rating), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, GOOGLE.count, " Rezensionen"))), /*#__PURE__*/React.createElement("a", {
    href: GOOGLE.url,
    target: "_blank",
    rel: "noopener",
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--text-strong)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, "Alle Bewertungen ansehen ", /*#__PURE__*/React.createElement(Ico, {
    name: "ExternalLink",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-5)'
    },
    className: "step-grid"
  }, REVIEWS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--surface-page)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Stars, null), /*#__PURE__*/React.createElement(Ico, {
    name: "Quote",
    size: 22,
    color: "var(--border-default)"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)',
      flex: 1
    }
  }, "\u201E", r.text, "\u201C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "User",
    size: 18,
    color: "var(--neutral-700)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, r.who)))))));
}
function StoreInfo() {
  const {
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  const hours = [{
    label: 'Möbelhaus',
    rows: ['Mo.–Fr. 9.30–19.00 Uhr', 'Sa. 9.30–18.00 Uhr']
  }, {
    label: 'Lager',
    rows: ['Mo.–Fr. 9.30–17.00 Uhr', 'Sa. 10.00–14.00 Uhr']
  }, {
    label: 'Büro',
    rows: ['Mo.–Sa. 8.00–17.30 Uhr']
  }];
  const mapSrc = 'https://www.google.com/maps?q=M%C3%B6belhaus%20B%C3%A4ucke%20%C3%9Cber%20dem%20Hellewege%2012%2037154%20Northeim&output=embed';
  return /*#__PURE__*/React.createElement("section", {
    id: "besuch",
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Besuchen Sie uns"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Ihr M\xF6belhaus in Northeim")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 'var(--space-8)',
      alignItems: 'stretch'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      minHeight: 360
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "Standort Interliving B\xE4ucke",
    src: mapSrc,
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
    style: {
      width: '100%',
      height: '100%',
      minHeight: 360,
      border: 0,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "MapPin",
    size: 20,
    color: "var(--baeucke-yellow)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "M\xF6belhaus B\xE4ucke GmbH & Co. KG", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, "\xDCber dem Hellewege 12 \xB7 37154 Northeim"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, hours.map(h => /*#__PURE__*/React.createElement("div", {
    key: h.label,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Clock",
    size: 15,
    color: "var(--text-muted)"
  }), " ", h.label), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, h.rows.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'block'
    }
  }, r))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Phone",
    size: 16,
    color: "var(--baeucke-yellow)"
  }), " 05551 / 9735-0"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      color: 'var(--text-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Mail",
    size: 16,
    color: "var(--baeucke-yellow)"
  }), " info@baeucke.de")), /*#__PURE__*/React.createElement("a", {
    href: "https://www.google.com/maps/dir/?api=1&destination=M%C3%B6belhaus%20B%C3%A4ucke%20Northeim",
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Navigation",
      size: 18
    }),
    fullWidth: true
  }, "Route planen"))))));
}
function Footer() {
  const {
    Ico
  } = window;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--neutral-800)',
      color: 'var(--neutral-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources.logoWeiss,
    alt: "Interliving B\xE4ucke",
    style: {
      height: 44,
      alignSelf: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'rgba(255,255,255,0.75)',
      fontSize: 'var(--text-sm)'
    }
  }, "M\xF6belhaus B\xE4ucke GmbH & Co. KG \xB7 \xDCber dem Hellewege 12 \xB7 37154 Northeim")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,0.8)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Phone",
    size: 16
  }), " 05551 / 9735-0"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Mail",
    size: 16
  }), " info@baeucke.de"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Globe",
    size: 16
  }), " www.baeucke.de"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '16px var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      fontSize: 'var(--text-xs)',
      color: 'rgba(255,255,255,0.6)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 M\xF6belhaus B\xE4ucke GmbH & Co. KG"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", null, "Teilnahmebedingungen"), /*#__PURE__*/React.createElement("span", null, "Datenschutz"), /*#__PURE__*/React.createElement("span", null, "Impressum")))));
}
Object.assign(window, {
  scrollToId,
  Header,
  Hero,
  Countdown,
  Prizes,
  Steps,
  Download,
  Reviews,
  StoreInfo,
  FAQ,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "campaigns/malwettbewerb/sections.standalone.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact status / category label.
 * Use `tone="sale"` for the red price-drop motif; `tone="brand"` for yellow highlights.
 */
function Badge({
  children,
  tone = 'neutral',
  size = 'md',
  ...rest
}) {
  const tones = {
    neutral: {
      background: 'var(--neutral-100)',
      color: 'var(--text-body)',
      border: 'var(--neutral-200)'
    },
    brand: {
      background: 'var(--yellow-400)',
      color: 'var(--neutral-800)',
      border: 'transparent'
    },
    ink: {
      background: 'var(--neutral-700)',
      color: 'var(--neutral-0)',
      border: 'transparent'
    },
    sale: {
      background: 'var(--red-500)',
      color: '#fff',
      border: 'transparent'
    },
    success: {
      background: 'var(--green-100)',
      color: 'var(--green-500)',
      border: 'transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: 'var(--border-default)'
    }
  };
  const sizes = {
    sm: {
      padding: '2px 8px',
      fontSize: '0.6875rem'
    },
    md: {
      padding: '4px 11px',
      fontSize: 'var(--text-xs)'
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      border: `1px solid ${t.border}`,
      background: t.background,
      color: t.color,
      ...sizes[size]
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProductCard — furniture product tile for listing grids.
 * Image area falls back to a calm neutral placeholder when no `image` is given.
 */
function ProductCard({
  name,
  brand,
  price,
  oldPrice,
  badge,
  // { tone, label }
  image,
  // optional image URL
  wishlisted = false,
  onWishlist,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      transition: 'var(--transition-base)',
      fontFamily: 'var(--font-sans)'
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 3',
      background: 'var(--neutral-100)'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-faint)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase'
    }
  }, "Produktbild"), badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badge.tone || 'sale'
  }, badge.label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Auf die Merkliste",
    onClick: e => {
      e.stopPropagation();
      onWishlist && onWishlist();
    },
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 38,
      height: 38,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      background: 'rgba(255,255,255,0.92)',
      boxShadow: 'var(--shadow-sm)',
      cursor: 'pointer',
      color: wishlisted ? 'var(--red-500)' : 'var(--text-muted)',
      fontSize: '18px',
      lineHeight: 1
    }
  }, wishlisted ? '♥' : '♡')), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flex: 1
    }
  }, brand && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, brand), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-strong)',
      lineHeight: 1.3
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: '8px',
      display: 'flex',
      alignItems: 'baseline',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--weight-extrabold)',
      color: oldPrice ? 'var(--red-500)' : 'var(--text-strong)'
    }
  }, price), oldPrice && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      textDecoration: 'line-through'
    }
  }, oldPrice))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary call-to-action for Interliving Bäucke surfaces.
 * Yellow = primary brand action; ink = strong dark action; outline/ghost = secondary.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 'var(--text-sm)',
      gap: '6px',
      minHeight: '36px'
    },
    md: {
      padding: '12px 24px',
      fontSize: 'var(--text-md)',
      gap: '8px',
      minHeight: '46px'
    },
    lg: {
      padding: '15px 32px',
      fontSize: 'var(--text-lg)',
      gap: '10px',
      minHeight: '54px'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes[size].gap,
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-bold)',
    fontSize: sizes[size].fontSize,
    lineHeight: 1,
    padding: sizes[size].padding,
    minHeight: sizes[size].minHeight,
    width: fullWidth ? '100%' : 'auto',
    border: '1.5px solid transparent',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'var(--transition-base)',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--action-primary)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--shadow-sm)'
    },
    ink: {
      background: 'var(--action-ink)',
      color: 'var(--text-inverse)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)'
    }
  };
  const hovers = {
    primary: {
      background: 'var(--action-primary-hover)',
      boxShadow: 'var(--shadow-md)'
    },
    ink: {
      background: 'var(--action-ink-hover)'
    },
    outline: {
      background: 'var(--neutral-100)'
    },
    ghost: {
      background: 'var(--neutral-100)'
    }
  };
  const onEnter = e => {
    if (!disabled) Object.assign(e.currentTarget.style, hovers[variant]);
  };
  const onLeave = e => {
    if (!disabled) Object.assign(e.currentTarget.style, variants[variant]);
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(0)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...variants[variant]
    },
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — calm, premium surface container. Optional hover lift for clickable cards.
 */
function Card({
  children,
  padding = 'md',
  elevation = 'sm',
  interactive = false,
  as = 'div',
  style = {},
  ...rest
}) {
  const Tag = as;
  const pads = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const shadows = {
    none: 'none',
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  const base = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-lg)',
    padding: pads[padding],
    boxShadow: shadows[elevation],
    transition: 'var(--transition-base)',
    cursor: interactive ? 'pointer' : 'default',
    ...style
  };
  const onEnter = e => {
    if (interactive) {
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    }
  };
  const onLeave = e => {
    if (interactive) {
      e.currentTarget.style.boxShadow = shadows[elevation];
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: base,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square/round button for a single icon (nav, toolbars, close, wishlist).
 */
function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  round = false,
  disabled = false,
  ariaLabel,
  onClick,
  ...rest
}) {
  const dims = {
    sm: 36,
    md: 44,
    lg: 52
  };
  const d = dims[size];
  const variants = {
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: 'transparent'
    },
    solid: {
      background: 'var(--neutral-700)',
      color: 'var(--neutral-0)',
      border: 'transparent'
    },
    brand: {
      background: 'var(--yellow-400)',
      color: 'var(--neutral-800)',
      border: 'transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: 'var(--border-default)'
    }
  };
  const hover = {
    ghost: 'var(--neutral-100)',
    solid: 'var(--neutral-900)',
    brand: 'var(--yellow-500)',
    outline: 'var(--neutral-100)'
  };
  const v = variants[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.background = hover[variant];
    },
    onMouseLeave: e => {
      if (!disabled) e.currentTarget.style.background = v.background;
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: d,
      height: d,
      border: `1.5px solid ${v.border}`,
      borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)',
      background: v.background,
      color: v.color,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'var(--transition-base)',
      flex: 'none'
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field with optional label, leading icon and helper/error text.
 */
function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  iconLeft = null,
  helper,
  error,
  disabled = false,
  fullWidth = true,
  ...rest
}) {
  const reactId = React.useId();
  const inputId = id || reactId;
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? 'var(--red-500)' : focused ? 'var(--neutral-700)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-strong)',
      marginBottom: '6px'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: disabled ? 'var(--neutral-100)' : 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      padding: '0 14px',
      minHeight: '46px',
      boxShadow: focused ? 'var(--shadow-focus)' : 'none',
      transition: 'var(--transition-base)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--text-md)',
      color: 'var(--text-body)',
      padding: '12px 0',
      minWidth: 0
    }
  }, rest))), (helper || error) && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--red-500)' : 'var(--text-muted)',
      fontWeight: 'var(--weight-medium)'
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — filter / category chip. Selectable variant for filter bars.
 */
function Tag({
  children,
  selected = false,
  onClick,
  removable = false,
  onRemove,
  ...rest
}) {
  const clickable = !!onClick || selected;
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    role: clickable ? 'button' : undefined,
    tabIndex: clickable ? 0 : undefined,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-sm)',
      padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      border: `1.5px solid ${selected ? 'var(--neutral-700)' : 'var(--border-default)'}`,
      background: selected ? 'var(--neutral-700)' : 'transparent',
      color: selected ? 'var(--neutral-0)' : 'var(--text-body)',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'var(--transition-base)',
      userSelect: 'none'
    }
  }, rest), children, removable && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove && onRemove();
    },
    style: {
      display: 'inline-flex',
      fontSize: '1.1em',
      lineHeight: 1,
      opacity: 0.7
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* Footer with store info, contact, columns */
function Footer({
  onNavigate
}) {
  const {
    Ico
  } = window;
  const col = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  };
  const head = {
    fontSize: 'var(--text-xs)',
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--baeucke-yellow)',
    marginBottom: 6
  };
  const link = {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer'
  };
  const Link = ({
    children
  }) => /*#__PURE__*/React.createElement("a", {
    style: link,
    onMouseEnter: e => e.currentTarget.style.color = '#fff',
    onMouseLeave: e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
  }, children);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--neutral-800)',
      color: 'var(--neutral-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-16) var(--gutter) var(--space-10)',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 'var(--space-8)'
    },
    className: "foot-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/Logo-Baeucke-weiss.svg",
    alt: "Interliving B\xE4ucke",
    style: {
      height: 46,
      alignSelf: 'flex-start',
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start',
      color: 'rgba(255,255,255,0.8)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "MapPin",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "M\xF6belhaus B\xE4ucke GmbH & Co. KG", /*#__PURE__*/React.createElement("br", null), "\xDCber dem Hellewege 12", /*#__PURE__*/React.createElement("br", null), "D-37154 Northeim")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      color: 'rgba(255,255,255,0.8)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Phone",
    size: 16
  }), " 05551 / 9735-0"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      color: 'rgba(255,255,255,0.8)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Mail",
    size: 16
  }), " info@baeucke.de"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Facebook",
    size: 18
  }), /*#__PURE__*/React.createElement(Ico, {
    name: "Instagram",
    size: 18
  }), /*#__PURE__*/React.createElement(Ico, {
    name: "MessageCircle",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: head
  }, "\xD6ffnungszeiten"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...link,
      cursor: 'default'
    }
  }, "M\xF6belhaus"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 'var(--text-sm)'
    }
  }, "Mo.\u2013Fr. 9.30\u201319.00 Uhr", /*#__PURE__*/React.createElement("br", null), "Sa. 9.30\u201318.00 Uhr"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...link,
      cursor: 'default',
      marginTop: 6
    }
  }, "Lager"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 'var(--text-sm)'
    }
  }, "Mo.\u2013Fr. 9.30\u201317.00 Uhr", /*#__PURE__*/React.createElement("br", null), "Sa. 10.00\u201314.00 Uhr")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: head
  }, "Unternehmen"), /*#__PURE__*/React.createElement(Link, null, "\xDCber uns"), /*#__PURE__*/React.createElement(Link, null, "Historie"), /*#__PURE__*/React.createElement(Link, null, "Marken"), /*#__PURE__*/React.createElement(Link, null, "Stellenangebote"), /*#__PURE__*/React.createElement(Link, null, "Virtueller Rundgang")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: head
  }, "Service"), /*#__PURE__*/React.createElement(Link, null, "Lieferung"), /*#__PURE__*/React.createElement(Link, null, "Finanzierung"), /*#__PURE__*/React.createElement(Link, null, "Abholservice"), /*#__PURE__*/React.createElement(Link, null, "Mietmobil"), /*#__PURE__*/React.createElement(Link, null, "Kundendienst"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '18px var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontSize: 'var(--text-xs)',
      color: 'rgba(255,255,255,0.6)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 M\xF6belhaus B\xE4ucke GmbH & Co. KG"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Link, null, "AGB"), /*#__PURE__*/React.createElement(Link, null, "Datenschutz"), /*#__PURE__*/React.createElement(Link, null, "Impressum")))));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* Header: opening-hours utility strip + main nav with mega-dropdown */
function Header({
  onNavigate,
  wishlistCount = 0,
  onSearch,
  onMenu
}) {
  const {
    Ico,
    NAV
  } = window;
  const {
    IconButton
  } = window.DesignSystem_9f5cef;
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--neutral-700)',
      color: 'var(--neutral-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '7px var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      fontSize: 'var(--text-xs)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      opacity: 0.92
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Clock",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: '0.02em'
    }
  }, "M\xF6belhaus: Mo.\u2013Fr. 9.30\u201319.00 Uhr \xB7 Sa. 9.30\u201318.00 Uhr")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Phone",
    size: 14
  }), " 05551 / 9735-0"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 12,
      opacity: 0.92
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Facebook",
    size: 15
  }), /*#__PURE__*/React.createElement(Ico, {
    name: "Instagram",
    size: 15
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '14px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate('home');
    },
    style: {
      display: 'flex',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/Logo-Baeucke-gelb.svg",
    alt: "Interliving B\xE4ucke",
    style: {
      height: 50
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "mainnav",
    style: {
      display: 'flex',
      gap: 4,
      marginLeft: 8,
      flex: 1
    },
    onMouseLeave: () => setOpen(null)
  }, NAV.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.label,
    style: {
      position: 'relative'
    },
    onMouseEnter: () => setOpen(item.label)
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('category', item.label),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '10px 14px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      color: open === item.label ? 'var(--text-strong)' : 'var(--text-body)',
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, item.label, /*#__PURE__*/React.createElement(Ico, {
    name: "ChevronDown",
    size: 15
  })), open === item.label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: 240,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-subtle)',
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, item.sub.map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => onNavigate('category', s),
    style: {
      textAlign: 'left',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '9px 12px',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--neutral-100)',
    onMouseLeave: e => e.currentTarget.style.background = 'none'
  }, s)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    ariaLabel: "Suche",
    variant: "ghost",
    onClick: onSearch
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Search"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    ariaLabel: "Merkliste",
    variant: "ghost",
    onClick: () => onNavigate('wishlist')
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Heart"
  })), wishlistCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      right: 2,
      minWidth: 18,
      height: 18,
      padding: '0 4px',
      borderRadius: 999,
      background: 'var(--red-500)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 800,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, wishlistCount)), /*#__PURE__*/React.createElement("button", {
    className: "burger",
    onClick: onMenu,
    "aria-label": "Men\xFC",
    style: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "Menu",
    size: 26
  })))));
}
Object.assign(window, {
  Header
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* Hero with rotating slides */
function Hero({
  onNavigate
}) {
  const {
    Ico,
    Placeholder
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  const slides = [{
    eyebrow: 'Interliving Partner in Northeim',
    title: 'Deutschlands neue\nexklusive Möbelwelt',
    text: 'Entdecken Sie gemütliche Sofas, traumhaft weiche Betten und stilvolle Schränke – in genau der Variante, die zu Ihnen passt.',
    cta: 'Jetzt entdecken',
    icon: 'Sofa'
  }, {
    eyebrow: 'Henders & Hazel Kollektion',
    title: 'Das neue\nWohnerlebnis',
    text: 'Zeitgemäß und vielfältig: jedes Jahr neue Kollektionen in den Stilen modern, industriell, rustikal und natürlich.',
    cta: 'Kollektion ansehen',
    icon: 'Armchair'
  }, {
    eyebrow: 'Küchenwelt',
    title: 'Ihre Traumküche,\nindividuell geplant',
    text: 'Von der Beratung bis zur Montage – unsere Küchenexperten begleiten Sie persönlich.',
    cta: 'Küchen entdecken',
    icon: 'CookingPot'
  }];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: 'var(--space-12)',
      alignItems: 'center'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: 'var(--text-muted)'
    }
  }, s.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-display)',
      margin: '14px 0 18px',
      whiteSpace: 'pre-line',
      fontWeight: 800
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--text-body)',
      maxWidth: 520,
      marginBottom: 28
    }
  }, s.text), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      name: "ArrowRight",
      size: 18
    }),
    onClick: () => onNavigate('category', 'Möbel')
  }, s.cta), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    onClick: () => onNavigate('contact')
  }, "Termin vereinbaren")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 36
    }
  }, slides.map((_, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    onClick: () => setI(idx),
    "aria-label": `Slide ${idx + 1}`,
    style: {
      width: idx === i ? 28 : 10,
      height: 10,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: idx === i ? 'var(--baeucke-yellow)' : 'var(--neutral-300)',
      transition: 'var(--transition-base)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    icon: s.icon,
    label: "Lifestyle-Bild",
    ratio: "5 / 4",
    tone: i
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -22,
      left: -22,
      background: 'var(--baeucke-yellow)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 22px',
      boxShadow: 'var(--shadow-md)',
      maxWidth: 220
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 'var(--text-xl)',
      color: 'var(--neutral-800)'
    }
  }, "700 m\xB2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--neutral-800)'
    }
  }, "Wohnaccessoires & Deko")))));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductRail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Product rail using the ProductCard primitive */
function ProductRail({
  wish,
  onWish
}) {
  const {
    PRODUCTS,
    Ico
  } = window;
  const {
    ProductCard,
    Button
  } = window.DesignSystem_9f5cef;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 'var(--space-8)',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: 'var(--status-sale)'
    }
  }, "% Aktuelle Angebote"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Ausgew\xE4hlte Empfehlungen")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      name: "ArrowRight",
      size: 16
    })
  }, "Alle Angebote")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-5)'
    },
    className: "prod-grid"
  }, PRODUCTS.map((p, i) => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: i
  }, p, {
    wishlisted: !!wish[i],
    onWishlist: () => onWish(i)
  }))))));
}
Object.assign(window, {
  ProductRail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Secondary screens: category listing, contact form, search overlay, mobile menu */

function CategoryView({
  title,
  wish,
  onWish,
  onNavigate
}) {
  const {
    PRODUCTS,
    Ico
  } = window;
  const {
    ProductCard,
    Tag,
    Button
  } = window.DesignSystem_9f5cef;
  const [filter, setFilter] = React.useState('Alle');
  const filters = ['Alle', 'Polster', 'Tische', 'Betten', 'Sessel'];
  const items = [...PRODUCTS, ...PRODUCTS].slice(0, 8);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--gutter) var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate('home'),
    style: {
      cursor: 'pointer'
    }
  }, "Home"), /*#__PURE__*/React.createElement(Ico, {
    name: "ChevronRight",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 700
    }
  }, title)), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginBottom: 'var(--space-2)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      marginBottom: 'var(--space-6)'
    }
  }, "Aus unserer riesigen Auswahl f\xFCr alle Wohnbereiche \u2013 beraten Sie unsere Fachberater gerne pers\xF6nlich."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      marginBottom: 'var(--space-8)',
      alignItems: 'center'
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    selected: filter === f,
    onClick: () => setFilter(f)
  }, f)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, items.length, " Artikel")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-5)'
    },
    className: "prod-grid"
  }, items.map((p, i) => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: i
  }, p, {
    wishlisted: !!wish[i],
    onWishlist: () => onWish(i)
  })))));
}
function ContactView({
  onNavigate
}) {
  const {
    Ico,
    Placeholder
  } = window;
  const {
    Input,
    Button
  } = window.DesignSystem_9f5cef;
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--gutter) var(--section-y)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-12)',
      alignItems: 'start'
    },
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Kontakt"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '10px 0 12px'
    }
  }, "Beratungstermin vereinbaren"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      marginBottom: 'var(--space-8)',
      maxWidth: 460
    }
  }, "Gerne nehmen wir uns Zeit f\xFCr Ihre Einrichtungsw\xFCnsche. Hinterlassen Sie uns eine Nachricht \u2013 wir melden uns zeitnah bei Ihnen."), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green-100)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-8)',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "CircleCheck",
    size: 28,
    color: "var(--green-500)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 6px'
    }
  }, "Vielen Dank!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)'
    }
  }, "Ihre Anfrage ist bei uns eingegangen. Wir melden uns werktags innerhalb von 24 Stunden bei Ihnen."))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Vorname",
    placeholder: "Vorname"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Nachname",
    placeholder: "Nachname"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "E-Mail",
    type: "email",
    placeholder: "ihre@email.de",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Mail",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telefon",
    placeholder: "0151 \u2026",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Phone",
      size: 18
    }),
    helper: "Optional \u2013 falls Sie einen R\xFCckruf w\xFCnschen."
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginBottom: -6
    }
  }, "Ihre Nachricht"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    placeholder: "Worum geht es?",
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 'var(--text-md)',
      color: 'var(--text-body)',
      padding: '12px 14px',
      border: '1.5px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      resize: 'vertical'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      name: "Send",
      size: 18
    })
  }, "Anfrage senden"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 120,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    icon: "MapPin",
    label: "Anfahrt \xB7 Northeim",
    ratio: "16 / 11"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      boxShadow: 'var(--shadow-sm)'
    }
  }, [['MapPin', 'Über dem Hellewege 12, 37154 Northeim'], ['Phone', '05551 / 9735-0'], ['Mail', 'info@baeucke.de'], ['Clock', 'Mo.–Fr. 9.30–19.00 · Sa. 9.30–18.00']].map(([ic, tx]) => /*#__PURE__*/React.createElement("div", {
    key: tx,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--yellow-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: ic,
    size: 18,
    color: "var(--neutral-800)"
  })), tx)))));
}
function SearchOverlay({
  onClose,
  onNavigate
}) {
  const {
    Ico,
    CATEGORIES
  } = window;
  const {
    Input,
    Tag
  } = window.DesignSystem_9f5cef;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'rgba(35,35,35,0.5)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '12vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(680px, 92vw)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xl)',
      padding: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Wonach suchen Sie? z. B. Boxspringbett, Esstisch \u2026",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      name: "Search",
      size: 20
    }),
    autoFocus: true
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Schlie\xDFen",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "X",
    size: 24
  }))), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Beliebte Bereiche"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      marginTop: 12
    }
  }, CATEGORIES.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c.name,
    onClick: () => {
      onNavigate('category', c.name);
      onClose();
    }
  }, c.name)))));
}
function MobileMenu({
  onClose,
  onNavigate
}) {
  const {
    Ico,
    NAV
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'rgba(35,35,35,0.5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 'min(360px, 88vw)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xl)',
      padding: 'var(--space-6)',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/Logo-Baeucke-gelb.svg",
    style: {
      height: 40
    },
    alt: "B\xE4ucke"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Schlie\xDFen",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "X",
    size: 26
  }))), NAV.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.label,
    onClick: () => {
      onNavigate('category', item.label);
      onClose();
    },
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      background: 'none',
      border: 'none',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '16px 0',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)'
    }
  }, item.label, " ", /*#__PURE__*/React.createElement(Ico, {
    name: "ChevronRight",
    size: 18,
    color: "var(--text-muted)"
  })))));
}
Object.assign(window, {
  CategoryView,
  ContactView,
  SearchOverlay,
  MobileMenu
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* Category grid, USP band, brand strip, service CTA */
function CategoryGrid({
  onNavigate
}) {
  const {
    Ico,
    CATEGORIES
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Sortiment"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0'
    }
  }, "Entdecken Sie unsere Wohnwelten")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-5)'
    },
    className: "cat-grid"
  }, CATEGORIES.map((c, idx) => /*#__PURE__*/React.createElement("button", {
    key: c.name,
    onClick: () => onNavigate('category', c.name),
    style: {
      position: 'relative',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      cursor: 'pointer',
      padding: 0,
      background: 'var(--surface-card)',
      textAlign: 'left',
      boxShadow: 'var(--shadow-sm)',
      transition: 'var(--transition-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16 / 10',
      background: ['#EAE6DF', '#E4DFD6', '#EDEAE3', '#E7E2D9'][c.tone],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--neutral-400)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: c.icon,
    size: 48,
    strokeWidth: 1.5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4) var(--space-5)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)'
    }
  }, c.name), /*#__PURE__*/React.createElement(Ico, {
    name: "ArrowRight",
    size: 20,
    color: "var(--baeucke-yellow)"
  }))))));
}
function USPBand() {
  const {
    Ico,
    USPS
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--neutral-700)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-8)'
    },
    className: "usp-grid"
  }, USPS.map(u => /*#__PURE__*/React.createElement("div", {
    key: u.title,
    style: {
      color: 'var(--neutral-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-md)',
      background: 'var(--baeucke-yellow)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: u.icon,
    size: 26,
    color: "var(--neutral-800)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--neutral-0)',
      fontSize: 'var(--text-h4)',
      margin: '0 0 8px'
    }
  }, u.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,0.78)'
    }
  }, u.text)))));
}
function BrandStrip() {
  const {
    BRANDS
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Markenvielfalt"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 var(--space-10)'
    }
  }, "Viele Top-Marken unter einem Dach"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 'var(--space-4)'
    }
  }, BRANDS.map(b => /*#__PURE__*/React.createElement("div", {
    key: b,
    style: {
      padding: '14px 26px',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      fontWeight: 700,
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)'
    }
  }, b))));
}
function ServiceCTA({
  onNavigate
}) {
  const {
    Ico
  } = window;
  const {
    Button
  } = window.DesignSystem_9f5cef;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--baeucke-yellow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-16) var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-8)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--neutral-800)',
      margin: '0 0 10px'
    }
  }, "Vereinbaren Sie jetzt einen pers\xF6nlichen Beratungstermin"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--neutral-800)',
      margin: 0,
      fontSize: 'var(--text-lg)',
      opacity: 0.85
    }
  }, "Unsere geschulten Fachberater nehmen sich Zeit f\xFCr Ihre W\xFCnsche \u2013 im Haus oder bei Ihnen zuhause.")), /*#__PURE__*/React.createElement(Button, {
    variant: "ink",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      name: "ArrowRight",
      size: 18
    }),
    onClick: () => onNavigate('contact')
  }, "Einfach hier klicken")));
}
Object.assign(window, {
  CategoryGrid,
  USPBand,
  BrandStrip,
  ServiceCTA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/lib.jsx
try { (() => {
/* Shared helpers + fake data for the Bäucke website UI kit */

// Lucide icon helper
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
    } catch (e) {/* no-op on bad icon name */}
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  });
}

// Warm neutral image placeholder (we don't ship real product photos)
function Placeholder({
  icon = 'Image',
  label,
  ratio = '4 / 3',
  radius = 'var(--radius-lg)',
  tone = 0
}) {
  const tones = ['#EAE6DF', '#E4DFD6', '#EDEAE3', '#E7E2D9'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: ratio,
      width: '100%',
      background: tones[tone % tones.length],
      borderRadius: radius,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 10,
      color: 'var(--neutral-400)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: icon,
    size: 40,
    strokeWidth: 1.5
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase'
    }
  }, label));
}
const NAV = [{
  label: 'Möbel',
  sub: ['Polstermöbel', 'Wohnzimmer', 'Speisezimmer', 'Schlafzimmer', 'Kinder- & Jugendzimmer', 'Flur & Diele', 'Homeoffice', 'Matratzen & Lattenroste']
}, {
  label: 'Küchen',
  sub: ['Über Küchen', 'Küchenmarken', 'Angebote', 'Referenzen']
}, {
  label: 'Wohnaccessoires',
  sub: ['Bilder & Leinwände', 'Dekoration', 'Heimtextilien']
}, {
  label: 'Service',
  sub: ['Lieferung', 'Abholservice', 'Finanzierung', 'Mietmobil', 'Kundendienst']
}, {
  label: 'Unternehmen',
  sub: ['Über uns', 'Historie', 'Marken', 'Stellenangebote', 'Kontakt']
}];
const CATEGORIES = [{
  name: 'Polstermöbel',
  icon: 'Sofa',
  tone: 0
}, {
  name: 'Wohnzimmer',
  icon: 'Armchair',
  tone: 1
}, {
  name: 'Speisezimmer',
  icon: 'Utensils',
  tone: 2
}, {
  name: 'Schlafzimmer',
  icon: 'BedDouble',
  tone: 3
}, {
  name: 'Küchen',
  icon: 'CookingPot',
  tone: 1
}, {
  name: 'Wohnaccessoires',
  icon: 'Lamp',
  tone: 0
}];
const PRODUCTS = [{
  brand: 'Interliving',
  name: 'Polstergarnitur Serie 4450',
  price: '2.499 €',
  oldPrice: '2.999 €',
  badge: {
    tone: 'sale',
    label: '% Sale'
  },
  icon: 'Sofa'
}, {
  brand: 'Henders & Hazel',
  name: 'Esstisch Eiche massiv 200 cm',
  price: '1.190 €',
  badge: {
    tone: 'success',
    label: 'Lieferbar'
  },
  icon: 'Utensils'
}, {
  brand: 'Himolla',
  name: 'Relaxsessel mit Motorfunktion',
  price: '1.849 €',
  badge: {
    tone: 'brand',
    label: 'Empfehlung'
  },
  icon: 'Armchair'
}, {
  brand: 'Interliving',
  name: 'Boxspringbett Serie 1026',
  price: '1.799 €',
  oldPrice: '2.190 €',
  badge: {
    tone: 'sale',
    label: '% Sale'
  },
  icon: 'BedDouble'
}];
const USPS = [{
  icon: 'LandPlot',
  title: 'Über 16.000 m²',
  text: 'Eine der größten Ausstellungsflächen in Südniedersachsen.'
}, {
  icon: 'Truck',
  title: 'Deutschlandweite Lieferung',
  text: 'Eigener Fuhrpark, Montage und Altmöbel­entsorgung inklusive.'
}, {
  icon: 'Tag',
  title: 'Tiefpreise',
  text: 'Durch Gemeinschaftseinkauf mit über 200 Möbelhäusern.'
}, {
  icon: 'Wrench',
  title: 'Eigene Werkstatt',
  text: 'Service­fahrzeuge und Werkstatt für jeden Sonderwunsch.'
}];
const BRANDS = ['Interliving', 'Henders & Hazel', 'Himolla', 'W. Schillig', 'Venjakob', 'Hartmann', 'Miele', 'Rauch'];
Object.assign(window, {
  Ico,
  Placeholder,
  NAV,
  CATEGORIES,
  PRODUCTS,
  USPS,
  BRANDS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/lib.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

})();
