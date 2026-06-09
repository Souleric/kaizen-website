// Kaizen Autocare — Mobile site
// Single-component app, mobile-first, framed as a phone column on desktop.

const { useState, useEffect, useRef, useContext, Fragment } = React;

// device context: true on desktop-width viewports
const DeviceCtx = React.createContext(false);
const useDesktop = () => useContext(DeviceCtx);

// ───────────────────────────── tokens ─────────────────────────────
const T = {
  red: '#E1241A',
  redDark: '#B81810',
  ink: '#15171A',
  ink2: '#2A2D33',
  muted: '#6B7079',
  line: '#E6E7EA',
  bg: '#F6F5F2',
  card: '#FFFFFF',
  yellow: '#F5C518',
};

const FONT_DISPLAY = "'Bebas Neue', 'Oswald', Impact, sans-serif";
const FONT_UI = "'Inter', -apple-system, system-ui, sans-serif";

// ───────────────────────────── icons (line) ─────────────────────────────
const Icon = ({ name, size = 22, color = 'currentColor', stroke = 1.7 }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h10"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'phone': return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrowSm': return <svg {...p} viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>;
    case 'check': return <svg {...p}><path d="M4 12l5 5L20 6"/></svg>;
    case 'star': return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.2 5.8 22l1.7-7.2L2 10l7.1-1.1z"/></svg>;
    case 'pin': return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'tag': return <svg {...p}><path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="8" cy="8" r="1.5" fill={color}/></svg>;
    case 'wrench': return <svg {...p}><path d="M14.7 6.3a4 4 0 015.5 5L20 13l-9 9-3-3 9-9 1.7-3.7zM7 14l-4 4 3 3 4-4"/></svg>;
    case 'oil': return <svg {...p}><path d="M12 3v4M9 7h6M6 9h12l-1 11H7L6 9z"/><path d="M9 13c1 1.5 3 1.5 3 3"/></svg>;
    case 'tint': return <svg {...p}><path d="M4 5h16v12H4z"/><path d="M4 9h16M9 5v12"/></svg>;
    case 'battery': return <svg {...p}><rect x="3" y="8" width="16" height="10" rx="1.5"/><path d="M19 11h2v4h-2M7 5h3M14 5h3"/></svg>;
    case 'tire': return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/></svg>;
    case 'spray': return <svg {...p}><rect x="8" y="9" width="8" height="12" rx="1"/><path d="M10 9V5h4v4M14 3h3M14 5h4M14 7h3"/></svg>;
    case 'cam': return <svg {...p}><rect x="3" y="7" width="14" height="10" rx="2"/><path d="M17 11l4-2v6l-4-2"/></svg>;
    case 'home': return <svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z"/></svg>;
    case 'grid': return <svg {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
    case 'cal': return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
    case 'whatsapp': return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm5.5 14.2c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4 0 .2 0 1-.3 1.5z"/></svg>;
    case 'spark': return <svg {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.5 5.5l4 4M14.5 14.5l4 4M18.5 5.5l-4 4M9.5 14.5l-4 4"/></svg>;
    case 'play': return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M8 5v14l11-7z"/></svg>;
    case 'badge': return <svg {...p}><path d="M12 2l2.5 2.5L18 4l1 3.5L21.5 10 20 13l1.5 3-2.5 1.5L18 20l-3.5-.5L12 22l-2.5-2.5L6 20l-1-3.5L2.5 14 4 11 2.5 8 5 6.5 6 4l3.5.5z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'chev': return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case 'car': return <svg {...p}><path d="M5 13l1.4-4.2A2 2 0 018.3 7.4h7.4a2 2 0 011.9 1.4L19 13M5 13h14v4a1 1 0 01-1 1h-1a1 1 0 01-1-1H8a1 1 0 01-1 1H6a1 1 0 01-1-1z"/><circle cx="8" cy="15" r="1" fill={color} stroke="none"/><circle cx="16" cy="15" r="1" fill={color} stroke="none"/></svg>;
    case 'truck': return <svg {...p}><path d="M2 6h11v9H2zM13 9h4l4 3v3h-8z"/><circle cx="6.5" cy="17" r="1.6"/><circle cx="17.5" cy="17" r="1.6"/></svg>;
    case 'engine': return <svg {...p}><path d="M5 9h2V7h5v2h3l2 2h2v4h-2v3H9v-3H5v-2H3v-2h2z"/><path d="M12 7V5h3"/></svg>;
    case 'gear': return <svg {...p}><circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/></svg>;
    case 'sound': return <svg {...p}><path d="M4 9v6h3l5 4V5L7 9H4z"/><path d="M16 9a4 4 0 010 6M18.5 7a7 7 0 010 10"/></svg>;
    case 'suspension': return <svg {...p}><path d="M7 3v4M7 17v4M7 7c0 1.5-2 1.5-2 3s2 1.5 2 3-2 1.5-2 3 2 1.5 2 1M17 3v4M17 17v4M17 7c0 1.5 2 1.5 2 3s-2 1.5-2 3 2 1.5 2 3-2 1.5-2 1"/></svg>;
    default: return null;
  }
};

// ───────────────────────────── data ─────────────────────────────
const SERVICES = [
  { id: 'maint',      icon: 'truck',      name: 'Car & Lorry Maintenance', desc: 'Scheduled servicing for cars & commercial lorries', tag: 'Core' },
  { id: 'tyre',       icon: 'tire',       name: 'Tyre Service',            desc: 'Supply, fitting, balancing & alignment', tag: null },
  { id: 'engine',     icon: 'engine',     name: 'Engine Repairs',          desc: 'Overhauls, timing, cooling & tune-ups', tag: null },
  { id: 'gearbox',    icon: 'gear',       name: 'Gearbox Maintenance',     desc: 'Auto & manual — fluid, service & repair', tag: null },
  { id: 'noise',      icon: 'sound',      name: 'Diagnose Noise',          desc: 'Track down knocks, rattles & vibration', tag: null },
  { id: 'suspension', icon: 'suspension', name: 'Suspension',              desc: 'Shocks, springs, bushings & arms', tag: null },
];

const PACKAGES = [
  {
    id: 'p1',
    name: 'Minor Service',
    sub: 'Routine maintenance · cars & lorries',
    price: 199, was: 259,
    badge: 'BEST VALUE',
    incl: ['Engine oil & filter change', '30-point safety inspection', 'Top-up all fluids', 'Tyre pressure & rotation'],
  },
  {
    id: 'p2',
    name: 'Major Service',
    sub: 'Full workshop service · every 40k km',
    price: 449, was: 580,
    badge: null,
    incl: ['Everything in Minor Service', 'Gearbox / transmission check', 'Brake & suspension inspection', 'Spark plugs & air filter'],
  },
  {
    id: 'p3',
    name: 'Tyre Package',
    sub: 'Set of 4 · supply & fit',
    price: 240, was: 320,
    badge: 'POPULAR',
    incl: ['Fitting & balancing', '4-wheel alignment', 'Nitrogen fill', 'Free rotation for 1 year'],
  },
];

const STORES = [
  { name: 'Kaizen Autocare USJ19', area: 'Subang Jaya · USJ19, Selangor', dist: 'Open now', rating: 4.9, slots: '8 slots today', addr: 'Jalan USJ 19/1, USJ 19, 47600 Subang Jaya' },
];

const REVIEWS = [
  { name: 'Aiman R.', car: 'Honda City', text: 'Sent my car in for a knocking noise. They diagnosed a worn suspension arm same day and quoted before touching anything. No upsell nonsense.', rating: 5 },
  { name: 'Sue Lin', car: 'Perodua Bezza', text: 'Did my minor service at USJ19. Crew walked me through the inspection checklist and showed me the old filter. Proper transparency.', rating: 5 },
  { name: 'Daniel T.', car: 'Toyota Hilux', text: 'Lorry fleet maintenance handled fast. Saw the parts before install. That\'s how it should be.', rating: 5 },
];

const TRUST = [
  { icon: 'tag', t: 'Transparent pricing', s: 'See the full bill before you book.' },
  { icon: 'badge', t: 'Genuine parts', s: 'Sourced direct. No grey-market stock.' },
  { icon: 'shield', t: '6-month warranty', s: 'On parts and workmanship, every job.' },
  { icon: 'clock', t: 'In & out fast', s: 'Most services done in under 60 mins.' },
];

// ───────────────────────────── small UI ─────────────────────────────
function Btn({ children, kind = 'primary', size = 'md', icon, onClick, full, style }) {
  const base = {
    fontFamily: FONT_UI, fontWeight: 600, border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderRadius: 999, transition: 'transform .1s, background .15s',
    width: full ? '100%' : 'auto', whiteSpace: 'nowrap',
  };
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '13px 20px', fontSize: 15 },
    lg: { padding: '16px 24px', fontSize: 16 },
  };
  const kinds = {
    primary: { background: T.red, color: '#fff' },
    dark: { background: T.ink, color: '#fff' },
    ghost: { background: 'transparent', color: T.ink, border: `1.5px solid ${T.line}` },
    light: { background: '#fff', color: T.ink, boxShadow: '0 1px 3px rgba(0,0,0,.08)' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...sizes[size], ...kinds[kind], ...style }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      {children}
      {icon && <Icon name={icon} size={16} />}
    </button>
  );
}

