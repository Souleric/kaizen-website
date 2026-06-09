// Kaizen Autocare — Contact page (Quick Book form + contact details + map)

const { useState, useEffect } = React;

const T = {
  red: '#E1241A', redDark: '#B81810', ink: '#15171A', ink2: '#2A2D33',
  muted: '#6B7079', line: '#E6E7EA', bg: '#F6F5F2', card: '#FFFFFF', yellow: '#F5C518',
};
const FONT_DISPLAY = "'Bebas Neue', 'Oswald', Impact, sans-serif";
const FONT_UI = "'Inter', -apple-system, system-ui, sans-serif";

const useDesktop = () => {
  const [d, setD] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);
  useEffect(() => {
    const f = () => setD(window.innerWidth >= 1024);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  return d;
};

const Icon = ({ name, size = 22, color = 'currentColor', stroke = 1.7 }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'phone': return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/></svg>;
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>;
    case 'pin': return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h10"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'whatsapp': return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm5.5 14.2c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4 0 .2 0 1-.3 1.5z"/></svg>;
    default: return null;
  }
};

const SERVICES = [
  { id: 'maint', name: 'Car & Lorry Maintenance' },
  { id: 'tyre', name: 'Tyre Service' },
  { id: 'engine', name: 'Engine Repairs' },
  { id: 'gearbox', name: 'Gearbox Maintenance' },
  { id: 'noise', name: 'Diagnose Noise' },
  { id: 'suspension', name: 'Suspension' },
];

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

function NavBar({ d }) {
  const [menu, setMenu] = useState(false);
  if (d) {
    return (
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#fff', borderBottom: `1px solid ${T.line}` }}>
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
              const active = it.label === 'Contact Us';
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
      </header>
    );
  }
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#fff', borderBottom: `1px solid ${T.line}` }}>
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
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </header>
  );
}

