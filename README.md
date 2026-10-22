# Fahrschule Kurmann, Designvorschläge

Zwei Designvorschläge für die Startseite der neuen Website der Fahrschule Kurmann, dazu eine Wunschliste, in der Herr Kurmann Design, Seiten und Funktionen auswählt. Die ganze Website mit allen Unterseiten entsteht erst nach der Designwahl.

Reines HTML, CSS und JavaScript, ohne Baukasten und ohne Build-Schritt.

## Aufbau

```
index.html            Übersicht: beide Designs nebeneinander, Link zur Wunschliste
design-a/             Design A «Klar und freundlich» (hell, warm, Schrift Manrope)
design-b/             Design B «Sportlich und markant» (dunkel, Schrift Archivo, Strassenmarkierung)
wunschliste/          Formular mit Live-Preis, Auswahl wird per E-Mail gesendet
assets/shared/        Vorschau-Leiste zum Wechseln zwischen den Designs, Grund-Design der Übersicht
assets/img/           Fotos und Logos (WebP), Vorschaubilder der Designs
assets/fonts/         Schriften lokal eingebunden (kein Google Fonts)
```

Die Menüpunkte in den Designs (Auto, Preise, Kontakt usw.) zeigen bewusst nur einen Hinweis an, dass die Unterseite nach der Designwahl folgt.

## Lokal ansehen

```
npx http-server .
```

Dann im Browser `http://localhost:8080` öffnen.

## Online ansehen mit GitHub Pages

1. Im Repository auf **Settings > Pages**
2. Bei *Source* **Deploy from a branch** wählen, den Branch mit den Designs und den Ordner `/ (root)`
3. Nach 1 bis 2 Minuten läuft die Seite unter `https://jonasgrueter1.github.io/Fahrschule-Kurmann/`

Alle Seiten sind auf `noindex` gestellt und `robots.txt` sperrt Suchmaschinen, damit die Entwürfe nicht bei Google auftauchen.

## Wunschliste anpassen

Jede Option hat im HTML ein Attribut `data-hours` mit den Stunden. Der Preis daneben und das Total werden daraus mit dem Stundenansatz berechnet. Der Stundenansatz (`RATE`) und die Empfänger-Adresse (`MAIL`) stehen oben in `wunschliste/app.js`.

Mit der Standard-Auswahl ergibt die Wunschliste genau die Offerte: 48.5 Stunden à CHF 35, also CHF 1'697.50.

## Credits

* Schriften: [Manrope](https://github.com/sharanda/manrope) und [Archivo](https://github.com/Omnibus-Type/Archivo), beide SIL Open Font License 1.1
* Icons: [Tabler Icons](https://tabler.io/icons), MIT-Lizenz
