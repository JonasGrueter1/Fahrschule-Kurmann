# Fahrschule Kurmann, Designvorschläge

Zwei Designvorschläge für die Startseite der neuen Website der Fahrschule Kurmann, dazu eine Wunschliste, in der Herr Kurmann Design, Seiten und Funktionen auswählt. Die ganze Website mit allen Unterseiten entsteht erst nach der Designwahl.

Reines HTML, CSS und JavaScript, ohne Baukasten und ohne Build-Schritt.

## Aufbau

```
index.html            Übersicht: beide Designs nebeneinander, Link zur Wunschliste
design-a/             Design A «Klar und freundlich» (hell, warm, Schrift Manrope)
design-b/             Design B «Sportlich und markant» (dunkel, Schrift Archivo, Strassenmarkierung)
wunschliste/          Formular mit Live-Preis, Auswahl wird über Web3Forms direkt an Jonas gesendet
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

Jede Option hat im HTML ein Attribut `data-hours` mit den Stunden. Der Preis daneben und das Total werden daraus mit dem Stundenansatz berechnet. Der Stundenansatz (`RATE`), der Web3Forms-Schlüssel (`ACCESS_KEY`) und die Adresse für die Notlösung (`MAIL`) stehen oben in `wunschliste/app.js`.

Die Auswahl wird über [Web3Forms](https://web3forms.com) direkt per E-Mail verschickt, ohne dass das E-Mail-Programm aufgeht. Der Schlüssel darf öffentlich im Code stehen. Web3Forms nimmt im Gratis-Abo nur Anfragen aus einem echten Browser an, ein Test mit `curl` bekommt deshalb absichtlich einen Fehler 403. Ist der Dienst nicht erreichbar, zeigt die Wunschliste als Notlösung einen Knopf, der das E-Mail-Programm mit der fertigen Nachricht öffnet.

Mit der Standard-Auswahl ergibt die Wunschliste genau die Offerte: 48.5 Stunden à CHF 35, also CHF 1'697.50.

## Credits

* Schriften: [Manrope](https://github.com/sharanda/manrope) und [Archivo](https://github.com/Omnibus-Type/Archivo), beide SIL Open Font License 1.1
* Icons: [Tabler Icons](https://tabler.io/icons), MIT-Lizenz
