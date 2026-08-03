/* =========================================================
   Kucharz IT-Solutions – main.js
   1) Mobile Navigation
   2) Jahr in der Fußzeile
   3) Formularprüfung + Versand über Web3Forms (ohne Seitenwechsel)
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1) Mobile Navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("hauptnavigation");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var offen = nav.classList.toggle("offen");
      toggle.setAttribute("aria-expanded", offen ? "true" : "false");
    });

    // Menü nach Klick auf einen Anker schließen
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("offen")) {
        nav.classList.remove("offen");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Mit Escape schließen
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("offen")) {
        nav.classList.remove("offen");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- 2) Jahr in der Fußzeile ---------- */
  var jahr = document.getElementById("jahr");
  if (jahr) { jahr.textContent = String(new Date().getFullYear()); }

  /* ---------- 3) Anfrageformular ---------- */
  var form = document.getElementById("anfrage-formular");
  if (!form) { return; }

  var status = document.getElementById("form-status");
  var button = form.querySelector('button[type="submit"]');

  // Wunschtermin: keine Termine in der Vergangenheit auswählbar
  var termin = document.getElementById("wunschtermin");
  if (termin) {
    var heute = new Date();
    termin.min = heute.toISOString().slice(0, 10);
  }

  var regeln = [
    { id: "name",         fehler: "name-fehler",         pruefe: function (el) { return el.value.trim().length >= 2; } },
    { id: "email",        fehler: "email-fehler",        pruefe: function (el) { return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(el.value.trim()); } },
    { id: "leistung",     fehler: "leistung-fehler",     pruefe: function (el) { return el.value !== ""; } },
    { id: "beschreibung", fehler: "beschreibung-fehler", pruefe: function (el) { return el.value.trim().length >= 10; } },
    { id: "datenschutz",  fehler: "datenschutz-fehler",  pruefe: function (el) { return el.checked; } }
  ];

  function meldungZeigen(id, sichtbar) {
    var el = document.getElementById(id);
    if (el) { el.hidden = !sichtbar; }
  }

  function feldPruefen(regel) {
    var el = document.getElementById(regel.id);
    if (!el) { return true; }
    var ok = regel.pruefe(el);
    el.setAttribute("aria-invalid", ok ? "false" : "true");
    meldungZeigen(regel.fehler, !ok);
    return ok;
  }

  // Fehlermeldung verschwindet, sobald der Nutzer korrigiert
  regeln.forEach(function (regel) {
    var el = document.getElementById(regel.id);
    if (!el) { return; }
    var ereignis = (el.type === "checkbox" || el.tagName === "SELECT") ? "change" : "input";
    el.addEventListener(ereignis, function () {
      if (el.getAttribute("aria-invalid") === "true") { feldPruefen(regel); }
    });
    el.addEventListener("blur", function () {
      if (el.value || el.checked) { feldPruefen(regel); }
    });
  });

  function statusSetzen(text, art) {
    if (!status) { return; }
    status.textContent = text;
    status.className = "form-status " + art;
    status.hidden = false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var ersterFehler = null;
    regeln.forEach(function (regel) {
      var ok = feldPruefen(regel);
      if (!ok && !ersterFehler) { ersterFehler = document.getElementById(regel.id); }
    });

    if (ersterFehler) {
      statusSetzen("Bitte prüfen Sie die rot markierten Felder.", "nok");
      ersterFehler.focus();
      return;
    }

    var key = form.querySelector('input[name="access_key"]');
    if (!key || key.value.indexOf("DEIN_WEB3FORMS") === 0) {
      statusSetzen(
        "Der Formularversand ist noch nicht eingerichtet (Web3Forms-Schlüssel fehlt). " +
        "Bitte tragen Sie den Access Key in index.html ein.",
        "nok"
      );
      return;
    }

    var daten = new FormData(form);
    button.disabled = true;
    var beschriftung = button.textContent;
    button.textContent = "Wird gesendet …";
    statusSetzen("Ihre Anfrage wird gesendet …", "");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: daten
    })
      .then(function (antwort) { return antwort.json(); })
      .then(function (ergebnis) {
        if (ergebnis && ergebnis.success) {
          form.reset();
          statusSetzen(
            "Vielen Dank für Ihre Anfrage! Sie ist bei mir eingegangen. " +
            "Ich melde mich innerhalb von 24 Stunden per E-Mail bei Ihnen zurück.",
            "ok"
          );
        } else {
          statusSetzen(
            "Die Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es " +
            "in einigen Minuten noch einmal.",
            "nok"
          );
        }
      })
      .catch(function () {
        statusSetzen(
          "Es gab ein Problem mit der Internetverbindung. Bitte prüfen Sie Ihre Verbindung " +
          "und versuchen Sie es noch einmal.",
          "nok"
        );
      })
      .then(function () {
        button.disabled = false;
        button.textContent = beschriftung;
        if (status) { status.scrollIntoView({ block: "nearest" }); }
      });
  });
})();
