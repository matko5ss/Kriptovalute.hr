# Postavljanje na hosting (kriptovalute.hr)

## Zahtjevi
- **PHP** 7.4 ili noviji (s `mail()` funkcijom)
- **Apache** s mod_rewrite (za .htaccess)

## Struktura datoteka
```
/
├── index.html          # Preusmjerava na index-two.html
├── index-two.html      # Glavna stranica
├── send-contact.php    # Obrada kontakt forme
├── .htaccess           # Apache konfiguracija
└── assets/
    ├── css/
    ├── js/
    ├── img/
    └── ...
```

## Email
- Forma šalje na **info@kriptovalute.hr**
- Potvrda korisniku na email koji unese u formu
- **Važno:** Kreiraj email adresu `info@kriptovalute.hr` u hosting kontrolnoj ploči (cPanel, DirectAdmin, itd.)

## Testiranje
1. Otvori https://kriptovalute.hr
2. Ispuni kontakt formu
3. Provjeri inbox na info@kriptovalute.hr
4. Provjeri da korisnik prima potvrdni email

## Ako mail ne radi
Većina hostinga podržava PHP `mail()`, ali ponekad:
- Provjeri spam folder
- Kreiraj info@kriptovalute.hr u hosting panelu
- Kontaktiraj hosting podršku za SMTP postavke
- Za pouzdanije slanje: koristi PHPMailer s SMTP
