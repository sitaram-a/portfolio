<?php
/**
 * Contact Form API - InfinityFree Backend
 * Upload this file to your InfinityFree host at: /htdocs/api/contact.php
 * 
 * =============================================
 * SETUP INSTRUCTIONS FOR INFINITYFREE:
 * =============================================
 * 1. Log in to InfinityFree control panel
 * 2. Create MySQL database in "MySQL Databases"
 * 3. Update the DB credentials below
 * 4. Upload this file to /htdocs/api/contact.php
 * 5. Visit https://yourdomain.epizy.com/api/setup.php ONCE to create the table
 * 6. Update REACT_APP_API_URL in your .env file
 * =============================================
 */

// ===== CONFIGURATION =====
define('DB_HOST', 'sql211.infinityfree.com');  // Your InfinityFree DB host (found in cpanel)
define('DB_USER', 'if0_41814819');             // Your DB username
define('DB_PASS', 'GSUJmyzeM5vmgL');          // Your DB password
define('DB_NAME', 'if0_41814819_db_sitaram');    // Your DB name

define('ADMIN_EMAIL', 'sitaram.hembrom123@gmail.com');
define('SITE_NAME', 'Sitaram Hembrom Portfolio');
define('ALLOWED_ORIGIN', 'https://porfolio-sitaram.netlify.app/'); // Set to your Netlify URL in production e.g. 'https://sitaramhembrom.netlify.app'

// ===== CORS HEADERS =====
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// ===== GET INPUT =====
$input = json_decode(file_get_contents('php://input'), true);

$name    = trim(strip_tags($input['name'] ?? ''));
$email   = trim(strip_tags($input['email'] ?? ''));
$subject = trim(strip_tags($input['subject'] ?? ''));
$message = trim(strip_tags($input['message'] ?? ''));

// ===== VALIDATION =====
$errors = [];
if (empty($name))    $errors[] = 'Name is required';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
if (empty($subject)) $errors[] = 'Subject is required';
if (empty($message)) $errors[] = 'Message is required';
if (strlen($message) < 10) $errors[] = 'Message too short';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit();
}

// ===== DATABASE INSERT =====
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (name, email, subject, message, ip_address, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$name, $email, $subject, $message, $_SERVER['REMOTE_ADDR'] ?? 'unknown']);

    // ===== SEND EMAIL NOTIFICATION =====
    $emailBody = "
New contact form submission from your portfolio!

Name: {$name}
Email: {$email}
Subject: {$subject}

Message:
{$message}

---
Sent from " . SITE_NAME . "
IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "
Time: " . date('Y-m-d H:i:s') . "
    ";

    $headers = "From: noreply@" . ($_SERVER['HTTP_HOST'] ?? 'portfolio.com') . "\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    @mail(ADMIN_EMAIL, "Portfolio Contact: {$subject}", $emailBody, $headers);

    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);

} catch (PDOException $e) {
    // Log error but don't expose details
    error_log('DB Error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error. Please try emailing directly.']);
}
?>
