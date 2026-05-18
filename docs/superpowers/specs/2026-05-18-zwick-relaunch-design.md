# Design-Spec: Zwick Website Vollständiger Relaunch
Datum: 2026-05-18

---

## Entscheidungen (Brainstorming-Ergebnis)

| Thema | Entscheidung |
|-------|-------------|
| Vorgehen | Alle Seiten komplett neu schreiben |
| Seitenanzahl | 16 HTML-Seiten (vollständig) |
| Before/After | Drag-Slider (CSS + minimales JS, Touch-optimiert) |
| Slider-Platzierung | Startseite (3) + Leistungsseiten (je 3) + Referenzseiten (alle) |
| Navigation | Dropdown — Leistungen & Referenzen mit Untermenüs |
| Mobile | Hamburger-Menü, Touch-Slider, Sticky-Anruf-CTA unten |

---

## Dateistruktur

```
Zwick/
├── index.html
├── styles.css                  ← geteilt, alle Seiten
├── before-after.js             ← Drag-Slider Komponente
├── nav.js                      ← Dropdown + Hamburger
│
├── fenster.html
├── haustueren.html
├── wintergarten.html
├── vordaecher.html
├── nebeneingang.html
├── reparaturen.html
├── sicherheit.html
├── kundendienst.html
│
├── referenzen.html             ← Übersicht mit Links
├── ref-haustueren.html         ← 26 Slider
├── ref-fenster.html            ← 10 Slider
├── ref-nebeneingang.html       ← 5 Slider
│
├── ueber-uns.html
├── musterraum.html
├── kontakt.html
│
└── assets/
    ├── logo/, team/, musterraum/
    ├── haustueren_ba/          ← 6 Vorher/Nachher Bilder
    ├── haustueren_beispiele/   ← 54 Referenzfotos
    ├── fenster_beispiele/      ← 27 Referenzfotos
    ├── nebeneingang_ba/        ← 11 Vorher/Nachher Bilder
    ├── wintergarten/           ← 12 Projektfotos
    ├── vordaecher/             ← 13 Vordachfotos
    ├── misc/, services/
    └── videos/
        ├── zwick-fenster-technik.mp4   ← 62MB — allgemeines Firmenvideo
        ├── zwick-haustueren.mp4        ← 60MB — Haustüren-Video
        └── zwick-wintergarten.mp4      ← 66MB — Wintergarten-Video
```

> ⚠️ **Hinweis Videos:** Alle drei MP4s sind ~60–66 MB. Vor dem Live-Gang sollten sie für Web komprimiert werden (Ziel: < 10 MB, H.264, 1080p). Im lokalen Entwicklungsumfeld funktionieren sie direkt so.

---

## CI / Design-System

```css
/* Farben */
--anthrazit:   #57585a;   /* Text, Headlines, Nav-Hintergrund */
--teal:        #009475;   /* Buttons, CTAs, Akzente, Slider-Handle */
--bg:          #f7f4f4;   /* Seitenhintergrund */
--bg-alt:      #eae9e9;   /* Karten, Boxen */
--weiss:       #ffffff;
--text-dunkel: #1a1a1a;

/* Typografie */
font-family: 'Inter', sans-serif;   /* Google Fonts: 400, 600, 700 */
/* Keine weiteren Fonts — kein Open Sans, kein JetBrains Mono */

/* Breakpoints */
--mobile:  768px;
--tablet: 1024px;
```

---

## Shared Components

### Header (jede Seite identisch)
```
[Logo]  Leistungen▾  Referenzen▾  Über uns  Musterraum  [📞 08207/731 4000]  [Anfragen →]
```
- Sticky, `position: sticky; top: 0`
- Hintergrund: `--anthrazit`, weiße Schrift
- Mobile: Hamburger rechts, Logo links
- Dropdown "Leistungen": Fenster, Haustüren, Wintergarten, Vordächer, Nebeneingangstüren, Reparaturen, Sicherheit, Kundendienst
- Dropdown "Referenzen": Haustüren-Beispiele, Fenster-Beispiele, Nebeneingang-Beispiele

### Footer (jede Seite identisch)
- 4 Spalten: Leistungen | Referenzen | Firma | Kontakt
- Adressen: Affing-Mühlhausen (Fenster) + Augsburg (Wintergarten)
- E-Mails: info@zwick-fenster.de / info@zwick-wintergarten.de
- Impressum, Datenschutz
- Mobile: 2×2 Grid, dann 1 Spalte

### Sticky Mobile CTA
- Fixiert am unteren Rand, nur auf Mobile (`< 768px`)
- Zwei Buttons nebeneinander: `[📞 Anrufen]` `[Anfrage senden]`
- Hintergrund: `--anthrazit`

---

## Before/After Drag-Slider (`before-after.js`)

### HTML-Markup (pro Slider-Instanz)
```html
<div class="ba-slider">
  <div class="ba-before">
    <img src="..." alt="Vorher" loading="lazy">
    <span class="ba-label">Vorher</span>
  </div>
  <div class="ba-after">
    <img src="..." alt="Nachher" loading="lazy">
    <span class="ba-label">Nachher</span>
  </div>
  <div class="ba-handle" aria-label="Schieberegler">
    <div class="ba-line"></div>
    <div class="ba-circle">⇔</div>
  </div>
</div>
```

