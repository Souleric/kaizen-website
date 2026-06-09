// Kaizen Autocare — Client Login page

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
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h10"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'phone': return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/></svg>;
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>;
    case 'lock': return <svg {...p}><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
    case 'eye': return <svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'check': return <svg {...p}><path d="M4 12l5 5L20 6"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'tag': return <svg {...p}><path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="8" cy="8" r="1.5" fill={color}/></svg>;
    default: return null;
  }
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

function NavBar({ d }) {
  const [menu, setMenu] = useState(false);
  const links = [
    ['Home', 'Kaizen Autocare.html', T.ink],
    ['Mobile Service', 'Mobile Car Service.html', T.red],
    ['Services', 'Services.html', T.ink],
    ['About', 'About Us.html', T.ink],
    ['Contact Us', 'Contact.html', T.ink],
  ];
  if (d) {
    return (
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#fff', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 32px', height: 104, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="Kaizen Autocare.html" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="assets/logo.png" alt="Kaizen Autocare" style={{ height: 84 }} />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {links.map(([l, h, c]) => (
              <a key={l} href={h} style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: c === T.red ? 600 : 500, color: c, textDecoration: 'none', paddingBottom: 4, borderBottom: '2px solid transparent' }}>{l}</a>
            ))}
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

const PERKS = [
  { icon: 'clock', t: 'Service history', s: 'Every job and invoice in one place.' },
  { icon: 'tag', t: 'Member pricing', s: 'Exclusive rates and reminders.' },
  { icon: 'shield', t: 'Warranty tracking', s: 'Know what\u2019s still covered, instantly.' },
];

