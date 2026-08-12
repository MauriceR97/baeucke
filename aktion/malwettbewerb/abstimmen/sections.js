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
      backgroundImage: 'url(assets/hero-kind-malt.jpg)',
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
    src: "assets/schritte-abstimmung.jpg",
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
  Steps,
  Prizes,
  Stars,
  Reviews,
  StoreInfo,
  FAQ,
  Footer
});