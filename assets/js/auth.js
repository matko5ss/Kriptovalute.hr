// ─────────────────────────────────────────────────────────────────
//  auth.js — Supabase auth helper za kriptovalute.hr
//  Uključi NAKON supabase-config.js i supabase CDN skripte
// ─────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  var _client = null;

  function getClient() {
    if (_client) return _client;
    if (!window.supabase) { console.error('Supabase SDK nije učitan.'); return null; }
    if (!window.SUPABASE_URL || window.SUPABASE_URL.indexOf('OVDJE') === 0) {
      console.warn('Supabase credentiali nisu postavljeni u supabase-config.js');
      return null;
    }
    _client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
    return _client;
  }

  // ── Pošalji OTP kod na email ──────────────────────────────────
  async function sendOtp(email) {
    var sb = getClient();
    if (!sb) return { error: { message: 'Konfiguracija nije postavljena.' } };
    var { error } = await sb.auth.signInWithOtp({
      email: email,
      options: { shouldCreateUser: true }
    });
    return { error };
  }

  // ── Verificiraj 6-znamenkasti OTP kod ────────────────────────
  async function verifyOtp(email, token) {
    var sb = getClient();
    if (!sb) return { error: { message: 'Konfiguracija nije postavljena.' } };
    var { data, error } = await sb.auth.verifyOtp({
      email: email,
      token: token,
      type: 'email'
    });
    return { data, error };
  }

  // ── Google OAuth prijava ──────────────────────────────────────
  async function signInWithGoogle() {
    var sb = getClient();
    if (!sb) return { error: { message: 'Konfiguracija nije postavljena.' } };
    var redirect = window.location.origin + '/prijava.html?callback=1';
    var { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirect, queryParams: { prompt: 'select_account' } }
    });
    return { error };
  }

  // ── Odjava ───────────────────────────────────────────────────
  async function signOut() {
    var sb = getClient();
    if (!sb) return;
    await sb.auth.signOut();
    updateNavbar(null);
  }

  // ── Dohvati trenutnu sesiju ───────────────────────────────────
  async function getSession() {
    var sb = getClient();
    if (!sb) return null;
    var { data: { session } } = await sb.auth.getSession();
    return session;
  }

  // ── Dohvati korisnika ─────────────────────────────────────────
  async function getUser() {
    var session = await getSession();
    return session ? session.user : null;
  }

  // ── Auth state listener ───────────────────────────────────────
  function onAuthChange(callback) {
    var sb = getClient();
    if (!sb) return;
    sb.auth.onAuthStateChange(function (event, session) {
      callback(event, session);
    });
  }

  // ── Ažuriraj navbar na svim stranicama ───────────────────────
  function updateNavbar(user) {
    var btn = document.getElementById('nav-auth-btn');
    var userMenu = document.getElementById('nav-user-menu');
    if (!btn && !userMenu) return;

    if (user) {
      // Prijavljeni korisnik — prikaži avatar i dropdown
      var displayName = (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name))
        || user.email || '';
      // DiceBear Bottts robot avatar kao default (unikatan po emailu)
      var seed = encodeURIComponent(user.email || displayName || 'user');
      var defaultAvatar = 'https://api.dicebear.com/7.x/bottts/svg?seed=' + seed + '&backgroundColor=6c5ce7&radius=50';

      if (btn) btn.style.display = 'none';
      if (userMenu) {
        userMenu.style.display = '';
        var avatar = document.getElementById('nav-user-avatar');
        var name = document.getElementById('nav-user-name');
        if (avatar) {
          var src = defaultAvatar;
          avatar.innerHTML = '<img src="' + src + '" alt="Avatar" style="width:30px;height:30px;border-radius:50%;object-fit:cover;background:#1a1a2e;">';
        }
        if (name) name.textContent = displayName.split('@')[0];
      }
    } else {
      // Odjavljeni korisnik — prikaži "Prijava" gumb
      if (btn) btn.style.display = '';
      if (userMenu) userMenu.style.display = 'none';
    }
  }

  // ── Inicijalizacija (pokretanje na svakoj stranici) ───────────
  async function init() {
    var sb = getClient();
    if (!sb) return;

    // Provjeri sesiju pri učitavanju
    var user = await getUser();
    updateNavbar(user);

    // Slušaj promjene auth stanja
    onAuthChange(function (_event, session) {
      updateNavbar(session ? session.user : null);
    });

    // Odjava gumb
    var logoutBtn = document.getElementById('nav-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        signOut();
      });
    }
  }

  // Pokretanje
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Javni API
  window.KriptoAuth = {
    sendOtp: sendOtp,
    verifyOtp: verifyOtp,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    getSession: getSession,
    getUser: getUser,
    onAuthChange: onAuthChange,
    updateNavbar: updateNavbar
  };
})();
