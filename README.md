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
  phone: "31644523965",              // WhatsApp-Nummer, nur Ziffern, mit Ländercode
  phoneDisplay: "+31 6 44 52 39 65", // wie sie angezeigt wird
  email: "contactus@dockoutdoors.com"
};
```
> `phoneDisplay` erscheint im Footer/Kontaktbereich zusätzlich als Text — wenn du die
> Nummer änderst, passe sie auch dort in `index.html` an (drei Stellen).

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
- **Trust-Elemente**: unverwüstliche Zarges®-Box, weltweiter Versand,
  „gebaut für ein Leben lang", persönlicher Direktkontakt.
- **Einwandbehandlung**: technische Daten, „was ist (nicht) dabei", ausführliche FAQ.
- **Klarer Funnel**: Preis wird offen gezeigt (qualifiziert Anfragen), Abschluss bewusst
  über persönlichen Kontakt statt Warenkorb.
- **SEO/Sharing**: Title, Meta-Description und Open-Graph-Tags sind gesetzt.

## Analytics / Klick-Tracking (first-party, ohne Cookie-Banner)

Jeder Klick auf einen **WhatsApp- oder E-Mail-Button** sendet einen winzigen
first-party „Pixel"-Aufruf an einen eigenen Pfad:

```
/px/<method>/<placement>?product=<…>&lang=<…>
z. B.  /px/whatsapp/hero?product=kitchen&lang=de
       /px/email/final_cta?product=kitchen&lang=en
```

- `method` → `whatsapp` | `email`
- `placement` → `hero`, `nav`, `price_section`, `final_cta`, `footer`, `floating_button`, `accessories`
- `product` → `kitchen` | `case_top`  ·  `lang` → `en` | `de` | `nl`

Beantwortet wird der Aufruf von `functions/px/[[path]].js` (Cloudflare Pages Function)
mit `204 No Content`. Es werden **keine Cookies gesetzt, keine Drittanbieter geladen,
kein Consent-Banner** benötigt.

**So siehst du die Klicks in Cloudflare:**
1. Dashboard → deine Domain → **Analytics → HTTP Traffic** (bzw. **Traffic**).
2. Nach **Path** filtern, das `/px/` enthält → das ist die Zahl deiner Button-Klicks.
   Über die einzelnen Pfade (`/px/whatsapp/hero` …) siehst du Methode + Platzierung.
3. Für Besucher/Seitenaufrufe zusätzlich **Analytics → Web analytics** aktivieren
   (ebenfalls ohne Cookie-Banner).

> Optional: Der Code meldet denselben Klick zusätzlich als `contact_click`-Event an
> einen Tag-Manager, **falls** vorhanden (Cloudflare Zaraz `zaraz.track`, Google
> Analytics `gtag` oder GTM `dataLayer`). Ist keiner aktiv, passiert nichts — der
> `/px/`-Pixel oben funktioniert unabhängig davon.

## Hinweise

- Schrift „Oswald" + „Inter" werden von Google Fonts geladen (Internet nötig). Ohne
  Internet greift automatisch eine System-Schrift.
- Kontakt: WhatsApp `+31 6 44 52 39 65` und `contactus@dockoutdoors.com` (in `js/i18n.js` gepflegt).
- Marken wie Zarges®, Alutec®, Alubox®, Defender®, Coleman gehören ihren jeweiligen
  Eigentümern; sie werden nur zur Kompatibilitätsbeschreibung genannt.
