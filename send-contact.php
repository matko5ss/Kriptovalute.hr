<?php
// Kontakt forma - slanje emailova

error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: text/html; charset=utf-8');

$domain = 'kriptovalute.hr';
$admin_email = 'info@' . $domain;
$admin_subject = 'Novi upit - "Kriptovalute.hr"';
$user_subject = 'Vaša poruka je primljena';

$user_message_html = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<h3>Poštovani,</h3>
<p>zahvaljujemo Vam na poruci poslanoj putem kontakt forme.</p>
<p>Naš tim će Vas kontaktirati u najkraćem mogućem roku.</p>
<p>Javimo vam se povratno u najkraćem mogućem roku.</p>
<p>Srdačan pozdrav,,</p>
<p>Kriptovalute.hr tim</p>
</body></html>';

function encode_subject($subject) {
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($subject, 'UTF-8', 'B');
    }
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "From: Kriptovalute.hr <" . $admin_email . ">\r\n";
$headers .= "Reply-To: " . $admin_email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$success = false;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $interest = isset($_POST['interest']) ? trim(strip_tags($_POST['interest'])) : '';
    $message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

    $errors = [];
    if (empty($name)) $errors[] = 'Ime je obavezno.';
    if (empty($email)) $errors[] = 'Email je obavezan.';
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Neispravna email adresa.';
    if (empty($message)) $errors[] = 'Poruka je obavezna.';

    if (empty($errors)) {
        $admin_body = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"></head><body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333;\">";
        $admin_body .= "<h3>Novi upit s Kriptovalute.hr</h3>";
        $admin_body .= "<p><strong>Ime:</strong> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</p>";
        $admin_body .= "<p><strong>Email:</strong> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</p>";
        $admin_body .= "<p><strong>Što vas zanima:</strong> " . htmlspecialchars($interest, ENT_QUOTES, 'UTF-8') . "</p>";
        $admin_body .= "<p><strong>Poruka:</strong></p>";
        $admin_body .= "<p>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</p>";
        $admin_body .= "</body></html>";

        $encoded_admin_subject = encode_subject($admin_subject);
        $encoded_user_subject = encode_subject($user_subject);

        $mail1 = @mail($admin_email, $encoded_admin_subject, $admin_body, $headers);
        $mail2 = @mail($email, $encoded_user_subject, $user_message_html, $headers);

        if ($mail1) {
            $success = true;
        } else {
            $error = 'Došlo je do greške pri slanju. Molimo pokušajte ponovno ili nas kontaktirajte direktno na ' . $admin_email;
        }
    } else {
        $error = implode(' ', $errors);
    }
}

// Redirect - koristi hidden "redirect" ako je poslan, inače index.html
$redirect_page = isset($_POST['redirect']) ? basename(trim($_POST['redirect'])) : '';
$valid_pages = ['edukacija-i-radionice.html', 'kripto-rjesenja-za-poslovanje.html', 'alati-i-platforme-za-trgovanje.html', 'pravni-i-porezni-savjeti.html', 'blockchain-rjesenja.html', 'savjetovanje-i-podrska.html'];
$redirect_base = ($redirect_page && in_array($redirect_page, $valid_pages)) ? $redirect_page : 'index.html';
$redirect_url = $success 
    ? $redirect_base . '?sent=1#kontakt' 
    : ($error ? $redirect_base . '?error=' . urlencode($error) . '#kontakt' : $redirect_base . '#kontakt');

header('Location: ' . $redirect_url);
exit;
?>