### Verhalten
- Handle startet bei 50% (Mitte)
- Pointer Events API (Mouse + Touch unified, keine doppelten Handler)
- `touch-action: none` auf Handle (verhindert Seiten-Scroll beim Ziehen)
- Passive Event Listener auf Container (Scroll bleibt flüssig)
- Handle: 44×44px, Farbe `--teal`, Circle-Form
- Auf Mobile: Handle auf 52px für bessere Touch-Zielgröße
- Labels "Vorher"/"Nachher" erscheinen oben links/rechts, weißer Text mit dunklem Semi-Backdrop

### Initialisierung
```js
// Automatisch alle .ba-slider auf der Seite initialisieren
document.querySelectorAll('.ba-slider').forEach(initSlider);
```

---

## Navigation (`nav.js`)

### Desktop
- Hover über "Leistungen" → Dropdown erscheint (CSS transition, 200ms)
- Dropdown verschwindet bei Mausaustritt aus dem Bereich (mit 100ms Delay)
- Aktive Seite im Dropdown hervorgehoben (`color: --teal`)

### Mobile (< 768px)
- Hamburger-Button öffnet Overlay-Menü (slideDown, 250ms)
- "Leistungen" und "Referenzen" sind klickbar und klappen auf (Accordion)
- Schließt bei: Klick auf Link, Klick außerhalb, ESC-Taste
- Kein Scroll wenn Menü offen (`body overflow: hidden`)

---

## Seitenspezifikationen

### index.html — Startseite
**Sektionen (von oben nach unten):**
1. **Hero** — Vollbild-Hintergrundbild (`assets/hero_haustuer.jpg`), dunkler Overlay, Headline: *"Fenster. Haustüren. Wintergärten."*, Subtext, 2 CTAs: `[Jetzt anfragen]` `[Musterraum besuchen]`
2. **Trust-Bar** — 4 Stats: 68 Jahre Erfahrung | 2. Generation | 300m² Musterraum | 2 Spezialisten
3. **Leistungen** — 4 Kacheln (Fenster, Haustüren, Wintergarten, Vordächer) mit Icon, Kurztext, Link
4. **Before/After Highlight** — 3 Drag-Slider (beste Haustüren-Paare), Überschrift: *"Die Verwandlung von Alt auf Neu"*, CTA: "Alle Beispiele ansehen →"
5. **Firmenvideo** — `assets/videos/zwick-fenster-technik.mp4` eingebettet mit `<video controls poster="assets/misc/fenster-erklaervideo-thumbnail.jpg" preload="none">`. Überschrift: *"Zwick Fenster-Technik — wer wir sind"*
6. **Kundenstimmen** — 3 Zitate als Karten mit Sternchen
7. **Team-Teaser** — Foto Alexander Gäßler + Cookie der Hund, kurzer Text, Link zu Über uns
8. **Musterraum-CTA** — Breite Sektion, Hintergrund `--anthrazit`, Button "Termin vereinbaren"

### haustueren.html — Haustüren
1. **Hero** — `assets/misc/hero-haustuere.jpg`, Headline: *"Haustüren — wirkungsvoll, hochwertig und sicher"*
2. **Intro** — Text aus brief.md: Visitenkarte des Hauses, Qualitätsversprechen
3. **Checkliste CTA** — E-Mail-Feld: *"Holen Sie sich unsere Haustür-Checkliste"*
4. **Konfigurator CTA** — Bild `haustueren-konfigurator.png`, Text, Button: *"Jetzt konfigurieren →"*
5. **3 Before/After Slider** — slider1/2/3 aus `assets/haustueren_ba/`
6. **"Mehr Beispiele"** — Link-Box zu ref-haustueren.html
7. **Video** — `assets/videos/zwick-haustueren.mp4` mit `<video controls preload="none" poster="assets/misc/hero-haustuere.jpg">`. Überschrift: *"Sehen Sie selbst — Haustüren von Zwick"*
8. **Kundenstimmen** — 3 haustürenspezifische Zitate
9. **Musterraum CTA**

### fenster.html — Fenster
1. Hero, Intro-Text
2. **Fenstertypen** — 3 Kacheln: Kunststoff | Kunststoff/Alu | Holz/Alu
3. **YouTube Video** — `https://www.youtube.com/watch?v=iuhRYxDkOok` (lazy-embed: nur Thumbnail bis Klick)
4. **Partner-Logos** — aluplast + IDEAL
5. **3 Before/After Slider** — Paare aus `assets/fenster_beispiele/`: image1-1/image2-1, image3-1/image4-1, image13-1/image14-1
6. Link zu ref-fenster.html, Kundenstimmen, Musterraum CTA

