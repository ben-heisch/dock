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

## Analytics / Klick-Tracking

Die Seite meldet jeden Klick auf einen **WhatsApp- oder E-Mail-Button** als Event
`contact_click` (in `js/main.js`). Das ist deine wichtigste Kennzahl: wie viele
Anfragen die Seite erzeugt. Jedes Event enthält:

| Feld | Werte |
|---|---|
| `method` | `whatsapp` \| `email` |
| `product` | `kitchen` \| `case_top` |
| `placement` | `hero`, `nav`, `price_section`, `final_cta`, `footer`, `floating_button`, `accessories` |
| `language` | `en` \| `de` \| `nl` |

Das Tracking ist herstellerneutral und meldet automatisch an das, was vorhanden ist —
ohne Tool passiert nichts (keine Fehler):

- **Cloudflare Zaraz** → `zaraz.track()` *(empfohlen, kostenlos, kein Code nötig)*
- Google Analytics (`gtag`) oder GTM (`dataLayer`), falls du sie später einbindest

**So siehst du die Events in Cloudflare:**
1. Cloudflare Dashboard → **Zaraz** → für die Domain aktivieren (Free-Tier).
2. Zaraz erfasst die `zaraz.track("contact_click", …)`-Aufrufe automatisch; du kannst
   sie dort einsehen und optional an andere Tools weiterleiten.
3. Für reine Seitenaufrufe zusätzlich **Web Analytics** aktivieren (siehe oben) —
   das braucht kein Cookie-Banner.

## Hinweise

- Schrift „Oswald" + „Inter" werden von Google Fonts geladen (Internet nötig). Ohne
  Internet greift automatisch eine System-Schrift.
- Kontakt: WhatsApp `+31 6 44 52 39 65` und `contactus@dockoutdoors.com` (in `js/i18n.js` gepflegt).
- Marken wie Zarges®, Alutec®, Alubox®, Defender®, Coleman gehören ihren jeweiligen
  Eigentümern; sie werden nur zur Kompatibilitätsbeschreibung genannt.
