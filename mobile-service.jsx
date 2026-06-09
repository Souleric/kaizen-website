// Kaizen Autocare — Mobile Car Service scheduling page

const { useState, useEffect, useRef } = React;

const useDesktop = () => {
  const [d, setD] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);
  useEffect(() => {
    const f = () => setD(window.innerWidth >= 1024);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  return d;
};

const T = {
  red: '#E1241A', redDark: '#B81810', ink: '#15171A', ink2: '#2A2D33',
  muted: '#6B7079', line: '#E6E7EA', bg: '#F6F5F2', card: '#FFFFFF', yellow: '#F5C518',
};
const FONT_DISPLAY = "'Bebas Neue', 'Oswald', Impact, sans-serif";
const FONT_UI = "'Inter', -apple-system, system-ui, sans-serif";

const Icon = ({ name, size = 22, color = 'currentColor', stroke = 1.7 }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'back': return <svg {...p}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h10"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'check': return <svg {...p}><path d="M4 12l5 5L20 6"/></svg>;
    case 'pin': return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
    case 'phone': return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/></svg>;
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>;
    case 'car': return <svg {...p}><path d="M5 13l1.5-5h11L19 13M5 13h14v4H5zM5 17v2M19 17v2"/><circle cx="8" cy="15" r="1" fill={color}/><circle cx="16" cy="15" r="1" fill={color}/></svg>;
    case 'oil': return <svg {...p}><path d="M12 3v4M9 7h6M6 9h12l-1 11H7L6 9z"/><path d="M9 13c1 1.5 3 1.5 3 3"/></svg>;
    case 'battery': return <svg {...p}><rect x="3" y="8" width="16" height="10" rx="1.5"/><path d="M19 11h2v4h-2M7 5h3M14 5h3"/></svg>;
    case 'tire': return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/></svg>;
    case 'spray': return <svg {...p}><rect x="8" y="9" width="8" height="12" rx="1"/><path d="M10 9V5h4v4M14 3h3M14 5h4M14 7h3"/></svg>;
    case 'wrench': return <svg {...p}><path d="M14.7 6.3a4 4 0 015.5 5L20 13l-9 9-3-3 9-9 1.7-3.7zM7 14l-4 4 3 3 4-4"/></svg>;
    case 'truck': return <svg {...p}><path d="M2 7h11v8H2zM13 10h4l3 3v2h-7z"/><circle cx="6" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/></svg>;
    case 'home': return <svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'spark': return <svg {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.5 5.5l4 4M14.5 14.5l4 4M18.5 5.5l-4 4M9.5 14.5l-4 4"/></svg>;
    default: return null;
  }
};

const SERVICES = [
  { id: 'oil', icon: 'oil', name: 'Oil Service', desc: 'Drain, replace oil + filter, dispose', from: 'RM 119' },
];

const CAR_BRANDS = ['Perodua', 'Proton', 'Toyota', 'Honda', 'Nissan', 'Mazda', 'Mercedes-Benz', 'BMW', 'Other'];

function Field({ icon, label, children, hint }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: FONT_UI, fontSize: 12, fontWeight: 600, color: T.ink, marginBottom: 7,
      }}>
        <Icon name={icon} size={15} color={T.red} />
        {label}
      </div>
      {children}
      {hint && <div style={{ fontFamily: FONT_UI, fontSize: 11, color: T.muted, marginTop: 5 }}>{hint}</div>}
    </label>
  );
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box', padding: '13px 14px',
  borderRadius: 12, border: `1.5px solid ${T.line}`, background: '#fff',
  fontFamily: FONT_UI, fontSize: 15, outline: 'none', color: T.ink,
  transition: 'border-color .15s',
};

function MobileMenu({ open, onClose }) {
  if (!open) return null;
  const items = [
    { label: 'Home', href: 'Kaizen Autocare.html' },
    { label: 'Mobile Service', href: 'Mobile Car Service.html', accent: true },
    { label: 'Services', href: 'Services.html' },
    { label: 'About', href: 'About Us.html' },
    { label: 'Contact Us', href: 'Contact.html' },
    { label: 'Client Login', href: 'Login.html' },
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)', display: 'flex' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: '85%', maxWidth: 320, background: T.ink, color: '#fff', height: '100%', padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <img src="assets/logo.png" alt="Kaizen" style={{ height: 30, filter: 'brightness(0) invert(1)' }} />
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={18} /></button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((it, i) => (
            <a key={i} href={it.href} onClick={onClose} style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontFamily: FONT_DISPLAY, fontSize: 28, color: it.accent ? T.red : '#fff', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{it.label}</a>
          ))}
        </nav>
        <a href="tel:0312345678" style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: T.red, color: '#fff', borderRadius: 999, padding: '14px', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}><Icon name="phone" size={16} /> Call us · 03-1234 5678</a>
      </div>
    </div>
  );
}