### wintergarten.html — Wintergarten
1. Hero (`assets/wintergarten/datzmann1.jpg`)
2. **Klimadach-Feature** — Vorteile: kein Hitzestau, keine Beschattung, Dachterrasse möglich
3. **Video** — `assets/videos/zwick-wintergarten.mp4` mit `<video controls preload="none" poster="assets/wintergarten/datzmann1.jpg">`. Überschrift: *"Ihr Wintergarten von Zwick — so entsteht er"*
4. **Projekte-Galerie** — Datzmann, Killermann, Siegmund (je 3 Fotos als Kacheln, Klick öffnet einfaches CSS-Modal ohne externe Library)
5. **FAQ** — Accordion: Erstberatung kostenlos? | Fundament nötig? | Wie lange dauert's?
6. **Reparatur-Link** — Teaser-Box am Ende der Seite mit Link zu `kundendienst.html` (dort ist eine Sektion "Wintergarten-Reparatur" mit den Bildern aus `assets/wintergarten/`)
7. Kontakt CTA

### vordaecher.html — Vordächer
1. Hero
2. **Preisinfo** — *"Ab 3.500 € All-Inclusive — inkl. Montage & MwSt."*
3. **Modell-Galerie** — 9 Modelle als klickbare Karten (Calypso, Galaxy, Juwel, Comet, Phönix, Venus, Neptun, Sirius, Calypso 1) mit Produktbild + Name + Kurzbeschreibung
4. **Material-Infos** — Verbundsicherheitsglas, Edelstahl/Aluminium
5. **Galerie** — Installationsfotos aus `assets/vordaecher/`
6. Kontakt CTA

### ref-haustueren.html — Referenzen Haustüren
1. Intro: *"Die Verwandlung von Alt auf Neu — Schieberegler bewegen"*
2. **26 Before/After Drag-Slider** in 2er-Grid (Desktop), 1er-Grid (Mobile)
3. Jedes Paar: Bilder aus `assets/haustueren_beispiele/` (image1/2, image3/4, ...)

### ref-fenster.html — Referenzen Fenster
1. Intro
2. **10 Before/After Drag-Slider** in 2er-Grid

### ref-nebeneingang.html — Referenzen Nebeneingang
1. Intro
2. **5 Before/After Drag-Slider**

### referenzen.html — Referenzen Übersicht
1. **3 Kategorien-Karten**: Haustüren (26 Beispiele), Fenster (10 Beispiele), Nebeneingang (5 Beispiele)
2. Je mit Vorschau-Slider (erster Slider der Kategorie) und Link zur Detail-Seite

### ueber-uns.html — Über uns
1. **Team-Sektion** — Alexander Gäßler, Sabrina Gäßler, Christian Neumann, Dustin Neumann, Daniela Weber, Cookie der Hund 🐕
2. **Geschichte-Timeline** — 1958 → 1960er → 1970 → Schnelltausch → Wintergarten → heute
3. **Kernwerte** — Zuverlässig, Innovativ, Kundenorientiert
4. Musterraum CTA

### musterraum.html — Musterraum
1. Headline: *"Termine im Musterraum"*
2. **Foto-Galerie** — 5 neue 2025er Bilder aus `assets/musterraum/Musterraum1-5.jpg`
3. Beschreibungstext + Was erwartet Sie (Haustüren & Fenster / Wintergarten)
4. **Terminanfrage-Formular** — Name, Telefon, Bereich, Nachricht

### kontakt.html — Kontakt
1. **2 Kontakt-Bereiche nebeneinander**:
   - Links: Fenster/Haustüren — Affing-Mühlhausen, 08207/731 4000, info@zwick-fenster.de
   - Rechts: Wintergarten — Augsburg, 0821/27275, info@zwick-wintergarten.de
2. Kontaktformular (Name, Telefon, E-Mail, Bereich-Auswahl, Nachricht)
3. Google Maps Embed (Affing-Mühlhausen)

### nebeneingang.html, reparaturen.html, sicherheit.html, kundendienst.html
- Standard-Aufbau: Hero, Beschreibungstext, relevante Bilder/Videos, Kontakt CTA
- sicherheit.html: YouTube Video `5OhhhNo-wFI` (lazy-embed)
- reparaturen.html: Stundenverrechnungssatz €77,35, Musterrechnung-Hinweis

---

## Mobile-Regeln (verbindlich)

- Alle Grids → 1 Spalte unter 768px
- Schriftgröße min. 16px (kein Zoom nötig auf iOS)
- Touch-Targets min. 44×44px
- Kein horizontales Scrollen
- Bilder: `loading="lazy"`, `width` + `height` Attribute gesetzt
- YouTube: Lazy-Embed (nur Thumbnail + Play-Button, iframe erst bei Klick)
- Slider: `touch-action: none` auf Handle, passiver Listener auf Container

---

## Was wir NICHT bauen

- Kein WordPress, kein CMS, kein Build-Tool
- Keine externen JS-Libraries (kein jQuery, kein Swiper)
- Kein Cookie-Banner (wird separat entschieden)
- Keine Backend-Logik für Formulare (Formulare zeigen Bestätigung, kein echter Submit)
- Keine Lightbox-Library — einfaches Modal mit CSS falls nötig