function App() {
  const d = useDesktop();
  const [phone, setPhone] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [session, setSession] = useState(null);

  // Reflect an existing signed-in session (shared with the Portal).
  useEffect(() => {
    if (window.KaizenData && window.KaizenData.isLoggedIn()) {
      setSession({ name: window.KaizenData.currentName() });
    }
  }, []);

  const signIn = () => {
    const user = window.KaizenData && window.KaizenData.login(phone, pw);
    if (user) {
      window.KaizenData.setSession(user);
      window.KaizenData.gotoPortal();
    } else {
      setError('Incorrect phone number or password.');
    }
  };

  const signOut = () => {
    if (window.KaizenData) window.KaizenData.logout();
    setSession(null);
  };

  const inputWrap = {
    display: 'flex', alignItems: 'center', gap: 10,
    border: `1.5px solid ${T.line}`, borderRadius: 12, background: T.bg,
    padding: '0 14px',
  };
  const inputStyle = {
    flex: 1, border: 'none', background: 'transparent', outline: 'none',
    padding: '14px 0', fontFamily: FONT_UI, fontSize: 15, color: T.ink,
  };

  const form = (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: T.red, textTransform: 'uppercase', marginBottom: 10 }}>Client login</div>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 48 : 38, lineHeight: 0.95, margin: '0 0 8px', fontWeight: 400, textTransform: 'uppercase' }}>Welcome back</h1>
      <p style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, margin: '0 0 28px', lineHeight: 1.5 }}>
        Sign in to view your bookings, service history and invoices.
      </p>

      <label style={{ display: 'block', marginBottom: 16 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 7 }}>Phone number</div>
        <div style={inputWrap}>
          <Icon name="phone" size={18} color={T.muted} />
          <input value={phone} onChange={e => { setPhone(e.target.value); setError(''); }} onKeyDown={e => { if (e.key === 'Enter') signIn(); }} placeholder="+60 12 345 6789" inputMode="tel" style={inputStyle} />
        </div>
      </label>

      <label style={{ display: 'block', marginBottom: 14 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 7 }}>Password</div>
        <div style={inputWrap}>
          <Icon name="lock" size={18} color={T.muted} />
          <input value={pw} onChange={e => { setPw(e.target.value); setError(''); }} onKeyDown={e => { if (e.key === 'Enter') signIn(); }} placeholder="••••••••" type={show ? 'text' : 'password'} style={inputStyle} />
          <button onClick={() => setShow(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: show ? T.red : T.muted, display: 'flex', padding: 4 }}>
            <Icon name="eye" size={18} />
          </button>
        </div>
      </label>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <button onClick={() => setRemember(r => !r)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{
            width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${remember ? T.red : T.line}`,
            background: remember ? T.red : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{remember && <Icon name="check" size={14} color="#fff" stroke={2.5} />}</span>
          <span style={{ fontFamily: FONT_UI, fontSize: 13, color: T.ink2 }}>Remember me</span>
        </button>
        <a href="#" style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, color: T.red, textDecoration: 'none' }}>Forgot password?</a>
      </div>

      {error && (
        <div style={{ background: '#FDECEA', color: T.redDark, border: `1px solid ${T.red}33`, borderRadius: 10, padding: '11px 14px', fontFamily: FONT_UI, fontSize: 13.5, marginBottom: 16 }}>
          {error}
        </div>
      )}

      <button onClick={signIn} style={{
        width: '100%', padding: '15px', borderRadius: 999, border: 'none',
        background: T.red, color: '#fff', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: `0 8px 18px ${T.red}44`,
      }}>Sign in <Icon name="arrow" size={18} /></button>

      <div style={{ textAlign: 'center', marginTop: 20, fontFamily: FONT_UI, fontSize: 13.5, color: T.muted }}>
        New to Kaizen? <a href="Contact.html" style={{ color: T.ink, fontWeight: 600, textDecoration: 'none' }}>Create an account</a>
      </div>
    </div>
  );

  const signedInCard = (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: T.red, textTransform: 'uppercase', marginBottom: 10 }}>Signed in</div>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 48 : 38, lineHeight: 0.95, margin: '0 0 8px', fontWeight: 400, textTransform: 'uppercase' }}>
        Welcome back{session && session.name ? `, ${session.name.split(' ')[0]}` : ''}
      </h1>
      <p style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, margin: '0 0 28px', lineHeight: 1.5 }}>
        You're already signed in. Jump back into your portal to view bookings, service history and invoices.
      </p>

      <button onClick={() => window.KaizenData.gotoPortal()} style={{
        width: '100%', padding: '15px', borderRadius: 999, border: 'none',
        background: T.red, color: '#fff', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: `0 8px 18px ${T.red}44`,
      }}>Go to my portal <Icon name="arrow" size={18} /></button>

      <button onClick={signOut} style={{
        width: '100%', padding: '14px', borderRadius: 999, marginTop: 12,
        background: '#fff', color: T.ink, border: `1.5px solid ${T.line}`,
        fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, cursor: 'pointer',
      }}>Sign out</button>
    </div>
  );

  const panel = session ? signedInCard : form;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', background: d ? '#fff' : '#1f1f24' }}>
      <div style={{
        width: '100%', maxWidth: d ? 'none' : 440, height: '100%', background: '#fff',
        overflowY: 'auto', overflowX: 'hidden', position: 'relative',
        boxShadow: d ? 'none' : '0 0 60px rgba(0,0,0,0.4)',
      }}>
        <NavBar d={d} />

        {d ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100% - 105px)' }}>
            {/* brand panel */}
            <div style={{ position: 'relative', overflow: 'hidden', background: T.ink, color: '#fff', padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: `repeating-linear-gradient(115deg, ${T.red} 0 22px, transparent 22px 80px)` }} />
              <div aria-hidden style={{ position: 'absolute', top: -120, right: -100, width: 460, height: 460, borderRadius: '50%', background: `radial-gradient(circle, ${T.red}55, transparent 60%)` }} />
              <div style={{ position: 'relative', maxWidth: 420 }}>
                <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 60, lineHeight: 0.9, margin: '0 0 16px', fontWeight: 400, textTransform: 'uppercase' }}>
                  Your garage,<br/><span style={{ color: T.red }}>in your pocket.</span>
                </h2>
                <p style={{ fontFamily: FONT_UI, fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: '0 0 32px' }}>
                  Manage bookings, track your service history and keep every vehicle in top condition.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {PERKS.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: T.red, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={p.icon} size={22} />
                      </div>
                      <div>
                        <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 600 }}>{p.t}</div>
                        <div style={{ fontFamily: FONT_UI, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{p.s}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* form panel */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 56px', background: '#fff' }}>
              {panel}
            </div>
          </div>
        ) : (
          <div style={{ padding: '36px 24px 48px', background: '#fff', display: 'flex', justifyContent: 'center' }}>
            {panel}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
