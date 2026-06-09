/* ───────────────────────────────────────────────────────────────────────────
   Kaizen Autocare — Shared Data Bridge
   ---------------------------------------------------------------------------
   The public marketing site (this folder) and the admin Portal (/portal/) are
   served from the SAME origin, so they share localStorage. The Portal is the
   single source of truth — all data lives under `kaizen_portal_db`. This module
   lets the public site read/write that exact same store, so anything the public
   site captures (logins, bookings, …) shows up in the admin Portal.

   The Portal seeds + migrates this DB on its own; the INITIAL_DATA below is just
   a fallback so the public site still works if it loads before the Portal ever
   has. Keep the shape in sync with portal/index.html → INITIAL_DATA.

   Features are wired one by one — see the "TODO (wire next)" markers below.
   ─────────────────────────────────────────────────────────────────────────── */
(function (global) {
  'use strict';

  const DB_KEY = 'kaizen_portal_db';        // shared with the Portal
  const SESSION_KEY = 'kaizen_user';        // shared session the Portal restores
  const PORTAL_URL = 'portal/';             // relative to the site root

  // Fallback seed — mirrors portal/index.html INITIAL_DATA (post-migration).
  const INITIAL_DATA = {
    users: [
      { id: 'u1', username: 'admin', password: '123', role: 'master_admin', displayName: 'Admin' },
      { id: 'u2', username: 'cust', password: '123', role: 'customer', customerId: 'c1' }
    ],
    customers: [
      { id: 'c1', name: 'Alex Tan', email: 'alex.tan@email.com', phone: '+60 12-345 6789', address: 'Petaling Jaya, Selangor', createdAt: '2024-01-15' }
    ],
    cars: [
      { id: 'car1', customerId: 'c1', make: 'Volkswagen', model: 'Tiguan', year: '2021', plateNumber: 'WXY 1234', color: 'Silver' }
    ],
    services: [],
    appointments: [],
    nextServices: [],
    serviceTypes: ['Oil Change','Brake Service','Tyre Rotation','Air Filter','Transmission Service','Battery Check','Air Conditioning','Full Service','Inspection','Others'],
    carModels: [
      { id: 'cm1', brand: 'Toyota', model: 'Camry' },
      { id: 'cm2', brand: 'Toyota', model: 'Vios' },
      { id: 'cm3', brand: 'Honda', model: 'Civic' },
      { id: 'cm4', brand: 'Honda', model: 'HR-V' },
      { id: 'cm5', brand: 'Perodua', model: 'Myvi' },
      { id: 'cm6', brand: 'Perodua', model: 'Axia' },
      { id: 'cm7', brand: 'Proton', model: 'X50' },
      { id: 'cm8', brand: 'Volkswagen', model: 'Tiguan' }
    ]
  };

  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = (prefix) => prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const normPhone = (p) => (p || '').replace(/\D/g, '');

  // ── DB access ─────────────────────────────────────────────────────────────
  function getDB() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      return raw ? JSON.parse(raw) : clone(INITIAL_DATA);
    } catch (e) {
      return clone(INITIAL_DATA);
    }
  }

  function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  // ── Auth (shared with the Portal) ──────────────────────────────────────────
  // Accepts a staff username (e.g. "admin") OR a customer's phone number.
  function login(identifier, password) {
    const db = getDB();
    const id = (identifier || '').trim();
    if (!id || !password) return null;

    // 1) staff/user match by username
    let user = db.users.find(u => u.username === id && u.password === password);

    // 2) customer match by phone → linked user account
    if (!user) {
      const cust = db.customers.find(c => normPhone(c.phone) === normPhone(id));
      if (cust) user = db.users.find(u => u.customerId === cust.id && u.password === password);
    }
    return user || null;
  }

  function setSession(user) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
  function getSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; } }
  function isLoggedIn() { return !!getSession(); }
  function logout() { sessionStorage.removeItem(SESSION_KEY); }
  function gotoPortal() { global.location.href = PORTAL_URL; }

  // Best friendly name for the current session: staff displayName, else the
  // linked customer's name, else the username.
  function currentName() {
    const u = getSession();
    if (!u) return '';
    if (u.displayName) return u.displayName;
    if (u.customerId) {
      const c = getDB().customers.find(c => c.id === u.customerId);
      if (c && c.name) return c.name;
    }
    return u.username || '';
  }

  // ── Public bookings → Portal appointments ──────────────────────────────────
  // Resolve the booking sheet's date labels ("Today", "Tomorrow", "Sat 9") to a
  // real YYYY-MM-DD the Portal can render with formatDate().
  function resolveDate(label) {
    const pad = (n) => String(n).padStart(2, '0');
    const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const now = new Date();
    if (!label || /today/i.test(label)) return iso(now);
    if (/tomorrow/i.test(label)) { const d = new Date(now); d.setDate(d.getDate() + 1); return iso(d); }
    const m = String(label).match(/(\d{1,2})/);
    if (m) {
      const day = parseInt(m[1], 10);
      let d = new Date(now.getFullYear(), now.getMonth(), day);
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (d < today) d = new Date(now.getFullYear(), now.getMonth() + 1, day); // roll to next month
      return iso(d);
    }
    return iso(now);
  }

  // Match an existing customer by phone, or create a lightweight lead record.
  function findOrCreateCustomer(db, name, phone, email) {
    const key = normPhone(phone);
    let cust = key && db.customers.find(c => normPhone(c.phone) === key);
    if (!cust) {
      cust = {
        id: uid('c'),
        name: name || 'Website Lead',
        email: email || '',
        phone: phone || '',
        address: '',
        createdAt: new Date().toISOString().slice(0, 10)
      };
      db.customers.push(cust);
    } else {
      if (name && (!cust.name || cust.name === 'Website Lead')) cust.name = name; // fill a real name on a returning lead
      if (email && !cust.email) cust.email = email;
    }
    return cust;
  }

  // Primary entry point for the public booking flow. Creates/links a customer and
  // pushes a pending appointment the admin Portal picks up under "Pending Appointments".
  // `service` is the human service NAME (e.g. "Minor Service"), `dateLabel` is the
  // booking sheet label, `time` is the requested slot.
  function bookAppointment(opts) {
    opts = opts || {};
    const db = getDB();
    const cust = findOrCreateCustomer(db, opts.name, opts.phone, opts.email);
    const appt = {
      id: uid('appt'),
      customerId: cust.id,
      carId: '',
      type: opts.service || 'General Service',
      date: resolveDate(opts.dateLabel),
      notes: [
        opts.time ? `Requested ${opts.dateLabel || 'Today'} at ${opts.time}` : '',
        opts.notes || ''
      ].filter(Boolean).join(' — '),
      status: 'pending',
      source: 'website',
      createdAt: new Date().toISOString()
    };
    db.appointments.push(appt);
    saveDB(db);
    return { appointment: appt, customer: cust };
  }

  // Low-level: push a raw appointment object (already shaped).
  function addAppointment(data) {
    const db = getDB();
    const appt = Object.assign({
      id: uid('appt'), status: 'pending', source: 'website', createdAt: new Date().toISOString()
    }, data);
    db.appointments.push(appt);
    saveDB(db);
    return appt;
  }

  // TODO (wire next): register a customer + user from the Contact "Create an account" flow.

  // ── Auth-aware header badge ────────────────────────────────────────────────
  // Every public page renders a round "Client login" link (title="Client login")
  // that points to Login.html. When a session exists, upgrade those links in place
  // to point at the Portal and show the user's initial. Selecting by the original
  // title means each link is only upgraded once, and any link React re-renders
  // (resize, menu toggle) is re-caught by the observer below.
  function enhanceAuthLinks() {
    if (typeof document === 'undefined' || !isLoggedIn()) return;
    const name = currentName();
    const initial = name ? name.charAt(0).toUpperCase() : '·';
    document.querySelectorAll('a[title="Client login"]').forEach((a) => {
      a.setAttribute('href', PORTAL_URL);
      a.setAttribute('title', 'Signed in' + (name ? ' as ' + name : '') + ' — open your portal');
      a.innerHTML = '<span style="font-family:\'Inter\',-apple-system,sans-serif;font-weight:700;font-size:15px;line-height:1;color:#15171A">' + initial + '</span>';
    });
  }

  function initAuthBadge() {
    if (typeof document === 'undefined') return;
    enhanceAuthLinks();
    // React mounts after this script, so watch for the links appearing/re-rendering.
    if (typeof MutationObserver !== 'undefined') {
      const obs = new MutationObserver(() => enhanceAuthLinks());
      obs.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAuthBadge);
    } else {
      initAuthBadge();
    }
  }

  function authLink() {
    const authed = isLoggedIn();
    const name = authed ? currentName() : '';
    return {
      authed,
      href: authed ? PORTAL_URL : 'Login.html',
      label: authed ? ('Signed in as ' + name) : 'Client login',
      initial: name ? name.charAt(0).toUpperCase() : ''
    };
  }

  global.KaizenData = {
    DB_KEY, SESSION_KEY,
    getDB, saveDB,
    login, setSession, getSession, isLoggedIn, currentName, logout, gotoPortal,
    bookAppointment, addAppointment,
    authLink, enhanceAuthLinks,
    normPhone, uid
  };
})(window);