function App() {
  const d = useDesktop();
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState(0); // 0 schedule, 1 details, 2 confirmed
  const svc = 'oil';
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('10:00 AM');
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', brand: '', model: '' });
  const [errors, setErrors] = useState({});
  const [filled, setFilled] = useState(false);
  const ref = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const autofill = () => {
    setForm({
      name: 'Nurul Aiman', phone: '+60 12 345 6789', email: 'nurul.aiman@email.com',
      location: 'A-12-3, Residensi USJ One, Jalan USJ 1/1, 47600 Subang Jaya',
      brand: 'Honda', model: 'City 2019',
    });
    setErrors({});
    setFilled(true);
  };

  const dates = ['Today', 'Tomorrow', 'Fri 12', 'Sat 13', 'Sun 14', 'Mon 15'];
  const times = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

  useEffect(() => { ref.current && ref.current.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^[0-9+\-\s]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email';
    if (!form.location.trim()) e.location = 'Required';
    if (!form.brand) e.brand = 'Pick a brand';
    if (!form.model.trim()) e.model = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    try {
      if (window.KaizenData) {
        window.KaizenData.bookAppointment({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: `${service.name} (Mobile)`,
          dateLabel: date,
          time,
          notes: [
            'Mobile service at customer location',
            form.location ? `Location: ${form.location}` : '',
            (form.brand || form.model) ? `Vehicle: ${[form.brand, form.model].filter(Boolean).join(' ')}` : '',
          ].filter(Boolean).join(' — '),
        });
      }
    } catch (e) { /* non-blocking: still show confirmation */ }
    setStep(2);
  };

  const service = SERVICES.find(s => s.id === svc);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', background: d ? '#fff' : '#1f1f24' }}>
      <div ref={ref} style={{
        width: '100%', maxWidth: d ? 'none' : 440, height: '100%', background: d ? '#fff' : T.bg,
        overflowY: 'auto', overflowX: 'hidden', position: 'relative',
        boxShadow: d ? 'none' : '0 0 60px rgba(0,0,0,0.4)',
      }}>
        {/* nav bar (consistent across pages) */}
        <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#fff', borderBottom: `1px solid ${T.line}` }}>
          {d ? (
            <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 32px', height: 104, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a href="Kaizen Autocare.html" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src="assets/logo.png" alt="Kaizen Autocare" style={{ height: 84 }} />
              </a>
              <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
                {[
                  { label: 'Home', href: 'Kaizen Autocare.html' },
                  { label: 'Mobile Service', href: 'Mobile Car Service.html', accent: true },
                  { label: 'Services', href: 'Services.html' },
                  { label: 'About', href: 'About Us.html' },
                  { label: 'Contact Us', href: 'Contact.html' },
                ].map(it => {
                  const active = it.label === 'Mobile Service';
                  return (
                    <a key={it.label} href={it.href} style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: active || it.accent ? 600 : 500, color: active || it.accent ? T.red : T.ink, textDecoration: 'none', paddingBottom: 4, borderBottom: active ? `2px solid ${T.red}` : '2px solid transparent' }}>{it.label}</a>
                  );
                })}
              </nav>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <a href="tel:0312345678" style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.ink, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="phone" size={16} /> 03-1234 5678</a>
                <a href="Login.html" title="Client login" style={{ width: 44, height: 44, borderRadius: '50%', background: T.bg, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink, textDecoration: 'none' }}><Icon name="user" size={20} /></a>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px' }}>
              <button onClick={() => setMenu(true)} aria-label="menu" style={{ background: 'transparent', border: 'none', padding: 6, display: 'flex', cursor: 'pointer' }}><Icon name="menu" size={24} color={T.ink} /></button>
              <a href="Kaizen Autocare.html" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src="assets/logo.png" alt="Kaizen Autocare" style={{ height: 52 }} />
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <a href="tel:0312345678" style={{ background: T.red, color: '#fff', borderRadius: 999, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}><Icon name="phone" size={14} /></a>
                <a href="Login.html" title="Client login" style={{ width: 38, height: 38, borderRadius: '50%', background: T.bg, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink, textDecoration: 'none' }}><Icon name="user" size={18} /></a>
              </div>
            </div>
          )}
        </header>
        <MobileMenu open={menu} onClose={() => setMenu(false)} />

        {/* hero */}
        <div style={{
          background: T.ink, color: '#fff',
          padding: d ? '64px 32px 72px' : '24px 16px 20px',
        }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: T.red, borderRadius: 999, padding: '5px 12px',
            fontFamily: FONT_UI, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, marginBottom: 12,
          }}>
            <Icon name="truck" size={14} /> Mobile service · we come to you
          </div>
          <h1 style={{
            fontFamily: FONT_DISPLAY, fontSize: d ? 76 : 44, lineHeight: 0.9, margin: 0,
            fontWeight: 400, letterSpacing: 0.5, textTransform: 'uppercase',
          }}>
            Car service<br/><span style={{ color: T.red }}>at your doorstep.</span>
          </h1>
          <p style={{
            fontFamily: FONT_UI, fontSize: d ? 17 : 13.5, lineHeight: 1.55,
            color: 'rgba(255,255,255,0.7)', margin: '12px 0 0', maxWidth: d ? 560 : 320,
          }}>
            We bring the oil service to you — fully-equipped van, genuine oil &amp; filter, at your home or office anywhere around USJ &amp; Subang Jaya.
          </p>
          {d && (
            <div style={{ display: 'flex', gap: 28, marginTop: 28, flexWrap: 'wrap' }}>
              {[['shield', '6-month warranty'], ['clock', 'Same-day slots'], ['truck', 'We come to you']].map(([ic, t]) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT_UI, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
                  <Icon name={ic} size={18} color={T.red} /> {t}
                </div>
              ))}
            </div>
          )}
          </div>
        </div>

        {/* booking flow */}
        <div style={d ? { background: T.bg, padding: '48px 24px' } : {}}>
        <div style={d ? { maxWidth: 720, margin: '0 auto', background: '#fff', border: `1px solid ${T.line}`, borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,0.10)', padding: '24px 20px 12px', overflow: 'hidden' } : {}}>

        {/* progress */}
        {step < 2 && (
          <div style={{
            display: 'flex', gap: 6, padding: '16px 20px 4px', background: T.bg,
          }}>
            {['Schedule', 'Your details'].map((lbl, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{
                  height: 4, borderRadius: 2, marginBottom: 6,
                  background: i <= step ? T.red : T.line, transition: 'background .2s',
                }} />
                <div style={{
                  fontFamily: FONT_UI, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.3,
                  color: i <= step ? T.ink : T.muted,
                }}>{lbl}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: '20px' }}>
          {/* STEP 0 — schedule */}
          {step === 0 && (
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 16, marginBottom: 20,
                borderRadius: 16, background: '#fff', border: `1.5px solid ${T.line}`,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: T.red, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name="oil" size={24} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.ink }}>Oil Service</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.muted, marginTop: 1 }}>Drain, replace oil + filter, dispose</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: FONT_UI, fontSize: 11, color: T.muted }}>from</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: T.red, lineHeight: 1, whiteSpace: 'nowrap' }}>RM 119</div>
                </div>
              </div>

              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, margin: '0 0 18px', fontWeight: 400 }}>
                When works for you?
              </h2>
              <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 600, color: T.ink, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="clock" size={15} color={T.red} /> Choose a date
              </div>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px 20px', padding: '0 20px 4px' }}>
                {dates.map(d => {
                  const a = date === d;
                  return (
                    <button key={d} onClick={() => setDate(d)} style={{
                      flexShrink: 0, padding: '12px 18px', borderRadius: 12, cursor: 'pointer',
                      border: `1.5px solid ${a ? T.ink : T.line}`,
                      background: a ? T.ink : '#fff', color: a ? '#fff' : T.ink,
                      fontFamily: FONT_UI, fontSize: 13, fontWeight: 600,
                    }}>{d}</button>
                  );
                })}
              </div>

              <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 600, color: T.ink, marginBottom: 8 }}>
                Arrival window
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {times.map(t => {
                  const a = time === t;
                  return (
                    <button key={t} onClick={() => setTime(t)} style={{
                      padding: '13px 6px', borderRadius: 10, cursor: 'pointer',
                      border: `1.5px solid ${a ? T.red : T.line}`,
                      background: a ? T.red : '#fff', color: a ? '#fff' : T.ink,
                      fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 600,
                    }}>{t}</button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <a href="Kaizen Autocare.html" style={{ ...ghostBtn, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Back</a>
                <button onClick={() => setStep(1)} style={{ ...primaryBtn, flex: 1 }}>
                  Continue <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 1 — details form */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, margin: '0 0 16px', fontWeight: 400 }}>
                Your details
              </h2>

              {/* member auto-fill banner */}
              {filled ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
                  padding: '12px 14px', borderRadius: 14,
                  background: '#EAF6EF', border: '1px solid #BFE3CE',
                }}>
                  <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 9, background: '#1f8a5b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="check" size={18} stroke={2.4} />
                  </div>
                  <div style={{ flex: 1, fontFamily: FONT_UI, fontSize: 13, color: '#15633f', fontWeight: 500 }}>
                    Filled from your Kaizen account.
                  </div>
                  <button onClick={() => { setForm({ name: '', phone: '', email: '', location: '', brand: '', model: '' }); setFilled(false); }} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 600, color: T.muted, textDecoration: 'underline',
                  }}>Clear</button>
                </div>
              ) : (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
                  padding: '12px 14px', borderRadius: 14,
                  background: '#FFF1F0', border: `1px solid ${T.red}33`,
                }}>
                  <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 9, background: T.red, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="user" size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 600, color: T.ink }}>Already a member?</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginTop: 1 }}>Log in to auto-fill your saved details.</div>
                  </div>
                  <button onClick={autofill} style={{
                    flexShrink: 0, background: T.red, color: '#fff', border: 'none',
                    borderRadius: 999, padding: '9px 16px', cursor: 'pointer',
                    fontFamily: FONT_UI, fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>Log in</button>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field icon="user" label="Full name">
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Nurul Aiman"
                    style={{ ...inputStyle, borderColor: errors.name ? T.red : T.line }}
                    onFocus={e => e.target.style.borderColor = T.red}
                    onBlur={e => e.target.style.borderColor = errors.name ? T.red : T.line} />
                  {errors.name && <ErrMsg>{errors.name}</ErrMsg>}
                </Field>

                <Field icon="phone" label="Phone number">
                  <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+60 12 345 6789" inputMode="tel"
                    style={{ ...inputStyle, borderColor: errors.phone ? T.red : T.line }}
                    onFocus={e => e.target.style.borderColor = T.red}
                    onBlur={e => e.target.style.borderColor = errors.phone ? T.red : T.line} />
                  {errors.phone && <ErrMsg>{errors.phone}</ErrMsg>}
                </Field>

                <Field icon="mail" label="Email">
                  <input value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" inputMode="email"
                    style={{ ...inputStyle, borderColor: errors.email ? T.red : T.line }}
                    onFocus={e => e.target.style.borderColor = T.red}
                    onBlur={e => e.target.style.borderColor = errors.email ? T.red : T.line} />
                  {errors.email && <ErrMsg>{errors.email}</ErrMsg>}
                </Field>

                <Field icon="pin" label="Service location" hint="Where should our van come? Home, office, anywhere.">
                  <textarea value={form.location} onChange={e => set('location', e.target.value)}
                    placeholder="Full address incl. unit / parking notes"
                    rows={2}
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.4, borderColor: errors.location ? T.red : T.line }}
                    onFocus={e => e.target.style.borderColor = T.red}
                    onBlur={e => e.target.style.borderColor = errors.location ? T.red : T.line} />
                  {errors.location && <ErrMsg>{errors.location}</ErrMsg>}
                </Field>

                <div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: FONT_UI, fontSize: 12, fontWeight: 600, color: T.ink, marginBottom: 7,
                  }}>
                    <Icon name="car" size={15} color={T.red} /> Car brand &amp; model
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <select value={form.brand} onChange={e => set('brand', e.target.value)}
                      style={{ ...inputStyle, flex: '0 0 42%', borderColor: errors.brand ? T.red : T.line, appearance: 'none', backgroundImage: 'none' }}>
                      <option value="" disabled>Brand</option>
                      {CAR_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <input value={form.model} onChange={e => set('model', e.target.value)} placeholder="Model & year"
                      style={{ ...inputStyle, flex: 1, borderColor: errors.model ? T.red : T.line }}
                      onFocus={e => e.target.style.borderColor = T.red}
                      onBlur={e => e.target.style.borderColor = errors.model ? T.red : T.line} />
                  </div>
                  {(errors.brand || errors.model) && <ErrMsg>{errors.brand || errors.model}</ErrMsg>}
                </div>
              </div>

              {/* summary */}
              <div style={{ background: '#fff', border: `1px solid ${T.line}`, borderRadius: 14, padding: 16, marginTop: 20 }}>
                <div style={{ fontFamily: FONT_UI, fontSize: 11, fontWeight: 700, letterSpacing: 1, color: T.muted, marginBottom: 10 }}>YOUR APPOINTMENT</div>
                {[['Service', `${service.name} · ${service.from}`], ['When', `${date}, ${time}`], ['Type', 'Mobile — at your location']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontFamily: FONT_UI, fontSize: 13 }}>
                    <span style={{ color: T.muted }}>{k}</span>
                    <span style={{ color: T.ink, fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <button onClick={() => setStep(0)} style={ghostBtn}>Back</button>
                <button onClick={submit} style={{ ...primaryBtn, flex: 1 }}>
                  Confirm booking <Icon name="check" size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — confirmed */}
          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '24px 6px' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', background: '#1f8a5b', color: '#fff',
                margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="check" size={40} stroke={2.5} /></div>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 34, margin: '0 0 10px', fontWeight: 400 }}>You're booked in</h2>
              <p style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, lineHeight: 1.5, margin: '0 0 22px' }}>
                Thanks {form.name.split(' ')[0] || 'there'}! We'll text {form.phone || 'you'} to confirm.
                Our van arrives {date.toLowerCase()} around {time}.
              </p>

              <div style={{ background: '#fff', border: `1px solid ${T.line}`, borderRadius: 16, padding: 18, textAlign: 'left' }}>
                <div style={{ fontFamily: FONT_UI, fontSize: 11, fontWeight: 700, letterSpacing: 1, color: T.muted, marginBottom: 12 }}>
                  BOOKING #KZN-M{Math.floor(Math.random() * 9000 + 1000)}
                </div>
                {[
                  ['Service', `${service.name} (${service.from})`],
                  ['When', `${date}, ${time}`],
                  ['Car', `${form.brand} ${form.model}`.trim()],
                  ['Location', form.location],
                  ['Contact', `${form.phone} · ${form.email}`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 12, padding: '7px 0', borderTop: `1px solid ${T.line}`, fontFamily: FONT_UI, fontSize: 13 }}>
                    <span style={{ color: T.muted, flex: '0 0 78px' }}>{k}</span>
                    <span style={{ color: T.ink, fontWeight: 500, flex: 1 }}>{v || '—'}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <a href="Kaizen Autocare.html" style={{ ...ghostBtn, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Icon name="home" size={16} /> Home
                </a>
                <button onClick={() => { setStep(0); setForm({ name: '', phone: '', email: '', location: '', brand: '', model: '' }); }} style={{ ...primaryBtn, flex: 1 }}>
                  New booking
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
        </div>

        {/* trust footer */}
        {!d && step < 2 && (
          <div style={{ padding: '8px 20px 32px', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['shield', '6-mo warranty'], ['clock', 'Same-day slots'], ['truck', 'We come to you']].map(([ic, t]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT_UI, fontSize: 12, color: T.muted }}>
                <Icon name={ic} size={16} color={T.red} /> {t}
              </div>
            ))}
          </div>
        )}

        {/* desktop footer */}
        {d && (
          <footer style={{ background: T.ink, color: '#fff', padding: '48px 0' }}>
            <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <div>
                <img src="assets/logo.png" alt="Kaizen Autocare" style={{ height: 40, filter: 'brightness(0) invert(1)', marginBottom: 12 }} />
                <div style={{ fontFamily: FONT_UI, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  USJ 19, Subang Jaya, Selangor · Mon–Sat 9am–7pm<br/>© 2026 Kaizen Autocare Sdn Bhd
                </div>
              </div>
              <a href="tel:0312345678" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.red, color: '#fff', borderRadius: 999, padding: '12px 18px', fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                <Icon name="phone" size={16} /> 03-1234 5678
              </a>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

const ErrMsg = ({ children }) => (
  <div style={{ fontFamily: FONT_UI, fontSize: 11.5, color: T.red, marginTop: 5, fontWeight: 500 }}>{children}</div>
);

const primaryBtn = {
  padding: '15px 22px', borderRadius: 999, border: 'none',
  background: T.red, color: '#fff', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  boxShadow: `0 8px 18px ${T.red}44`, whiteSpace: 'nowrap',
};
const ghostBtn = {
  padding: '15px 22px', borderRadius: 999, cursor: 'pointer',
  background: '#fff', color: T.ink, border: `1.5px solid ${T.line}`,
  fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap',
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
