# Zwick Website Vollständiger Relaunch — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 16 statische HTML-Seiten mit gemeinsamem CSS/JS, Before/After Drag-Slider (44 Stück), Dropdown-Nav und vollständiger Mobile-Unterstützung — alle alten unvollständigen Seiten werden ersetzt.

**Architecture:** Reine statische HTML-Dateien ohne Build-Tool. `styles.css`, `before-after.js` und `nav.js` werden in jede Seite eingebunden. Der Drag-Slider initialisiert sich selbst über alle `.ba-slider`-Elemente auf der Seite. Kein Framework, keine externen Libraries.

**Tech Stack:** HTML5, CSS3 Custom Properties, Vanilla JS ES6+, Google Fonts Inter, lokaler HTTP-Server auf Port 3000 bereits aktiv.

**Spec:** `docs/superpowers/specs/2026-05-18-zwick-relaunch-design.md`

---

## Dateien-Übersicht

| Datei | Aktion | Zweck |
|-------|--------|-------|
| `styles.css` | Neu schreiben | Komplettes Design-System |
| `before-after.js` | Neu erstellen | Drag-Slider Komponente |
| `nav.js` | Neu erstellen | Dropdown + Hamburger |
| `index.html` | Neu schreiben | Startseite |
| `haustueren.html` | Neu erstellen | Haustüren + 3 Slider + Video |
| `fenster.html` | Neu erstellen | Fenster + YouTube + 3 Slider |
| `wintergarten.html` | Neu erstellen | Wintergarten + Video + Galerie |
| `vordaecher.html` | Neu erstellen | 9 Vordach-Modelle |
| `nebeneingang.html` | Neu erstellen | Nebeneingangstüren |
| `reparaturen.html` | Neu erstellen | Fensterreparaturen |
| `sicherheit.html` | Neu erstellen | Sicherheit + YouTube |
| `kundendienst.html` | Neu erstellen | Kundendienst + WG-Reparatur |
| `referenzen.html` | Neu schreiben | Referenzen Übersicht |
| `ref-haustueren.html` | Neu erstellen | 26 Drag-Slider |
| `ref-fenster.html` | Neu erstellen | 10 Drag-Slider |
| `ref-nebeneingang.html` | Neu erstellen | 5 Drag-Slider |
| `ueber-uns.html` | Neu schreiben | Team + Timeline |
| `musterraum.html` | Neu schreiben | Showroom + Galerie + Formular |
| `kontakt.html` | Neu schreiben | 2 Bereiche + Formular + Maps |
| `leistungen.html` | Löschen | Wird nicht mehr benötigt |

---

## Task 1: styles.css — CSS-Variablen, Reset, Typografie, Utilities

**Files:**
- Modify: `styles.css` (komplett neu schreiben)

- [ ] **Schreibe styles.css Phase 1 — Variablen, Reset, Typografie, Buttons**

```css
/* === ZWICK DESIGN SYSTEM === */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --anthrazit: #57585a;
  --teal:      #009475;
  --teal-dark: #007a60;
  --bg:        #f7f4f4;
  --bg-alt:    #eae9e9;
  --weiss:     #ffffff;
  --text:      #1a1a1a;
  --text-mid:  #555;
  --radius:    8px;
  --shadow:    0 2px 12px rgba(0,0,0,.08);
  --nav-h:     68px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
}

img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }

/* Typography */
h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; line-height: 1.15; }
h2 { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 700; line-height: 1.25; }
h3 { font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 600; }
p  { max-width: 68ch; }

.eyebrow {
  display: inline-block;
  font-size: .75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: var(--teal);
  margin-bottom: .5rem;
}
.eyebrow.on-dark { color: rgba(255,255,255,.7); }

/* Layout */
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
section { padding: 80px 0; }
section.tight { padding: 48px 0; }

.section-head { margin-bottom: 48px; }
.section-head h2 { margin-top: .25rem; }

/* Grid helpers */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .75rem 1.75rem;
  border-radius: var(--radius);
  font-size: .95rem; font-weight: 600;
  cursor: pointer; border: 2px solid transparent;
  transition: all .2s;
}
.btn-primary {
  background: var(--teal); color: var(--weiss);
}
.btn-primary:hover { background: var(--teal-dark); }

.btn-outline {
  background: transparent; color: var(--anthrazit);
  border-color: var(--anthrazit);
}
.btn-outline:hover { background: var(--anthrazit); color: var(--weiss); }

.btn-outline-white {
  background: transparent; color: var(--weiss);
  border-color: rgba(255,255,255,.6);
}
.btn-outline-white:hover { background: rgba(255,255,255,.15); }

/* Cards */
.card {
  background: var(--weiss);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

/* Trust Bar */
.trust {
  background: var(--anthrazit);
  color: var(--weiss);
  padding: 32px 0;
}
.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  text-align: center;
}
.trust-item {
  padding: 16px;
  border-right: 1px solid rgba(255,255,255,.15);
}
.trust-item:last-child { border-right: none; }
.trust-num {
  font-size: 2.5rem; font-weight: 800;
  color: var(--teal); line-height: 1;
  margin-bottom: .25rem;
}
.trust-num .small { font-size: 1.2rem; }
.trust-label { font-size: .85rem; color: rgba(255,255,255,.7); }
.trust-label strong { display: block; color: var(--weiss); font-weight: 600; }

/* Leistungen Kacheln */
.leistungen-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.leistung-card {
  background: var(--weiss);
  border-radius: var(--radius);
  padding: 32px 24px;
  box-shadow: var(--shadow);
  border-top: 3px solid transparent;
  transition: border-color .2s, transform .2s;
  cursor: pointer;
}
.leistung-card:hover { border-color: var(--teal); transform: translateY(-3px); }
.leistung-icon { font-size: 2rem; margin-bottom: 16px; }
.leistung-card h3 { margin-bottom: .5rem; }
.leistung-card p { font-size: .9rem; color: var(--text-mid); }
.leistung-link {
  display: inline-flex; align-items: center; gap: .3rem;
  margin-top: 16px; font-size: .85rem; font-weight: 600;
  color: var(--teal);
}

/* Kundenstimmen */
.bewertungen-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.bewertung-card {
  background: var(--weiss);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--shadow);
}
.sterne { color: #f59e0b; font-size: 1.1rem; margin-bottom: 12px; }
.bewertung-text { font-size: .9rem; color: var(--text-mid); line-height: 1.7; margin-bottom: 16px; }
.bewertung-autor { font-weight: 600; font-size: .85rem; }

/* CTA-Sektion dunkel */
.cta-dark {
  background: var(--anthrazit);
  color: var(--weiss);
  text-align: center;
  padding: 72px 0;
}
.cta-dark h2 { color: var(--weiss); margin-bottom: 1rem; }
.cta-dark p { color: rgba(255,255,255,.75); margin: 0 auto 2rem; }

/* Video-Sektion */
.video-wrap {
  position: relative;
  aspect-ratio: 16/9;
  background: #111;
  border-radius: var(--radius);
  overflow: hidden;
}
.video-wrap video,
.video-wrap iframe {
  width: 100%; height: 100%;
  border: none;
}

/* YouTube Lazy Embed */
.yt-lazy {
  position: relative;
  cursor: pointer;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: var(--radius);
  overflow: hidden;
}
.yt-lazy img { width: 100%; height: 100%; object-fit: cover; opacity: .8; }
.yt-play {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 72px; height: 72px;
  background: rgba(255,0,0,.9);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: white;
  transition: transform .2s;
}
.yt-lazy:hover .yt-play { transform: translate(-50%,-50%) scale(1.1); }

/* Formular */
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: .85rem; font-weight: 600; margin-bottom: 6px; }
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%; padding: .75rem 1rem;
  border: 1.5px solid var(--bg-alt);
  border-radius: var(--radius);
  font-size: 1rem; font-family: inherit;
  background: var(--weiss);
  transition: border-color .2s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none; border-color: var(--teal);
}
.form-group textarea { min-height: 120px; resize: vertical; }
```

- [ ] **Füge styles.css Phase 2 hinzu — Hero, Team-Teaser, FAQ-Accordion, Modal**

