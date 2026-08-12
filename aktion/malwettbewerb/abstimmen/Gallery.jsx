/* Abstimmungs-Landingpage — Galerie, Stimmabgabe & aktuelle Führung */

const VOTE_KEY = 'baeucke-malwettbewerb-stimme';

// Google-Sheets-Anbindung: Web-App-URL aus Apps Script hier eintragen
// (siehe Google-Sheets-Anleitung.md). Leer = Prototyp ohne Speichern.
const VOTE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzbBBQDIVeypku4N6a7r5-4YtCEJthtA4EQeJAtkD10mi0PlZxQrhVaLy8uEMEDh7STRw/exec';

/* Gemeinsamer Zustand: eigene Stimme + Rangliste */
function useVoting() {
  const { EINSENDUNGEN, ladeEinsendungen } = window;
  const [eintraege, setEintraege] = React.useState(EINSENDUNGEN);
  const [ladeStatus, setLadeStatus] = React.useState(window.DATEN_URL ? 'laedt' : 'demo');
  const [meineStimme, setMeineStimme] = React.useState(null);
  const [anfrageFuer, setAnfrageFuer] = React.useState(null);

  // Einsendungen aus der Google-Tabelle nachladen (falls eingerichtet)
  React.useEffect(() => {
    let aktiv = true;
    ladeEinsendungen().then((liste) => {
      if (!aktiv) return;
      if (liste) { setEintraege(liste); setLadeStatus('live'); }
      else setLadeStatus(window.DATEN_URL ? 'fehler' : 'demo');
    });
    return () => { aktiv = false; };
  }, []);

  React.useEffect(() => {
    try { const v = localStorage.getItem(VOTE_KEY); if (v) setMeineStimme(v); } catch (e) {}
    const onChange = () => { try { setMeineStimme(localStorage.getItem(VOTE_KEY)); } catch (e) {} };
    window.addEventListener('baeucke-vote', onChange);
    return () => window.removeEventListener('baeucke-vote', onChange);
  }, []);

  // Öffnet das Formular – abgestimmt wird erst nach Angabe der Kontaktdaten
  const abstimmen = (id) => { if (!meineStimme) setAnfrageFuer(id); };
  const abbrechen = () => setAnfrageFuer(null);

  const bestaetigen = (daten) => {
    const id = anfrageFuer;
    if (!id) return;
    if (VOTE_ENDPOINT) {
      const bild = eintraege.find((e) => e.id === id) || {};
      fetch(VOTE_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ typ: 'stimme', ...daten, bildId: id, bildVorname: bild.vorname || '' }),
      }).catch(function () {});
    }
    try { localStorage.setItem(VOTE_KEY, id); } catch (e) {}
    setMeineStimme(id);
    setAnfrageFuer(null);
    window.dispatchEvent(new Event('baeucke-vote'));
  };

  // Stand aus der Tabelle + die eigene, noch nicht übertragene Stimme
  const rangliste = React.useMemo(() => {
    return eintraege
      .map((e) => ({ ...e, gesamt: (e.stimmen || 0) + (meineStimme === e.id ? 1 : 0) }))
      .sort((a, b) => b.gesamt - a.gesamt || String(a.vorname).localeCompare(String(b.vorname)));
  }, [meineStimme, eintraege]);

  return { meineStimme, abstimmen, rangliste, anfrageFuer, abbrechen, bestaetigen, ladeStatus };
}