function Section({ eyebrow, title, children, dark, style, innerStyle }) {
  const d = useDesktop();
  return (
    <section style={{
      padding: d ? '72px 32px' : '36px 20px',
      background: dark ? T.ink : 'transparent',
      color: dark ? '#fff' : T.ink,
      ...style,
    }}>
      <div style={{ maxWidth: d ? 1180 : 'none', margin: '0 auto', ...innerStyle }}>
        {eyebrow && (
          <div style={{
            fontFamily: FONT_UI, fontSize: d ? 12 : 11, letterSpacing: 2, fontWeight: 700,
            color: T.red, textTransform: 'uppercase', marginBottom: 8,
          }}>{eyebrow}</div>
        )}
        {title && (
          <h2 style={{
            fontFamily: FONT_DISPLAY, fontSize: d ? 54 : 36, lineHeight: 0.95,
            letterSpacing: 0.5, margin: d ? '0 0 36px' : '0 0 22px', fontWeight: 400,
            textTransform: 'uppercase',
          }}>{title}</h2>
        )}
        {children}
      </div>
    </section>
  );
}

// ───────────────────────────── header ─────────────────────────────
function Header({ onMenu, scrolled, onBook }) {
  const d = useDesktop();
  const navLinks = ['Services'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: scrolled ? 'rgba(255,255,255,0.92)' : '#fff',
      backdropFilter: 'saturate(180%) blur(12px)',
      WebkitBackdropFilter: 'saturate(180%) blur(12px)',
      borderBottom: scrolled ? `1px solid ${T.line}` : '1px solid transparent',
      transition: 'border .2s, background .2s',
    }}>
      {d ? (
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 32px', height: 104, boxSizing: 'border-box',
        }}>
          <img src="assets/logo.png" alt="Kaizen Autocare" style={{ height: 84 }} />
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {[
              { label: 'Home', href: 'Kaizen Autocare.html' },
              { label: 'Mobile Service', href: 'Mobile Car Service.html', accent: true },
              { label: 'Services', href: 'Services.html' },
              { label: 'About', href: 'About Us.html' },
              { label: 'Contact Us', href: 'Contact.html' },
            ].map(it => {
              const active = it.label === 'Home';
              return (
                <a key={it.label} href={it.href} style={{
                  fontFamily: FONT_UI, fontSize: 15,
                  fontWeight: active || it.accent ? 600 : 500,
                  color: active || it.accent ? T.red : T.ink,
                  textDecoration: 'none', paddingBottom: 4,
                  borderBottom: active ? `2px solid ${T.red}` : '2px solid transparent',
                }}>{it.label}</a>
              );
            })}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="tel:0312345678" style={{
              fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.ink,
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            }}><Icon name="phone" size={16} /> 03-1234 5678</a>
            <a href="Login.html" title="Client login" style={{
              width: 44, height: 44, borderRadius: '50%', background: T.bg,
              border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: T.ink, textDecoration: 'none',
            }}><Icon name="user" size={20} /></a>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 18px', height: 84, boxSizing: 'border-box',
        }}>
          <button onClick={onMenu} style={{
            background: 'transparent', border: 'none', padding: 6,
            display: 'flex', alignItems: 'center', cursor: 'pointer',
          }}><Icon name="menu" size={24} color={T.ink} /></button>

          <img src="assets/logo.png" alt="Kaizen Autocare" style={{ height: 60 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{
              background: T.red, color: '#fff', border: 'none', borderRadius: 999,
              padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
              <Icon name="phone" size={14} />
              Call
            </button>
            <a href="Login.html" title="Client login" style={{
              width: 38, height: 38, borderRadius: '50%', background: T.bg,
              border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: T.ink, textDecoration: 'none',
            }}><Icon name="user" size={18} /></a>
          </div>
        </div>
      )}
    </header>
  );
}

