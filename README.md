# Fahrschule Kurmann, Website

Neue Website der Fahrschule Kurmann in Sempach und Sursee. Reines HTML, CSS und JavaScript, ohne Baukasten und ohne Build-Schritt. Die Seite läuft auf jedem Webhosting und auch kostenlos auf GitHub Pages.

## Aufbau

```
index.html          Startseite mit allen Bereichen (Angebot, Ablauf, Motorrad, Kurse, Preise, Team, Standorte, Kontakt)
datenschutz.html    Datenschutzerklärung
impressum.html      Impressum
assets/css/         Design (style.css)
assets/js/          Menü, Tabs, Kostenrechner, Kontaktformular (main.js)
assets/img/         Bilder (WebP), Logos, Social-Media-Vorschaubild
assets/fonts/       Schrift Manrope, lokal eingebunden (kein Google Fonts)
favicon.svg         Browser-Icon
robots.txt, sitemap.xml
```

## Lokal ansehen

`index.html` im Browser öffnen genügt. Für einen Test wie online:

```
npx http-server .
```

## Inhalte ändern

1. **Preise:** In `index.html` im Bereich `<!-- Preise -->` die Beträge in den Tabellen anpassen. Wenn sich die Preise für Fahrlektion, Administration, VKU oder Theorie-Lernprogramm ändern, zusätzlich in `assets/js/main.js` die Werte bei `PRICE` anpassen, damit der Kostenrechner stimmt.
2. **Kursdaten und Zeiten:** Im Bereich `<!-- Kurse -->` in `index.html`.
3. **Telefonnummern und Adresse:** Kommen mehrfach vor (Header, Kontakt, Footer, Impressum). Am besten mit Suchen und Ersetzen über alle Dateien.
4. **E-Mail-Adresse:** Steht in `assets/js/main.js` ganz oben (`MAIL`). Sie wird erst im Browser zusammengesetzt, damit Spam-Bots sie nicht so leicht finden.

## Kontaktformular

Das Formular schickt keine Daten an einen Server. Beim Absenden öffnet sich das E-Mail-Programm der Besucherin oder des Besuchers mit der fertig ausgefüllten Nachricht an die Fahrschule. Falls sich kein E-Mail-Programm öffnet, kann der Text kopiert werden.

Wer Anfragen direkt per Formular empfangen möchte, kann später einen Formular-Dienst anbinden (zum Beispiel Formspree oder Web3Forms). Dann müssen auch die Datenschutzerklärung und der Hinweis unter dem Formular angepasst werden.

## Online stellen

**GitHub Pages:** Im Repository unter *Settings > Pages* bei *Source* den Branch wählen und als Ordner `/ (root)` angeben. Für die eigene Domain `kurmann-fahrschule.ch` dort die Domain eintragen und beim Domain-Anbieter die DNS-Einträge setzen.

**Bestehendes Hosting:** Alle Dateien per FTP in das Web-Verzeichnis hochladen.

## Vor dem Livegang prüfen

1. Preise und Kurszeiten mit der aktuellen Preisliste abgleichen
2. Theorie-Lernprogramm: Die alte Website nennt einmal CHF 50 (Preisliste) und einmal CHF 60 (Seite Auto). Übernommen wurde CHF 50.
3. Anhänger BE: Bedeutung von «eigener Anhänger CHF 10.–» klären (Zuschlag oder Rabatt)
4. Manövertraining Ballwil: Saisonstart und ob es weiterhin jeden Mittwoch stattfindet
5. Bilder der Motorradkategorien sind Herstellerbilder von der alten Website. Nutzungsrechte prüfen oder durch eigene Fotos ersetzen.
6. Datenschutzerklärung und Impressum durch die Fahrschule prüfen lassen
7. Foto von Priska Kurmann ergänzen (aktuell Initialen)

## Credits

* Schrift: [Manrope](https://github.com/sharanda/manrope), SIL Open Font License 1.1
* Icons: [Tabler Icons](https://tabler.io/icons), MIT-Lizenz