```css
/* Hero */
.hero {
  position: relative;
  min-height: clamp(520px, 75vh, 750px);
  display: flex; align-items: flex-end;
  color: var(--weiss);
  overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
}
.hero-bg::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.3) 60%, transparent 100%);
}
.hero-inner {
  position: relative; z-index: 1;
  padding: 64px 0;
  max-width: 720px;
}
.hero-inner h1 { color: var(--weiss); margin: .5rem 0 1rem; }
.hero-inner .sub { font-size: 1.1rem; color: rgba(255,255,255,.85); margin-bottom: 2rem; max-width: 56ch; }
.hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }

/* Team */
.team-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
.team-card { text-align: center; }
.team-photo {
  width: 140px; height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 16px;
  border: 3px solid var(--teal);
}
.team-name { font-weight: 700; margin-bottom: .2rem; }
.team-role { font-size: .85rem; color: var(--text-mid); }

/* FAQ Accordion */
.faq-item {
  border-bottom: 1px solid var(--bg-alt);
}
.faq-question {
  width: 100%; text-align: left;
  padding: 20px 0;
  font-size: 1rem; font-weight: 600;
  background: none; border: none; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  color: var(--text);
}
.faq-question .icon { font-size: 1.2rem; transition: transform .2s; }
.faq-item.open .faq-question .icon { transform: rotate(45deg); }
.faq-answer {
  max-height: 0; overflow: hidden;
  transition: max-height .3s ease, padding .3s;
  font-size: .95rem; color: var(--text-mid);
}
.faq-item.open .faq-answer { max-height: 300px; padding-bottom: 20px; }

/* Modell-Karten (Vordächer) */
.modell-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.modell-card {
  background: var(--weiss); border-radius: var(--radius);
  overflow: hidden; box-shadow: var(--shadow);
  transition: transform .2s;
}
.modell-card:hover { transform: translateY(-4px); }
.modell-card img { aspect-ratio: 16/10; object-fit: cover; }
.modell-card-body { padding: 16px 20px; }
.modell-card-body h3 { font-size: 1rem; margin-bottom: .3rem; }
.modell-card-body p { font-size: .85rem; color: var(--text-mid); }

/* Galerie Modal */
.modal-overlay {
  display: none; position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,.9);
  align-items: center; justify-content: center;
}
.modal-overlay.open { display: flex; }
.modal-overlay img { max-width: 90vw; max-height: 90vh; border-radius: var(--radius); }
.modal-close {
  position: absolute; top: 20px; right: 24px;
  background: none; border: none; color: white; font-size: 2rem;
  cursor: pointer; line-height: 1;
}

/* Kontakt-Bereiche */
.kontakt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.kontakt-bereich {
  background: var(--weiss); border-radius: var(--radius);
  padding: 36px; box-shadow: var(--shadow);
}
.kontakt-bereich h3 { margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid var(--teal); }
.kontakt-zeile { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px; font-size: .95rem; }
.kontakt-zeile .icon { width: 20px; flex-shrink: 0; color: var(--teal); }

/* Maps embed */
.maps-wrap {
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 16/7;
}
.maps-wrap iframe { width: 100%; height: 100%; border: none; }

/* Referenzen-Übersicht */
.ref-kategorie-card {
  background: var(--weiss); border-radius: var(--radius);
  overflow: hidden; box-shadow: var(--shadow);
}
.ref-kategorie-card .ref-preview { aspect-ratio: 16/9; overflow: hidden; position: relative; }
.ref-kategorie-body { padding: 24px; }
.ref-badge {
  display: inline-block;
  background: var(--teal); color: white;
  font-size: .75rem; font-weight: 700;
  padding: 3px 10px; border-radius: 20px;
  margin-bottom: 10px;
}

/* Musterraum Galerie */
.musterraum-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
.musterraum-grid img {
  aspect-ratio: 4/3; object-fit: cover;
  border-radius: var(--radius); cursor: pointer;
  transition: opacity .2s;
}
.musterraum-grid img:hover { opacity: .85; }

/* Timeline */
.timeline { position: relative; padding-left: 32px; }
.timeline::before {
  content: ''; position: absolute; left: 8px; top: 0; bottom: 0;
  width: 2px; background: var(--teal);
}
.timeline-item { position: relative; margin-bottom: 36px; }
.timeline-dot {
  position: absolute; left: -28px; top: 4px;
  width: 14px; height: 14px;
  background: var(--teal); border-radius: 50%;
  border: 2px solid var(--bg);
}
.timeline-year { font-size: .8rem; font-weight: 700; color: var(--teal); margin-bottom: .2rem; }
.timeline-item h3 { font-size: 1rem; margin-bottom: .3rem; }
.timeline-item p { font-size: .9rem; color: var(--text-mid); }
```

- [ ] **Füge styles.css Phase 3 hinzu — Header, Footer, Sticky Mobile CTA, Mobile Breakpoints**

```css
/* ===== HEADER ===== */
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: var(--anthrazit);
  height: var(--nav-h);
  box-shadow: 0 2px 8px rgba(0,0,0,.2);
}
.nav-row {
  display: flex; align-items: center;
  height: var(--nav-h); gap: 0;
}
.logo {
  display: flex; flex-direction: column; gap: 1px;
  margin-right: auto;
}
.logo-name { font-size: 1.3rem; font-weight: 800; color: var(--weiss); line-height: 1; }
.logo-sub  { font-size: .65rem; color: rgba(255,255,255,.5); letter-spacing: .05em; }

/* Desktop Nav */
.nav-links { display: flex; align-items: center; list-style: none; gap: 4px; }
.nav-links > li { position: relative; }
.nav-links > li > a {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 14px; border-radius: 6px;
  font-size: .9rem; font-weight: 500; color: rgba(255,255,255,.8);
  transition: color .15s, background .15s;
  white-space: nowrap;
}
.nav-links > li > a:hover,
.nav-links > li > a.active { color: var(--weiss); background: rgba(255,255,255,.1); }
.nav-links > li > a .arrow { font-size: .65rem; opacity: .7; }

/* Dropdown */
.dropdown {
  position: absolute; top: calc(100% + 8px); left: 0;
  min-width: 220px;
  background: var(--weiss); border-radius: var(--radius);
  box-shadow: 0 8px 24px rgba(0,0,0,.15);
  padding: 8px 0;
  opacity: 0; visibility: hidden;
  transform: translateY(-6px);
  transition: all .18s;
  z-index: 200;
}
.nav-links > li:hover .dropdown,
.nav-links > li:focus-within .dropdown {
  opacity: 1; visibility: visible; transform: translateY(0);
}
.dropdown a {
  display: block; padding: 9px 18px;
  font-size: .88rem; color: var(--text);
  transition: background .12s;
}
.dropdown a:hover { background: var(--bg); color: var(--teal); }

/* Nav Right */
.nav-right { display: flex; align-items: center; gap: 10px; margin-left: 20px; }
.nav-phone {
  display: flex; align-items: center; gap: 6px;
  font-size: .85rem; font-weight: 600;
  color: rgba(255,255,255,.9);
  padding: 6px 10px;
}
.nav-phone:hover { color: var(--weiss); }

/* Hamburger */
.nav-toggle {
  display: none;
  background: none; border: none; cursor: pointer;
  padding: 8px; color: var(--weiss); font-size: 1.4rem;
  margin-left: auto;
}

/* ===== FOOTER ===== */
.site-footer {
  background: var(--anthrazit);
  color: rgba(255,255,255,.7);
  padding: 60px 0 32px;
}
.footer-grid {
  display: grid; grid-template-columns: repeat(4,1fr); gap: 40px;
  margin-bottom: 48px;
}
.footer-col h4 {
  font-size: .8rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .1em; color: rgba(255,255,255,.4);
  margin-bottom: 16px;
}
.footer-col a, .footer-col p {
  display: block; font-size: .88rem;
  color: rgba(255,255,255,.65);
  line-height: 2; transition: color .15s;
}
.footer-col a:hover { color: var(--weiss); }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,.1);
  padding-top: 24px; font-size: .8rem;
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;
}

/* ===== STICKY MOBILE CTA ===== */
.sticky-cta {
  display: none;
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
  background: var(--anthrazit);
  padding: 10px 16px;
  gap: 8px;
  border-top: 1px solid rgba(255,255,255,.15);
}
.sticky-cta a {
  flex: 1; text-align: center; padding: 10px;
  border-radius: var(--radius);
  font-size: .9rem; font-weight: 600;
}
.sticky-cta .s-phone { background: var(--teal); color: white; }
.sticky-cta .s-anfrage { background: rgba(255,255,255,.1); color: white; border: 1px solid rgba(255,255,255,.3); }

/* ===== MOBILE ===== */
@media (max-width: 1024px) {
  .grid-4, .leistungen-grid, .trust-grid { grid-template-columns: repeat(2,1fr); }
  .footer-grid { grid-template-columns: repeat(2,1fr); }
  .team-grid { grid-template-columns: repeat(2,1fr); }
}

@media (max-width: 768px) {
  section { padding: 52px 0; }
  .container { padding: 0 16px; }

  /* Nav mobile */
  .nav-links {
    display: none;
    flex-direction: column;
    position: fixed; inset: 0; top: var(--nav-h);
    background: var(--anthrazit);
    padding: 16px;
    overflow-y: auto;
    align-items: stretch;
    gap: 0;
  }
  .nav-links.open { display: flex; }
  .nav-links > li > a {
    padding: 14px 16px; font-size: 1rem;
    border-bottom: 1px solid rgba(255,255,255,.08);
    border-radius: 0;
  }
  .dropdown {
    position: static; opacity: 1; visibility: hidden;
    transform: none; box-shadow: none;
    background: rgba(0,0,0,.2); border-radius: 0;
    max-height: 0; overflow: hidden;
    padding: 0; transition: max-height .3s, visibility 0s .3s;
  }
  .dropdown.open { visibility: visible; max-height: 600px; transition: max-height .3s; }
  .dropdown a { color: rgba(255,255,255,.7); padding: 10px 32px; }
  .nav-phone { display: none; }
  .nav-toggle { display: flex; }
  .nav-right .btn { display: none; }

  /* Grids */
  .grid-2, .grid-3, .grid-4,
  .leistungen-grid, .trust-grid,
  .bewertungen-grid, .team-grid,
  .modell-grid, .musterraum-grid,
  .kontakt-grid, .footer-grid { grid-template-columns: 1fr; }
  .trust-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,.1); }

  /* Sticky CTA */
  .sticky-cta { display: flex; }
  body { padding-bottom: 68px; }

  /* Hero */
  .hero-inner { padding: 40px 0; }
  .hero-cta { flex-direction: column; }
  .hero-cta .btn { text-align: center; justify-content: center; }
}
```

