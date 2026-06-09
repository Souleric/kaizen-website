// Kaizen Autocare — About Us page (responsive)

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
    case 'pin': return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'tag': return <svg {...p}><path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="8" cy="8" r="1.5" fill={color}/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'badge': return <svg {...p}><path d="M12 2l2.5 2.5L18 4l1 3.5L21.5 10 20 13l1.5 3-2.5 1.5L18 20l-3.5-.5L12 22l-2.5-2.5L6 20l-1-3.5L2.5 14 4 11 2.5 8 5 6.5 6 4l3.5.5z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'truck': return <svg {...p}><path d="M2 6h11v9H2zM13 9h4l4 3v3h-8z"/><circle cx="6.5" cy="17" r="1.6"/><circle cx="17.5" cy="17" r="1.6"/></svg>;
    case 'phone': return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
    default: return null;
  }
};

const VALUES = [
  { icon: 'tag', t: 'Honest service', s: 'Clear quotes and no surprise add-ons. You approve before we begin.' },
  { icon: 'badge', t: 'Reliable workmanship', s: 'Genuine parts and certified technicians on every job, big or small.' },
  { icon: 'truck', t: 'Cars & lorries', s: 'From family cars to commercial lorries — we service them all.' },
  { icon: 'shield', t: 'Warranty backed', s: 'Parts and labour covered, so you drive away with confidence.' },
];

const SERVICES = [
  'Routine maintenance', 'Tyre services', 'Engine repairs',
  'Gearbox maintenance', 'Suspension diagnostics', 'Mobile oil service',
];

