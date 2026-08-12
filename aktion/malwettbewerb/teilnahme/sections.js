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
    src: "../../../assets/logos/Logo-Baeucke-gelb.svg",
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
      backgroundImage: 'url(assets/hero-aquarell-klein.jpg)',
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
    src: "assets/hero-beispiel.jpg",
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
    src: "assets/schritte-kinder.jpg",
    alt: "Ein M\xE4dchen malt am K\xFCchentisch das B\xE4ucke-Ausmalbild mit Buntstiften an",
    style: {
      display: 'block',
      width: '100%',
      maxWidth: 460,
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
    src: "assets/ausmalbild-beispiel-neu.jpg",
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
    href: "assets/Baeucke-Ausmalbild-A4.pdf",
    download: "Baeucke-Malwettbewerb-Ausmalbild.pdf",
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
  const { Ico, SEAL_URL, GOOGLE, GoogleG } = window;
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (document.querySelector('script[src*="elfsightcdn.com/platform.js"]')) return;
    const sk = document.createElement('script');
    sk.src = 'https://elfsightcdn.com/platform.js';
    sk.async = true;
    document.body.appendChild(sk);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: { background: '#F7F7F7' }
  }, /*#__PURE__*/React.createElement("div", {
    style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }
  }, /*#__PURE__*/React.createElement("div", {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }
  }, /*#__PURE__*/React.createElement("div", null,
    /*#__PURE__*/React.createElement("span", { className: "eyebrow" }, "Das sagen unsere Kunden"),
    /*#__PURE__*/React.createElement("h2", { style: { margin: '10px 0 0' } }, "Ausgezeichnet bewertet bei Google")
  ), /*#__PURE__*/React.createElement("img", {
    src: SEAL_URL, alt: "Auszeichnung / Siegel", style: { height: 110, width: 'auto', flex: 'none' }, loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    style: { display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5) var(--space-6)', marginBottom: 'var(--space-6)' }
  }, /*#__PURE__*/React.createElement("div", {
    style: { display: 'flex', alignItems: 'center', gap: 12 }
  }, /*#__PURE__*/React.createElement(GoogleG, { size: 40 }),
     /*#__PURE__*/React.createElement("span", { style: { fontWeight: 800, fontSize: 'var(--text-lg)', color: 'var(--text-strong)' } }, "Google", /*#__PURE__*/React.createElement("br", null), "Bewertungen")
  ), /*#__PURE__*/React.createElement("div", { style: { width: 1, height: 44, background: 'var(--border-subtle)' }, className: "hide-sm" }),
     /*#__PURE__*/React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10 } },
       /*#__PURE__*/React.createElement("span", { style: { fontSize: 'clamp(2.25rem, 5vw, 2.75rem)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 1 } }, GOOGLE.rating),
       /*#__PURE__*/React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 2 } },
         /*#__PURE__*/React.createElement(Stars, { size: 18 }),
         /*#__PURE__*/React.createElement("span", { style: { fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontWeight: 600 } }, GOOGLE.count, " Rezensionen")
       )
     ),
     /*#__PURE__*/React.createElement("a", { href: GOOGLE.url, target: "_blank", rel: "noopener", style: { marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-strong)', fontWeight: 700, fontSize: 'var(--text-sm)' } },
       "Alle Bewertungen ansehen ", /*#__PURE__*/React.createElement(Ico, { name: "ExternalLink", size: 15 }))
  ), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "elfsight-app-83aa18aa-0f46-4425-915f-523eec94fa20",
    "data-elfsight-app-lazy": true
  })));
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
    src: "../../../assets/logos/Logo-Baeucke-weiss.svg",
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
  }, /*#__PURE__*/React.createElement("span", null, "Teilnahmebedingungen"), /*#__PURE__*/React.createElement("a", { href: "https://www.baeucke.de/datenschutz", target: "_blank", rel: "noopener", style: { color: "rgba(255,255,255,0.8)", textDecoration: "none" } }, "Datenschutz"), /*#__PURE__*/React.createElement("a", { href: "https://www.baeucke.de/impressum", target: "_blank", rel: "noopener", style: { color: "rgba(255,255,255,0.8)", textDecoration: "none" } }, "Impressum")))));
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