- [ ] **Verifiziere:** Öffne `http://localhost:3000` — Seite sollte CSS laden (noch kein HTML-Inhalt, aber kein 404 auf styles.css)

- [ ] **Commit**

```bash
git add styles.css
git commit -m "feat: add complete CSS design system for Zwick relaunch"
```

---

## Task 2: before-after.js — Drag-Slider Komponente

**Files:**
- Create: `before-after.js`

- [ ] **Erstelle before-after.js**

```js
/* Zwick Before/After Drag Slider
   Initialisiert alle .ba-slider auf der Seite.
   Verwendet Pointer Events API (Mouse + Touch unified).
*/
(function () {
  'use strict';

  function initSlider(slider) {
    const handle = slider.querySelector('.ba-handle');
    const after  = slider.querySelector('.ba-after');
    if (!handle || !after) return;

    let dragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      let pct = (x - rect.left) / rect.width;
      pct = Math.max(0.02, Math.min(0.98, pct));
      after.style.clipPath = `inset(0 ${(1 - pct) * 100}% 0 0)`;
      handle.style.left = `${pct * 100}%`;
    }

    // Start at 50%
    after.style.clipPath = 'inset(0 50% 0 0)';
    handle.style.left = '50%';

    handle.addEventListener('pointerdown', (e) => {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    handle.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      setPosition(e.clientX);
    });

    handle.addEventListener('pointerup',   () => { dragging = false; });
    handle.addEventListener('pointercancel', () => { dragging = false; });

    // Also allow click on slider body to jump
    slider.addEventListener('click', (e) => {
      if (e.target === handle || handle.contains(e.target)) return;
      setPosition(e.clientX);
    });
  }

  function initAll() {
    document.querySelectorAll('.ba-slider').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
```

- [ ] **Füge CSS für den Slider zu styles.css hinzu** (am Ende der Datei):

```css
/* ===== BEFORE/AFTER SLIDER ===== */
.ba-slider {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  cursor: col-resize;
  user-select: none;
  background: #111;
  aspect-ratio: 4/3;
}
.ba-before,
.ba-after {
  position: absolute; inset: 0;
}
.ba-before img,
.ba-after img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}
.ba-after {
  clip-path: inset(0 50% 0 0);
  transition: clip-path 0s; /* instant during drag */
}
.ba-label {
  position: absolute; top: 12px;
  padding: 3px 10px;
  background: rgba(0,0,0,.5);
  color: white; font-size: .75rem; font-weight: 600;
  border-radius: 20px;
  pointer-events: none;
}
.ba-before .ba-label { left: 12px; }
.ba-after .ba-label  { right: 12px; }

.ba-handle {
  position: absolute; top: 0; bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  background: white;
  display: flex; align-items: center; justify-content: center;
  z-index: 10;
  cursor: col-resize;
  touch-action: none;
}
.ba-handle::before,
.ba-handle::after {
  content: '';
  position: absolute;
  left: 50%; transform: translateX(-50%);
  width: 0; height: 0;
  border: 6px solid transparent;
}
.ba-handle::before { bottom: calc(50% + 22px); border-bottom-color: white; }
.ba-handle::after  { top:    calc(50% + 22px); border-top-color: white; }

.ba-circle {
  width: 44px; height: 44px;
  background: var(--teal);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,148,117,.5);
  flex-shrink: 0;
}

/* Slider-Grid für Referenzseiten */
.ba-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 768px) {
  .ba-circle { width: 52px; height: 52px; }
  .ba-grid   { grid-template-columns: 1fr; }
}
```

- [ ] **Erstelle Test-HTML um Slider zu verifizieren** (`/tmp/slider-test.html`):

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/styles.css">
</head>
<body style="padding:40px;background:#f7f4f4">
<div class="ba-slider" style="max-width:600px">
  <div class="ba-before">
    <img src="assets/haustueren_ba/slider1_vorher.jpg" alt="Vorher">
    <span class="ba-label">Vorher</span>
  </div>
  <div class="ba-after">
    <img src="assets/haustueren_ba/slider1_nachher.jpg" alt="Nachher">
    <span class="ba-label">Nachher</span>
  </div>
  <div class="ba-handle" aria-label="Schieberegler">
    <div class="ba-circle">⇔</div>
  </div>
</div>
<script src="/before-after.js"></script>
</body>
</html>
```

Kopiere die Datei ins Projektverzeichnis und öffne `http://localhost:3000/slider-test.html`.
Verifiziere: Handle startet mittig, ziehen funktioniert auf Desktop und Mobile (DevTools Touch-Simulation).

- [ ] **Lösche Testdatei** `rm slider-test.html`

- [ ] **Commit**
```bash
git add before-after.js styles.css
git commit -m "feat: add before/after drag slider component"
```

---

## Task 3: nav.js — Dropdown + Hamburger

**Files:**
- Create: `nav.js`

- [ ] **Erstelle nav.js**

```js
/* Zwick Navigation — Dropdown (Desktop) + Hamburger (Mobile) */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const toggle   = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropParents = document.querySelectorAll('.has-dropdown');

    // Hamburger öffnet/schließt Menü
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });

      // ESC schließt
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Klick außerhalb schließt
      document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // Mobile: Dropdown-Gruppen als Accordion
    dropParents.forEach((parent) => {
      const link = parent.querySelector(':scope > a');
      const dd   = parent.querySelector('.dropdown');
      if (!link || !dd) return;

      link.addEventListener('click', (e) => {
        // Nur auf Mobile als Accordion — Desktop handled CSS :hover
        if (window.innerWidth > 768) return;
        e.preventDefault();
        const isOpen = dd.classList.toggle('open');
        link.setAttribute('aria-expanded', isOpen);
      });
    });

    // Aktive Seite markieren
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href === current || (current === '' && href === 'index.html')) {
        a.classList.add('active');
        // Auch Parent-Link markieren wenn in Dropdown
        const parentLi = a.closest('.has-dropdown');
        if (parentLi) parentLi.querySelector(':scope > a')?.classList.add('active');
      }
    });
  });
})();
```

- [ ] **Commit**
```bash
git add nav.js
git commit -m "feat: add dropdown navigation + hamburger menu"
```

---

## Task 4: Header/Footer HTML-Snippet definieren

Dieser Block wird in **jede** der 16 HTML-Seiten kopiert. Er steht hier einmalig.

**Header:**
```html
<header class="site-header">
  <div class="container nav-row">
    <a href="index.html" class="logo" aria-label="Zwick Startseite">
      <span class="logo-name">ZWICK</span>
      <span class="logo-sub">Fenster-Technik · seit 1958</span>
    </a>
    <nav>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Start</a></li>
        <li class="has-dropdown">
          <a href="#" aria-haspopup="true" aria-expanded="false">Leistungen <span class="arrow">▾</span></a>
          <ul class="dropdown">
            <li><a href="fenster.html">Fenster</a></li>
            <li><a href="haustueren.html">Haustüren</a></li>
            <li><a href="wintergarten.html">Wintergarten</a></li>
            <li><a href="vordaecher.html">Vordächer</a></li>
            <li><a href="nebeneingang.html">Nebeneingangstüren</a></li>
            <li><a href="reparaturen.html">Reparaturen</a></li>
            <li><a href="sicherheit.html">Sicherheit</a></li>
            <li><a href="kundendienst.html">Kundendienst</a></li>
          </ul>
        </li>
        <li class="has-dropdown">
          <a href="referenzen.html" aria-haspopup="true">Referenzen <span class="arrow">▾</span></a>
          <ul class="dropdown">
            <li><a href="ref-haustueren.html">Haustüren-Beispiele</a></li>
            <li><a href="ref-fenster.html">Fenster-Beispiele</a></li>
            <li><a href="ref-nebeneingang.html">Nebeneingang-Beispiele</a></li>
          </ul>
        </li>
        <li><a href="ueber-uns.html">Über uns</a></li>
        <li><a href="musterraum.html">Musterraum</a></li>
      </ul>
    </nav>
    <div class="nav-right">
      <a class="nav-phone" href="tel:+4982077314000">📞 08207 / 731 4000</a>
      <a class="btn btn-primary" href="kontakt.html">Anfrage senden</a>
      <button class="nav-toggle" aria-label="Menü öffnen" aria-expanded="false" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
    </div>
  </div>
</header>
```

**Footer:**
```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Leistungen</h4>
        <a href="fenster.html">Fenster</a>
        <a href="haustueren.html">Haustüren</a>
        <a href="wintergarten.html">Wintergarten</a>
        <a href="vordaecher.html">Vordächer</a>
        <a href="nebeneingang.html">Nebeneingangstüren</a>
        <a href="reparaturen.html">Reparaturen</a>
        <a href="sicherheit.html">Sicherheit</a>
        <a href="kundendienst.html">Kundendienst</a>
      </div>
      <div class="footer-col">
        <h4>Referenzen</h4>
        <a href="ref-haustueren.html">Haustüren-Beispiele</a>
        <a href="ref-fenster.html">Fenster-Beispiele</a>
        <a href="ref-nebeneingang.html">Nebeneingang</a>
        <a href="referenzen.html">Alle Referenzen</a>
      </div>
      <div class="footer-col">
        <h4>Firma</h4>
        <a href="ueber-uns.html">Über uns</a>
        <a href="musterraum.html">Musterraum</a>
        <a href="kontakt.html">Kontakt</a>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <p>Linker Kreuthweg 8<br>86444 Affing–Mühlhausen</p>
        <a href="tel:+4982077314000">08207 / 731 4000</a>
        <a href="mailto:info@zwick-fenster.de">info@zwick-fenster.de</a>
        <a href="mailto:info@zwick-wintergarten.de">info@zwick-wintergarten.de</a>
        <p style="margin-top:16px">
          <a href="impressum.html">Impressum</a> ·
          <a href="datenschutz.html">Datenschutz</a>
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Zwick Fenster-Technik GmbH & Zwick Wintergarten GmbH</span>
      <span>Familienbetrieb seit 1958</span>
    </div>
  </div>
</footer>

<div class="sticky-cta">
  <a href="tel:+4982077314000" class="s-phone">📞 Anrufen</a>
  <a href="kontakt.html" class="s-anfrage">Anfrage senden</a>
</div>
```