/* Einzelne Bildkarte */
function ArtCard({ e, platz, meineStimme, abstimmen, onZoom, gross }) {
  const { bildUrl, Ico } = window;
  const { Button } = window.DesignSystem_9f5cef;
  const url = bildUrl(e.bildLink);
  const gewaehlt = meineStimme === e.id;
  const medal = ['#F7931E', '#B8B8B8', '#D89C5E'][platz - 1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface-card)', border: `1px solid ${gewaehlt ? 'var(--baeucke-yellow)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: gewaehlt || gross ? 'var(--shadow-lg)' : 'var(--shadow-sm)', transition: 'var(--transition-base)' }}>
      <button
        onClick={() => url && onZoom(e)}
        aria-label={`Bild von ${e.vorname} vergrößern`}
        style={{ position: 'relative', aspectRatio: '4 / 3', border: 'none', padding: 0, background: '#EDEAE3', cursor: url ? 'zoom-in' : 'default', overflow: 'hidden' }}
      >
        {url ? (
          <img src={url} alt={`Ausgemaltes Bild von ${e.vorname}, $`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <span style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--neutral-400)' }}>
            <Ico name="ImageOff" size={30} strokeWidth={1.5} />
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Bild-Link fehlt</span>
          </span>
        )}
        {platz && (
          <span style={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: medal, color: 'var(--neutral-800)', fontWeight: 800, fontSize: gross ? 'var(--text-sm)' : 'var(--text-xs)', padding: gross ? '7px 14px' : '5px 11px', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-md)' }}>
            <Ico name="Trophy" size={gross ? 16 : 13} color="var(--neutral-800)" /> Platz {platz}
          </span>
        )}
        {gewaehlt && (
          <span style={{ position: 'absolute', top: 12, right: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--baeucke-yellow)', color: 'var(--neutral-800)', fontWeight: 800, fontSize: 'var(--text-xs)', padding: '6px 12px', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-sm)' }}>
            <Ico name="Check" size={14} color="var(--neutral-800)" strokeWidth={3} /> Ihre Stimme
          </span>
        )}
      </button>

      <div style={{ padding: gross ? 'var(--space-5)' : 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: gross ? 'var(--text-xl)' : 'var(--text-lg)', color: 'var(--text-strong)', lineHeight: 1.2 }}>{e.vorname}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontWeight: 600 }}></div>
          </div>
          <div style={{ textAlign: 'right', flex: 'none' }}>
            <div style={{ fontWeight: 900, fontSize: gross ? 'var(--text-h3)' : 'var(--text-xl)', color: 'var(--text-strong)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{e.gesamt}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Stimmen</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          {gewaehlt ? (
            <Button variant="outline" size={gross ? 'md' : 'sm'} fullWidth disabled iconLeft={<Ico name="Check" size={16} />}>Abgestimmt</Button>
          ) : (
            <Button variant={meineStimme ? 'ghost' : 'primary'} size={gross ? 'md' : 'sm'} fullWidth disabled={!!meineStimme}
                    onClick={() => onZoom(e)} iconLeft={<Ico name="Heart" size={16} />}>
              {meineStimme ? 'Stimme vergeben' : 'Abstimmen'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Kontaktdaten-Abfrage vor der Stimmabgabe (+ Verlosung 100 €) */
function VoteModal({ bild, onClose, onBestaetigen }) {
  const { Ico, bildUrl } = window;
  const { Input, Button } = window.DesignSystem_9f5cef;
  const [v, setV] = React.useState({ vorname: '', nachname: '', email: '', telefon: '', plz: '', wunsch: '' });
  const [ok, setOk] = React.useState(false);
  const [werbung, setWerbung] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const senden = (ev) => {
    ev.preventDefault();
    const err = {};
    if (!v.vorname.trim()) err.vorname = 'Bitte geben Sie Ihren Vornamen an.';
    if (!v.nachname.trim()) err.nachname = 'Bitte geben Sie Ihren Nachnamen an.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) err.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (!v.telefon.trim()) err.telefon = 'Bitte geben Sie eine Telefonnummer an.';
    if (!/^\d{5}$/.test(v.plz.trim())) err.plz = 'Bitte geben Sie eine 5-stellige PLZ an.';
    if (!ok) err.ok = 'Bitte bestätigen Sie die Datenschutzerklärung.';
    setErrors(err);
    if (Object.keys(err).length === 0) onBestaetigen({ ...v, datenschutz: ok, werbung });
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(35,35,35,0.66)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'var(--space-5)', overflowY: 'auto' }}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={senden} noValidate
            style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', width: 'min(560px, 100%)', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', margin: 'auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {bildUrl(bild.bildLink) && (
              <img src={bildUrl(bild.bildLink)} alt="" style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 'var(--radius-sm)', flex: 'none', background: '#EDEAE3' }} />
            )}
            <div>
              <span className="eyebrow">Stimme für {bild.vorname}</span>
              <h3 style={{ margin: '6px 0 0', fontSize: 'var(--text-h3)' }}>Nur noch ein Schritt</h3>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Schließen" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', flex: 'none' }}><Ico name="X" size={24} /></button>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--yellow-50)', border: '1px solid var(--yellow-200)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
          <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--baeucke-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico name="Gift" size={22} color="var(--neutral-800)" />
          </span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
            <b style={{ color: 'var(--text-strong)' }}>Gewinnspiel:</b> Mit deiner Stimme nimmst du an der Verlosung eines 100 € Gutscheins teil – und erhältst nach dem Absenden eine kleine Überraschung von uns. 🎁
          </span>
        </div>

        <div className="f-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <Input label="Vorname" placeholder="Vorname" value={v.vorname} onChange={set('vorname')} error={errors.vorname} />
          <Input label="Nachname" placeholder="Nachname" value={v.nachname} onChange={set('nachname')} error={errors.nachname} />
        </div>
        <Input label="E-Mail" type="email" placeholder="ihre@email.de" iconLeft={<Ico name="Mail" size={18} />} value={v.email} onChange={set('email')} error={errors.email} />
        <div className="f-row" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-4)' }}>
          <Input label="Telefon" placeholder="0151 …" iconLeft={<Ico name="Phone" size={18} />} value={v.telefon} onChange={set('telefon')} error={errors.telefon} />
          <Input label="PLZ" placeholder="37154" inputMode="numeric" maxLength={5} value={v.plz} onChange={set('plz')} error={errors.plz} />
        </div>

        <div>
          <label htmlFor="wunsch" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-strong)', marginBottom: 6 }}>Was würden Sie sich mit dem 100-€-Gutschein kaufen?</label>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-card)', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '0 8px 0 14px', minHeight: 46 }}>
            <select id="wunsch" value={v.wunsch} onChange={set('wunsch')}
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'var(--text-md)', color: v.wunsch ? 'var(--text-body)' : 'var(--text-faint)', padding: '12px 0', cursor: 'pointer', appearance: 'none' }}>
              <option value="">Bitte auswählen …</option>
              {(window.MOEBEL_WUNSCH || []).map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <Ico name="ChevronDown" size={18} color="var(--text-muted)" />
          </div>
        </div>

        <div>
          <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
            <span onClick={() => setOk(!ok)} style={{ flex: 'none', width: 24, height: 24, marginTop: 1, borderRadius: 'var(--radius-sm)', border: `2px solid ${ok ? 'var(--neutral-800)' : (errors.ok ? 'var(--red-500)' : 'var(--border-default)')}`, background: ok ? 'var(--neutral-800)' : 'var(--surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-base)' }}>
              {ok && <Ico name="Check" size={16} color="#fff" strokeWidth={3} />}
            </span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 1.45 }}>
              Ich habe die <a href="#datenschutz" onClick={(ev) => ev.stopPropagation()} style={{ color: 'var(--text-strong)', fontWeight: 700, textDecoration: 'underline' }}>Datenschutzerklärung</a> gelesen und bin damit einverstanden, dass meine Daten zur Durchführung der Abstimmung und der Verlosung gespeichert und verarbeitet werden.*
            </span>
          </label>
          {errors.ok && <p style={{ margin: '6px 0 0 36px', fontSize: 'var(--text-xs)', color: 'var(--red-500)', fontWeight: 600 }}>{errors.ok}</p>}
        </div>

        <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
          <span onClick={() => setWerbung(!werbung)} style={{ flex: 'none', width: 24, height: 24, marginTop: 1, borderRadius: 'var(--radius-sm)', border: `2px solid ${werbung ? 'var(--neutral-800)' : 'var(--border-default)'}`, background: werbung ? 'var(--neutral-800)' : 'var(--surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-base)' }}>
            {werbung && <Ico name="Check" size={16} color="#fff" strokeWidth={3} />}
          </span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 1.45 }}>
            Möbel Bäucke darf mich per E-Mail über Aktionen und Angebote informieren. <span style={{ color: 'var(--text-muted)' }}>(Freiwillig, jederzeit widerrufbar.)</span>
          </span>
        </label>

        <Button variant="primary" size="lg" type="submit" fullWidth iconLeft={<Ico name="Heart" size={18} />}>Stimme abgeben</Button>
        <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-faint)', textAlign: 'center' }}>* Pflichtfeld. Pro Person ist eine Stimme möglich. Der Gutschein ist nicht in bar auszahlbar.</p>
      </form>
    </div>
  );
}