const WHY = [
  'Professional servicing for cars and lorries',
  'Experienced diagnostics and troubleshooting',
  'Engine and gearbox maintenance expertise',
  'Tyre inspection, replacement and balancing',
  'Convenient mobile servicing at your home or workplace',
  'Honest recommendations and transparent pricing',
  'Dedicated customer support and after-service care',
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
                  const active = it.label === 'About';
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
          position: 'relative', overflow: 'hidden', background: T.ink, color: '#fff',
          padding: d ? '80px 0 96px' : '40px 0 48px',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, opacity: 0.07,
            backgroundImage: `repeating-linear-gradient(115deg, ${T.red} 0 22px, transparent 22px 80px)`,
          }} />
          <div aria-hidden style={{
            position: 'absolute', top: d ? -160 : -80, right: d ? -120 : -60,
            width: d ? 520 : 260, height: d ? 520 : 260, borderRadius: '50%',
            background: `radial-gradient(circle, ${T.red}55, transparent 60%)`,
          }} />
          <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 999, padding: '5px 12px',
              fontFamily: FONT_UI, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, marginBottom: 18,
            }}>
              <Icon name="pin" size={13} /> USJ 19, Subang Jaya · Est. 2023
            </div>
            <h1 style={{
              fontFamily: FONT_DISPLAY, fontSize: d ? 84 : 52, lineHeight: 0.9,
              margin: 0, fontWeight: 400, letterSpacing: 0.5, textTransform: 'uppercase',
              maxWidth: 760,
            }}>
              Your trusted automotive <span style={{ color: T.red }}>partner in Klang Valley.</span>
            </h1>
          </div>
        </div>

        {/* write-up */}
        <section style={{ padding: d ? '72px 0' : '36px 0', background: '#fff' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', padding: PAD }}>
            {[
              'Founded in 2023, Kaizen Autocare started with a simple vision — to provide reliable, professional, and customer-focused automotive services for vehicle owners across the Klang Valley.',
              'Based in USJ 19, Subang Jaya, we began our journey humbly, serving local customers with honest workmanship, transparent advice, and a commitment to keeping vehicles running at their best. Through dedication to quality service and customer satisfaction, Kaizen Autocare has grown to become a trusted automotive service provider for both private vehicle owners and commercial fleets throughout the region.',
              'Our expertise covers a wide range of automotive services, including car and lorry maintenance, tyre services, engine repairs, gearbox maintenance, and diagnosis of suspension and unusual vehicle noises. Whether it\u2019s routine servicing or resolving complex mechanical issues, our team is committed to delivering solutions that are effective, reliable, and cost-efficient.',
              'As part of our commitment to making vehicle care more convenient, we are also expanding into Mobile Autocare Services. This allows our technicians to provide selected maintenance and inspection services directly at your home, office, or business premises, saving you valuable time and eliminating the hassle of travelling to a workshop.',
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: FONT_UI, fontSize: d ? 18 : 15, lineHeight: 1.75, color: T.ink2,
                margin: i === 0 ? '0 0 20px' : '0 0 20px',
              }}>{para}</p>
            ))}

            {/* Kaizen meaning pull-quote */}
            <div style={{
              borderLeft: `4px solid ${T.red}`, paddingLeft: d ? 24 : 16, margin: d ? '12px 0' : '8px 0',
            }}>
              <p style={{
                fontFamily: FONT_DISPLAY, fontSize: d ? 30 : 22, lineHeight: 1.1, letterSpacing: 0.4,
                color: T.ink, margin: 0, textTransform: 'uppercase',
              }}>
                The name Kaizen represents our belief in continuous improvement.
              </p>
              <p style={{
                fontFamily: FONT_UI, fontSize: d ? 16 : 14, lineHeight: 1.6, color: T.muted, margin: '12px 0 0',
              }}>
                We constantly refine our skills, processes, and customer experience to ensure that
                every vehicle receives the highest level of care and attention. At Kaizen Autocare, we
                don\u2019t just repair vehicles — we build long-term relationships based on trust,
                reliability, and service excellence.
              </p>
            </div>
          </div>
        </section>

        {/* why choose */}
        <section style={{ padding: d ? '72px 0' : '36px 0', background: T.ink, color: '#fff' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <div style={{ fontFamily: FONT_UI, fontSize: d ? 12 : 11, letterSpacing: 2, fontWeight: 700, color: T.red, textTransform: 'uppercase', marginBottom: 8 }}>Why choose us</div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 48 : 32, lineHeight: 0.95, margin: d ? '0 0 36px' : '0 0 22px', fontWeight: 400, textTransform: 'uppercase' }}>Why choose Kaizen Autocare?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: d ? 'repeat(2, 1fr)' : '1fr', gap: 12 }}>
              {WHY.map((w, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12, padding: d ? '18px 20px' : '14px 16px',
                }}>
                  <div style={{
                    width: 32, height: 32, flexShrink: 0, borderRadius: 8,
                    background: T.red, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><Icon name="check" size={18} stroke={2.2} /></div>
                  <span style={{ fontFamily: FONT_UI, fontSize: d ? 16 : 14, fontWeight: 500, color: '#fff' }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* values */}
        <section style={{ padding: d ? '72px 0' : '36px 0', background: T.bg }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <div style={{ fontFamily: FONT_UI, fontSize: d ? 12 : 11, letterSpacing: 2, fontWeight: 700, color: T.red, textTransform: 'uppercase', marginBottom: 8 }}>What we stand for</div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 48 : 32, lineHeight: 0.95, margin: d ? '0 0 36px' : '0 0 22px', fontWeight: 400, textTransform: 'uppercase' }}>The Kaizen promise</h2>
            <div style={{ display: 'grid', gridTemplateColumns: d ? 'repeat(4, 1fr)' : '1fr', gap: 16 }}>
              {VALUES.map((v, i) => (
                <div key={i} style={{
                  background: '#fff', border: `1px solid ${T.line}`, borderRadius: 16,
                  padding: 24, display: 'flex', flexDirection: d ? 'column' : 'row',
                  gap: 14, alignItems: d ? 'flex-start' : 'center',
                }}>
                  <div style={{
                    width: 52, height: 52, flexShrink: 0, background: T.red, borderRadius: 12, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><Icon name={v.icon} size={26} /></div>
                  <div>
                    <div style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: 17, color: T.ink }}>{v.t}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, marginTop: 6, lineHeight: 1.5 }}>{v.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* services list */}
        <section style={{ padding: d ? '72px 0' : '36px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: PAD }}>
            <div style={d ? { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center' } : {}}>
              <div>
                <div style={{ fontFamily: FONT_UI, fontSize: d ? 12 : 11, letterSpacing: 2, fontWeight: 700, color: T.red, textTransform: 'uppercase', marginBottom: 8 }}>Our services</div>
                <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 48 : 32, lineHeight: 0.95, margin: d ? '0 0 16px' : '0 0 16px', fontWeight: 400, textTransform: 'uppercase' }}>Everything your<br/>vehicle needs.</h2>
                <p style={{ fontFamily: FONT_UI, fontSize: d ? 16 : 14, lineHeight: 1.6, color: T.muted, margin: '0 0 24px', maxWidth: 360 }}>
                  Workshop and mobile services for both private and commercial vehicles.
                </p>
                <a href="Kaizen Autocare.html" style={{ textDecoration: 'none' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: T.red, color: '#fff', borderRadius: 999,
                    padding: '14px 22px', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600,
                  }}>Book a service <Icon name="arrow" size={16} /></span>
                </a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: d ? 0 : 24 }}>
                {SERVICES.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: T.bg, borderRadius: 12, padding: '14px 16px',
                    fontFamily: FONT_UI, fontSize: d ? 15 : 13, fontWeight: 500, color: T.ink,
                  }}>
                    <Icon name="check" size={18} color={T.red} /> {s}
                  </div>
                ))}
              </div>
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
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, background: T.red,
                    borderRadius: 999, padding: '4px 10px', fontFamily: FONT_UI, fontSize: 10,
                    fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10,
                  }}>Mobile Autocare</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: d ? 40 : 28, lineHeight: 0.95, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                    We'll come to you.
                  </div>
                  <div style={{ fontFamily: FONT_UI, fontSize: d ? 15 : 13, color: 'rgba(255,255,255,0.65)', marginTop: 8, maxWidth: 460, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    Book a mobile service at your home or workplace <Icon name="arrow" size={14} color="#fff" />
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
                USJ 19, Subang Jaya, Selangor · Mon–Sat 9am–7pm<br/>
                © 2026 Kaizen Autocare Sdn Bhd
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: d ? 0 : 18 }}>
              <a href="tel:0312345678" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: T.red, color: '#fff', borderRadius: 999, padding: '12px 18px',
                fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}><Icon name="phone" size={16} /> 03-1234 5678</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
