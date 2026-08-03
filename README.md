# Kucharz IT-Solutions – Website

Statische Website für nebenberufliche IT-Dienstleistungen in Radolfzell am Bodensee
und Umgebung. Reines HTML, CSS und etwas JavaScript – ohne Build-Prozess, ohne
Frameworks, ohne laufende Kosten. Vorgesehen für Hosting über GitHub Pages.

## Dateien

| Datei | Aufgabe |
|---|---|
| `index.html` | Startseite mit allen Abschnitten: Hero, Leistungen, Ablauf, Preise, Verfügbarkeit, Über mich, FAQ, Anfrageformular |
| `impressum.html` | Impressum (**Entwurf mit Platzhaltern**) |
| `datenschutz.html` | Datenschutzerklärung (**Entwurf mit Platzhaltern**) |
| `assets/css/style.css` | Komplettes Design: Farben, Layout, Responsivität, Formularstile |
| `assets/js/main.js` | Mobile Navigation, Jahreszahl in der Fußzeile, Formularprüfung und Versand |
| `assets/img/logo.svg` | Logo für helle Flächen (Kopfbereich) |
| `assets/img/logo-hell.svg` | Logo für dunkle Flächen (Fußbereich) |
| `assets/img/favicon.svg` | Browser-Symbol |
| `assets/img/og-image.svg` | Vorschaubild für Links in Messengern und sozialen Netzwerken |
| `robots.txt`, `sitemap.xml` | Grundlagen für Suchmaschinen |
| `.nojekyll` | Verhindert, dass GitHub Pages die Dateien zusätzlich verarbeitet |

## Vor der Veröffentlichung erledigen

1. **Gewerbe anmelden.** Die Seite bietet Leistungen gegen Bezahlung an – sie sollte erst
   danach öffentlich gestellt werden.
2. **Nebentätigkeit klären** (Arbeitgeber im dualen Studium / Hochschule).
3. **Web3Forms-Schlüssel eintragen:** auf <https://web3forms.com> mit
   `kucharz.itsolutions@gmail.com` registrieren, den Access Key kopieren und in
   `index.html` den Wert `DEIN_WEB3FORMS_ACCESS_KEY` ersetzen.
   Die E-Mail-Adresse selbst steht dadurch **nirgends** im Quellcode.
4. **Impressum und Datenschutz ausfüllen:** alle `[ ]`-Platzhalter ersetzen.
   Eine vollständige Anschrift ist für eine geschäftliche Website Pflicht.
5. **Platzhalter-URL ersetzen:** `DEIN-GITHUB-NAME` in `index.html`, `robots.txt`
   und `sitemap.xml` durch den echten GitHub-Benutzernamen austauschen.
6. **Offene Entscheidung:** Im Abschnitt „Preise“ ist ein gelb markierter Platzhalter
   zur Mindestabrechnung enthalten. Entweder ausformulieren oder die Zeile löschen
   (`<li class="platzhalter">…</li>`).
7. **Name prüfen:** In „Über mich“ steht „Moritz Kucharz“. Bei Bedarf anpassen.

## Lokal ansehen

Die Datei `index.html` einfach im Browser öffnen – es ist kein Server nötig.

## Veröffentlichen über GitHub Pages (Weboberfläche)

1. GitHub-Konto anlegen bzw. anmelden.
2. **New repository** → Name z. B. `kucharz-it-solutions`, Sichtbarkeit **Public**,
   ohne README → **Create repository**.
3. **Add file → Upload files**: den *Inhalt* dieses Ordners hochladen
   (`index.html`, `impressum.html`, `datenschutz.html`, `robots.txt`, `sitemap.xml`,
   `.nojekyll` und den Ordner `assets`) – nicht den Ordner selbst verschachteln.
4. **Commit changes**.
5. **Settings → Pages** → Source: „Deploy from a branch“, Branch: `main`, Folder: `/ (root)`
   → **Save**.
6. Nach einigen Minuten ist die Seite erreichbar unter:
   `https://DEIN-GITHUB-NAME.github.io/kucharz-it-solutions/`
   HTTPS ist dabei automatisch aktiv („Enforce HTTPS“ anhaken).

## Veröffentlichen über die Kommandozeile (optional)

```bash
cd kucharz-it-solutions
git init
git add .
git commit -m "Erste Version der Website"
git branch -M main
git remote add origin https://github.com/DEIN-GITHUB-NAME/kucharz-it-solutions.git
git push -u origin main
```

Danach ebenfalls unter **Settings → Pages** den Branch `main` / `/ (root)` auswählen.

Späteres Aktualisieren:

```bash
git add .
git commit -m "Texte aktualisiert"
git push
```

## Eigene Domain (später)

1. Domain bei einem Anbieter registrieren.
2. Beim Anbieter einen `CNAME`-Eintrag für `www` auf `DEIN-GITHUB-NAME.github.io` setzen;
   für die Domain ohne `www` die vier A-Records von GitHub Pages eintragen.
3. In **Settings → Pages → Custom domain** die Domain eintragen (GitHub legt dabei eine
   Datei `CNAME` im Repository an) und **Enforce HTTPS** aktivieren.
4. Anschließend die Platzhalter-URLs in `index.html`, `robots.txt` und `sitemap.xml`
   auf die neue Domain umstellen.

## Später möglich: Supabase

Aktuell nicht nötig – das Formular reicht aus. Sinnvoll würde Supabase erst, wenn
Anfragen gespeichert, ein internes Dashboard, Terminverwaltung, Datei-Uploads oder
ein Kundenbereich gewünscht sind. Geheime Schlüssel dürfen dabei niemals im Frontend
oder in einem öffentlichen Repository landen.
