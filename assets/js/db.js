// ─────────────────────────────────────────────────────────────────
//  db.js — Supabase DB operacije za kriptovalute.hr
//  Uključi NAKON supabase-config.js i supabase CDN skripte
// ─────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  var _client = null;

  function getClient() {
    if (_client) return _client;
    if (!window.supabase) return null;
    if (!window.SUPABASE_URL || !window.SUPABASE_ANON) return null;
    _client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
    return _client;
  }

  // ── Postavke ──────────────────────────────────────────────────

  async function loadSettings(userId) {
    var sb = getClient();
    if (!sb || !userId) return null;
    try {
      var result = await sb
        .from('user_settings')
        .select('avatar, currency, theme')
        .eq('user_id', userId)
        .single();
      return result.data || null;
    } catch (e) {
      return null;
    }
  }

  async function saveSettings(userId, settings) {
    var sb = getClient();
    if (!sb || !userId) return;
    try {
      await sb.from('user_settings').upsert({
        user_id:    userId,
        avatar:     settings.avatar   || 'satoshi',
        currency:   settings.currency || 'eur',
        theme:      settings.theme    || 'dark',
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    } catch (e) {
      console.warn('[KriptoDB] saveSettings error:', e);
    }
  }

  // ── Portfolio ─────────────────────────────────────────────────

  async function loadPortfolio(userId) {
    var sb = getClient();
    if (!sb || !userId) return null;
    try {
      var result = await sb
        .from('user_portfolio')
        .select('coin_id, coin_name, coin_symbol, amount, buy_price, added_at')
        .eq('user_id', userId)
        .order('added_at', { ascending: true });
      if (!result.data) return null;
      // Mapiraj DB format → app format
      return result.data.map(function (r) {
        return {
          id:       r.coin_id,
          name:     r.coin_name   || r.coin_id,
          symbol:   r.coin_symbol || '',
          image:    '',
          amount:   r.amount    || 0,
          buyPrice: r.buy_price != null ? r.buy_price : null,
          addedAt:  r.added_at ? r.added_at.split('T')[0] : new Date().toISOString().split('T')[0]
        };
      });
    } catch (e) {
      console.warn('[KriptoDB] loadPortfolio error:', e);
      return null;
    }
  }

  async function upsertPortfolioEntry(userId, entry) {
    var sb = getClient();
    if (!sb || !userId || !entry || !entry.id) return;
    try {
      await sb.from('user_portfolio').upsert({
        user_id:     userId,
        coin_id:     entry.id,
        coin_name:   entry.name   || entry.id,
        coin_symbol: entry.symbol || '',
        amount:      entry.amount   || 0,
        buy_price:   entry.buyPrice != null ? entry.buyPrice : null,
        updated_at:  new Date().toISOString()
      }, { onConflict: 'user_id,coin_id' });
    } catch (e) {
      console.warn('[KriptoDB] upsertPortfolioEntry error:', e);
    }
  }

  async function deletePortfolioEntry(userId, coinId) {
    var sb = getClient();
    if (!sb || !userId || !coinId) return;
    try {
      await sb.from('user_portfolio')
        .delete()
        .eq('user_id', userId)
        .eq('coin_id', coinId);
    } catch (e) {
      console.warn('[KriptoDB] deletePortfolioEntry error:', e);
    }
  }

  // ── Sync pri prijavi ──────────────────────────────────────────
  // Poziva se iz auth.js kada se korisnik prijavi.
  // Učitava postavke i portfolio iz DB, primjenjuje lokalno.
  async function syncOnLogin(user) {
    if (!user || !user.id) return;
    var userId = user.id;

    // ── Postavke ─────────────────────────────────────────────
    var dbSettings = await loadSettings(userId);
    if (dbSettings) {
      // Spoji s lokalnim postavkama (DB ima prednost)
      var local = {};
      try { local = JSON.parse(localStorage.getItem('kriptoSettings')) || {}; } catch(e) {}
      var merged = {
        avatar:   dbSettings.avatar   || local.avatar   || 'satoshi',
        currency: dbSettings.currency || local.currency || 'eur',
        theme:    dbSettings.theme    || local.theme    || 'dark'
      };
      localStorage.setItem('kriptoSettings', JSON.stringify(merged));

      // Primijeni temu
      if (merged.theme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }

      // Primijeni valutu
      window.dispatchEvent(new CustomEvent('kriptoCurrencyChanged', {
        detail: { currency: merged.currency }
      }));

      // Ažuriraj avatar u navbaru
      if (window.KriptoSettings && typeof window.KriptoSettings.refresh === 'function') {
        window.KriptoSettings.refresh();
      }
    }

    // ── Portfolio ─────────────────────────────────────────────
    var dbPortfolio = await loadPortfolio(userId);
    if (dbPortfolio !== null) {
      // Spremi u localStorage i obavijesti stranicu
      localStorage.setItem('trziste_portfolio', JSON.stringify(dbPortfolio));
      window.dispatchEvent(new CustomEvent('kriptoPortfolioSynced', {
        detail: { portfolio: dbPortfolio }
      }));
    }
  }

  // Javni API
  window.KriptoDB = {
    loadSettings:         loadSettings,
    saveSettings:         saveSettings,
    loadPortfolio:        loadPortfolio,
    upsertPortfolioEntry: upsertPortfolioEntry,
    deletePortfolioEntry: deletePortfolioEntry,
    syncOnLogin:          syncOnLogin
  };
})();
