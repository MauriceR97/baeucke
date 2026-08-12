/* Malwettbewerb landing — page sections */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 16, behavior: 'smooth' });
}

function Header() {
  const { Ico } = window;
  const { Button } = window.DesignSystem_9f5cef;
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '12px var(--gutter)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <img className="hd-logo" src="../../../assets/logos/Logo-Baeucke-gelb.svg" alt="Interliving Bäucke" style={{ height: 44 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="hide-sm" style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-muted)' }}>Einsendeschluss 30.09.2026</span>
          <Button className="baeucke-cta" variant="primary" size="sm" onClick={() => scrollToId('upload')}>Jetzt teilnehmen</Button>
        </div>
      </div>
    </header>
  );
}

function Voucher() {
  const { Ico } = window;
  return (
    <div style={{ marginTop: 22 }}>
      <div className="voucher-ticket" style={{ position: 'relative', display: 'flex', width: '100%', maxWidth: 470, borderRadius: 16, boxShadow: 'var(--shadow-lg)', transform: 'rotate(-1.4deg)', background: 'var(--surface-card)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
        <div className="voucher-stub" style={{ background: 'var(--baeucke-yellow)', padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 'none' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--neutral-800)' }}>Gewinn</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--neutral-800)', lineHeight: 1, letterSpacing: '-0.02em' }}>250&thinsp;€</span>
        </div>
        <div className="voucher-perf" style={{ position: 'relative', width: 0, borderLeft: '2px dashed var(--border-default)' }}>
          <span style={{ position: 'absolute', top: -9, left: -9, width: 16, height: 16, borderRadius: '50%', background: 'var(--yellow-50)' }}></span>
          <span style={{ position: 'absolute', bottom: -9, left: -9, width: 16, height: 16, borderRadius: '50%', background: 'var(--yellow-50)' }}></span>
        </div>
        <div className="voucher-body" style={{ flex: 1, minWidth: 0, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span className="v-kicker" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            <Ico name="Gift" size={15} color="var(--baeucke-yellow)" /> Geschenkgutschein
          </span>
          <span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1.1 }}>Interliving Bäucke</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>Einlösbar auf das gesamte Sortiment.</span>
          <span className="v-code" style={{ marginTop: 4, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--text-faint)', fontFamily: 'monospace' }}>GUTSCHEIN · MALWETTBEWERB 2026</span>
        </div>
      </div>
      <p style={{ margin: '14px 0 0', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-body)' }}>
        <span style={{ color: 'var(--text-strong)' }}>1. Preis 250 €</span> · 2. Preis 150 € · 3. Preis 50 €
      </p>
    </div>
  );
}

function Hero() {
  const { Ico, KID, Splat } = window;
  const { Button } = window.DesignSystem_9f5cef;
  const title = 'Malwettbewerb';
  const palette = [KID.red, KID.orange, KID.yellow, KID.green, KID.blue, KID.pink];
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--yellow-50)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/hero-aquarell.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom', opacity: 0.85 }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.28) 68%, rgba(255,255,255,0.1) 100%)' }}></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 90, background: 'linear-gradient(to bottom, rgba(247,247,246,0) 0%, var(--surface-page) 100%)' }}></div>
      <Splat color={KID.blue} size={130} style={{ top: 40, left: -30, opacity: 0.18 }} rotate={20} />
      <Splat color={KID.pink} size={90} style={{ top: 120, right: 60, opacity: 0.18 }} rotate={-15} />
      <Splat color={KID.green} size={110} style={{ bottom: -20, left: '45%', opacity: 0.15 }} rotate={40} />
      <div style={{ position: 'relative', maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-12) var(--gutter) var(--space-16)', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'var(--space-12)', alignItems: 'center' }} className="hero-grid">
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--baeucke-yellow)', color: 'var(--neutral-800)', fontWeight: 800, fontSize: 'var(--text-sm)', padding: '7px 16px', borderRadius: 'var(--radius-pill)' }}>
            <Ico name="Sparkles" size={16} color="var(--neutral-800)" /> Für Kinder bis einschließlich 12 Jahre
          </span>
          <h1 style={{ margin: '20px 0 18px', fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            {title.split('').map((c, i) => (
              <span key={i} style={{ color: palette[i % palette.length] }}>{c}</span>
            ))}
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-body)', maxWidth: 540, marginBottom: 8 }}>
            Ihr Kind gestaltet unser <b style={{ color: 'var(--text-strong)' }}>Möbelhaus</b> in seinen schönsten Farben – und gewinnt mit etwas Glück einen Warengutschein.
          </p>
          <Voucher />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <Button variant="primary" size="lg" iconLeft={<Ico name="Download" size={18} />} onClick={() => scrollToId('download')}>Ausmalbild herunterladen</Button>
            <Button variant="ink" size="lg" iconLeft={<Ico name="Upload" size={18} />} onClick={() => scrollToId('upload')}>Bild hochladen</Button>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '6px solid var(--surface-card)', background: 'var(--surface-card)' }}>
            <img src="assets/hero-beispiel.png" alt="Beispiel: ausgemaltes Bäucke-Möbelhaus" style={{ display: 'block', width: '100%', maxWidth: 534, height: 'auto', borderRadius: 'calc(var(--radius-xl) - 6px)' }} />
            <div style={{ position: 'absolute', top: 31, right: 14, background: 'var(--baeucke-yellow)', color: 'var(--neutral-800)', fontWeight: 800, fontSize: 'var(--text-sm)', padding: '8px 14px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', transform: 'rotate(6deg)' }}>
              So kann es aussehen!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Countdown() {
  const { Ico } = window;
  const target = new Date('2026-09-30T23:59:59').getTime();
  const calc = () => {
    const d = Math.max(0, target - Date.now());
    return {
      Tage: Math.floor(d / 86400000),
      Stunden: Math.floor((d / 3600000) % 24),
      Minuten: Math.floor((d / 60000) % 60),
      Sekunden: Math.floor((d / 1000) % 60),
    };
  };
  const [t, setT] = React.useState(calc());
  React.useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i); }, []);
  return (
    <section style={{ background: 'var(--baeucke-yellow)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-8) var(--gutter)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--neutral-800)' }}>
          <Ico name="CalendarClock" size={26} color="var(--neutral-800)" />
          <span style={{ fontWeight: 800, fontSize: 'var(--text-xl)', color: '#363636' }}>Noch Zeit zum Mitmachen!</span>
        </div>
        <div className="cd-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.entries(t).map(([label, val]) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.30)', borderRadius: 'var(--radius-md)', padding: '10px 16px', minWidth: 74, textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-h3)', fontWeight: 900, color: '#363636', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{String(val).padStart(2, '0')}</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--neutral-600)', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Prizes() {
  const { Ico, PRIZES } = window;
  return (
    <section id="preise" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <span className="eyebrow">Tolle Gutscheine zu gewinnen</span>
        <h2 style={{ margin: '10px 0 0' }}>Interliving Bäucke Malwettbewerb</h2>
        <p style={{ margin: '14px auto 0', maxWidth: 620, color: 'var(--text-body)', fontSize: 'var(--text-lg)' }}>Ihr Kind malt unser Möbelhaus so bunt aus, wie es möchte – und Sie laden das fertige Bild bis zum <b>30.09.2026</b> hier hoch. Unter allen Einsendungen vergeben wir drei Bäucke-Warengutscheine.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }} className="prize-grid">
        {PRIZES.map((p, i) => (
          <div key={p.place} style={{ position: 'relative', background: i === 0 ? 'rgba(238,200,3,0.12)' : '#F6F2E1', border: '1px solid rgba(238,200,3,0.20)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', boxShadow: i === 0 ? 'var(--shadow-lg)' : 'var(--shadow-sm)', textAlign: 'center', transform: i === 0 ? 'scale(1.03)' : 'none' }}>
            <div style={{ width: 72, height: 72, margin: '0 auto 18px', borderRadius: 'var(--radius-lg)', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
              <Ico name={p.icon} size={36} color="#fff" />
            </div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{p.place}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', margin: '8px 0 2px' }}>Warengutschein in Höhe von</div>
            <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 1 }}>{p.amount}</div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-6)' }}>* Gutscheine sind nicht in bar auszahlbar.</p>
    </section>
  );
}

