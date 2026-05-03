<?php
// /htdocs/api/messages.php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

// POST — public submit (same as contact.php)
if ($method === 'POST' && !isAdmin()) {
    $b = body();
    $name    = trim(strip_tags($b['name'] ?? ''));
    $email   = trim(strip_tags($b['email'] ?? ''));
    $subject = trim(strip_tags($b['subject'] ?? ''));
    $message = trim(strip_tags($b['message'] ?? ''));
    if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$subject || !$message)
        fail('All fields required');
    $stmt = db()->prepare("INSERT INTO contact_messages (name,email,subject,message,ip_address) VALUES (?,?,?,?,?)");
    $stmt->execute([$name,$email,$subject,$message,$_SERVER['REMOTE_ADDR']??'']);
    ok([],'Message sent');
}

// GET — admin: list messages
if ($method === 'GET') {
    requireAdmin();
    $rows = db()->query("SELECT * FROM contact_messages ORDER BY created_at DESC")->fetchAll();
    ok($rows);
}

// PUT — mark as read
if ($method === 'PUT' && $id) {
    requireAdmin();
    db()->prepare("UPDATE contact_messages SET is_read=1 WHERE id=?")->execute([$id]);
    ok([],'Marked as read');
}

// DELETE
if ($method === 'DELETE' && $id) {
    requireAdmin();
    db()->prepare("DELETE FROM contact_messages WHERE id=?")->execute([$id]);
    ok([],'Deleted');
}

fail('Method not allowed',405);