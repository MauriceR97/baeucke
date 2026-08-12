/* Malwettbewerb landing — upload form (formal "Sie", validation + success) */

// Google-Sheets-Anbindung: Web-App-URL aus Apps Script hier eintragen (siehe
// Google-Sheets-Anleitung.md). Leer = Prototyp-Modus ohne Speichern.
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzbBBQDIVeypku4N6a7r5-4YtCEJthtA4EQeJAtkD10mi0PlZxQrhVaLy8uEMEDh7STRw/exec';

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
      backgroundImage: 'url(assets/upload-hintergrund.jpg)',
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
  }, checkboxRow(consentData, setConsentData, errors.consentData, /*#__PURE__*/React.createElement(React.Fragment, null, "Ich habe die ", /*#__PURE__*/React.createElement("a", { href: "https://www.baeucke.de/datenschutz", target: "_blank", rel: "noopener", onClick: (ev) => ev.stopPropagation(), style: { color: "var(--text-strong)", fontWeight: 700, textDecoration: "underline" } }, "Datenschutzerkl\xE4rung"), " gelesen und bin einverstanden, dass die angegebenen Daten zur Durchf\xFChrung des Malwettbewerbs gespeichert und verarbeitet werden. ", /*#__PURE__*/React.createElement("b", {
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