**Seiten-Boilerplate** (head-Block, identisch für alle Seiten, nur `<title>` ändert sich):
```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SEITENTITEL — Zwick Fenster-Technik Augsburg</title>
  <meta name="description" content="BESCHREIBUNG">
  <link rel="icon" href="assets/logo/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  [HEADER]
  [MAIN CONTENT]
  [FOOTER]
  <script src="nav.js"></script>
  <script src="before-after.js"></script>  <!-- nur auf Seiten mit Slidern -->
</body>
</html>
```

---

## Task 5: index.html — Startseite

**Files:**
- Modify: `index.html` (komplett neu schreiben)

- [ ] **Schreibe index.html** mit diesen Sektionen in dieser Reihenfolge:

1. Boilerplate (Task 4) — Title: `Fenster, Haustüren & Wintergärten — Zwick Augsburg`
2. Header (Task 4)
3. **Hero:**
```html
<section class="hero" aria-label="Hero">
  <div class="hero-bg" style="background-image:url('assets/hero_haustuer.jpg')"></div>
  <div class="container">
    <div class="hero-inner">
      <span class="eyebrow on-dark">Familienbetrieb seit 1958</span>
      <h1>Fenster.<br>Haustüren.<br><span style="color:var(--teal)">Wintergärten.</span></h1>
      <p class="sub">Ihr Fachbetrieb in der Region Augsburg — persönlich, zuverlässig, mit über 60 Jahren Erfahrung. Beratung, Montage und Service aus einer Hand.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="kontakt.html">Jetzt anfragen →</a>
        <a class="btn btn-outline-white" href="musterraum.html">Musterraum besuchen</a>
      </div>
    </div>
  </div>
</section>
```

4. **Trust-Bar:**
```html
<section class="trust tight" aria-label="Kennzahlen">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item"><div class="trust-num">68<span class="small">J.</span></div><div class="trust-label"><strong>Erfahrung</strong>seit 1958 in der Region</div></div>
      <div class="trust-item"><div class="trust-num">2.</div><div class="trust-label"><strong>Generation</strong>Familienunternehmen</div></div>
      <div class="trust-item"><div class="trust-num">300<span class="small">m²</span></div><div class="trust-label"><strong>Musterraum</strong>in Affing-Mühlhausen</div></div>
      <div class="trust-item"><div class="trust-num">44<span class="small">×</span></div><div class="trust-label"><strong>Referenz-Projekte</strong>mit Vorher/Nachher</div></div>
    </div>
  </div>
</section>
```

5. **Leistungen:**
```html
<section aria-label="Leistungen">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Unsere Leistungen</span>
      <h2>Vier Gewerke. Ein Anspruch: Qualität, die hält.</h2>
    </div>
    <div class="leistungen-grid">
      <a href="fenster.html" class="leistung-card">
        <div class="leistung-icon">🪟</div>
        <h3>Fenster</h3>
        <p>Kunststoff, Kunststoff/Alu und Holz/Alu — das passende System für jedes Bauvorhaben.</p>
        <span class="leistung-link">Mehr erfahren →</span>
      </a>
      <a href="haustueren.html" class="leistung-card">
        <div class="leistung-icon">🚪</div>
        <h3>Haustüren</h3>
        <p>Die Visitenkarte Ihres Hauses — hochwertig, sicher und individuell konfigurierbar.</p>
        <span class="leistung-link">Mehr erfahren →</span>
      </a>
      <a href="wintergarten.html" class="leistung-card">
        <div class="leistung-icon">🌿</div>
        <h3>Wintergarten</h3>
        <p>Mit Klimadach — kein Hitzestau, keine Beschattung nötig, das ganze Jahr genießen.</p>
        <span class="leistung-link">Mehr erfahren →</span>
      </a>
      <a href="vordaecher.html" class="leistung-card">
        <div class="leistung-icon">🏠</div>
        <h3>Vordächer</h3>
        <p>Edelstahl und Glas — 9 Modelle ab 3.500 € All-Inclusive inkl. Montage.</p>
        <span class="leistung-link">Mehr erfahren →</span>
      </a>
    </div>
  </div>
</section>
```

6. **Before/After Highlight:**
```html
<section style="background:var(--bg-alt)" aria-label="Vorher Nachher">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Referenzen</span>
      <h2>Die Verwandlung von Alt auf Neu</h2>
      <p style="color:var(--text-mid)">Einfach den Schieberegler hin und her ziehen — und staunen.</p>
    </div>
    <div class="ba-grid">
      <div class="ba-slider">
        <div class="ba-before"><img src="assets/haustueren_ba/slider1_vorher.jpg" alt="Haustür vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
        <div class="ba-after"><img src="assets/haustueren_ba/slider1_nachher.jpg" alt="Haustür nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
        <div class="ba-handle" aria-label="Schieberegler"><div class="ba-circle">⇔</div></div>
      </div>
      <div class="ba-slider">
        <div class="ba-before"><img src="assets/haustueren_ba/slider2_vorher.jpg" alt="Haustür vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
        <div class="ba-after"><img src="assets/haustueren_ba/slider2_nachher.jpg" alt="Haustür nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
        <div class="ba-handle" aria-label="Schieberegler"><div class="ba-circle">⇔</div></div>
      </div>
    </div>
    <div style="text-align:center;margin-top:32px">
      <a href="referenzen.html" class="btn btn-outline">Alle 44 Beispiele ansehen →</a>
    </div>
  </div>
</section>
```

7. **Firmenvideo:**
```html
<section aria-label="Firmenvideo">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Über uns</span>
      <h2>Zwick Fenster-Technik — wer wir sind</h2>
    </div>
    <div class="video-wrap" style="max-width:800px;margin:0 auto">
      <video controls preload="none" poster="assets/misc/fenster-erklaervideo-thumbnail.jpg" style="width:100%;height:100%;border-radius:var(--radius)">
        <source src="assets/videos/zwick-fenster-technik.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</section>
```

8. **Kundenstimmen:**
```html
<section style="background:var(--bg-alt)" aria-label="Kundenstimmen">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Kundenstimmen</span>
      <h2>Was Kunden über unsere Arbeit sagen</h2>
    </div>
    <div class="bewertungen-grid">
      <div class="bewertung-card">
        <div class="sterne">★★★★★</div>
        <p class="bewertung-text">„In zwei Tagen sechs neue Fenster bekommen und hinterher eine staubsaugersaubere Wohnung! Das Team war schnell, kompetent und überaus freundlich. Bei der Firma bleibe ich!"</p>
        <div class="bewertung-autor">— Zufriedener Kunde, Augsburg</div>
      </div>
      <div class="bewertung-card">
        <div class="sterne">★★★★★</div>
        <p class="bewertung-text">„Sehr freundliches, professionelles Unternehmen. Herr Gäßler hat sich bei der Angebotserstellung sehr viel Zeit genommen und alles genau erklärt. Sehr zu empfehlen!"</p>
        <div class="bewertung-autor">— Familie M., Augsburg</div>
      </div>
      <div class="bewertung-card">
        <div class="sterne">★★★★★</div>
        <p class="bewertung-text">„Top Arbeit bei unserem Hagelschaden. Es gibt wenig Firmen die so schnell reagieren. Der Mitarbeiter war kompetent und schnell. Absolute Weiterempfehlung!"</p>
        <div class="bewertung-autor">— Kunde aus dem Landkreis Augsburg</div>
      </div>
    </div>
  </div>
</section>
```

9. **Team-Teaser:**
```html
<section aria-label="Team">
  <div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
    <div style="display:flex;gap:20px">
      <img src="assets/team/alexander-gaessler.png" alt="Alexander Gäßler" style="width:150px;height:150px;border-radius:50%;object-fit:cover;border:3px solid var(--teal)">
      <img src="assets/team/cookie.jpg" alt="Cookie" style="width:100px;height:100px;border-radius:50%;object-fit:cover;align-self:flex-end;border:2px solid var(--bg-alt)">
    </div>
    <div>
      <span class="eyebrow">Unser Team</span>
      <h2>Persönlich. Zuverlässig. Aus der Region.</h2>
      <p style="color:var(--text-mid);margin:16px 0">Alexander Gäßler und sein Team beraten Sie persönlich — im Musterraum in Affing-Mühlhausen oder direkt bei Ihnen. Zuverlässig seit 1958.</p>
      <a href="ueber-uns.html" class="btn btn-outline">Unser Team kennenlernen →</a>
    </div>
  </div>
</section>
```

10. **Musterraum CTA** + Footer (Task 4) + Scripts