function Steps() {
  const { Ico, KID, STEPS } = window;
  const colors = [KID.pink, KID.blue, KID.green];
  const flaeche = '#F6F2E1';
  return (
    <section style={{ position: 'relative', background: flaeche }}>
      <svg aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, top: -1, width: '100%', height: 70, display: 'block' }}>
        <path fill="var(--surface-page)" d="M0,0 L1440,0 L1440,26 C1200,62 960,8 720,34 C480,60 240,4 0,40 Z" />
      </svg>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)', paddingTop: 'calc(var(--section-y) + 40px)' }}>
        <div className="steps-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'var(--space-8)', alignItems: 'center' }}>
          {/* Schritte untereinander, verbunden durch eine gestrichelte Linie */}
          <div>
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="eyebrow">So nehmen Sie teil</span>
              <h2 style={{ margin: '10px 0 0' }}>In drei Schritten zum Gewinn</h2>
            </div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {STEPS.map((s, i) => (
                <li key={s.n} style={{ position: 'relative', display: 'flex', gap: 'var(--space-5)', paddingBottom: i === STEPS.length - 1 ? 0 : 'var(--space-8)' }}>
                  {i < STEPS.length - 1 && (
                    <span aria-hidden="true" style={{ position: 'absolute', left: 26.5, top: 56, bottom: 0, borderLeft: '3px dashed var(--neutral-300)' }}></span>
                  )}
                  <span style={{ position: 'relative', zIndex: 1, flex: 'none', width: 56, height: 56, borderRadius: 'var(--radius-pill)', background: colors[i], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 'var(--text-h4)', boxShadow: 'var(--shadow-md)', border: `4px solid ${flaeche}` }}>{s.n}</span>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ color: colors[i], display: 'inline-flex' }}><Ico name={s.icon} size={22} /></span>
                      <h3 style={{ margin: 0, fontSize: 'var(--text-h4)' }}>{s.title}</h3>
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-body)', fontSize: 'var(--text-md)', maxWidth: 460 }}>{s.text}{s.textStark && <b>{s.textStark}</b>}{s.textEnde}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Bild neben den Schritten */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="assets/schritte-kinder.png" alt="Zwei Kinder zeigen stolz ihre bunt ausgemalten Bilder des Bäucke Möbelhauses" style={{ display: 'block', width: '100%', maxWidth: 598, height: 'auto', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', transform: 'rotate(-2.5deg)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Doodles() {
  const { Ico } = window;
  const items = [
    { n: 'Sun', x: '1%', y: '6%', s: 78, r: -8 },
    { n: 'Cloud', x: '13%', y: '1%', s: 44, r: 6 },
    { n: 'Flower2', x: '3%', y: '30%', s: 34, r: 12 },
    { n: 'Sparkles', x: '9%', y: '52%', s: 56, r: -20 },
    { n: 'Leaf', x: '2%', y: '72%', s: 40, r: -28 },
    { n: 'Star', x: '12%', y: '88%', s: 30, r: 18 },
    { n: 'Flower', x: '22%', y: '4%', s: 52, r: 14 },
    { n: 'PenTool', x: '25%', y: '94%', s: 34, r: -12 },
    { n: 'Leaf', x: '34%', y: '86%', s: 62, r: 40 },
    { n: 'Cloud', x: '38%', y: '2%', s: 68, r: -6 },
    { n: 'Heart', x: '46%', y: '93%', s: 28, r: 22 },
    { n: 'Sparkles', x: '50%', y: '3%', s: 32, r: 10 },
    { n: 'Star', x: '57%', y: '90%', s: 44, r: -16 },
    { n: 'Flower', x: '61%', y: '1%', s: 36, r: 24 },
    { n: 'Brush', x: '69%', y: '92%', s: 40, r: -24 },
    { n: 'Palette', x: '73%', y: '3%', s: 58, r: 12 },
    { n: 'Flower2', x: '80%', y: '86%', s: 50, r: -8 },
    { n: 'Sun', x: '86%', y: '2%', s: 34, r: 16 },
    { n: 'Leaf', x: '94%', y: '26%', s: 54, r: 34 },
    { n: 'Sparkles', x: '97%', y: '8%', s: 30, r: -14 },
    { n: 'Cloud', x: '92%', y: '50%', s: 40, r: 8 },
    { n: 'Star', x: '96%', y: '68%', s: 36, r: -20 },
    { n: 'Flower', x: '89%', y: '94%', s: 30, r: 18 },
    { n: 'Rainbow', x: '31%', y: '48%', s: 34, r: 0 },
    { n: 'Pencil', x: '66%', y: '44%', s: 28, r: -18 },
  ];
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {items.map((it, i) => (
        <span key={i} style={{ position: 'absolute', left: it.x, top: it.y, transform: `rotate(${it.r}deg)`, color: 'var(--yellow-300)', opacity: it.s > 50 ? 0.55 : 0.68 }}>
          <Ico name={it.n} size={it.s} strokeWidth={1.5} color="var(--yellow-300)" />
        </span>
      ))}
    </div>
  );
}

