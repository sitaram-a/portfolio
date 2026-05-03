<?php
// /htdocs/api/profile.php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

// GET — public, returns profile row
if ($method === 'GET') {
    $row = db()->query("SELECT * FROM profile LIMIT 1")->fetch();
    ok($row ?: []);
}

// POST — admin only, upsert profile
if ($method === 'POST') {
    requireAdmin();
    $b = body();
    $fields = [
        'full_name','title','tagline','about_1','about_2','about_3',
        'location','email','phone','availability','languages',
        'github_url','linkedin_url','website_url','photo_url','resume_url',
        'stat_1_value','stat_1_label','stat_2_value','stat_2_label',
        'stat_3_value','stat_3_label','stat_4_value','stat_4_label',
    ];
    // Check if row exists
    $count = db()->query("SELECT COUNT(*) FROM profile")->fetchColumn();
    if ($count > 0) {
        $sets = implode(', ', array_map(fn($f) => "`$f` = ?", $fields));
        $vals = array_map(fn($f) => $b[$f] ?? null, $fields);
        db()->prepare("UPDATE profile SET $sets")->execute($vals);
    } else {
        $cols = implode(', ', array_map(fn($f) => "`$f`", $fields));
        $ph   = implode(', ', array_fill(0, count($fields), '?'));
        $vals = array_map(fn($f) => $b[$f] ?? null, $fields);
        db()->prepare("INSERT INTO profile ($cols) VALUES ($ph)")->execute($vals);
    }
    ok([], 'Profile saved');
}

fail('Method not allowed', 405);