```html
<section class="cta-dark" aria-label="Musterraum">
  <div class="container">
    <span class="eyebrow" style="color:var(--teal)">300 m² Showroom</span>
    <h2>Überzeugen Sie sich selbst im Musterraum</h2>
    <p>Alle Produkte zum Anfassen — Fenster, Haustüren, Wintergärten und Vordächer. Persönliche Beratung nach Terminvereinbarung.</p>
    <a href="musterraum.html" class="btn btn-primary">Termin vereinbaren →</a>
  </div>
</section>
```

- [ ] **Öffne `http://localhost:3000/index.html`** — verifiziere alle 8 Sektionen sichtbar, Slider ziehbar, Video abspielbar, Nav-Dropdown funktioniert
- [ ] **Prüfe Mobile** — DevTools → 390px: Hamburger, Slider vollbreite, Sticky CTA sichtbar
- [ ] **Commit**
```bash
git add index.html
git commit -m "feat: add complete homepage with sliders, video, team teaser"
```

---

## Task 6: haustueren.html

**Files:**
- Create: `haustueren.html`

- [ ] **Erstelle haustueren.html** mit Boilerplate + Header (Task 4), dann:

Title: `Haustüren — wirkungsvoll, hochwertig und sicher | Zwick Augsburg`

```html
<!-- Hero -->
<section class="hero">
  <div class="hero-bg" style="background-image:url('assets/misc/hero-haustuere.jpg')"></div>
  <div class="container">
    <div class="hero-inner">
      <span class="eyebrow on-dark">Haustüren</span>
      <h1>Wirkungsvoll, hochwertig und sicher.</h1>
      <p class="sub">Ihre Haustüre ist die Visitenkarte Ihres Hauses. Von klassisch bis modern — wir haben für jeden Geschmack das richtige Modell.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="kontakt.html">Angebot anfragen →</a>
        <a class="btn btn-outline-white" href="ref-haustueren.html">Alle Beispiele ansehen</a>
      </div>
    </div>
  </div>
</section>

<!-- Intro + Checkliste CTA -->
<section>
  <div class="container" style="display:grid;grid-template-columns:2fr 1fr;gap:60px;align-items:start">
    <div>
      <span class="eyebrow">Qualität die schützt</span>
      <h2>Langlebige und beständige Haustüren von Zwick</h2>
      <p style="margin:16px 0;color:var(--text-mid)">Ihre Zwick Haustüre ist vielen Profilen weit überlegen — insbesondere bei der Wärmedämmung. Außerdem verdient alles was Ihnen lieb und teuer ist besten Schutz. Ein Einbruch ist schnell passiert — unsere Türen machen es Einbrechern so schwer wie möglich.</p>
    </div>
    <div style="background:var(--bg-alt);border-radius:var(--radius);padding:28px">
      <h3 style="margin-bottom:12px">Checkliste für Ihren Haustürtausch</h3>
      <p style="font-size:.9rem;color:var(--text-mid);margin-bottom:16px">Kostenlos per E-Mail erhalten:</p>
      <form onsubmit="this.innerHTML='<p style=\'color:var(--teal);font-weight:600\'>✓ Checkliste wird zugesendet!</p>';return false">
        <div class="form-group">
          <input type="email" placeholder="Ihre E-Mail-Adresse" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%">Checkliste zusenden →</button>
      </form>
    </div>
  </div>
</section>

<!-- Konfigurator CTA -->
<section style="background:var(--anthrazit);padding:60px 0">
  <div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center">
    <div>
      <span class="eyebrow" style="color:var(--teal)">Online-Konfigurator</span>
      <h2 style="color:white">Konfigurieren Sie Ihre Traumhaustüre in 2 Minuten</h2>
      <p style="color:rgba(255,255,255,.7);margin:16px 0">Wählen Sie Farbe, Glas, Beschlag und Sicherheitsstufe — und erhalten Sie unverbindlich einen Preis.</p>
      <a href="https://zwick-fenster.de/konfigurator-haustuere/" target="_blank" rel="noopener" class="btn btn-primary">Jetzt konfigurieren →</a>
    </div>
    <img src="assets/services/haustuer-konfigurator.png" alt="Haustür Konfigurator" style="border-radius:var(--radius);max-width:100%">
  </div>
</section>

<!-- 3 Before/After Slider -->
<section style="background:var(--bg-alt)">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Referenzen</span>
      <h2>Die Verwandlung — sehen Sie selbst</h2>
      <p style="color:var(--text-mid)">Schieberegler hin und her ziehen zum Vergleichen.</p>
    </div>
    <div class="ba-grid">
      <div class="ba-slider">
        <div class="ba-before"><img src="assets/haustueren_ba/slider1_vorher.jpg" alt="Vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
        <div class="ba-after"><img src="assets/haustueren_ba/slider1_nachher.jpg" alt="Nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
        <div class="ba-handle" aria-label="Schieberegler"><div class="ba-circle">⇔</div></div>
      </div>
      <div class="ba-slider">
        <div class="ba-before"><img src="assets/haustueren_ba/slider2_vorher.jpg" alt="Vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
        <div class="ba-after"><img src="assets/haustueren_ba/slider2_nachher.jpg" alt="Nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
        <div class="ba-handle" aria-label="Schieberegler"><div class="ba-circle">⇔</div></div>
      </div>
      <div class="ba-slider">
        <div class="ba-before"><img src="assets/haustueren_ba/slider3_vorher.jpg" alt="Vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
        <div class="ba-after"><img src="assets/haustueren_ba/slider3_nachher.jpg" alt="Nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
        <div class="ba-handle" aria-label="Schieberegler"><div class="ba-circle">⇔</div></div>
      </div>
    </div>
    <div style="text-align:center;margin-top:32px">
      <a href="ref-haustueren.html" class="btn btn-outline">Alle 26 Haustüren-Beispiele ansehen →</a>
    </div>
  </div>
</section>

<!-- Video -->
<section>
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Video</span>
      <h2>Sehen Sie selbst — Haustüren von Zwick</h2>
    </div>
    <div class="video-wrap" style="max-width:800px;margin:0 auto">
      <video controls preload="none" poster="assets/misc/hero-haustuere.jpg" style="width:100%;height:100%;border-radius:var(--radius)">
        <source src="assets/videos/zwick-haustueren.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</section>

<!-- Kundenstimmen (3 haustüren-spezifisch) -->
<section style="background:var(--bg-alt)">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Kundenstimmen</span><h2>Was Kunden sagen</h2></div>
    <div class="bewertungen-grid">
      <div class="bewertung-card"><div class="sterne">★★★★★</div><p class="bewertung-text">„Letzten Sommer haben wir uns ausgesperrt — der Schlüsseldienst war nicht in der Lage, unsere neue ZWICK-Haustüre zu öffnen, so dass er die Polizei holen musste. Das zeigt wie sicher die Tür ist!"</p><div class="bewertung-autor">— Familie S., Augsburg</div></div>
      <div class="bewertung-card"><div class="sterne">★★★★★</div><p class="bewertung-text">„Sehr gute Beratung. Wir konnten uns die Türe nach unseren Vorstellungen zusammenstellen. Wichtig war für uns der Sicherheitsaspekt — wurde perfekt umgesetzt."</p><div class="bewertung-autor">— Herr K., Landkreis Augsburg</div></div>
      <div class="bewertung-card"><div class="sterne">★★★★★</div><p class="bewertung-text">„Möchte mich für die sehr gute Beratung bedanken. Wir sind sehr zufrieden mit dieser Tür. Dem freundlichen Mitarbeiter ein Lob für die perfekte Arbeit!"</p><div class="bewertung-autor">— Zufriedene Kundin</div></div>
    </div>
  </div>
</section>

<!-- Musterraum CTA -->
<section class="cta-dark">
  <div class="container">
    <h2>Haustüren live erleben im Musterraum</h2>
    <p>Alle Modelle zum Anfassen — persönliche Beratung nach Terminvereinbarung.</p>
    <a href="musterraum.html" class="btn btn-primary">Termin vereinbaren →</a>
  </div>
</section>
```

Footer + Scripts (Task 4)

- [ ] **Öffne `http://localhost:3000/haustueren.html`** — alle 3 Slider ziehbar, Video abspielbar, Konfigurator-Link öffnet externes Tab
- [ ] **Commit**
```bash
git add haustueren.html
git commit -m "feat: add haustüren page with 3 sliders, video, konfigurator CTA"
```

---

## Task 7: fenster.html

**Files:**
- Create: `fenster.html`

- [ ] **Erstelle fenster.html** — Title: `Fenster in Augsburg — Kunststoff, Alu, Holz/Alu | Zwick`

Gleiche Struktur wie haustueren.html. Sektionen:

1. Hero: Bild `assets/misc/dienstleistung-fenster.jpg`, H1: `Ihre Fenster Firma in Augsburg`
2. Fenstertypen (3 Kacheln):
```html
<div class="grid-3">
  <div class="card" style="padding:28px">
    <h3>Kunststoff</h3>
    <p style="color:var(--text-mid);margin-top:8px">Hervorragende Wärmedämmung, pflegeleicht, langlebig. Die beliebteste Wahl für Sanierung und Neubau.</p>
  </div>
  <div class="card" style="padding:28px">
    <h3>Kunststoff / Aluminium</h3>
    <p style="color:var(--text-mid);margin-top:8px">Innenseitig Kunststoff, außen Aluminium — maximaler Witterungsschutz bei minimalem Pflegeaufwand.</p>
  </div>
  <div class="card" style="padding:28px">
    <h3>Holz / Aluminium</h3>
    <p style="color:var(--text-mid);margin-top:8px">Natürliche Wärme innen, robuster Alu-Mantel außen. Für höchste Ansprüche an Optik und Dämmung.</p>
  </div>
</div>
```

