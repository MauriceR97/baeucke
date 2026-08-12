/* Abstimmungs-Landingpage — Galerie, Stimmabgabe & aktuelle Führung */

const VOTE_KEY = 'baeucke-malwettbewerb-stimme';

// Google-Sheets-Anbindung: Web-App-URL aus Apps Script hier eintragen
// (siehe Google-Sheets-Anleitung.md). Leer = Prototyp ohne Speichern.
const VOTE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzbBBQDIVeypku4N6a7r5-4YtCEJthtA4EQeJAtkD10mi0PlZxQrhVaLy8uEMEDh7STRw/exec';

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
    alt: `Ausgemaltes Bild von ${e.vorname}`,
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
    href: "https://www.baeucke.de/datenschutz", target: "_blank", rel: "noopener",
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
    onError: (ev) => { const t = ev.currentTarget; if (t.dataset.fb) return; t.dataset.fb = '1'; t.style.display = 'none'; const p = t.parentElement; if (p) { p.style.background = '#EDEAE3'; p.style.display = 'flex'; p.style.alignItems = 'center'; p.style.justifyContent = 'center'; p.style.minHeight = '200px'; if (!p.querySelector('.bild-fehlt')) { const s = document.createElement('span'); s.className = 'bild-fehlt'; s.textContent = 'Bild nicht verfügbar'; s.style.cssText = 'font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9A9A97'; p.appendChild(s); } } },
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
  }, "Die Ergebnisse"), ladeStatus === 'laedt' ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Die Einsendungen werden geladen \u2026") : (meineStimme || rangliste.length >= 3) && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      margin: 0
    }
  }, meineStimme ? (rangliste.length >= 3 ? 'Vielen Dank – Ihre Stimme ist gespeichert. Aktuell führen diese drei Bilder.' : 'Vielen Dank – Ihre Stimme ist gespeichert.') : 'Aktuell führen diese drei Bilder. Klicken Sie auf ein Bild, um es größer zu sehen.'), ladeStatus === 'fehler' && /*#__PURE__*/React.createElement("p", {
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