function Download() {
  const { Ico, Splat, KID } = window;
  const { Button } = window.DesignSystem_9f5cef;
  return (
    <section id="download" style={{ position: 'relative', overflow: 'hidden' }}>
      <Doodles />
      <div style={{ position: 'relative', maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--baeucke-yellow)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-12)', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'var(--space-12)', alignItems: 'center' }} className="dl-grid dl-panel">
        <Splat color="#fff" size={140} style={{ bottom: -40, right: -30, opacity: 0.25 }} rotate={30} />
        <div style={{ position: 'relative', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
          <img src="assets/ausmalbild-beispiel-neu.png" alt="Ausmalbild-Vorlage zum Ausdrucken" style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <h2 style={{ color: 'var(--neutral-800)', margin: '0 0 12px' }}>Laden Sie das Ausmalbild herunter</h2>
          <p style={{ color: 'var(--neutral-800)', opacity: 0.85, fontSize: 'var(--text-lg)', marginBottom: 24 }}>
            Drucken Sie die Vorlage aus – und Ihr Kind kann unser Möbelhaus mit Wiese, Himmel und allem Drum und Dran bunt gestalten. Je kreativer, desto besser!
          </p>
          <a href="assets/ausmalbild-vorlage.png" download="Baeucke-Malwettbewerb-Ausmalbild.png" style={{ textDecoration: 'none' }}>
            <Button variant="ink" size="lg" iconLeft={<Ico name="Download" size={18} />}>Ausmalbild herunterladen</Button>
          </a>
          <p style={{ color: 'var(--neutral-800)', opacity: 0.7, fontSize: 'var(--text-sm)', marginTop: 14, marginBottom: 0 }}>
            <Ico name="Info" size={14} /> &nbsp;Am besten auf festem Papier im Format DIN A4 ausdrucken.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { Ico, FAQS } = window;
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{ background: 'var(--surface-card)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <span className="eyebrow">Teilnahmebedingungen & FAQ</span>
          <h2 style={{ margin: '10px 0 0' }}>Häufige Fragen</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--surface-card)' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: 'var(--space-5) var(--space-6)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text-strong)' }}>
                {f.q}
                <span style={{ flex: 'none', color: 'var(--baeucke-yellow)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'var(--transition-base)' }}><Ico name="ChevronDown" size={22} /></span>
              </button>
              {open === i && (
                <div style={{ padding: '0 var(--space-6) var(--space-5)', color: 'var(--text-body)', fontSize: 'var(--text-md)' }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ size = 18 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color: '#F7A800', fontSize: size, lineHeight: 1 }}>
      {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
    </span>
  );
}

function Reviews() {
  const { Ico, REVIEWS, SEAL_URL, GOOGLE, GoogleG } = window;
  return (
    <section style={{ background: 'var(--surface-card)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
          <div>
            <span className="eyebrow">Das sagen unsere Kunden</span>
            <h2 style={{ margin: '10px 0 0' }}>Ausgezeichnet bewertet bei Google</h2>
          </div>
          <img src={SEAL_URL} alt="Auszeichnung / Siegel" style={{ height: 110, width: 'auto', flex: 'none' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', background: 'var(--surface-page)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5) var(--space-6)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <GoogleG size={40} />
            <span style={{ fontWeight: 800, fontSize: 'var(--text-lg)', color: 'var(--text-strong)' }}>Google<br/>Bewertungen</span>
          </div>
          <div style={{ width: 1, height: 44, background: 'var(--border-subtle)' }} className="hide-sm"></div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 'clamp(2.25rem, 5vw, 2.75rem)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 1 }}>{GOOGLE.rating}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Stars size={18} />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontWeight: 600 }}>{GOOGLE.count} Rezensionen</span>
            </div>
          </div>
          <a href={GOOGLE.url} target="_blank" rel="noopener" style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-strong)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
            Alle Bewertungen ansehen <Ico name="ExternalLink" size={15} />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }} className="step-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: 'var(--surface-page)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stars />
                <Ico name="Quote" size={22} color="var(--border-default)" />
              </div>
              <p style={{ margin: 0, color: 'var(--text-body)', fontSize: 'var(--text-md)', flex: 1 }}>„{r.text}“</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 4 }}>
                <span style={{ width: 34, height: 34, borderRadius: 'var(--radius-pill)', background: 'var(--yellow-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ico name="User" size={18} color="var(--neutral-700)" /></span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-muted)' }}>{r.who}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoreInfo() {
  const { Ico } = window;
  const { Button } = window.DesignSystem_9f5cef;
  const hours = [
    { label: 'Möbelhaus', rows: ['Mo.–Fr. 9.30–19.00 Uhr', 'Sa. 9.30–18.00 Uhr'] },
    { label: 'Lager', rows: ['Mo.–Fr. 9.30–17.00 Uhr', 'Sa. 10.00–14.00 Uhr'] },
    { label: 'Büro', rows: ['Mo.–Sa. 8.00–17.30 Uhr'] },
  ];
  const mapSrc = 'https://www.google.com/maps?q=M%C3%B6belhaus%20B%C3%A4ucke%20%C3%9Cber%20dem%20Hellewege%2012%2037154%20Northeim&output=embed';
  return (
    <section id="besuch" style={{ background: 'var(--surface-page)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <span className="eyebrow">Besuchen Sie uns</span>
          <h2 style={{ margin: '10px 0 0' }}>Ihr Möbelhaus in Northeim</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'var(--space-8)', alignItems: 'stretch' }} className="hero-grid">
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', minHeight: 360 }}>
            <iframe title="Standort Interliving Bäucke" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: '100%', height: '100%', minHeight: 360, border: 0, display: 'block' }}></iframe>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}>
                <Ico name="MapPin" size={20} color="var(--baeucke-yellow)" />
                <span style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Möbelhaus Bäucke GmbH &amp; Co. KG<br/><span style={{ fontWeight: 500, color: 'var(--text-body)' }}>Über dem Hellewege 12 · 37154 Northeim</span></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {hours.map((h) => (
                  <div key={h.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--text-strong)', fontSize: 'var(--text-sm)' }}><Ico name="Clock" size={15} color="var(--text-muted)" /> {h.label}</span>
                    <span style={{ textAlign: 'right', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{h.rows.map((r, i) => <span key={i} style={{ display: 'block' }}>{r}</span>)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--text-body)', fontSize: 'var(--text-sm)' }}><Ico name="Phone" size={16} color="var(--baeucke-yellow)" /> 05551 / 9735-0</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--text-body)', fontSize: 'var(--text-sm)' }}><Ico name="Mail" size={16} color="var(--baeucke-yellow)" /> info@baeucke.de</span>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&amp;destination=M%C3%B6belhaus%20B%C3%A4ucke%20Northeim" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
              <Button variant="outline" iconLeft={<Ico name="Navigation" size={18} />} fullWidth>Route planen</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { Ico } = window;
  return (
    <footer style={{ background: 'var(--neutral-800)', color: 'var(--neutral-0)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-12) var(--gutter)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360 }}>
          <img src="../../../assets/logos/Logo-Baeucke-weiss.svg" alt="Interliving Bäucke" style={{ height: 44, alignSelf: 'flex-start' }} />
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-sm)' }}>Möbelhaus Bäucke GmbH & Co. KG · Über dem Hellewege 12 · 37154 Northeim</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Ico name="Phone" size={16} /> 05551 / 9735-0</span>
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Ico name="Mail" size={16} /> info@baeucke.de</span>
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Ico name="Globe" size={16} /> www.baeucke.de</span>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '16px var(--gutter)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
          <span>© 2026 Möbelhaus Bäucke GmbH & Co. KG</span>
          <span style={{ display: 'flex', gap: 18 }}><span>Teilnahmebedingungen</span><span>Datenschutz</span><span>Impressum</span></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { scrollToId, Header, Hero, Countdown, Prizes, Steps, Download, Reviews, StoreInfo, FAQ, Footer });
