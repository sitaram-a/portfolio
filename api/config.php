<?php
// ============================================================
// config.php — shared by ALL api files
// Upload to: /htdocs/api/config.php
// ============================================================

define('DB_HOST', 'sql211.infinityfree.com');  // Your InfinityFree DB host (found in cpanel)
define('DB_USER', 'if0_41814819');             // Your DB username
define('DB_PASS', 'GSUJmyzeM5vmgL');          // Your DB password
define('DB_NAME', 'if0_41814819_db_sitaram');    // Your DB name
define('ADMIN_SECRET', 'change_this_secret_key_to_something_long_random'); // JWT-like token key

// Your Netlify URL — update after deploying
define('ALLOWED_ORIGIN', 'https://porfolio-sitaram.netlify.app');

// ---- CORS ----
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

// ---- DB connection ----
function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER, DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
    }
    return $pdo;
}

// ---- JSON helpers ----
function ok($data = [], string $msg = 'OK'): void {
    echo json_encode(['success' => true, 'message' => $msg, 'data' => $data]);
    exit();
}
function fail(string $msg = 'Error', int $code = 400): void {
    http_response_code($code);
    echo json_encode(['success' => false, 'message' => $msg]);
    exit();
}

// ---- Auth ----
function isAdmin(): bool {
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!str_starts_with($h, 'Bearer ')) return false;
    $token = substr($h, 7);
    return hash_equals(hash_hmac('sha256', 'admin', ADMIN_SECRET), $token);
}
function requireAdmin(): void {
    if (!isAdmin()) fail('Unauthorized', 401);
}

// ---- Body input ----
function body(): array {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}