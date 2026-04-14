// ─────────────────────────────────────────────────────────────────
//  settings.js — Korisničke postavke za kriptovalute.hr
//  Avatar picker + Currency preference
// ─────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  var STORAGE_KEY = 'kriptoSettings';

  // 10 robot avatara s kripto temom
  var AVATARS = [
    { seed: 'satoshi',    label: 'Satoshi'    },
    { seed: 'vitalik',    label: 'Vitalik'    },
    { seed: 'hodl',       label: 'HODL'       },
    { seed: 'defi-king',  label: 'DeFi'       },
    { seed: 'bitcoin-og', label: 'Bitcoin'    },
    { seed: 'ethereum42', label: 'Ethereum'   },
    { seed: 'moonwalker', label: 'Moon'       },
    { seed: 'blockchain9',label: 'Chain'      },
    { seed: 'nakamoto77', label: 'Nakamoto'   },
    { seed: 'cryptopunk', label: 'Punk'       }
  ];

  // ── Storage ──────────────────────────────────────────────────
  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
             { avatar: 'satoshi', currency: 'eur', theme: 'dark' };
    } catch(e) {
      return { avatar: 'satoshi', currency: 'eur', theme: 'dark' };
    }
  }

  function saveSettings(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  // ── Avatar URL ───────────────────────────────────────────────
  function avatarUrl(seed) {
    return 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(seed) +
           '&backgroundColor=6c5ce7&radius=50';
  }

  // ── Primijeni temu ───────────────────────────────────────────
  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }

  // ── Ažuriraj navbar avatar ───────────────────────────────────
  function refreshNavAvatar(seed) {
    var el = document.getElementById('nav-user-avatar');
    if (!el) return;
    el.innerHTML = '<img src="' + avatarUrl(seed) +
      '" alt="Avatar" style="width:30px;height:30px;border-radius:50%;object-fit:cover;background:#1a1a2e;">';
  }

  // ── Primijeni valutu na trziste.html ─────────────────────────
  function applyCurrency(cur) {
    // Direktno ažuriraj trziste state ako je dostupan
    if (window.trziste && typeof window.trziste.setCurrency === 'function') {
      window.trziste.setCurrency(cur);
    }
    // Dispatchaj event za svaki slušač
    window.dispatchEvent(new CustomEvent('kriptoCurrencyChanged', { detail: { currency: cur } }));
  }

  // ── Inject modal HTML ────────────────────────────────────────
  function injectModal() {
    if (document.getElementById('kriptoSettingsModal')) return;

    var s = getSettings();
    var avatarGrid = AVATARS.map(function(av) {
      var selected = av.seed === s.avatar ? 'ks-av-selected' : '';
      return '<div class="ks-av-item ' + selected + '" data-seed="' + av.seed + '" title="' + av.label + '">' +
               '<img src="' + avatarUrl(av.seed) + '" alt="' + av.label + '" loading="lazy">' +
               '<span>' + av.label + '</span>' +
             '</div>';
    }).join('');

    var html = '<div id="kriptoSettingsModal" class="ks-overlay" role="dialog" aria-modal="true" aria-label="Postavke">' +
      '<div class="ks-card">' +
        '<div class="ks-header">' +
          '<h2 class="ks-title">Postavke</h2>' +
          '<button class="ks-close" id="ks-close-btn" aria-label="Zatvori">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +

        '<div class="ks-section">' +
          '<div class="ks-section-title">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
            'Avatar' +
          '</div>' +
          '<div class="ks-av-grid" id="ks-av-grid">' + avatarGrid + '</div>' +
        '</div>' +

        '<div class="ks-section">' +
          '<div class="ks-section-title">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' +
            'Valuta' +
          '</div>' +
          '<div class="ks-cur-group" id="ks-cur-group">' +
            '<button class="ks-cur-btn' + (s.currency === 'eur' ? ' active' : '') + '" data-cur="eur">' +
              '<span class="ks-cur-symbol">€</span> Euro' +
            '</button>' +
            '<button class="ks-cur-btn' + (s.currency === 'usd' ? ' active' : '') + '" data-cur="usd">' +
              '<span class="ks-cur-symbol">$</span> Dolar' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="ks-section">' +
          '<div class="ks-section-title">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' +
            'Tema' +
          '</div>' +
          '<div class="ks-cur-group" id="ks-theme-group">' +
            '<button class="ks-cur-btn' + (s.theme !== 'light' ? ' active' : '') + '" data-theme="dark">🌙 Tamna</button>' +
            '<button class="ks-cur-btn' + (s.theme === 'light' ? ' active' : '') + '" data-theme="light">☀️ Svijetla</button>' +
          '</div>' +
        '</div>' +

        '<div class="ks-footer">' +
          '<button class="ks-save-btn" id="ks-save-btn">Spremi postavke</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstChild);

    injectStyles();
    bindEvents();
  }

  // ── Bind events ───────────────────────────────────────────────
  function bindEvents() {
    // Zatvori
    var closeBtn = document.getElementById('ks-close-btn');
    var overlay  = document.getElementById('kriptoSettingsModal');
    if (closeBtn) closeBtn.addEventListener('click', hideSettings);
    if (overlay)  overlay.addEventListener('click', function(e) {
      if (e.target === overlay) hideSettings();
    });

    // Avatar odabir
    var grid = document.getElementById('ks-av-grid');
    if (grid) {
      grid.addEventListener('click', function(e) {
        var item = e.target.closest('.ks-av-item');
        if (!item) return;
        grid.querySelectorAll('.ks-av-item').forEach(function(el) {
          el.classList.remove('ks-av-selected');
        });
        item.classList.add('ks-av-selected');
      });
    }

    // Valuta odabir
    var curGroup = document.getElementById('ks-cur-group');
    if (curGroup) {
      curGroup.addEventListener('click', function(e) {
        var btn = e.target.closest('.ks-cur-btn');
        if (!btn) return;
        curGroup.querySelectorAll('.ks-cur-btn').forEach(function(b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    }

    // Tema odabir
    var themeGroup = document.getElementById('ks-theme-group');
    if (themeGroup) {
      themeGroup.addEventListener('click', function(e) {
        var btn = e.target.closest('.ks-cur-btn');
        if (!btn) return;
        themeGroup.querySelectorAll('.ks-cur-btn').forEach(function(b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    }

    // Spremi
    var saveBtn = document.getElementById('ks-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', saveAndClose);

    // ESC tipka
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') hideSettings();
    });
  }

  // ── Spremi i zatvori ─────────────────────────────────────────
  function saveAndClose() {
    var selectedAv    = document.querySelector('.ks-av-item.ks-av-selected');
    var selectedCur   = document.querySelector('#ks-cur-group .ks-cur-btn.active');
    var selectedTheme = document.querySelector('#ks-theme-group .ks-cur-btn.active');
    var seed  = selectedAv    ? selectedAv.dataset.seed      : 'satoshi';
    var cur   = selectedCur   ? selectedCur.dataset.cur      : 'eur';
    var theme = selectedTheme ? selectedTheme.dataset.theme  : 'dark';

    saveSettings({ avatar: seed, currency: cur, theme: theme });
    refreshNavAvatar(seed);
    applyCurrency(cur);
    applyTheme(theme);
    hideSettings();

    // Flash feedback
    var btn = document.getElementById('ks-save-btn');
    if (btn) {
      var orig = btn.textContent;
      btn.textContent = '✓ Spremljeno';
      btn.style.background = '#00d4aa';
      setTimeout(function() {
        btn.textContent = orig;
        btn.style.background = '';
      }, 1200);
    }
  }

  // ── Show / Hide ───────────────────────────────────────────────
  function showSettings() {
    injectModal();
    // Sync current settings u modalu
    var s = getSettings();
    document.querySelectorAll('.ks-av-item').forEach(function(el) {
      el.classList.toggle('ks-av-selected', el.dataset.seed === s.avatar);
    });
    document.querySelectorAll('#ks-cur-group .ks-cur-btn').forEach(function(el) {
      el.classList.toggle('active', el.dataset.cur === s.currency);
    });
    document.querySelectorAll('#ks-theme-group .ks-cur-btn').forEach(function(el) {
      el.classList.toggle('active', el.dataset.theme === s.theme);
    });
    var modal = document.getElementById('kriptoSettingsModal');
    if (modal) {
      modal.style.display = 'flex';
      requestAnimationFrame(function() { modal.classList.add('ks-visible'); });
    }
  }

  function hideSettings() {
    var modal = document.getElementById('kriptoSettingsModal');
    if (!modal) return;
    modal.classList.remove('ks-visible');
    setTimeout(function() { modal.style.display = 'none'; }, 200);
  }

  // ── CSS ───────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('ks-styles')) return;
    var css = `
      .ks-overlay {
        display: none; position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
        align-items: center; justify-content: center; padding: 16px;
        opacity: 0; transition: opacity .2s;
      }
      .ks-overlay.ks-visible { opacity: 1; }
      .ks-card {
        background: #161b22; border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px; width: 100%; max-width: 480px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        transform: translateY(16px); transition: transform .2s;
      }
      .ks-overlay.ks-visible .ks-card { transform: translateY(0); }
      .ks-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 20px 24px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .ks-title { color: #fff; font-size: 17px; font-weight: 700; margin: 0; }
      .ks-close {
        background: none; border: none; color: #7d8590; cursor: pointer;
        padding: 4px; border-radius: 6px; line-height: 1; transition: color .15s;
      }
      .ks-close:hover { color: #fff; }
      .ks-section { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .ks-section:last-of-type { border-bottom: none; }
      .ks-section-title {
        display: flex; align-items: center; gap: 7px;
        font-size: 11px; font-weight: 700; text-transform: uppercase;
        letter-spacing: .6px; color: #7d8590; margin-bottom: 16px;
      }
      .ks-av-grid {
        display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;
      }
      .ks-av-item {
        display: flex; flex-direction: column; align-items: center; gap: 6px;
        cursor: pointer; padding: 10px 6px; border-radius: 12px;
        border: 2px solid transparent; background: rgba(255,255,255,0.03);
        transition: border-color .15s, background .15s;
      }
      .ks-av-item:hover { background: rgba(108,92,231,0.1); border-color: rgba(108,92,231,0.3); }
      .ks-av-item.ks-av-selected { border-color: #6c5ce7; background: rgba(108,92,231,0.15); }
      .ks-av-item img { width: 48px; height: 48px; border-radius: 50%; }
      .ks-av-item span { font-size: 10px; color: #7d8590; font-weight: 600; }
      .ks-av-item.ks-av-selected span { color: #a29bfe; }
      .ks-cur-group { display: flex; gap: 10px; }
      .ks-cur-btn {
        flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
        padding: 12px; border-radius: 10px; border: 2px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.03); color: #7d8590;
        font-size: 14px; font-weight: 600; cursor: pointer; transition: all .15s;
      }
      .ks-cur-btn:hover { border-color: rgba(108,92,231,0.4); color: #fff; }
      .ks-cur-btn.active { border-color: #6c5ce7; background: rgba(108,92,231,0.15); color: #a29bfe; }
      .ks-cur-symbol { font-size: 18px; font-weight: 700; }
      .ks-footer { padding: 16px 24px 20px; }
      .ks-save-btn {
        width: 100%; padding: 13px; border: none; border-radius: 10px;
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        color: #fff; font-size: 15px; font-weight: 600; cursor: pointer;
        transition: opacity .15s, background .3s;
      }
      .ks-save-btn:hover { opacity: .9; }
      @media (max-width: 400px) {
        .ks-av-grid { grid-template-columns: repeat(5, 1fr); gap: 6px; }
        .ks-av-item img { width: 38px; height: 38px; }
      }
    `;
    var style = document.createElement('style');
    style.id = 'ks-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    // Očisti stari localStorage key (migracija s trziste_currency)
    localStorage.removeItem('trziste_currency');

    var s = getSettings();
    applyTheme(s.theme);
    // Primijeni spremljenu valutu na trziste nakon što se stranica učita
    window.addEventListener('load', function() {
      applyCurrency(s.currency);
    });
    // Ažuriraj avatar nakon što se auth inicijalizira
    window.addEventListener('kriptoAuthReady', function() {
      refreshNavAvatar(s.avatar);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Javni API
  window.KriptoSettings = {
    show:       showSettings,
    hide:       hideSettings,
    get:        getSettings,
    avatarUrl:  avatarUrl,
    refresh:    function() {
      var s = getSettings();
      refreshNavAvatar(s.avatar);
      applyCurrency(s.currency);
    }
  };
})();