3. YouTube Lazy-Embed:
```html
<section>
  <div class="container">
    <div class="section-head"><span class="eyebrow">Erklärvideo</span><h2>So funktioniert der Fenstertausch bei Zwick</h2></div>
    <div class="yt-lazy" style="max-width:800px;margin:0 auto" onclick="this.innerHTML='<iframe src=\'https://www.youtube.com/embed/iuhRYxDkOok?autoplay=1\' allow=\'autoplay;encrypted-media\' allowfullscreen style=\'width:100%;height:100%;border:none\'></iframe>'">
      <img src="assets/misc/fenster-erklaervideo-thumbnail.jpg" alt="Erklärvideo Fenstertausch">
      <div class="yt-play">▶</div>
    </div>
  </div>
</section>
```

4. Partner-Logos:
```html
<section class="tight" style="background:var(--bg-alt)">
  <div class="container" style="text-align:center">
    <span class="eyebrow">Unsere Partner</span>
    <div style="display:flex;gap:40px;justify-content:center;align-items:center;margin-top:20px;flex-wrap:wrap">
      <img src="assets/misc/fenster-logo-aluplast.png" alt="aluplast" style="height:50px;filter:invert(1) opacity(.6)">
      <img src="assets/misc/fenster-logo-ideal.png" alt="IDEAL" style="height:50px;filter:invert(1) opacity(.6)">
    </div>
  </div>
</section>
```

5. 3 Before/After Slider (Paare: image1-1/2-1, image3-1/4-1, image13-1/14-1 aus `assets/fenster_beispiele/`)
6. Link zu ref-fenster.html
7. Kundenstimmen (3 fenster-spezifisch aus brief.md)
8. Musterraum CTA, Footer, Scripts

- [ ] **Öffne `http://localhost:3000/fenster.html`** — YouTube-Thumbnail sichtbar, Klick lädt Player, 3 Slider funktionieren
- [ ] **Commit**
```bash
git add fenster.html
git commit -m "feat: add fenster page with YouTube lazy-embed and 3 sliders"
```

---

## Task 8: ref-haustueren.html — 26 Before/After Slider

**Files:**
- Create: `ref-haustueren.html`

- [ ] **Erstelle ref-haustueren.html** — Title: `Haustüren Vorher/Nachher — 26 Referenzen | Zwick`

Die 26 Slider-Paare aus `assets/haustueren_beispiele/`. Paare (Vorher → Nachher):
image1/2, image3/4, image5/6, image8/10, image13/14, image15/16, image17/18, image19/20, image23/24, image25/26, image27/28, image29/30, image31/32, image33/34, image35/36, image37/38, image39/40, image41/42, image43/44, image45/46, image47/48, image49/50, image51/52, image53/54, image55/56, image57/58

```html
<!-- Hero-Header -->
<section style="background:var(--anthrazit);padding:60px 0;color:white">
  <div class="container">
    <a href="haustueren.html" style="color:rgba(255,255,255,.6);font-size:.85rem">← Zurück zu Haustüren</a>
    <h1 style="color:white;margin-top:12px">Haustüren — Vorher & Nachher</h1>
    <p style="color:rgba(255,255,255,.7);margin-top:8px">26 Referenz-Projekte. Schieberegler hin und her ziehen zum Vergleichen.</p>
  </div>
</section>

<!-- Alle 26 Slider in 2er-Grid -->
<section>
  <div class="container">
    <div class="ba-grid">
      <!-- Slider 1 -->
      <div class="ba-slider">
        <div class="ba-before"><img src="assets/haustueren_beispiele/image1.jpg" alt="Haustür Vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
        <div class="ba-after"><img src="assets/haustueren_beispiele/image2.jpg" alt="Haustür Nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
        <div class="ba-handle" aria-label="Schieberegler"><div class="ba-circle">⇔</div></div>
      </div>
      <!-- Slider 2 -->
      <div class="ba-slider">
        <div class="ba-before"><img src="assets/haustueren_beispiele/image3.jpg" alt="Haustür Vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
        <div class="ba-after"><img src="assets/haustueren_beispiele/image4.jpg" alt="Haustür Nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
        <div class="ba-handle" aria-label="Schieberegler"><div class="ba-circle">⇔</div></div>
      </div>
      <!-- Slider 3–26: identisches Muster, Bildpaare: image5/6, image8/10, image13/14, image15/16,
           image17/18, image19/20, image23/24, image25/26, image27/28, image29/30, image31/32,
           image33/34, image35/36, image37/38, image39/40, image41/42, image43/44, image45/46,
           image47/48, image49/50, image51/52, image53/54, image55/56, image57/58
           → Gleiche HTML-Struktur wie Slider 1/2, nur src-Pfade anpassen -->
    </div>
  </div>
</section>
```

**Wichtig:** Alle 26 Slider ausschreiben (kein Loop-Code im HTML). Jeder Slider = exakt das Markup-Muster von Slider 1/2.

- [ ] **Öffne `http://localhost:3000/ref-haustueren.html`** — alle Slider scrollen lazy, ziehen funktioniert
- [ ] **Commit**
```bash
git add ref-haustueren.html
git commit -m "feat: add 26 before/after sliders on haustüren reference page"
```

---

## Task 9: ref-fenster.html + ref-nebeneingang.html

**Files:**
- Create: `ref-fenster.html`
- Create: `ref-nebeneingang.html`

- [ ] **Erstelle ref-fenster.html** — 10 Slider, Bildpaare aus `assets/fenster_beispiele/`:
  - image1-1/2-1, image3-1/4-1, image5-1/6-1, image7-1/8-1, image13-1/14-1, image17-1/18-1, image19-1/20-1, image21-1/22-1, image25-1/26-1, image29-1/30-1

- [ ] **Erstelle ref-nebeneingang.html** — 5 Slider, Bildpaare aus `assets/nebeneingang_ba/`:
  - image1-2/2-2, image3-2/4-2, image5-2/6-2, image7-2/8-2, image9-2/10-2

Selbe HTML-Struktur wie ref-haustueren.html — nur andere src-Pfade und kürzere `ba-grid`.

- [ ] **Öffne beide Seiten** — Slider ziehbar
- [ ] **Commit**
```bash
git add ref-fenster.html ref-nebeneingang.html
git commit -m "feat: add fenster (10) and nebeneingang (5) reference slider pages"
```

---

## Task 10: referenzen.html — Übersicht

**Files:**
- Modify: `referenzen.html` (komplett neu schreiben)

- [ ] **Schreibe referenzen.html** mit 3 Kategorien-Karten + je einem Vorschau-Slider:

```html
<section style="background:var(--anthrazit);padding:60px 0;color:white">
  <div class="container">
    <h1 style="color:white">Referenzen</h1>
    <p style="color:rgba(255,255,255,.7);margin-top:8px">Unsere Taten bestätigen unsere Worte — 44 Vorher/Nachher-Projekte.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="grid-3">
      <!-- Kategorie 1 -->
      <a href="ref-haustueren.html" class="ref-kategorie-card" style="display:block;text-decoration:none;color:inherit">
        <div class="ref-preview">
          <div class="ba-slider" style="aspect-ratio:16/9">
            <div class="ba-before"><img src="assets/haustueren_ba/slider1_vorher.jpg" alt="Vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
            <div class="ba-after"><img src="assets/haustueren_ba/slider1_nachher.jpg" alt="Nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
            <div class="ba-handle"><div class="ba-circle">⇔</div></div>
          </div>
        </div>
        <div class="ref-kategorie-body">
          <span class="ref-badge">26 Beispiele</span>
          <h3>Haustüren</h3>
          <p style="font-size:.9rem;color:var(--text-mid)">Von der alten Holztür zur modernen Sicherheitstür — alle mit Schieberegler vergleichbar.</p>
          <span style="color:var(--teal);font-weight:600;font-size:.9rem">Alle ansehen →</span>
        </div>
      </a>
      <!-- Kategorie 2 -->
      <a href="ref-fenster.html" class="ref-kategorie-card" style="display:block;text-decoration:none;color:inherit">
        <div class="ref-preview">
          <div class="ba-slider" style="aspect-ratio:16/9">
            <div class="ba-before"><img src="assets/fenster_beispiele/image1-1.jpg" alt="Vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
            <div class="ba-after"><img src="assets/fenster_beispiele/image2-1.jpg" alt="Nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
            <div class="ba-handle"><div class="ba-circle">⇔</div></div>
          </div>
        </div>
        <div class="ref-kategorie-body">
          <span class="ref-badge">10 Beispiele</span>
          <h3>Fenster</h3>
          <p style="font-size:.9rem;color:var(--text-mid)">Fenstertausch vorher und nachher — Kunststoff und Aluminium-Systeme.</p>
          <span style="color:var(--teal);font-weight:600;font-size:.9rem">Alle ansehen →</span>
        </div>
      </a>
      <!-- Kategorie 3 -->
      <a href="ref-nebeneingang.html" class="ref-kategorie-card" style="display:block;text-decoration:none;color:inherit">
        <div class="ref-preview">
          <div class="ba-slider" style="aspect-ratio:16/9">
            <div class="ba-before"><img src="assets/nebeneingang_ba/image1-2.jpg" alt="Vorher" loading="lazy"><span class="ba-label">Vorher</span></div>
            <div class="ba-after"><img src="assets/nebeneingang_ba/image2-2.jpg" alt="Nachher" loading="lazy"><span class="ba-label">Nachher</span></div>
            <div class="ba-handle"><div class="ba-circle">⇔</div></div>
          </div>
        </div>
        <div class="ref-kategorie-body">
          <span class="ref-badge">5 Beispiele</span>
          <h3>Nebeneingangstüren</h3>
          <p style="font-size:.9rem;color:var(--text-mid)">Keller- und Nebeneingangstüren — funktional und sicher erneuert.</p>
          <span style="color:var(--teal);font-weight:600;font-size:.9rem">Alle ansehen →</span>
        </div>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Commit**
```bash
git add referenzen.html
git commit -m "feat: add referenzen overview with 3 preview sliders"
```

---

## Task 11: wintergarten.html

**Files:**
- Create: `wintergarten.html`

- [ ] **Erstelle wintergarten.html** — Title: `Wintergarten Augsburg — Klimadach & Beratung | Zwick`

Sektionen:
1. Hero: `assets/wintergarten/datzmann1.jpg`, H1: `Lassen Sie Ihre Seele baumeln`
2. Klimadach-Feature (4 Vorteile als Grid):
```html
<div class="grid-2" style="margin-top:32px">
  <div class="card" style="padding:24px"><h3>✓ Kein Hitzestau</h3><p style="color:var(--text-mid);margin-top:8px">Das Klimadach reguliert die Temperatur — auch im Hochsommer angenehm.</p></div>
  <div class="card" style="padding:24px"><h3>✓ Keine Beschattung nötig</h3><p style="color:var(--text-mid);margin-top:8px">Spart Kosten und schafft maximales Licht ohne Blendung.</p></div>
  <div class="card" style="padding:24px"><h3>✓ Kein lästiges Putzen</h3><p style="color:var(--text-mid);margin-top:8px">Selbstreinigendes Glasdach — wartungsarm und langlebig.</p></div>
  <div class="card" style="padding:24px"><h3>✓ Dachterrasse möglich</h3><p style="color:var(--text-mid);margin-top:8px">Kombination mit Dachterrasse für maximalen Wohngewinn.</p></div>
