// ─────────────────────────────────────────────────────────────────
//  email-protect.js — Zaštita emaila od bot skenera
//  Dekodira obfuscirani email i upisuje ga u DOM pri učitavanju
// ─────────────────────────────────────────────────────────────────
(function () {
  function decode(b64) {
    try { return atob(b64); } catch(e) { return ''; }
  }

  function init() {
    document.querySelectorAll('a[data-em]').forEach(function (a) {
      var email = decode(a.getAttribute('data-em'));
      if (!email) return;
      a.href = 'mailto:' + email;
      var span = a.querySelector('.ep-addr');
      if (span) span.textContent = email;
      a.removeAttribute('data-em');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