function QuickBook({ d }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState('');
  const [service, setService] = useState('maint');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${T.line}`, background: T.bg, fontFamily: FONT_UI, fontSize: 14, outline: 'none' };

  const submit = () => {
    if (!name.trim() || !/^[0-9+\-\s]{7,}$/.test(phone.trim())) {
      setError('Please enter your name and a valid phone number.');
      return;
    }
    try {
      if (window.KaizenData) {
        window.KaizenData.bookAppointment({
          name: name.trim(),
          phone: phone.trim(),
          service: `${SERVICES.find(s => s.id === service)?.name || 'Service'} (Quote request)`,
          dateLabel: 'Today',
          notes: ['Quote request from Contact page', car.trim() ? `Vehicle: ${car.trim()}` : ''].filter(Boolean).join(' — '),
        });
      }
    } catch (e) { /* non-blocking */ }
    setSent(true);
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 22,
      boxShadow: d ? '0 24px 60px rgba(0,0,0,0.12)' : '0 12px 32px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
      padding: d ? 28 : 20, border: `1px solid ${T.line}`,
    }}>
      <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: T.red, textTransform: 'uppercase', marginBottom: 14 }}>Quick book</div>

      <label style={{ display: 'block', marginBottom: 12 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 5 }}>Your name</div>
        <input value={name} onChange={e => { setName(e.target.value); setError(''); }} placeholder="Full name"
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.line} />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 5 }}>Phone number</div>
        <input value={phone} onChange={e => { setPhone(e.target.value); setError(''); }} placeholder="+60 12 345 6789" inputMode="tel"
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.line} />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 5 }}>Your car</div>
        <input value={car} onChange={e => setCar(e.target.value)} placeholder="e.g. Honda City 2019"
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.line} />
      </label>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 8 }}>Service</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SERVICES.map(s => {
            const active = service === s.id;
            return (
              <button key={s.id} onClick={() => setService(s.id)} style={{
                padding: '9px 16px', borderRadius: 999,
                border: `1.5px solid ${active ? T.ink : T.line}`,
                background: active ? T.ink : '#fff', color: active ? '#fff' : T.ink,
                fontFamily: FONT_UI, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              }}>{s.name}</button>
            );
          })}
        </div>
      </div>

      {error && (
        <div style={{ background: '#FDECEA', color: T.redDark || '#B81810', border: `1px solid ${T.red}33`, borderRadius: 10, padding: '10px 13px', fontFamily: FONT_UI, fontSize: 12.5, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <button onClick={submit} disabled={sent} style={{
        width: '100%', padding: '15px', borderRadius: 999, border: 'none',
        background: sent ? '#1f8a5b' : T.red, color: '#fff', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600,
        cursor: sent ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: `0 8px 18px ${T.red}44`,
      }}>
        {sent ? 'Request sent ✓' : <>Get instant quote <Icon name="arrow" size={18} /></>}
      </button>
      {sent && (
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: '#1f8a5b', marginTop: 10, textAlign: 'center' }}>
          Thanks! We'll call you back with a quote shortly.
        </div>
      )}
    </div>
  );
}

function FauxMap({ height }) {
  return (
    <div style={{ position: 'relative', height, borderRadius: 16, overflow: 'hidden', background: T.bg, border: `1px solid ${T.line}` }}>
      <svg width="100%" height="100%" viewBox="0 0 360 280" preserveAspectRatio="none">
        <rect width="360" height="280" fill="#EAE8E2"/>
        {[...Array(14)].map((_, i) => <line key={i} x1="0" x2="360" y1={20 * i} y2={20 * i} stroke="#DBD8D0" strokeWidth="1"/>)}
        {[...Array(15)].map((_, i) => <line key={i} y1="0" y2="280" x1={25 * i} x2={25 * i} stroke="#DBD8D0" strokeWidth="1"/>)}
        <path d="M0 150 Q 90 130, 180 140 T 360 125" stroke="#C8C4BA" strokeWidth="5" fill="none"/>
        <path d="M120 0 Q 130 90, 180 140 Q 240 190, 260 280" stroke="#C8C4BA" strokeWidth="4" fill="none"/>
        <path d="M0 60 L 360 70" stroke="#D4D1C7" strokeWidth="2" fill="none"/>
        <rect x="40" y="185" width="60" height="40" fill="#D7E4D0" rx="4"/>
        <rect x="240" y="30" width="80" height="50" fill="#E1DBC8" rx="4"/>
        <text x="58" y="210" fontFamily="Inter" fontSize="9" fill="#8a8a82">USJ 19 Park</text>
        <text x="245" y="56" fontFamily="Inter" fontSize="9" fill="#8a8a82">Taipan</text>
        <text x="186" y="158" fontFamily="Inter" fontSize="9" fill="#8a8a82" fontStyle="italic">Persiaran Kewajipan</text>
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%, -100%)' }}>
        <div style={{ width: 38, height: 38, background: T.red, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', border: '2.5px solid #fff' }}>
          <div style={{ width: 10, height: 10, background: '#fff', borderRadius: '50%', transform: 'rotate(45deg)' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: 12, left: 12, background: '#fff', borderRadius: 999, padding: '6px 12px', fontFamily: FONT_UI, fontSize: 11, fontWeight: 600, color: T.ink, boxShadow: '0 2px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1f8a5b' }} /> Open now
      </div>
    </div>
  );
}

function ContactRow({ icon, label, value, href }) {
  const inner = (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 0' }}>
      <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: T.red, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: T.muted }}>{label}</div>
        <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.ink, marginTop: 2, lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a> : inner;
}

function App() {
  const d = useDesktop();
  const PAD = d ? '0 32px' : '0 20px';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', background: d ? '#fff' : '#1f1f24' }}>
      <div style={{
        width: '100%', maxWidth: d ? 'none' : 440, height: '100%', background: '#fff',
        overflowY: 'auto', overflowX: 'hidden', position: 'relative',
        boxShadow: d ? 'none' : '0 0 60px rgba(0,0,0,0.4)',
      }}>
        <NavBar d={d} />

        {/* hero */}
        <div style={{ position: 'relative', overflow: 'hidden', background: T.ink, color: '#fff', padding: d ? '64px 0 76px' : '36px 0 44px' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: `repeating-linear-gradient(115deg, ${T.red} 0 22px, transparent 22px 80px)` }} />
          <div aria-hidden style={{ position: 'absolute', top: d ? -160 : -80, right: d ? -120 : -60, width: d ? 520 : 260, height: d ? 520 : 260, borderRadius: '50%', background: `radial-gradient(circle, ${T.red}55, transparent 60%)` }} />
          <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <div style={{ fontFamily: FONT_UI, fontSize: d ? 12 : 11, letterSpacing: 2, fontWeight: 700, color: T.red, textTransform: 'uppercase', marginBottom: 14 }}>Get in touch</div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 76 : 48, lineHeight: 0.9, margin: 0, fontWeight: 400, letterSpacing: 0.5, textTransform: 'uppercase', maxWidth: 760 }}>
              Let's get your<br/><span style={{ color: T.red }}>car sorted.</span>
            </h1>
            <p style={{ fontFamily: FONT_UI, fontSize: d ? 17 : 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: '18px 0 0', maxWidth: 520 }}>
              Request a quick quote, or drop by our workshop in USJ 19, Subang Jaya.
            </p>
          </div>
        </div>

        {/* main: form + contact details */}
        <section style={{ padding: d ? '64px 0' : '32px 0', background: T.bg }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <div style={d ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' } : {}}>
              {/* left: quick book */}
              <div>
                <QuickBook d={d} />
              </div>

              {/* right: contact + map */}
              <div style={{ marginTop: d ? 0 : 24 }}>
                <div style={{ background: '#fff', border: `1px solid ${T.line}`, borderRadius: 18, padding: d ? 24 : 18 }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 28 : 24, letterSpacing: 0.4, marginBottom: 4 }}>Kaizen Autocare USJ19</div>
                  <div style={{ borderTop: `1px solid ${T.line}`, marginTop: 12 }}>
                    <ContactRow icon="pin" label="Address" value="Jalan USJ 19/1, USJ 19, 47600 Subang Jaya, Selangor" href="https://maps.google.com/?q=USJ+19+Subang+Jaya" />
                    <div style={{ borderTop: `1px solid ${T.line}` }} />
                    <ContactRow icon="phone" label="Phone" value="03-1234 5678" href="tel:0312345678" />
                    <div style={{ borderTop: `1px solid ${T.line}` }} />
                    <ContactRow icon="mail" label="Email" value="hello@kaizenautocare.my" href="mailto:hello@kaizenautocare.my" />
                    <div style={{ borderTop: `1px solid ${T.line}` }} />
                    <ContactRow icon="clock" label="Hours" value="Mon–Sat 9am–7pm · Sun by appointment" />
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <FauxMap height={d ? 280 : 200} />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <a href="https://maps.google.com/?q=USJ+19+Subang+Jaya" style={{ flex: 1, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: T.ink, color: '#fff', borderRadius: 999, padding: '14px', fontFamily: FONT_UI, fontSize: 14, fontWeight: 600 }}>
                    <Icon name="pin" size={16} /> Get directions
                  </a>
                  <a href="https://wa.me/60123456789" style={{ flex: 1, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', border: 'none', borderRadius: 999, padding: '14px', fontFamily: FONT_UI, fontSize: 14, fontWeight: 600 }}>
                    <Icon name="whatsapp" size={16} color="#fff" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer style={{ background: T.ink, color: '#fff', padding: d ? '48px 0' : '32px 0 60px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: PAD, display: d ? 'flex' : 'block', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
            <div>
              <img src="assets/logo.png" alt="Kaizen Autocare" style={{ height: 40, filter: 'brightness(0) invert(1)', marginBottom: 12 }} />
              <div style={{ fontFamily: FONT_UI, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                USJ 19, Subang Jaya, Selangor · Mon–Sat 9am–7pm<br/>© 2026 Kaizen Autocare Sdn Bhd
              </div>
            </div>
            <a href="tel:0312345678" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.red, color: '#fff', borderRadius: 999, padding: '12px 18px', fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, textDecoration: 'none', marginTop: d ? 0 : 18 }}>
              <Icon name="phone" size={16} /> 03-1234 5678
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
