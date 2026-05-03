<?php
// /htdocs/api/auth.php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

// POST /api/auth.php — login
if ($method === 'POST') {
    $b = body();
    $username = trim($b['username'] ?? '');
    $password = trim($b['password'] ?? '');
    if (!$username || !$password) fail('Username and password required');

    $stmt = db()->prepare("SELECT * FROM admin_users WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        fail('Invalid credentials', 401);
    }

    // Return a simple token (HMAC of username + secret)
    $token = hash_hmac('sha256', 'admin', ADMIN_SECRET);
    ok(['token' => $token, 'username' => $user['username']], 'Login successful');
}

// GET /api/auth.php — verify token
if ($method === 'GET') {
    if (isAdmin()) ok([], 'Token valid');
    fail('Invalid token', 401);
}

fail('Method not allowed', 405);