</div>
```

3. Video:
```html
<div class="video-wrap" style="max-width:800px;margin:32px auto 0">
  <video controls preload="none" poster="assets/wintergarten/datzmann1.jpg" style="width:100%;height:100%;border-radius:var(--radius)">
    <source src="assets/videos/zwick-wintergarten.mp4" type="video/mp4">
  </video>
</div>
```

4. Projekte-Galerie (3 Projekte × 3 Fotos als Kacheln + Modal):
```html
<h3 style="margin-bottom:20px">Ausgewählte Projekte</h3>
<div class="grid-3">
  <img src="assets/wintergarten/datzmann1.jpg" alt="Projekt Datzmann" loading="lazy" onclick="openModal(this.src)" style="border-radius:var(--radius);aspect-ratio:4/3;object-fit:cover;cursor:pointer">
  <img src="assets/wintergarten/datzmann2.jpg" alt="Projekt Datzmann" loading="lazy" onclick="openModal(this.src)" style="border-radius:var(--radius);aspect-ratio:4/3;object-fit:cover;cursor:pointer">
  <img src="assets/wintergarten/datzmann3.jpg" alt="Projekt Datzmann" loading="lazy" onclick="openModal(this.src)" style="border-radius:var(--radius);aspect-ratio:4/3;object-fit:cover;cursor:pointer">
  <!-- Killermann + Siegmund: gleiche Struktur mit killermann1/2/3.jpg und siegmund1/2/3.jpg -->
</div>

<!-- Modal -->
<div class="modal-overlay" id="modal" onclick="this.classList.remove('open')">
  <button class="modal-close" onclick="document.getElementById('modal').classList.remove('open')">×</button>
  <img id="modalImg" src="" alt="Galerie">
</div>
<script>
function openModal(src){
  document.getElementById('modalImg').src = src;
  document.getElementById('modal').classList.add('open');
}
</script>
```

5. FAQ-Accordion:
```html
<div class="faq-item">
  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
    Ist die Erstberatung kostenlos? <span class="icon">+</span>
  </button>
  <div class="faq-answer"><p>Ja, die Erstberatung ist bei uns kostenlos. Wir nehmen uns gerne die Zeit, um Ihre Wünsche zu besprechen.</p></div>
</div>
<div class="faq-item">
  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
    Ist ein Fundament erforderlich? <span class="icon">+</span>
  </button>
  <div class="faq-answer"><p>In den meisten Fällen wird ein stabiles Fundament benötigt, um eine sichere und langlebige Konstruktion zu gewährleisten. Dies klären wir bei der Beratung.</p></div>
</div>
<div class="faq-item">
  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
    Wie lange dauert die Umsetzung? <span class="icon">+</span>
  </button>
  <div class="faq-answer"><p>Die Dauer hängt von Planung, Genehmigungen und der Bestellung ab. Typisch sind 8–16 Wochen vom Auftrag bis zur Fertigstellung.</p></div>
</div>
```

6. Reparatur-Link-Box:
```html
<div style="background:var(--bg-alt);border-radius:var(--radius);padding:28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
  <div><h3>Bestehenden Wintergarten reparieren?</h3><p style="color:var(--text-mid);margin-top:4px">Wir sind auch für Reparaturen und Einstellarbeiten an Bestandswintergärten da.</p></div>
  <a href="kundendienst.html" class="btn btn-outline">Mehr erfahren →</a>
</div>
```

7. Kontakt CTA, Footer, Scripts (inkl. `before-after.js` weglassen — keine Slider auf dieser Seite)

- [ ] **Öffne `http://localhost:3000/wintergarten.html`** — Video abspielbar, FAQ öffnet/schließt, Modal beim Klick auf Fotos
- [ ] **Commit**
```bash
git add wintergarten.html
git commit -m "feat: add wintergarten page with video, galerie, FAQ accordion"
```

---

## Task 12: vordaecher.html

**Files:**
- Create: `vordaecher.html`

- [ ] **Erstelle vordaecher.html** — Title: `Haustürvordächer aus Edelstahl & Glas | Zwick Augsburg`

Sektionen:
1. Hero: `assets/vordaecher/vordach-eingang.jpg`, H1: `Design-Vordächer aus Edelstahl und Glas`
2. Preisinfo-Banner:
```html
<section class="tight" style="background:var(--teal);color:white;text-align:center">
  <div class="container">
    <h2 style="color:white">Ab 3.500 € All-Inclusive</h2>
    <p style="color:rgba(255,255,255,.85)">Inklusive Montage und Mehrwertsteuer — transparent, keine versteckten Kosten.</p>
  </div>
</section>
```

3. 9 Modell-Karten (Calypso, Galaxy, Juwel, Comet, Phönix, Venus, Neptun, Sirius, Calypso 1):
```html
<div class="modell-grid">
  <div class="modell-card">
    <img src="assets/vordaecher/calypso1.jpg" alt="Calypso 1" loading="lazy">
    <div class="modell-card-body"><h3>Calypso 1</h3><p>Der Preisknaller — optimales Preis-Leistungs-Verhältnis.</p></div>
  </div>
  <div class="modell-card">
    <img src="assets/vordaecher/galaxy.png" alt="Galaxy" loading="lazy">
    <div class="modell-card-body"><h3>Galaxy</h3><p>Zeitloses Design mit klaren Linien.</p></div>
  </div>
  <div class="modell-card">
    <img src="assets/vordaecher/juwel.png" alt="Juwel" loading="lazy">
    <div class="modell-card-body"><h3>Juwel</h3><p>Elegantes Edelstahl-Glas-Vordach für anspruchsvolle Eingänge.</p></div>
  </div>
  <!-- Comet, Phönix, Venus, Neptun, Sirius, Calypso: gleiche Struktur -->
</div>
```

4. Material-Info (2 Spalten: Glas / Edelstahl)
5. Foto-Galerie (6 Installationsfotos als 3er-Grid)
6. Kontakt CTA, Footer

- [ ] **Commit**
```bash
git add vordaecher.html
git commit -m "feat: add vordächer page with 9 models and gallery"
```

---

## Task 13: ueber-uns.html

**Files:**
- Modify: `ueber-uns.html` (komplett neu schreiben)

- [ ] **Schreibe ueber-uns.html** — Title: `Über uns — Familienbetrieb seit 1958 | Zwick Augsburg`

