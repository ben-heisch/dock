# DOCK Outdoors — One-Pager Landing Page

Eine dreisprachige (EN / DE / NL) Verkaufs-Landingpage für die DOCK Campingküche.
Fokus: die Küche. Der Case Top ist sekundär eingebunden. Kein Online-Checkout —
alle Aktionen führen zu **WhatsApp** oder **E-Mail**.

## Projektstruktur

```
index.html          → die komplette Seite (Struktur/Inhalt)
css/styles.css      → gesamtes Design (Farben, Layout, responsive)
js/i18n.js          → alle Texte in EN / DE / NL + Kontaktdaten
js/main.js          → Sprachumschaltung, WhatsApp/E-Mail-Links, Interaktionen
assets/img/         → alle Bilder (von deiner Website übernommen)
.claude/launch.json → lokaler Vorschau-Server (nur für Entwicklung)
```

## Lokal ansehen

Die Seite braucht einen kleinen Webserver (nicht per Doppelklick öffnen, sonst
lädt der Sprachumschalter nicht sauber):

```bash
cd dockoutdoor
python3 -m http.server 4599
# dann im Browser: http://localhost:4599
```

## Online stellen (Hosting)

Es ist eine reine statische Seite — läuft überall. Einfach den **gesamten Ordner**
hochladen bei z. B. Netlify (Ordner ins Fenster ziehen), Vercel, GitHub Pages,
Cloudflare Pages oder klassischem Webspace (FTP). Kein Build, keine Datenbank nötig.

## Wichtige Dinge, die du selbst ändern kannst

### 1) Kontaktdaten (WhatsApp-Nummer & E-Mail)
In **`js/i18n.js`** ganz oben:

```js
window.CONTACT = {
  phone: "31612345678",              // WhatsApp-Nummer, nur Ziffern, mit Ländercode
  phoneDisplay: "+31 6 12 34 56 78", // wie sie angezeigt wird
  email: "info@dockoutdoors.com"
};
```
> Die aktuell hinterlegte Nummer `+31 6 12345678` ist ein Platzhalter aus unserem
> Gespräch — bitte durch die echte Geschäftsnummer ersetzen. `phoneDisplay` erscheint
> im Footer/Kontaktbereich zusätzlich als Text (dort ggf. auch anpassen in `index.html`).

### 2) Preis
Steht in `index.html` (Suche nach `€990`) und ist zusätzlich in den FAQ/Angebotstexten
in `js/i18n.js` erwähnt. Bei Preisänderung beide Stellen prüfen.

### 3) Texte / Übersetzungen
Alle sichtbaren Texte liegen in **`js/i18n.js`** in den Blöcken `en`, `de`, `nl`.
Gleiche „Key"-Namen in allen drei Sprachen ändern, dann bleibt alles konsistent.

### 4) Standardsprache
In **`js/main.js`**: `var DEFAULT = "en";` — hier steht Englisch als Start.
Möchtest du, dass die Seite stattdessen automatisch die Browsersprache des Besuchers
wählt (Deutscher sieht Deutsch usw.), setze `var AUTODETECT = false;` auf `true`.

### 5) Social-Media-Links
In `index.html` im Footer (`footer__social`) die `href="https://www.facebook.com/..."`
durch deine echten Profil-URLs ersetzen.

### 6) Bilder / Kundenfotos
Liegen in `assets/img/` mit sprechenden Namen (`owner-slovenia.jpg`,
`kitchen-open.png` usw.). Zum Austauschen einfach die Datei mit gleichem Namen
ersetzen. Die Galerie-Bilder werden in `index.html` im Abschnitt `#gallery` referenziert.

## Umgesetzte Verkaufs-Best-Practices

- **Ein dominanter CTA** (WhatsApp, grün) plus E-Mail als Alternative — mehrfach auf der Seite,
  inkl. schwebendem WhatsApp-Button auf Mobil und vorausgefüllter Nachricht.
- **Social Proof**: echte Owner-Galerie mit Länder-Captions + „im Einsatz auf 5 Kontinenten",
  Länderflaggen-Leiste, Kennzahlen (5 Kontinente, 20+ Länder, seit 2016).
- **Trust-Elemente**: unverwüstliche Zarges®-Box, CE-Fertigung, weltweiter Versand,
  „gebaut für ein Leben lang", persönlicher Direktkontakt.
- **Einwandbehandlung**: technische Daten, „was ist (nicht) dabei", ausführliche FAQ.
- **Klarer Funnel**: Preis wird offen gezeigt (qualifiziert Anfragen), Abschluss bewusst
  über persönlichen Kontakt statt Warenkorb.
- **SEO/Sharing**: Title, Meta-Description und Open-Graph-Tags sind gesetzt.

## Hinweise

- Schrift „Oswald" + „Inter" werden von Google Fonts geladen (Internet nötig). Ohne
  Internet greift automatisch eine System-Schrift.
- Die WhatsApp-Nummer ist ein Platzhalter — vor dem Livegang ersetzen.
- Marken wie Zarges®, Alutec®, Alubox®, Defender®, Coleman gehören ihren jeweiligen
  Eigentümern; sie werden nur zur Kompatibilitätsbeschreibung genannt.
