/* Abstimmungs-Landingpage — Sektionen */

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
          <span className="hide-sm" style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-muted)' }}>Abstimmung bis 31.10.2026</span>
          <Button className="cta-desktop" variant="primary" onClick={() => scrollToId('galerie')}>Jetzt abstimmen und 100-€-Gutschein gewinnen</Button>
          <Button className="baeucke-cta cta-mobile" variant="primary" size="sm" onClick={() => scrollToId('galerie')}>Jetzt abstimmen</Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { Ico, KID, Splat, EINSENDUNGEN } = window;
  const palette = [KID.red, KID.orange, KID.yellow, KID.green, KID.blue, KID.pink];
  const wort = 'deine Stimme';
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--yellow-50)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/hero-kind-malt.png)', backgroundSize: 'cover', backgroundPosition: 'center 42%' }}></div>
      <div className="hero-scrim" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #FFFFFF, #FFFFFFD9, #FFFFFFC8, #FFFFFF1E, #FFFFFF00)' }}></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 90, background: 'linear-gradient(to bottom, rgba(247,247,246,0) 0%, var(--surface-page) 100%)' }}></div>
      <Splat color={KID.blue} size={120} style={{ top: 40, left: -30, opacity: 0.16 }} rotate={20} />
      <Splat color={KID.pink} size={90} style={{ top: 130, right: 70, opacity: 0.16 }} rotate={-15} />

      <div className="hero-wrap" style={{ position: 'relative', maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-20) var(--gutter)' }}>
        <div className="hero-copy" style={{ maxWidth: 620 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--baeucke-yellow)', color: 'var(--neutral-800)', fontWeight: 800, fontSize: 'var(--text-sm)', padding: '7px 16px', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-sm)' }}>
            <Ico name="Sparkles" size={16} color="var(--neutral-800)" /> {EINSENDUNGEN.length} Bilder sind eingegangen
          </span>
          <h1 style={{ margin: '20px 0 18px', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.02em' }}>
            Der große Malwettbewerb hat stattgefunden – jetzt zählt{' '}
            {wort.split('').map((c, i) => <span key={i} style={{ color: palette[i % palette.length] }}>{c}</span>)}!
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-body)', margin: 0 }}>
            Viele Kinder haben unser Möbelhaus in ihren schönsten Farben gestaltet. Schauen Sie sich alle Kunstwerke an und stimmen Sie für Ihr Lieblingsbild – die drei Bilder mit den meisten Stimmen gewinnen.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--neutral-800)', borderRadius: 'var(--radius-lg)', padding: '14px 20px', boxShadow: 'var(--shadow-md)' }}>
              <span style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'var(--baeucke-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ico name="Gift" size={24} color="var(--neutral-800)" /></span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--baeucke-yellow)' }}>Ihr Gewinn fürs Abstimmen</span>
                <span style={{ fontSize: 'var(--text-xl)', fontWeight: 900, color: '#fff' }}>100-€-Gutschein</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Countdown() {
  const { Ico } = window;
  const target = new Date('2026-10-31T23:59:59').getTime();
  const calc = () => {
    const d = Math.max(0, target - Date.now());
    return { Tage: Math.floor(d / 86400000), Stunden: Math.floor((d / 3600000) % 24), Minuten: Math.floor((d / 60000) % 60), Sekunden: Math.floor((d / 1000) % 60) };
  };
  const [t, setT] = React.useState(calc());
  React.useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i); }, []);
  return (
    <section style={{ background: 'var(--baeucke-yellow)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-8) var(--gutter)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--neutral-800)' }}>
          <Ico name="CalendarClock" size={26} color="var(--neutral-800)" />
          <span style={{ fontWeight: 800, fontSize: 'var(--text-xl)', color: '#363636' }}>Die Abstimmung läuft noch!</span>
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

function Steps() {
  const { Ico, KID, VOTE_STEPS } = window;
  const colors = [KID.pink, KID.blue, KID.green];
  return (
    <section style={{ position: 'relative', background: '#F7F3DD' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)', paddingBottom: 'calc(var(--section-y) + 60px)' }}>
        <div className="steps-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'var(--space-8)', alignItems: 'center' }}>
          {/* Schritte untereinander, verbunden durch eine gestrichelte Linie */}
          <div>
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="eyebrow">So stimmen Sie ab</span>
              <h2 style={{ margin: '10px 0 0' }}>In drei Schritten zur Stimme</h2>
            </div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {VOTE_STEPS.map((s, i) => (
              <li key={s.n} style={{ position: 'relative', display: 'flex', gap: 'var(--space-5)', paddingBottom: i === VOTE_STEPS.length - 1 ? 0 : 'var(--space-8)' }}>
                {i < VOTE_STEPS.length - 1 && (
                  <span aria-hidden="true" style={{ position: 'absolute', left: 26.5, top: 56, bottom: 0, borderLeft: '3px dashed var(--neutral-300)' }}></span>
                )}
                <span style={{ position: 'relative', zIndex: 1, flex: 'none', width: 56, height: 56, borderRadius: 'var(--radius-pill)', background: colors[i], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 'var(--text-h4)', boxShadow: 'var(--shadow-md)', border: '4px solid #F7F3DD' }}>{s.n}</span>
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
            <img src="assets/schritte-abstimmung.png" alt="Zwei ausgemalte Bilder des Bäucke Möbelhauses – welches gefällt Ihnen besser?" style={{ display: 'block', width: '100%', maxWidth: 700, height: 'auto' }} />
          </div>
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: -1, width: '100%', height: 90, display: 'block' }}>
        <path fill="#FDFBF3" d="M0,52 C240,96 480,4 720,34 C960,64 1200,88 1440,44 L1440,90 L0,90 Z" />
      </svg>
    </section>
  );
}

function Prizes() {
  const { Ico, PRIZES } = window;
  return (
    <section id="preise" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <span className="eyebrow">Ihr Gewinn f&uuml;r das Abstimmen</span>
        <h2 style={{ margin: '10px 0 8px' }}>100-&euro;-Gutschein f&uuml;r Sie</h2>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Jede Stimme nimmt automatisch an der Verlosung teil.</p>
      </div>

      {/* Hauptgewinn f&uuml;r die Abstimmenden */}
      <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 'var(--space-10)', flexWrap: 'wrap', background: 'var(--neutral-800)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-12)', boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flex: 1, minWidth: 280 }}>
          <span style={{ width: 92, height: 92, flex: 'none', borderRadius: 'var(--radius-lg)', background: 'var(--baeucke-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
            <Ico name="Gift" size={46} color="var(--neutral-800)" />
          </span>
          <div>
            <div style={{ fontSize: 'var(--text-md)', color: 'rgba(255,255,255,0.75)' }}>Warengutschein in H&ouml;he von</div>
            <div style={{ fontSize: 'clamp(3.25rem, 8vw, 4.75rem)', fontWeight: 900, color: 'var(--baeucke-yellow)', lineHeight: 1.02 }}>100 &euro;</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ margin: '0 0 6px', color: '#fff', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Unter allen Abstimmenden verlost</p>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: 'var(--text-md)' }}>
            Geben Sie einfach Ihre Stimme f&uuml;r Ihr Lieblingsbild ab &ndash; dazu ben&ouml;tigen wir nur Ihren Namen und Ihre E-Mail-Adresse. Der Gutschein ist nicht in bar auszahlbar.
          </p>
        </div>
      </div>

      {/* Nebenbei: die Preise f&uuml;r die Kinder */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 'var(--space-16)', marginBottom: 'var(--space-5)' }}>
        <span style={{ width: 40, height: 40, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--yellow-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ico name="Palette" size={20} color="var(--neutral-800)" />
        </span>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A04E00' }}>Und f&uuml;r die Kinder</div>
          <h3 style={{ margin: '4px 0 0', fontSize: 'var(--text-h4)' }}>Das gewinnen die drei Bilder mit den meisten Stimmen</h3>
        </div>
      </div>
      <div className="prize-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
        {PRIZES.map((p) => (
          <div key={p.place} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', background: '#F6F2E1', border: '1px solid rgba(238,200,3,0.20)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
            <span style={{ width: 46, height: 46, flex: 'none', borderRadius: 'var(--radius-md)', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico name={p.icon} size={22} color="#fff" />
            </span>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{p.place}</div>
              <div style={{ fontSize: 'var(--text-h4)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 1.1 }}>{p.amount}</div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-4)' }}>* Gutscheine sind nicht in bar auszahlbar. Die Familien werden &uuml;ber die beim Upload angegebenen Kontaktdaten benachrichtigt.</p>
    </section>
  );
}

function Stars({ size = 18 }) {
  return <span style={{ display: 'inline-flex', gap: 2, color: '#F7A800', fontSize: size, lineHeight: 1 }}>{'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}</span>;
}

function Reviews() {
  const { Ico, REVIEWS, SEAL_URL, GOOGLE, GoogleG } = window;
  return (
    <section style={{ background: '#F7F7F7' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
          <div>
            <span className="eyebrow">Das sagen unsere Kunden</span>
            <h2 style={{ margin: '10px 0 0' }}>Ausgezeichnet bewertet bei Google</h2>
          </div>
          <img src={SEAL_URL} alt="Auszeichnung / Siegel" style={{ height: 110, width: 'auto', flex: 'none' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5) var(--space-6)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <GoogleG size={40} />
            <span style={{ fontWeight: 800, fontSize: 'var(--text-lg)', color: 'var(--text-strong)' }}>Google<br/>Bewertungen</span>
          </div>
          <div className="hide-sm" style={{ width: 1, height: 44, background: 'var(--border-subtle)' }}></div>
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

        <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 12 }}>
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
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'var(--space-8)', alignItems: 'stretch' }}>
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
            <a href="https://www.google.com/maps/dir/?api=1&destination=M%C3%B6belhaus%20B%C3%A4ucke%20Northeim" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
              <Button variant="outline" iconLeft={<Ico name="Navigation" size={18} />} fullWidth>Route planen</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { Ico, VOTE_FAQS } = window;
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{ background: 'var(--surface-card)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <span className="eyebrow">Teilnahmebedingungen &amp; FAQ</span>
          <h2 style={{ margin: '10px 0 0' }}>Häufige Fragen</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {VOTE_FAQS.map((f, i) => (
            <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--surface-card)' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: 'var(--space-5) var(--space-6)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text-strong)' }}>
                {f.q}
                <span style={{ flex: 'none', color: 'var(--baeucke-yellow)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'var(--transition-base)' }}><Ico name="ChevronDown" size={22} /></span>
              </button>
              {open === i && <div style={{ padding: '0 var(--space-6) var(--space-5)', color: 'var(--text-body)', fontSize: 'var(--text-md)' }}>{f.a}</div>}
            </div>
          ))}
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
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-sm)' }}>Möbelhaus Bäucke GmbH &amp; Co. KG · Über dem Hellewege 12 · 37154 Northeim</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Ico name="Phone" size={16} /> 05551 / 9735-0</span>
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Ico name="Mail" size={16} /> info@baeucke.de</span>
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Ico name="Globe" size={16} /> www.baeucke.de</span>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '16px var(--gutter)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
          <span>© 2026 Möbelhaus Bäucke GmbH &amp; Co. KG</span>
          <span style={{ display: 'flex', gap: 18 }}><span>Teilnahmebedingungen</span><span>Datenschutz</span><span>Impressum</span></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { scrollToId, Header, Hero, Countdown, Steps, Prizes, Stars, Reviews, StoreInfo, FAQ, Footer });
