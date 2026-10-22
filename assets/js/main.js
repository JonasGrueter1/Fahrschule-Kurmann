/* Fahrschule Kurmann, Interaktionen */
(function () {
  'use strict';

  // Address is assembled here so it does not sit in the HTML for spam bots
  var MAIL = ['fahrschule-kurmann', 'bluewin.ch'].join('@');

  var header = document.querySelector('.site-header');
  var nav = document.getElementById('main-nav');
  var toggle = document.querySelector('.nav-toggle');

  /* E-Mail-Links */
  document.querySelectorAll('[data-mail]').forEach(function (link) {
    link.href = 'mailto:' + MAIL;
    link.textContent = MAIL;
  });

  /* Jahr im Footer */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Header-Schatten beim Scrollen */
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile Navigation */
  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* Aktiven Menüpunkt markieren */
  var navLinks = nav ? nav.querySelectorAll('ul a[href^="#"]') : [];
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove('is-active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* Tabs Weg zum Billett */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) {
        panel.hidden = !selected;
        if (selected) panel.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
      }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });
  if (tabs.length) selectTab(tabs[0]);
  document.querySelectorAll('[data-tab-target]').forEach(function (link) {
    link.addEventListener('click', function () {
      var tab = document.getElementById('tab-' + link.getAttribute('data-tab-target'));
      if (tab) selectTab(tab);
    });
  });

  /* Kostenrechner */
  var PRICE = { lesson: 90, admin: 80, vku: 250, theory: 50 };
  var chf = new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 });
  var money = function (n) { return chf.format(n) + '.–'; };
  var range = document.getElementById('calc-lessons');
  if (range) {
    var vku = document.getElementById('calc-vku');
    var theory = document.getElementById('calc-theory');
    var updateCalc = function () {
      var n = parseInt(range.value, 10);
      var lessons = n * PRICE.lesson;
      var total = lessons + PRICE.admin +
        (vku.checked ? PRICE.vku : 0) +
        (theory.checked ? PRICE.theory : 0);
      document.getElementById('calc-lessons-out').textContent = n;
      document.getElementById('calc-lessons-calc').textContent = n + ' × ' + money(PRICE.lesson);
      document.getElementById('calc-lessons-sum').textContent = money(lessons);
      document.getElementById('calc-vku-line').hidden = !vku.checked;
      document.getElementById('calc-theory-line').hidden = !theory.checked;
      document.getElementById('calc-total').textContent = 'CHF ' + money(total);
      var fill = (n - range.min) / (range.max - range.min) * 100;
      range.style.setProperty('--fill', fill + '%');
      range.setAttribute('aria-valuetext', n + ' Lektionen');
    };
    [range, vku, theory].forEach(function (el) { el.addEventListener('input', updateCalc); });
    updateCalc();
  }

  /* Anmelde-Buttons füllen das Thema im Formular vor */
  var topic = document.getElementById('f-topic');
  document.querySelectorAll('[data-topic]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!topic) return;
      var value = btn.getAttribute('data-topic');
      Array.prototype.forEach.call(topic.options, function (o) {
        if (o.value === value || o.text === value) topic.value = o.value;
      });
    });
  });

  /* Kontaktformular: erstellt eine fertige E-Mail */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    var showError = function (input, message) {
      var field = input.closest('.field');
      field.classList.add('has-error');
      input.setAttribute('aria-invalid', 'true');
      if (!field.querySelector('.field-error')) {
        var err = document.createElement('span');
        err.className = 'field-error';
        err.id = input.id + '-error';
        err.textContent = message;
        field.appendChild(err);
        input.setAttribute('aria-describedby', err.id);
      }
    };
    var clearError = function (input) {
      var field = input.closest('.field');
      field.classList.remove('has-error');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      var err = field.querySelector('.field-error');
      if (err) err.remove();
    };

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () { clearError(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (input) {
        clearError(input);
        if (!input.value.trim()) {
          showError(input, 'Bitte ausfüllen.');
          firstInvalid = firstInvalid || input;
        }
      });
      var email = form.elements.email;
      clearError(email);
      if (email.value.trim() && !email.checkValidity()) {
        showError(email, 'Bitte eine gültige E-Mail-Adresse eingeben.');
        firstInvalid = firstInvalid || email;
      }
      if (firstInvalid) { firstInvalid.focus(); return; }

      var v = function (name) { return form.elements[name].value.trim(); };
      var birthday = v('birthday');
      if (birthday) {
        var parts = birthday.split('-');
        if (parts.length === 3) birthday = parts[2] + '.' + parts[1] + '.' + parts[0];
      }
      var lines = [
        'Anliegen: ' + v('topic'),
        '',
        'Vorname: ' + v('firstname'),
        'Name: ' + v('lastname'),
        'Telefon: ' + v('phone'),
        'E-Mail: ' + (v('email') || '-'),
        'PLZ / Ort: ' + (v('city') || '-'),
        'Geburtsdatum: ' + (birthday || '-'),
        'Reg.-Nummer: ' + (v('reg') || '-'),
        '',
        'Nachricht:',
        v('message') || '-'
      ];
      var subject = 'Anfrage Website: ' + v('topic');
      var body = lines.join('\n');
      var href = 'mailto:' + MAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      status.hidden = false;
      status.innerHTML =
        '<strong>Fast geschafft!</strong>' +
        'Dein E-Mail-Programm sollte sich jetzt mit der fertigen Nachricht öffnen. Du musst sie nur noch absenden. ' +
        'Hat sich nichts geöffnet? Kopiere den Text und schick ihn an <a href="mailto:' + MAIL + '">' + MAIL + '</a>.' +
        '<br><button type="button" class="btn btn-outline btn-sm" data-copy>Text kopieren</button>';
      status.querySelector('[data-copy]').addEventListener('click', function (ev) {
        var btn = ev.currentTarget;
        var text = subject + '\n\n' + body;
        var done = function () { btn.textContent = 'Kopiert'; };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
        } else {
          fallbackCopy(text);
          done();
        }
      });

      window.location.href = href;
    });
  }

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

  /* Elemente beim Scrollen einblenden */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
