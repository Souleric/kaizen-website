// Kaizen Autocare — Services page (responsive)

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
    case 'back': return <svg {...p}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h10"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'check': return <svg {...p}><path d="M4 12l5 5L20 6"/></svg>;
    case 'phone': return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/></svg>;
    case 'truck': return <svg {...p}><path d="M2 6h11v9H2zM13 9h4l4 3v3h-8z"/><circle cx="6.5" cy="17" r="1.6"/><circle cx="17.5" cy="17" r="1.6"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
    case 'tire': return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/></svg>;
    case 'engine': return <svg {...p}><path d="M5 9h2V7h5v2h3l2 2h2v4h-2v3H9v-3H5v-2H3v-2h2z"/><path d="M12 7V5h3"/></svg>;
    case 'gear': return <svg {...p}><circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/></svg>;
    case 'sound': return <svg {...p}><path d="M4 9v6h3l5 4V5L7 9H4z"/><path d="M16 9a4 4 0 010 6M18.5 7a7 7 0 010 10"/></svg>;
    case 'suspension': return <svg {...p}><path d="M7 3v4M7 17v4M7 7c0 1.5-2 1.5-2 3s2 1.5 2 3-2 1.5-2 3 2 1.5 2 1M17 3v4M17 17v4M17 7c0 1.5 2 1.5 2 3s-2 1.5-2 3 2 1.5 2 3-2 1.5-2 1"/></svg>;
    default: return null;
  }
};

const SERVICES = [
  { id: 'maint', icon: 'truck', name: 'Car & Lorry Maintenance', desc: 'Scheduled servicing for cars & commercial lorries', tag: 'Core',
    incl: ['Engine oil & filter change', 'Fluid top-ups & checks', 'Safety inspection', 'Cars and commercial lorries'] },
  { id: 'tyre', icon: 'tire', name: 'Tyre Service', desc: 'Supply, fitting, balancing & alignment',
    incl: ['Tyre supply & fitting', 'Wheel balancing', 'Alignment', 'Puncture repair'] },
  { id: 'engine', icon: 'engine', name: 'Engine Repairs', desc: 'Overhauls, timing, cooling & tune-ups',
    incl: ['Engine overhaul', 'Timing belt / chain', 'Cooling system', 'Performance tune-up'] },
  { id: 'gearbox', icon: 'gear', name: 'Gearbox Maintenance', desc: 'Auto & manual — fluid, service & repair',
    incl: ['Transmission fluid', 'Auto & manual service', 'Clutch inspection', 'Gearbox repair'] },
  { id: 'noise', icon: 'sound', name: 'Diagnose Noise', desc: 'Track down knocks, rattles & vibration',
    incl: ['Knock & rattle tracing', 'Vibration diagnosis', 'Road-test inspection', 'Clear written quote'] },
  { id: 'suspension', icon: 'suspension', name: 'Suspension', desc: 'Shocks, springs, bushings & arms',
    incl: ['Shock absorbers', 'Springs & struts', 'Bushings & arms', 'Ride-height check'] },
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

function App() {
  const d = useDesktop();
  const [menu, setMenu] = useState(false);
  const PAD = d ? '0 32px' : '0 20px';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', background: d ? '#fff' : '#1f1f24' }}>
      <div style={{
        width: '100%', maxWidth: d ? 'none' : 440, height: '100%', background: '#fff',
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
                  const active = it.label === 'Services';
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
        <div style={{ position: 'relative', overflow: 'hidden', background: T.ink, color: '#fff', padding: d ? '72px 0 84px' : '40px 0 48px' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: `repeating-linear-gradient(115deg, ${T.red} 0 22px, transparent 22px 80px)` }} />
          <div aria-hidden style={{ position: 'absolute', top: d ? -160 : -80, right: d ? -120 : -60, width: d ? 520 : 260, height: d ? 520 : 260, borderRadius: '50%', background: `radial-gradient(circle, ${T.red}55, transparent 60%)` }} />
          <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <div style={{ fontFamily: FONT_UI, fontSize: d ? 12 : 11, letterSpacing: 2, fontWeight: 700, color: T.red, textTransform: 'uppercase', marginBottom: 14 }}>What we do</div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 80 : 50, lineHeight: 0.9, margin: 0, fontWeight: 400, letterSpacing: 0.5, textTransform: 'uppercase', maxWidth: 760 }}>
              Every service,<br/><span style={{ color: T.red }}>one trusted brand.</span>
            </h1>
            <p style={{ fontFamily: FONT_UI, fontSize: d ? 17 : 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: '18px 0 0', maxWidth: 520 }}>
              Workshop and mobile services for cars and lorries — all under one roof at USJ 19, Subang Jaya.
            </p>
          </div>
        </div>

        {/* services grid */}
        <section style={{ padding: d ? '64px 0' : '36px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <div style={{ display: 'grid', gridTemplateColumns: d ? 'repeat(3, 1fr)' : '1fr', gap: 16 }}>
              {SERVICES.map(s => (
                <div key={s.id} style={{
                  position: 'relative', background: T.card, border: `1px solid ${T.line}`,
                  borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
                }}>
                  {s.tag && (
                    <div style={{
                      position: 'absolute', top: 16, right: 16, background: T.red, color: '#fff',
                      fontFamily: FONT_UI, fontSize: 9, fontWeight: 700, letterSpacing: 0.8,
                      textTransform: 'uppercase', padding: '3px 7px', borderRadius: 4,
                    }}>{s.tag}</div>
                  )}
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: T.bg, color: T.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={s.icon} size={28} />
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: 19, color: T.ink, lineHeight: 1.2 }}>{s.name}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, marginTop: 6, lineHeight: 1.4 }}>{s.desc}</div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9, borderTop: `1px solid ${T.line}`, paddingTop: 16 }}>
                    {s.incl.map((line, j) => (
                      <li key={j} style={{ display: 'flex', gap: 9, alignItems: 'center', fontFamily: FONT_UI, fontSize: 13.5, color: T.ink2 }}>
                        <Icon name="check" size={16} color={T.red} /> <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="Kaizen Autocare.html" style={{ marginTop: 'auto', textDecoration: 'none' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, color: T.ink,
                    }}>Book this service <Icon name="arrow" size={15} /></span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* mobile service callout */}
        <section style={{ padding: d ? '0 0 72px' : '0 0 36px', background: '#fff' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <a href="Mobile Car Service.html" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                position: 'relative', overflow: 'hidden', borderRadius: 20,
                background: T.ink, color: '#fff', padding: d ? 40 : 24,
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: `repeating-linear-gradient(115deg, ${T.red} 0 18px, transparent 18px 60px)` }} />
                <div style={{ position: 'relative', flex: 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.red, borderRadius: 999, padding: '4px 10px', fontFamily: FONT_UI, fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Mobile Autocare</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 40 : 28, lineHeight: 0.95, letterSpacing: 0.4, textTransform: 'uppercase' }}>Can't come to us? We'll come to you.</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: d ? 15 : 13, color: 'rgba(255,255,255,0.65)', marginTop: 8, maxWidth: 460, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    Book a mobile oil service at your home or workplace <Icon name="arrow" size={14} color="#fff" />
                  </div>
                </div>
                <div style={{ position: 'relative', flexShrink: 0, width: d ? 96 : 64, height: d ? 96 : 64, borderRadius: 16, background: T.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="truck" size={d ? 48 : 34} color="#fff" />
                </div>
              </div>
            </a>
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