Sektionen:
1. Hero dunkel mit H1: `Wir stellen uns vor`
2. Team-Grid (6 Personen):
```html
<div class="team-grid" style="grid-template-columns:repeat(3,1fr)">
  <div class="team-card">
    <img class="team-photo" src="assets/team/alexander-gaessler.png" alt="Alexander Gäßler">
    <div class="team-name">Alexander Gäßler</div>
    <div class="team-role">Geschäftsführer · Fenster-Technik</div>
    <div style="font-size:.8rem;color:var(--text-mid);margin-top:4px">📞 0821 / 27275–13</div>
  </div>
  <div class="team-card">
    <img class="team-photo" src="assets/team/team-foto.jpg" alt="Sabrina Gäßler">
    <div class="team-name">Sabrina Gäßler</div>
    <div class="team-role">Innendienst · Abt.-Leitung Kundendienst</div>
  </div>
  <div class="team-card">
    <div style="width:140px;height:140px;border-radius:50%;background:var(--bg-alt);display:flex;align-items:center;justify-content:center;font-size:3rem;margin:0 auto 16px">👤</div>
    <div class="team-name">Christian Neumann</div>
    <div class="team-role">Geschäftsführer · Wintergarten</div>
    <div style="font-size:.8rem;color:var(--text-mid);margin-top:4px">📞 0821 / 27275–15</div>
  </div>
  <div class="team-card">
    <div style="width:140px;height:140px;border-radius:50%;background:var(--bg-alt);display:flex;align-items:center;justify-content:center;font-size:3rem;margin:0 auto 16px">👤</div>
    <div class="team-name">Dustin Neumann</div>
    <div class="team-role">Verkauf & Beratung · Wintergarten</div>
  </div>
  <div class="team-card">
    <div style="width:140px;height:140px;border-radius:50%;background:var(--bg-alt);display:flex;align-items:center;justify-content:center;font-size:3rem;margin:0 auto 16px">👤</div>
    <div class="team-name">Daniela Weber</div>
    <div class="team-role">Innendienst · Telefonzentrale Wintergarten</div>
  </div>
  <div class="team-card">
    <img class="team-photo" src="assets/team/cookie.jpg" alt="Cookie">
    <div class="team-name">Cookie 🐕</div>
    <div class="team-role">Kundenbetreuung · Security-Manager</div>
  </div>
</div>
```

3. Geschichte-Timeline (1958, 1960er, 1970, Schnelltausch, Wintergarten, heute)
4. Kernwerte (3 Cards: Zuverlässig / Innovativ / Kundenorientiert)
5. Musterraum CTA, Footer

- [ ] **Commit**
```bash
git add ueber-uns.html
git commit -m "feat: add über-uns page with team grid, timeline, Cookie the dog"
```

---

## Task 14: musterraum.html + kontakt.html

**Files:**
- Modify: `musterraum.html` (komplett neu)
- Modify: `kontakt.html` (komplett neu)

- [ ] **Schreibe musterraum.html** — Title: `Musterraum Affing-Mühlhausen | Zwick`

Sektionen:
1. Hero dunkel, H1: `Termine im Musterraum`
2. Galerie (5 Bilder in `musterraum-grid`):
```html
<div class="musterraum-grid">
  <img src="assets/musterraum/Musterraum1.jpg" alt="Musterraum" loading="lazy" onclick="openModal(this.src)">
  <img src="assets/musterraum/Musterraum2.jpg" alt="Musterraum" loading="lazy" onclick="openModal(this.src)">
  <img src="assets/musterraum/Musterraum3.jpg" alt="Musterraum" loading="lazy" onclick="openModal(this.src)">
  <img src="assets/musterraum/Musterraum4.jpg" alt="Musterraum" loading="lazy" onclick="openModal(this.src)">
  <img src="assets/musterraum/Musterraum5.jpg" alt="Musterraum" loading="lazy" onclick="openModal(this.src)">
</div>
```
3. Beschreibung (2 Spalten: Was erwartet Sie — Fenster/Haustüren & Wintergarten)
4. Terminanfrage-Formular (Name, Telefon, Bereich-Select, Nachricht)
5. Modal + Footer

- [ ] **Schreibe kontakt.html** — Title: `Kontakt | Zwick Fenster-Technik Augsburg`

Sektionen:
1. H1-Header
2. Zwei Kontakt-Bereiche (`.kontakt-grid`):
   - Links: Fenster/Haustüren, Linker Kreuthweg 8, 86444 Affing-Mühlhausen, 08207/731 4000, info@zwick-fenster.de
   - Rechts: Wintergarten, Am Mittleren Moos 15, 86167 Augsburg, 0821/27275, info@zwick-wintergarten.de
3. Kontaktformular (Name, Telefon, E-Mail, Bereich-Auswahl, Nachricht, Submit-Button)
4. Google Maps iframe (Affing-Mühlhausen):
```html
<div class="maps-wrap">
  <iframe src="https://maps.google.com/maps?q=Linker+Kreuthweg+8+86444+Affing&output=embed" loading="lazy" title="Zwick Standort"></iframe>
</div>
```
5. Footer

- [ ] **Commit**
```bash
git add musterraum.html kontakt.html
git commit -m "feat: add musterraum with gallery and kontakt with 2-area layout + maps"
```

---

## Task 15: Verbleibende Leistungsseiten

**Files:**
- Create: `nebeneingang.html`, `reparaturen.html`, `sicherheit.html`, `kundendienst.html`

Alle vier nach demselben Muster: Hero → Beschreibung → Bilder/Video → Kontakt CTA → Footer.

- [ ] **nebeneingang.html** — Title: `Nebeneingangstüren & Kellertüren | Zwick`
  - Hero, Beschreibungstext, Link zu ref-nebeneingang.html, Kontakt CTA

- [ ] **reparaturen.html** — Title: `Fensterreparaturen Augsburg | Zwick`
  - Hero, Leistungsbeschreibung, Preisinfo:
  ```html
  <div style="background:var(--bg-alt);border-radius:var(--radius);padding:24px;margin-top:24px">
    <h3>Stundenverrechnungssatz</h3>
    <p style="font-size:1.2rem;font-weight:700;color:var(--teal);margin-top:8px">€ 77,35 inkl. MwSt. / Stunde</p>
    <p style="font-size:.85rem;color:var(--text-mid);margin-top:4px">Die erste angefangene Stunde inkl. Fahrtzeit wird voll berechnet.</p>
  </div>
  ```
  - Kundenstimmen (Hagelschaden-Zitat), Kontakt CTA

- [ ] **sicherheit.html** — Title: `Fenstersicherheit & HouseControl | Zwick`
  - Hero, Text zu Ideal HouseControl, YouTube Lazy-Embed `5OhhhNo-wFI`:
  ```html
  <div class="yt-lazy" style="max-width:800px;margin:24px auto" onclick="this.innerHTML='<iframe src=\'https://www.youtube.com/embed/5OhhhNo-wFI?autoplay=1\' allow=\'autoplay;encrypted-media\' allowfullscreen style=\'width:100%;height:100%;border:none\'></iframe>'">
    <img src="assets/services/sicherheit-ideal.png" alt="HouseControl" style="object-fit:contain;background:#111">
    <div class="yt-play">▶</div>
  </div>
  ```
  - Kontakt CTA

- [ ] **kundendienst.html** — Title: `Kundendienst & Sonstiges | Zwick`
  - Hero, Beschreibung (Sonderwünsche, Bestandsfenster auffrischen)
  - Sektion "Wintergarten-Reparatur" mit Fotos aus `assets/wintergarten/`
  - Kontakt CTA

- [ ] **Lösche** `leistungen.html` (nicht mehr benötigt):
```bash
rm leistungen.html
```

- [ ] **Commit**
```bash
git add nebeneingang.html reparaturen.html sicherheit.html kundendienst.html
git rm leistungen.html
git commit -m "feat: add remaining 4 service pages, remove obsolete leistungen.html"
```

---

## Task 16: Abschluss & Querverweise prüfen

**Files:** Alle HTML-Dateien (nur lesen, ggf. Links korrigieren)

- [ ] **Prüfe alle internen Links** — kein Link darf ins Leere führen:
```bash
cd /home/localadmin/projekte/Business/Kunden/ZWICK/Zwick
grep -h 'href="[^h#]' *.html | grep -oP 'href="\K[^"]+' | sort -u
```
Alle gefundenen `.html`-Dateipfade müssen existieren.

- [ ] **Prüfe alle Bild-Pfade** — kein `<img src>` darf broken sein:
```bash
grep -rh 'src="assets/' *.html | grep -oP 'src="\Kassets/[^"]+' | sort -u | while read f; do
  [ -f "$f" ] || echo "FEHLT: $f"
done
```
Alle als `FEHLT:` gemeldeten Dateien nachträglich in den richtigen Ordner kopieren oder src-Pfad korrigieren.

- [ ] **Prüfe alle Video-Pfade:**
```bash
ls -lh assets/videos/
```
Alle 3 Videos müssen vorhanden sein.

- [ ] **Mobile-Durchlauf** — öffne jede der 16 Seiten in DevTools bei 390px:
  - Hamburger-Menü öffnet/schließt
  - Sticky CTA unten sichtbar
  - Kein horizontales Scrollen
  - Slider vollbreite und ziehbar

- [ ] **Finaler Commit**
```bash
git add -u
git commit -m "feat: complete Zwick website relaunch — 16 pages, 44 sliders, 3 videos"
```

---

## Selbst-Review Checkliste

- [x] Spec-Coverage: alle 16 Seiten spezifiziert ✓
- [x] Alle 44 Slider: ref-haustueren (26) + ref-fenster (10) + ref-nebeneingang (5) + index (2) + haustueren (3) + fenster (3) ✓
- [x] 3 Videos eingebunden: index, haustueren, wintergarten ✓
- [x] 2 YouTube-Videos: fenster (iuhRYxDkOok), sicherheit (5OhhhNo-wFI) ✓
- [x] Mobile: Sticky CTA, Hamburger, Touch-Slider ✓
- [x] before-after.js: einheitliche Klassen `.ba-slider`, `.ba-handle`, `.ba-circle` ✓
- [x] nav.js: `.has-dropdown`, `.dropdown`, `.nav-toggle`, `#navLinks` ✓
- [x] Kein TBD, kein TODO ✓
