/* Wunschliste: Preis live berechnen und Auswahl per E-Mail senden */
(function () {
  'use strict';

  var RATE = 35;
  // Assembled here so the address does not sit in the HTML for spam bots
  var MAIL = ['j_grueter', 'bluewin.ch'].join('@');

  var form = document.getElementById('wish');
  var $ = function (id) { return document.getElementById(id); };
  var num = new Intl.NumberFormat('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var chf = function (hours) { return 'CHF ' + num.format(hours * RATE); };

  document.querySelectorAll('[data-mail]').forEach(function (a) {
    a.href = 'mailto:' + MAIL;
    a.textContent = MAIL;
  });

  // Prices shown next to each item come from data-hours, so they always match the total
  document.querySelectorAll('[data-hours]').forEach(function (el) {
    var cost = el.closest('li, label').querySelector('.cost');
    if (cost) cost.textContent = chf(parseFloat(el.getAttribute('data-hours')));
  });

  var hoursOf = function (els) {
    return Array.prototype.reduce.call(els, function (sum, el) { return sum + parseFloat(el.getAttribute('data-hours')); }, 0);
  };
  var baseHours = hoursOf(document.querySelectorAll('#base [data-hours]'));

  var selection = function () {
    var design = form.querySelector('input[name="design"]:checked');
    var pages = form.querySelectorAll('input[name="seite"]:checked');
    var features = form.querySelectorAll('input[name="funktion"]:checked');
    var pageHours = hoursOf(pages);
    var featureHours = hoursOf(features);
    return {
      design: design ? design.value : '',
      pages: pages, features: features,
      pageHours: pageHours, featureHours: featureHours,
      total: baseHours + pageHours + featureHours
    };
  };

  var update = function () {
    var s = selection();
    var d = $('s-design');
    d.textContent = s.design ? s.design.split(':')[0] : 'noch nicht gewählt';
    d.classList.toggle('is-set', !!s.design);
    $('s-base').textContent = chf(baseHours);
    $('s-pages').textContent = chf(s.pageHours);
    $('s-pages-n').textContent = '(' + s.pages.length + ')';
    $('s-feat').textContent = chf(s.featureHours);
    $('s-feat-n').textContent = '(' + s.features.length + ')';
    $('s-total').textContent = chf(s.total);
    $('m-total').textContent = chf(s.total);
    $('s-hours').textContent = String(s.total);
    if (s.design) {
      $('design-error').hidden = true;
      $('designs').closest('.block').classList.remove('has-error');
    }
  };
  form.addEventListener('change', update);
  update();

  $('print').addEventListener('click', function () { window.print(); });

  var nameInput = $('f-name');
  nameInput.addEventListener('input', function () {
    nameInput.closest('.field').classList.remove('has-error');
    var err = nameInput.closest('.field').querySelector('.field-error');
    if (err) err.remove();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var s = selection();
    var firstProblem = null;

    if (!s.design) {
      $('design-error').hidden = false;
      $('designs').closest('.block').classList.add('has-error');
      firstProblem = $('designs');
    }
    if (!nameInput.value.trim()) {
      var field = nameInput.closest('.field');
      field.classList.add('has-error');
      if (!field.querySelector('.field-error')) {
        var err = document.createElement('span');
        err.className = 'field-error';
        err.textContent = 'Bitte geben Sie Ihren Namen an.';
        field.appendChild(err);
      }
      firstProblem = firstProblem || nameInput;
    }
    if (firstProblem) {
      firstProblem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (firstProblem === nameInput) nameInput.focus({ preventScroll: true });
      return;
    }

    var list = function (els) {
      if (!els.length) return ['  keine'];
      return Array.prototype.map.call(els, function (el) {
        return '  ' + el.value + ': ' + chf(parseFloat(el.getAttribute('data-hours')));
      });
    };
    var v = function (name) { return (form.elements[name].value || '').trim(); };
    var lines = [
      'Design: ' + s.design,
      '',
      'Grundpaket: ' + chf(baseHours),
      '',
      'Seiten:'
    ].concat(list(s.pages), ['', 'Funktionen:'], list(s.features), [
      '',
      'Total: ' + chf(s.total) + ' (' + String(s.total) + ' Stunden à CHF ' + RATE + ')',
      '',
      'Termin: ' + v('termin'),
      'Fotos: ' + v('fotos'),
      'Bemerkungen: ' + (v('bemerkungen') || '-'),
      '',
      'Name: ' + v('name'),
      'Telefon: ' + (v('telefon') || '-'),
      'E-Mail: ' + (v('email') || '-')
    ]);
    var subject = 'Wunschliste neue Website Fahrschule Kurmann';
    var body = lines.join('\n');

    var status = $('status');
    status.hidden = false;
    status.textContent = '';
    var strong = document.createElement('strong');
    strong.textContent = 'Fast geschafft!';
    var text = document.createElement('span');
    text.textContent = 'Ihr E-Mail-Programm öffnet sich mit der fertigen Nachricht. Sie müssen sie nur noch absenden. Hat sich nichts geöffnet? Kopieren Sie den Text und senden Sie ihn an ';
    var link = document.createElement('a');
    link.href = 'mailto:' + MAIL;
    link.textContent = MAIL;
    var copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'btn';
    copy.textContent = 'Text kopieren';
    copy.addEventListener('click', function () {
      var all = subject + '\n\n' + body;
      var done = function () { copy.textContent = 'Kopiert'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(all).then(done, function () { fallbackCopy(all); done(); });
      } else { fallbackCopy(all); done(); }
    });
    status.append(strong, text, link, document.createTextNode('.'), document.createElement('br'), copy);

    window.location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (err) { /* nothing more we can do */ }
    ta.remove();
  }
})();