/* Großansicht mit Teilen-Funktion und Abstimm-Button */
function Lightbox({ e, onClose, meineStimme, abstimmen }) {
  const { bildUrl, Ico } = window;
  const { Button } = window.DesignSystem_9f5cef;
  const [kopiert, setKopiert] = React.useState(false);

  const link = React.useMemo(() => {
    try { const u = new URL(window.location.href); u.hash = ''; u.searchParams.set('bild', e.id); return u.toString(); }
    catch (err) { return window.location.href; }
  }, [e.id]);

  const text = `Schau dir das Bild von ${e.vorname} ($) beim Bäucke-Malwettbewerb an und stimme ab:`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`;

  const kopieren = async () => {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(link);
      else {
        const ta = document.createElement('textarea');
        ta.value = link; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      }
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2200);
    } catch (err) { /* no-op */ }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(35,35,35,0.72)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'var(--space-5)', overflowY: 'auto' }}>
      <div onClick={(ev) => ev.stopPropagation()} style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', maxWidth: 'min(880px, 100%)', width: '100%', margin: 'auto 0' }}>
        <div style={{ position: 'relative' }}>
          <img src={bildUrl(e.bildLink)} alt={`Ausgemaltes Bild von ${e.vorname}`} style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh', objectFit: 'contain', background: '#EDEAE3' }} />
          <button type="button" onClick={onClose} aria-label="Schließen"
                  style={{ position: 'absolute', top: 12, right: 12, width: 40, height: 40, borderRadius: 'var(--radius-pill)', border: 'none', background: 'rgba(255,255,255,0.94)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-strong)' }}>
            <Ico name="X" size={20} />
          </button>
        </div>

        <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 'var(--text-h3)', color: 'var(--text-strong)', lineHeight: 1.15 }}>{e.vorname}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontWeight: 600 }}>{e.gesamt} Stimmen</div>
          </div>

          {meineStimme === e.id ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--green-100)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4) var(--space-5)' }}>
              <Ico name="CircleCheck" size={22} color="var(--green-500)" />
              <span style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Sie haben für dieses Bild abgestimmt – vielen Dank!</span>
            </div>
          ) : meineStimme ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--neutral-100)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4) var(--space-5)' }}>
              <Ico name="Info" size={20} color="var(--text-muted)" />
              <span style={{ fontWeight: 600, color: 'var(--text-body)' }}>Sie haben Ihre Stimme bereits abgegeben.</span>
            </div>
          ) : (
            <Button variant="primary" size="lg" fullWidth iconLeft={<Ico name="Heart" size={18} />} onClick={() => abstimmen(e.id)}>Für dieses Bild abstimmen</Button>
          )}

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-5)' }}>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-strong)', marginBottom: 12 }}>Bild teilen und andere zum Abstimmen einladen</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href={waLink} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
                <Button variant="outline" iconLeft={<Ico name="MessageCircle" size={18} />}>Per WhatsApp teilen</Button>
              </a>
              <Button variant="outline" onClick={kopieren} iconLeft={<Ico name={kopiert ? 'Check' : 'Link'} size={18} />}>
                {kopiert ? 'Link kopiert' : 'Link kopieren'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Alle Bilder – die drei Führenden stehen größer an erster Stelle */
function Gallery() {
  const { Ico } = window;
  const { meineStimme, abstimmen, rangliste, anfrageFuer, abbrechen, bestaetigen, ladeStatus } = window.__voting;
  const [lightbox, setLightbox] = React.useState(null);
  const top3 = rangliste.slice(0, 3);
  const rest = rangliste.slice(3);
  const anfrageBild = anfrageFuer ? rangliste.find((e) => e.id === anfrageFuer) : null;

  // Geteilten Link (?bild=<id>) auswerten: passendes Bild direkt groß öffnen
  const deepLinkErledigt = React.useRef(false);
  React.useEffect(() => {
    if (deepLinkErledigt.current || rangliste.length === 0) return;
    deepLinkErledigt.current = true;
    let id = null;
    try { id = new URLSearchParams(window.location.search).get('bild'); } catch (err) { return; }
    if (!id) return;
    const treffer = rangliste.find((e) => e.id === id);
    if (!treffer) return; // unbekannte/veraltete Kennung → normale Galerie
    setLightbox(treffer);
    const el = document.getElementById('galerie');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 16 });
  }, [rangliste]);

  return (
    <section id="galerie" style={{ background: '#FDFBF3' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span className="eyebrow">Die Kunstwerke</span>
          <h2 style={{ margin: '10px 0 8px' }}>Alle {rangliste.length} Bilder</h2>
          {ladeStatus === 'laedt' ? (
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Die Einsendungen werden geladen …</p>
          ) : (
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>
              {meineStimme
                ? 'Vielen Dank – Ihre Stimme ist gespeichert. Aktuell führen diese drei Bilder.'
                : 'Aktuell führen diese drei Bilder. Klicken Sie auf ein Bild, um es größer zu sehen.'}
            </p>
          )}
          {ladeStatus === 'fehler' && (
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 'var(--space-3)', marginBottom: 0, background: 'var(--red-100)', borderRadius: 'var(--radius-md)', padding: '8px 16px', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--red-700)' }}>
              <Ico name="TriangleAlert" size={16} color="var(--red-700)" /> Die Tabelle ist gerade nicht erreichbar – angezeigt wird der zuletzt hinterlegte Stand.
            </p>
          )}
          {!meineStimme && (
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 'var(--space-4)', marginBottom: 0, background: 'var(--yellow-50)', border: '1px solid var(--yellow-200)', borderRadius: 'var(--radius-pill)', padding: '8px 18px', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-strong)' }}>
              <Ico name="Gift" size={16} color="var(--neutral-800)" /> Unter allen Abstimmenden verlosen wir einen 100-€-Gutschein
            </p>
          )}
        </div>

        {/* Die drei Führenden */}
        <div className="top-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)', alignItems: 'start', marginBottom: 'var(--space-10)' }}>
          {top3.map((e, i) => (
            <ArtCard key={e.id} e={e} platz={i + 1} gross meineStimme={meineStimme} abstimmen={abstimmen} onZoom={setLightbox} />
          ))}
        </div>

        {/* Alle weiteren Bilder */}
        {rest.length > 0 && (
          <div className="gal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)' }}>
            {rest.map((e) => (
              <ArtCard key={e.id} e={e} platz={null} meineStimme={meineStimme} abstimmen={abstimmen} onZoom={setLightbox} />
            ))}
          </div>
        )}
      </div>
      {lightbox && <Lightbox e={lightbox} onClose={() => setLightbox(null)} meineStimme={meineStimme} abstimmen={abstimmen} />}
      {anfrageBild && <VoteModal bild={anfrageBild} onClose={abbrechen} onBestaetigen={bestaetigen} />}
    </section>
  );
}

Object.assign(window, { useVoting, ArtCard, VoteModal, Lightbox, Gallery });