// ───────────────────────────── hero ─────────────────────────────
function Hero({ onBook }) {
  const d = useDesktop();
  const badge = (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 999, padding: '5px 12px',
      fontFamily: FONT_UI, fontSize: 11, fontWeight: 600,
      letterSpacing: 0.5, marginBottom: 20,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DDC97' }} />
      USJ19 Subang Jaya · open today
    </div>
  );
  const heading = (
    <h1 style={{
      fontFamily: FONT_DISPLAY, fontSize: d ? 92 : 64, lineHeight: 0.88,
      margin: 0, fontWeight: 400, letterSpacing: 0.5,
      textTransform: 'uppercase',
    }}>
      Car care,<br/>
      <span style={{ color: T.red }}>without the </span>
      <span style={{ display: 'inline-block', position: 'relative', color: T.red }}>
        guesswork
        <span style={{
          position: 'absolute', left: 0, right: 0, bottom: 4, height: 6,
          background: T.red, opacity: 0.25, zIndex: -1,
        }} />
      </span>.
    </h1>
  );
  const para = (
    <p style={{
      fontFamily: FONT_UI, fontSize: d ? 17 : 15, lineHeight: 1.55,
      color: 'rgba(255,255,255,0.7)', margin: d ? '22px 0 28px' : '18px 0 24px', maxWidth: 420,
    }}>
      Maintenance, tyres, engine, gearbox &amp; suspension for cars and
      lorries. Genuine parts, certified techs — right here in USJ19, Subang Jaya.
    </p>
  );
  const buttons = (
    <div style={{ display: 'flex', gap: 10, marginBottom: d ? 0 : 28 }}>
      <Btn kind="primary" size="lg" icon="arrow" onClick={onBook}>Book a service</Btn>
      <Btn kind="ghost" size="lg" style={{ color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)' }}>See pricing</Btn>
    </div>
  );
  const offerCard = (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 18, padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      backdropFilter: 'blur(8px)', marginTop: d ? 28 : 0,
    }}>
      <div style={{
        width: 44, height: 44, flexShrink: 0,
        background: T.red, borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="tag" size={22} color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
          Free inspection
        </div>
        <div style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, marginTop: 2 }}>
          Diagnose any noise — no obligation
        </div>
      </div>
      <Icon name="chev" size={18} color="rgba(255,255,255,0.5)" />
    </div>
  );

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: T.ink, color: '#fff',
      padding: d ? '80px 32px 96px' : '24px 20px 32px',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, opacity: 0.07,
        backgroundImage: `repeating-linear-gradient(115deg, ${T.red} 0 22px, transparent 22px 80px)`,
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: d ? -160 : -80, right: d ? -120 : -80,
        width: d ? 520 : 280, height: d ? 520 : 280, borderRadius: '50%',
        background: `radial-gradient(circle, ${T.red}55, transparent 60%)`,
      }} />

      {d ? (
        <div style={{
          position: 'relative', maxWidth: 1180, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center',
        }}>
          <div>{badge}{heading}{para}{buttons}{offerCard}</div>
          <div><QuickBook onBook={onBook} /></div>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          {badge}{heading}{para}{buttons}{offerCard}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────── quick book ─────────────────────────────
function QuickBook({ onBook }) {
  const d = useDesktop();
  const [car, setCar] = useState('');
  const [service, setService] = useState('maint');

  return (
    <div style={d ? {
      position: 'relative', zIndex: 5, background: '#fff', borderRadius: 22,
      boxShadow: '0 24px 60px rgba(0,0,0,0.35)', padding: 24, color: T.ink,
    } : {
      margin: '-24px 16px 0', position: 'relative', zIndex: 5,
      background: '#fff', borderRadius: 22,
      boxShadow: '0 12px 32px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
      padding: 18, border: `1px solid ${T.line}`,
    }}>
      <div style={{
        fontFamily: FONT_UI, fontSize: 12, fontWeight: 600,
        letterSpacing: 1.5, color: T.red, textTransform: 'uppercase',
        marginBottom: 12,
      }}>Quick book</div>

      <label style={{ display: 'block', marginBottom: 10 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 5 }}>Your car</div>
        <input
          value={car} onChange={e => setCar(e.target.value)}
          placeholder="e.g. Honda City 2019"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '12px 14px', borderRadius: 12,
            border: `1.5px solid ${T.line}`, background: T.bg,
            fontFamily: FONT_UI, fontSize: 14, outline: 'none',
          }}
          onFocus={e => e.target.style.borderColor = T.red}
          onBlur={e => e.target.style.borderColor = T.line}
        />
      </label>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 6 }}>Service</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: d ? 'wrap' : 'nowrap', overflowX: d ? 'visible' : 'auto', paddingBottom: 4, margin: '0 -2px' }}>
          {['maint', 'tyre', 'engine', 'gearbox', 'noise', 'suspension'].map(k => {
            const s = SERVICES.find(x => x.id === k);
            const active = service === k;
            return (
              <button key={k} onClick={() => setService(k)} style={{
                flexShrink: 0, padding: '8px 14px', borderRadius: 999,
                border: `1.5px solid ${active ? T.ink : T.line}`,
                background: active ? T.ink : '#fff',
                color: active ? '#fff' : T.ink,
                fontFamily: FONT_UI, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}>{s?.name}</button>
            );
          })}
        </div>
      </div>

      <Btn kind="primary" size="md" full icon="arrow" onClick={onBook}>
        Get instant quote
      </Btn>
    </div>
  );
}

