// ─────────────────────────────────────────────────────────────────
//  Supabase konfiguracija — kriptovalute.hr
//
//  Upute za postavljanje:
//  1. Idi na https://supabase.com i kreiraj besplatan projekt
//  2. Idi na Project Settings → API
//  3. Kopiraj "Project URL" i "anon public" key ovdje
//  4. U Supabase dashboardu idi na Authentication → Providers:
//     - Email: uključi "Enable Email Confirmations", "Enable OTP"
//     - Google: uključi i dodaj OAuth credentiale iz Google Cloud Console
//  5. U Authentication → URL Configuration postavi:
//     Site URL: https://kriptovalute.hr
//     Redirect URLs: https://kriptovalute.hr/*, http://localhost:8080/*
// ─────────────────────────────────────────────────────────────────

window.SUPABASE_URL  = 'OVDJE_ZALIJEPI_SUPABASE_PROJECT_URL';
window.SUPABASE_ANON = 'OVDJE_ZALIJEPI_SUPABASE_ANON_KEY';