// ───────────────────────────── services grid ─────────────────────────────
function ServicesGrid({ onPick }) {
  const d = useDesktop();
  return (
    <Section eyebrow="What we do" title={<>Every service,<br/>one trusted brand.</>}>
      <div style={{
        display: 'grid', gridTemplateColumns: d ? 'repeat(3, 1fr)' : '1fr 1fr', gap: d ? 16 : 10,
      }}>
        {SERVICES.map(s => (
          <button key={s.id} onClick={() => onPick(s)} style={{
            position: 'relative', background: T.card, border: `1px solid ${T.line}`,
            borderRadius: 16, padding: d ? '24px 22px' : '16px 14px', textAlign: 'left', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: 14,
            minHeight: d ? 180 : 132, transition: 'border-color .15s, box-shadow .15s',
          }}
          onMouseEnter={d ? (e => { e.currentTarget.style.borderColor = T.red; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }) : undefined}
          onMouseLeave={d ? (e => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.boxShadow = 'none'; }) : undefined}>
            {s.tag && (
              <div style={{
                position: 'absolute', top: d ? 16 : 10, right: d ? 16 : 10,
                background: s.tag === 'New' ? T.ink : T.red, color: '#fff',
                fontFamily: FONT_UI, fontSize: 9, fontWeight: 700,
                letterSpacing: 0.8, textTransform: 'uppercase',
                padding: '3px 7px', borderRadius: 4,
              }}>{s.tag}</div>
            )}
            <div style={{
              width: d ? 52 : 40, height: d ? 52 : 40, borderRadius: 12,
              background: T.bg, color: T.red,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={s.icon} size={d ? 28 : 22} />
            </div>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: d ? 18 : 14, color: T.ink, lineHeight: 1.25 }}>{s.name}</div>
              <div style={{ fontFamily: FONT_UI, fontSize: d ? 14 : 11.5, color: T.muted, marginTop: d ? 6 : 4, lineHeight: 1.4 }}>
                {s.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}

// ───────────────────────────── trust strip ─────────────────────────────
function TrustStrip() {
  const d = useDesktop();
  if (d) {
    return (
      <Section eyebrow="The Kaizen promise" title="Built on small, daily improvements.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {TRUST.map((t, i) => (
            <div key={i} style={{
              background: '#fff', border: `1px solid ${T.line}`, borderRadius: 16,
              padding: 24, display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{
                width: 52, height: 52, background: T.red, borderRadius: 12, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={t.icon} size={26} />
              </div>
              <div>
                <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: 17, color: T.ink }}>{t.t}</div>
                <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, marginTop: 6, lineHeight: 1.5 }}>{t.s}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }
  return (
    <Section eyebrow="The Kaizen promise" title="Built on small, daily improvements.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {TRUST.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, padding: '16px 0',
            borderTop: i === 0 ? `1px solid ${T.line}` : 'none',
            borderBottom: `1px solid ${T.line}`,
          }}>
            <div style={{
              width: 44, height: 44, flexShrink: 0,
              background: T.red, borderRadius: 12, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={t.icon} size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: 15, color: T.ink }}>{t.t}</div>
              <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 2, lineHeight: 1.45 }}>{t.s}</div>
            </div>
            <div style={{ alignSelf: 'center', color: T.muted }}>
              <Icon name="chev" size={18} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ───────────────────────────── packages ─────────────────────────────
function Packages({ onBook }) {
  const d = useDesktop();
  const [active, setActive] = useState(0);
  return (
    <div style={{ background: T.bg, paddingBottom: 8 }}>
      <Section eyebrow="Featured packages" title={<>Honest prices.<br/>Nothing hidden.</>}>
        <div style={d ? {
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
        } : {
          display: 'flex', gap: 12, overflowX: 'auto',
          margin: '0 -20px', padding: '4px 20px 16px',
          scrollSnapType: 'x mandatory',
        }}>
          {PACKAGES.map((p, i) => (
            <div key={p.id} onClick={() => setActive(i)} style={{
              flexShrink: 0, width: d ? 'auto' : 280, scrollSnapAlign: 'start',
              background: i === active ? T.ink : '#fff',
              color: i === active ? '#fff' : T.ink,
              border: `1px solid ${i === active ? T.ink : T.line}`,
              borderRadius: 18, padding: d ? 24 : 18, cursor: 'pointer',
              transition: 'background .2s, color .2s',
            }}>
              {p.badge && (
                <div style={{
                  display: 'inline-block', background: T.red, color: '#fff',
                  fontFamily: FONT_UI, fontSize: 10, fontWeight: 700,
                  letterSpacing: 1, textTransform: 'uppercase',
                  padding: '4px 8px', borderRadius: 4, marginBottom: 12,
                }}>{p.badge}</div>
              )}
              <div style={{ fontFamily: FONT_UI, fontSize: d ? 19 : 16, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
              <div style={{
                fontFamily: FONT_UI, fontSize: 13, marginTop: 4,
                color: i === active ? 'rgba(255,255,255,0.6)' : T.muted,
              }}>{p.sub}</div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 0 12px' }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1 }}>RM {p.price}</div>
                <div style={{
                  fontFamily: FONT_UI, fontSize: 13, textDecoration: 'line-through',
                  color: i === active ? 'rgba(255,255,255,0.45)' : T.muted,
                }}>RM {p.was}</div>
              </div>

              <div style={{
                height: 1, background: i === active ? 'rgba(255,255,255,0.12)' : T.line,
                margin: '6px 0 12px',
              }} />

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.incl.map((line, j) => (
                  <li key={j} style={{
                    display: 'flex', gap: 8, alignItems: 'flex-start',
                    fontFamily: FONT_UI, fontSize: 13, lineHeight: 1.4,
                    color: i === active ? 'rgba(255,255,255,0.85)' : T.ink2,
                  }}>
                    <Icon name="check" size={16} color={T.red} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <button onClick={(e) => { e.stopPropagation(); onBook(p); }} style={{
                marginTop: 16, width: '100%', padding: '12px 0', borderRadius: 12,
                background: i === active ? T.red : T.ink, color: '#fff',
                border: 'none', fontFamily: FONT_UI, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>Book this <Icon name="arrowSm" size={14} /></button>
            </div>
          ))}
        </div>

        <div style={{ display: d ? 'none' : 'flex', gap: 6, justifyContent: 'center', marginTop: 4 }}>
          {PACKAGES.map((_, i) => (
            <div key={i} style={{
              width: i === active ? 18 : 6, height: 6, borderRadius: 3,
              background: i === active ? T.ink : T.line, transition: 'all .2s',
            }} />
          ))}
        </div>
      </Section>
    </div>
  );
}

// ───────────────────────────── store (single) ─────────────────────────────
function Stores() {
  const d = useDesktop();
  const s = STORES[0];
  const hours = [
    ['Mon – Fri', '9:00 AM – 7:00 PM'],
    ['Saturday',  '9:00 AM – 6:00 PM'],
    ['Sunday',    'By appointment'],
  ];
  return (
    <Section eyebrow="Visit our workshop" title={<>One garage.<br/>Done properly.</>}>
      <div style={d ? { display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 28, alignItems: 'start' } : {}}>
      <div style={d ? {} : { display: 'contents' }}>
      {/* map card */}
      <div style={{
        position: 'relative', height: d ? 460 : 200, borderRadius: 16, overflow: 'hidden',
        background: T.bg, marginBottom: d ? 0 : 14, border: `1px solid ${T.line}`,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 360 200" preserveAspectRatio="none">
          <rect width="360" height="200" fill="#EAE8E2"/>
          {[...Array(10)].map((_, i) => (
            <line key={i} x1="0" x2="360" y1={20 * i} y2={20 * i} stroke="#DBD8D0" strokeWidth="1"/>
          ))}
          {[...Array(15)].map((_, i) => (
            <line key={i} y1="0" y2="200" x1={25 * i} x2={25 * i} stroke="#DBD8D0" strokeWidth="1"/>
          ))}
          {/* Persiaran Subang main road */}
          <path d="M0 110 Q 90 95, 180 100 T 360 90" stroke="#C8C4BA" strokeWidth="5" fill="none"/>
          <path d="M120 0 Q 130 70, 180 100 Q 240 130, 260 200" stroke="#C8C4BA" strokeWidth="4" fill="none"/>
          <path d="M0 40 L 360 50" stroke="#D4D1C7" strokeWidth="2" fill="none"/>
          {/* park / block fill */}
          <rect x="40" y="130" width="60" height="40" fill="#D7E4D0" rx="4"/>
          <rect x="240" y="20" width="80" height="50" fill="#E1DBC8" rx="4"/>
          <text x="58" y="155" fontFamily="Inter" fontSize="9" fill="#8a8a82">USJ 19 Park</text>
          <text x="245" y="46" fontFamily="Inter" fontSize="9" fill="#8a8a82">Taipan</text>
          <text x="190" y="118" fontFamily="Inter" fontSize="9" fill="#8a8a82" fontStyle="italic">Persiaran Kewajipan</text>
        </svg>
        {/* pin */}
        <div style={{
          position: 'absolute', left: '50%', top: '52%',
          transform: 'translate(-50%, -100%)',
        }}>
          <div style={{
            width: 36, height: 36, background: T.red, borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            border: '2.5px solid #fff',
          }}>
            <div style={{
              width: 10, height: 10, background: '#fff', borderRadius: '50%',
              transform: 'rotate(45deg)',
            }} />
          </div>
        </div>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: '#fff', borderRadius: 999, padding: '6px 12px',
          fontFamily: FONT_UI, fontSize: 11, fontWeight: 600, color: T.ink,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1f8a5b' }} />
          Open now
        </div>
      </div>
      </div>

      {/* right column: details */}
      <div style={d ? {} : { display: 'contents' }}>
      {/* store card */}
      <div style={{
        background: '#fff', border: `1px solid ${T.line}`, borderRadius: 16,
        padding: 18, marginBottom: 14,
      }}>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 26, lineHeight: 1, letterSpacing: 0.4,
          color: T.ink, marginBottom: 4,
        }}>{s.name}</div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginBottom: 12 }}>
          {s.addr}
        </div>

        <div style={{
          display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14,
          fontFamily: FONT_UI, fontSize: 13,
        }}>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center', color: T.ink, fontWeight: 600 }}>
            <Icon name="star" size={14} color={T.yellow} /> {s.rating}
          </span>
          <span style={{ color: T.line }}>•</span>
          <span style={{ color: T.muted }}>(412 reviews)</span>
          <span style={{ color: T.line }}>•</span>
          <span style={{ color: '#1f8a5b', fontWeight: 600 }}>{s.slots}</span>
        </div>

        <div style={{
          borderTop: `1px solid ${T.line}`, paddingTop: 12,
        }}>
          <div style={{
            fontFamily: FONT_UI, fontSize: 11, fontWeight: 700, letterSpacing: 1,
            color: T.muted, textTransform: 'uppercase', marginBottom: 8,
          }}>Operating hours</div>
          {hours.map(([d, t]) => (
            <div key={d} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '6px 0', fontFamily: FONT_UI, fontSize: 13,
            }}>
              <span style={{ color: T.muted }}>{d}</span>
              <span style={{ color: T.ink, fontWeight: 500 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <Btn kind="dark" size="md" icon="arrow" style={{ flex: 1 }}>Get directions</Btn>
        <Btn kind="ghost" size="md" icon="phone" style={{ flex: 1 }}>Call shop</Btn>
      </div>
      </div>
      </div>
    </Section>
  );
}

// ───────────────────────────── reviews ─────────────────────────────
function Reviews() {
  const d = useDesktop();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (d) return;
    const t = setInterval(() => setI(p => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, [d]);

  const card = (r, key) => (
    <div key={key} style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 18, padding: d ? 24 : 20,
    }}>
      <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
        {[...Array(5)].map((_, j) => <Icon key={j} name="star" size={16} color={T.yellow} />)}
      </div>
      <div style={{
        fontFamily: FONT_UI, fontSize: 15, lineHeight: 1.55,
        color: 'rgba(255,255,255,0.92)', minHeight: d ? 'auto' : 110,
      }}>
        "{r.text}"
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginTop: 14,
        paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: T.red,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT_UI, fontWeight: 700, fontSize: 14,
        }}>{r.name[0]}</div>
        <div>
          <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 600 }}>{r.name}</div>
          <div style={{ fontFamily: FONT_UI, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{r.car}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: T.ink, color: '#fff' }}>
      <Section eyebrow="Real reviews" title="4.9 average. 8,000+ cars served." dark>
        {d ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {REVIEWS.map((r, j) => card(r, j))}
          </div>
        ) : (
          <div>
            {card(REVIEWS[i], 'm')}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14 }}>
              {REVIEWS.map((_, j) => (
                <button key={j} onClick={() => setI(j)} style={{
                  width: j === i ? 22 : 6, height: 6, borderRadius: 3, border: 'none', padding: 0,
                  background: j === i ? T.red : 'rgba(255,255,255,0.2)', cursor: 'pointer',
                  transition: 'all .2s',
                }} />
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

// ───────────────────────────── how it works ─────────────────────────────
function HowItWorks() {
  const d = useDesktop();
  const steps = [
    { n: '01', t: 'Tell us your car', s: 'Make, model, year. We find the right parts.' },
    { n: '02', t: 'See the price', s: 'Full breakdown. No hidden fees on arrival.' },
    { n: '03', t: 'Pick a slot', s: 'Same-day or schedule at our USJ19 workshop.' },
    { n: '04', t: 'Drive away clean', s: 'Most jobs in under an hour. Warranty included.' },
  ];
  return (
    <Section eyebrow="How it works" title="From quote to keys, in four steps.">
      <div style={{ display: d ? 'grid' : 'flex', gridTemplateColumns: d ? 'repeat(4, 1fr)' : undefined, flexDirection: d ? undefined : 'column', gap: d ? 16 : 14 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: d ? 'column' : 'row', gap: d ? 10 : 14, alignItems: 'flex-start',
            background: '#fff', border: `1px solid ${T.line}`,
            borderRadius: 14, padding: d ? 24 : 16,
          }}>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: d ? 44 : 32, lineHeight: 1,
              color: T.red, flexShrink: 0, width: 50,
            }}>{s.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_UI, fontSize: d ? 17 : 15, fontWeight: 600, color: T.ink }}>{s.t}</div>
              <div style={{ fontFamily: FONT_UI, fontSize: d ? 14 : 13, color: T.muted, marginTop: d ? 6 : 3, lineHeight: 1.5 }}>{s.s}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ───────────────────────────── about teaser ─────────────────────────────
function AboutSection() {
  const d = useDesktop();
  return (
    <Section eyebrow="About Kaizen" title={<>Trusted car care,<br/>the Kaizen way.</>}>
      <div style={d ? { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'center' } : {}}>
        <div>
          <p style={{
            fontFamily: FONT_UI, fontSize: d ? 17 : 15, lineHeight: 1.65,
            color: T.ink2, margin: '0 0 16px',
          }}>
            Founded in 2023 and based in USJ 19, Subang Jaya, Kaizen Autocare
            provides trusted automotive services for cars and lorries across the
            Klang Valley. From routine maintenance and tyre services to engine
            repairs, gearbox maintenance and suspension diagnostics, we are
            committed to reliable workmanship and honest service.
          </p>
          <p style={{
            fontFamily: FONT_UI, fontSize: d ? 17 : 15, lineHeight: 1.65,
            color: T.ink2, margin: '0 0 24px',
          }}>
            To make vehicle care even more convenient, we also offer
            <strong> Mobile Autocare Services</strong> — bringing selected
            maintenance and inspection directly to your home or workplace.
          </p>
          <a href="About Us.html" style={{ textDecoration: 'none' }}>
            <Btn kind="dark" size="lg" icon="arrow">Read more about us</Btn>
          </a>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
          marginTop: d ? 0 : 24,
        }}>
          {[
            ['2023', 'Founded'],
            ['USJ 19', 'Subang Jaya'],
            ['Cars + lorries', 'We service'],
            ['Mobile', 'Service available'],
          ].map(([n, l], i) => (
            <div key={i} style={{
              background: i === 0 ? T.ink : '#fff', color: i === 0 ? '#fff' : T.ink,
              border: `1px solid ${i === 0 ? T.ink : T.line}`,
              borderRadius: 14, padding: d ? '22px 20px' : '18px 16px',
            }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 30 : 24, lineHeight: 1, color: i === 0 ? '#fff' : T.red }}>{n}</div>
              <div style={{ fontFamily: FONT_UI, fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.6)' : T.muted, marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ───────────────────────────── mobile service promo ─────────────────────────────
function MobilePromo() {
  const d = useDesktop();
  return (
    <div style={{ padding: d ? '24px 32px' : '8px 16px 24px', background: T.bg }}>
      <a href="Mobile Car Service.html" style={{ textDecoration: 'none', display: 'block', maxWidth: d ? 1180 : 'none', margin: '0 auto' }}>
        <div style={{
          position: 'relative', overflow: 'hidden', borderRadius: 20,
          background: T.ink, color: '#fff', padding: d ? 36 : 20,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: `repeating-linear-gradient(115deg, ${T.red} 0 18px, transparent 18px 60px)` }} />
          <div style={{ position: 'relative', flex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, background: T.red,
              borderRadius: 999, padding: '4px 10px', fontFamily: FONT_UI, fontSize: 10,
              fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10,
            }}>New</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 40 : 28, lineHeight: 0.95, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Can't come to us?<br/>We'll come to you.
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: d ? 15 : 13, color: 'rgba(255,255,255,0.65)', marginTop: 8, maxWidth: d ? 420 : 220 }}>
              Book a mobile oil service at your home or office — anywhere around USJ &amp; Subang Jaya.
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: d ? 15 : 13, fontWeight: 600, color: T.red, marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Schedule a visit <Icon name="arrowSm" size={14} color={T.red} />
            </div>
          </div>
          <div style={{ position: 'relative', flexShrink: 0, width: d ? 96 : 64, height: d ? 96 : 64, borderRadius: 16, background: T.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={d ? 48 : 34} height={d ? 48 : 34} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="12" height="9" rx="1"/><path d="M14 10h4l3 3v3h-7M2 16h12"/><circle cx="6" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>
          </div>
        </div>
      </a>
    </div>
  );
}

// ───────────────────────────── CTA banner ─────────────────────────────
function CtaBanner({ onBook }) {
  const d = useDesktop();
  return (
    <div style={{ padding: d ? '32px 32px 48px' : '12px 16px 28px' }}>
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: T.red, color: '#fff', borderRadius: 22,
        padding: d ? '64px 56px' : '28px 22px',
        maxWidth: d ? 1180 : 'none', margin: '0 auto',
        display: d ? 'flex' : 'block', alignItems: 'center', justifyContent: 'space-between', gap: 32,
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: `repeating-linear-gradient(115deg, #fff 0 18px, transparent 18px 60px)`,
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: FONT_UI, fontSize: 11, letterSpacing: 2,
            fontWeight: 700, textTransform: 'uppercase', marginBottom: 8,
            opacity: 0.85,
          }}>Ready when you are</div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: d ? 60 : 40, lineHeight: 0.9,
            textTransform: 'uppercase', marginBottom: d ? 0 : 16,
          }}>Your car deserves<br/>better than guessing.</div>
        </div>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Btn kind="light" size="lg" icon="arrow" onClick={onBook}>Book your service</Btn>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────── footer ─────────────────────────────
function Footer() {
  const d = useDesktop();
  const links = [
    ['Services', ['Car & lorry maintenance', 'Tyre service', 'Engine repairs', 'Gearbox maintenance', 'Suspension', 'Mobile oil service']],
    ['Company', ['About Kaizen', 'Our Workshop', 'Careers', 'Press', 'Contact']],
    ['Help', ['FAQ', 'Warranty', 'Booking policy', 'Terms', 'Privacy']],
  ];
  const [open, setOpen] = useState(0);

  if (d) {
    return (
      <footer style={{ background: T.ink, color: '#fff', padding: '64px 32px 40px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40 }}>
            <div>
              <img src="assets/logo.png" alt="Kaizen Autocare"
                style={{ height: 44, marginBottom: 18, filter: 'brightness(0) invert(1)' }} />
              <p style={{
                fontFamily: FONT_UI, fontSize: 14, lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)', margin: '0 0 22px', maxWidth: 320,
              }}>
                Kaizen Autocare — neighbourhood car care, modernised.
                Built in Malaysia for Malaysian drivers, at USJ19 Subang Jaya.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {['whatsapp', 'phone'].map((ic, i) => (
                  <button key={i} style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><Icon name={ic} size={18} /></button>
                ))}
              </div>
            </div>
            {links.map(([title, items], i) => (
              <div key={i}>
                <div style={{
                  fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1,
                  textTransform: 'uppercase', color: '#fff', marginBottom: 16,
                }}>{title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {items.map((l, j) => (
                    <a key={j} href="#" style={{
                      fontFamily: FONT_UI, fontSize: 14,
                      color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    }}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)',
            fontFamily: FONT_UI, fontSize: 12, color: 'rgba(255,255,255,0.4)',
            display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
          }}>
            <span>© 2026 Kaizen Autocare Sdn Bhd · All rights reserved</span>
            <span>Original concept design — not affiliated with any other brand.</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer style={{ background: T.ink, color: '#fff', padding: '32px 20px 100px' }}>
      <img src="assets/logo.png" alt="Kaizen Autocare"
        style={{ height: 36, marginBottom: 16, filter: 'brightness(0) invert(1)' }}
      />
      <p style={{
        fontFamily: FONT_UI, fontSize: 13, lineHeight: 1.55,
        color: 'rgba(255,255,255,0.6)', margin: '0 0 22px', maxWidth: 300,
      }}>
        Kaizen Autocare — neighbourhood car care, modernised.
        Built in Malaysia for Malaysian drivers.
      </p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        {['whatsapp', 'phone'].map((ic, i) => (
          <button key={i} style={{
            width: 42, height: 42, borderRadius: 12,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name={ic} size={18} /></button>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        {links.map(([title, items], i) => (
          <div key={i}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '16px 0',
              background: 'transparent', border: 'none', color: '#fff',
              fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
              {title}
              <Icon name="chev" size={16} color="rgba(255,255,255,0.5)"
                style={{ transform: open === i ? 'rotate(90deg)' : 'none' }} />
            </button>
            {open === i && (
              <div style={{ padding: '4px 0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((l, j) => (
                  <a key={j} href="#" style={{
                    fontFamily: FONT_UI, fontSize: 13,
                    color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
                  }}>{l}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.1)',
        fontFamily: FONT_UI, fontSize: 11, color: 'rgba(255,255,255,0.4)',
        lineHeight: 1.6,
      }}>
        © 2026 Kaizen Autocare Sdn Bhd · All rights reserved<br/>
        Original concept design — not affiliated with any other brand.
      </div>
    </footer>
  );
}

// ───────────────────────────── bottom nav ─────────────────────────────
function BottomNav({ active, setActive, onBook }) {
  const items = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'services', icon: 'grid', label: 'Services' },
    { id: 'book', icon: 'cal', label: 'Book', primary: true },
    { id: 'stores', icon: 'pin', label: 'Visit' },
    { id: 'me', icon: 'user', label: 'Account' },
  ];
  return (
    <div style={{
      position: 'sticky', bottom: 0, zIndex: 30,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderTop: `1px solid ${T.line}`,
      padding: '8px 8px max(8px, env(safe-area-inset-bottom))',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    }}>
      {items.map(it => {
        const isActive = active === it.id;
        if (it.primary) {
          return (
            <button key={it.id} onClick={onBook} style={{
              background: T.red, color: '#fff', border: 'none',
              width: 56, height: 56, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', marginTop: -28,
              boxShadow: `0 8px 18px ${T.red}66`,
            }}><Icon name={it.icon} size={22} /></button>
          );
        }
        return (
          <button key={it.id} onClick={() => setActive(it.id)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isActive ? T.ink : T.muted, padding: '4px 8px',
            flex: 1,
          }}>
            <Icon name={it.icon} size={20} />
            <span style={{ fontFamily: FONT_UI, fontSize: 10, fontWeight: 600 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ───────────────────────────── booking sheet ─────────────────────────────
function BookingSheet({ open, onClose, presetService }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ service: presetService || 'maint', store: 0, date: 'Today', time: '10:30 AM', name: '', phone: '' });

  useEffect(() => {
    if (open) {
      setStep(0);
      setData(d => ({ ...d, service: presetService || d.service }));
    }
  }, [open, presetService]);

  if (!open) return null;

  const steps = ['Service', 'Workshop', 'Time', 'Details', 'Done'];

  const next = () => setStep(s => Math.min(s + 1, 4));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  // Confirm step → write a pending appointment into the shared Portal DB.
  const confirm = () => {
    try {
      if (window.KaizenData) {
        window.KaizenData.bookAppointment({
          name: data.name,
          phone: data.phone,
          service: SERVICES.find(s => s.id === data.service)?.name || data.service,
          dateLabel: data.date,
          time: data.time,
          notes: `Workshop: ${STORES[data.store]?.name || ''}`,
        });
      }
    } catch (e) { /* non-blocking: still show confirmation */ }
    next();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 440, maxHeight: '92%', background: '#fff',
        borderRadius: '24px 24px 0 0', display: 'flex', flexDirection: 'column',
        animation: 'slideUp .25s ease-out',
      }}>
        {/* drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 40, height: 4, background: T.line, borderRadius: 2 }} />
        </div>

        {/* header */}
        <div style={{
          padding: '8px 20px 16px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${T.line}`,
        }}>
          <div>
            <div style={{ fontFamily: FONT_UI, fontSize: 11, color: T.muted, letterSpacing: 1, fontWeight: 600 }}>
              STEP {step + 1} OF 5
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, marginTop: 2 }}>{steps[step]}</div>
          </div>
          <button onClick={onClose} style={{
            background: T.bg, border: 'none', width: 36, height: 36, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}><Icon name="close" size={18} /></button>
        </div>

        {/* progress */}
        <div style={{ display: 'flex', gap: 4, padding: '12px 20px 0' }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? T.red : T.line, transition: 'background .2s',
            }} />
          ))}
        </div>

        {/* body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {step === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SERVICES.slice(0, 6).map(s => {
                const a = data.service === s.id;
                return (
                  <button key={s.id} onClick={() => setData({ ...data, service: s.id })} style={{
                    padding: 14, borderRadius: 14,
                    border: `1.5px solid ${a ? T.red : T.line}`,
                    background: a ? '#fff5f4' : '#fff',
                    textAlign: 'left', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', gap: 10,
                  }}>
                    <Icon name={s.icon} size={22} color={a ? T.red : T.ink} />
                    <div>
                      <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: 13, lineHeight: 1.2 }}>{s.name}</div>
                      <div style={{ fontFamily: FONT_UI, fontSize: 11, color: T.muted, marginTop: 3, lineHeight: 1.3 }}>{s.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STORES.map((s, i) => {
                const a = data.store === i;
                return (
                  <button key={i} onClick={() => setData({ ...data, store: i })} style={{
                    padding: 14, borderRadius: 14,
                    border: `1.5px solid ${a ? T.red : T.line}`,
                    background: a ? '#fff5f4' : '#fff',
                    textAlign: 'left', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: a ? T.red : T.bg, color: a ? '#fff' : T.ink,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><Icon name="pin" size={18} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginTop: 1 }}>
                        {s.area} · {s.dist}
                      </div>
                    </div>
                    {a && <Icon name="check" size={18} color={T.red} />}
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Date</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', margin: '0 -20px 20px', padding: '0 20px' }}>
                {['Today', 'Tomorrow', 'Sat 9', 'Sun 10', 'Mon 11', 'Tue 12'].map(d => {
                  const a = data.date === d;
                  return (
                    <button key={d} onClick={() => setData({ ...data, date: d })} style={{
                      flexShrink: 0, padding: '12px 18px', borderRadius: 12,
                      border: `1.5px solid ${a ? T.ink : T.line}`,
                      background: a ? T.ink : '#fff', color: a ? '#fff' : T.ink,
                      fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}>{d}</button>
                  );
                })}
              </div>

              <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Time slot</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'].map(t => {
                  const a = data.time === t;
                  return (
                    <button key={t} onClick={() => setData({ ...data, time: t })} style={{
                      padding: '12px 8px', borderRadius: 10,
                      border: `1.5px solid ${a ? T.red : T.line}`,
                      background: a ? T.red : '#fff', color: a ? '#fff' : T.ink,
                      fontFamily: FONT_UI, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}>{t}</button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label>
                <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 6 }}>Your name</div>
                <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
                  placeholder="Full name"
                  style={{
                    width: '100%', boxSizing: 'border-box', padding: 14,
                    borderRadius: 12, border: `1.5px solid ${T.line}`,
                    fontFamily: FONT_UI, fontSize: 15, outline: 'none',
                  }} />
              </label>
              <label>
                <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginBottom: 6 }}>Mobile</div>
                <input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })}
                  placeholder="+60 12 345 6789"
                  style={{
                    width: '100%', boxSizing: 'border-box', padding: 14,
                    borderRadius: 12, border: `1.5px solid ${T.line}`,
                    fontFamily: FONT_UI, fontSize: 15, outline: 'none',
                  }} />
              </label>

              <div style={{
                background: T.bg, borderRadius: 14, padding: 16, marginTop: 4,
              }}>
                <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 10, letterSpacing: 1 }}>YOUR BOOKING</div>
                {[
                  ['Service', SERVICES.find(s => s.id === data.service)?.name],
                  ['Workshop', STORES[data.store].name],
                  ['When', `${data.date}, ${data.time}`],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display: 'flex', justifyContent: 'space-between', padding: '6px 0',
                    fontFamily: FONT_UI, fontSize: 13,
                  }}>
                    <span style={{ color: T.muted }}>{k}</span>
                    <span style={{ fontWeight: 600, color: T.ink }}>{v}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: T.line, margin: '8px 0' }} />
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: FONT_UI,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Pricing</span>
                  <span style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, color: T.red }}>
                    Free quote on inspection
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{
                width: 76, height: 76, borderRadius: '50%',
                background: '#1f8a5b', color: '#fff', margin: '0 auto 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="check" size={36} stroke={2.5} />
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 1, marginBottom: 8 }}>
                Booking confirmed
              </div>
              <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, lineHeight: 1.5, marginBottom: 18 }}>
                We've sent confirmation to your phone.<br/>See you {data.date.toLowerCase()} at {data.time}.
              </div>
              <div style={{
                background: T.bg, borderRadius: 14, padding: 16, textAlign: 'left', marginBottom: 16,
              }}>
                <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, letterSpacing: 1 }}>BOOKING #KZN-{Math.floor(Math.random() * 9000 + 1000)}</div>
                <div style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 600 }}>{SERVICES.find(s => s.id === data.service)?.name}</div>
                <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 2 }}>
                  {STORES[data.store].name} · {data.date}, {data.time}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* footer actions */}
        <div style={{
          padding: '14px 20px max(14px, env(safe-area-inset-bottom))',
          borderTop: `1px solid ${T.line}`,
          display: 'flex', gap: 10,
        }}>
          {step > 0 && step < 4 && (
            <Btn kind="ghost" size="md" onClick={prev}>Back</Btn>
          )}
          {step < 3 && (
            <Btn kind="dark" size="md" full icon="arrow" onClick={next}>Continue</Btn>
          )}
          {step === 3 && (
            <Btn kind="primary" size="md" full icon="check" onClick={confirm}>Confirm booking</Btn>
          )}
          {step === 4 && (
            <Btn kind="dark" size="md" full onClick={onClose}>Done</Btn>
          )}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────── menu drawer ─────────────────────────────
function MenuDrawer({ open, onClose }) {
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
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)', display: 'flex',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '85%', maxWidth: 320, background: T.ink, color: '#fff',
        height: '100%', padding: '20px 24px',
        animation: 'slideRight .25s ease-out',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <img src="assets/logo.png" alt="Kaizen" style={{ height: 30, filter: 'brightness(0) invert(1)' }} />
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff',
            width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="close" size={18} /></button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((it, i) => (
            <a key={i} href={it.href || '#'} onClick={onClose} style={{
              padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
              fontFamily: FONT_DISPLAY, fontSize: 28, color: it.accent ? T.red : '#fff',
              textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              {it.label}
              <Icon name="chev" size={18} color={it.accent ? T.red : 'rgba(255,255,255,0.4)'} />
            </a>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          <Btn kind="primary" size="lg" full icon="phone">Call us · 03-1234 5678</Btn>
          <div style={{
            fontFamily: FONT_UI, fontSize: 11, color: 'rgba(255,255,255,0.4)',
            marginTop: 16, lineHeight: 1.5,
          }}>
            Operating hours: Mon–Sat 9am–7pm<br/>Sunday by appointment
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────── App ─────────────────────────────
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [book, setBook] = useState(false);
  const [presetSvc, setPresetSvc] = useState(null);
  const [tab, setTab] = useState('home');
  const [desktop, setDesktop] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);
  const ref = useRef();

  useEffect(() => {
    const onResize = () => setDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 8);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [desktop]);

  const openBook = (svc) => {
    if (svc?.id) setPresetSvc(svc.id);
    else setPresetSvc(null);
    setBook(true);
  };

  return (
    <DeviceCtx.Provider value={desktop}>
    <div style={desktop
      ? { width: '100%', height: '100%', background: '#fff' }
      : { width: '100%', height: '100%', display: 'flex', justifyContent: 'center', background: '#1f1f24' }}>
      <div ref={ref} style={desktop ? {
        width: '100%', height: '100%', background: '#fff',
        overflowY: 'auto', overflowX: 'hidden', position: 'relative', scrollBehavior: 'smooth',
      } : {
        width: '100%', maxWidth: 440, height: '100%', background: '#fff',
        overflowY: 'auto', overflowX: 'hidden', position: 'relative',
        boxShadow: '0 0 60px rgba(0,0,0,0.4)',
        scrollBehavior: 'smooth',
      }}>
        <Header onMenu={() => setMenu(true)} scrolled={scrolled} onBook={() => openBook()} />
        <Hero onBook={() => openBook()} />
        {!desktop && <QuickBook onBook={() => openBook()} />}
        <ServicesGrid onPick={(s) => openBook(s)} />
        <MobilePromo />
        <TrustStrip />
        <AboutSection />
        <HowItWorks />
        <Stores />
        <Reviews />
        <CtaBanner onBook={() => openBook()} />
        <Footer />
        {!desktop && <BottomNav active={tab} setActive={setTab} onBook={() => openBook()} />}
      </div>

      <MenuDrawer open={menu} onClose={() => setMenu(false)} />
      <BookingSheet open={book} onClose={() => setBook(false)} presetService={presetSvc} />
    </div>
    </DeviceCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
