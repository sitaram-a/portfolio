<?php
// /htdocs/api/experience.php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

// GET — public
if ($method === 'GET') {
    $exps = db()->query("SELECT * FROM experience ORDER BY sort_order ASC")->fetchAll();
    foreach ($exps as &$exp) {
        $stmt = db()->prepare("SELECT * FROM experience_achievements WHERE experience_id=? ORDER BY sort_order ASC");
        $stmt->execute([$exp['id']]);
        $exp['achievements'] = array_column($stmt->fetchAll(), 'achievement');
        $exp['tech'] = $exp['tech_stack'] ? explode(',', $exp['tech_stack']) : [];
    }
    ok($exps);
}

// POST — create
if ($method === 'POST') {
    requireAdmin();
    $b = body();
    $stmt = db()->prepare("INSERT INTO experience (role,company,location,period,is_current,employment_type,description,tech_stack,sort_order)
                           VALUES (?,?,?,?,?,?,?,?,?)");
    $stmt->execute([
        $b['role'] ?? '', $b['company'] ?? '', $b['location'] ?? '',
        $b['period'] ?? '', (int)($b['is_current'] ?? 0), $b['employment_type'] ?? 'Full-time',
        $b['description'] ?? '', $b['tech_stack'] ?? '', (int)($b['sort_order'] ?? 0)
    ]);
    $newId = db()->lastInsertId();
    saveAchievements($newId, $b['achievements'] ?? []);
    ok(['id' => $newId], 'Experience created');
}

// PUT — update
if ($method === 'PUT' && $id) {
    requireAdmin();
    $b = body();
    $stmt = db()->prepare("UPDATE experience SET role=?,company=?,location=?,period=?,is_current=?,employment_type=?,description=?,tech_stack=?,sort_order=? WHERE id=?");
    $stmt->execute([
        $b['role'] ?? '', $b['company'] ?? '', $b['location'] ?? '',
        $b['period'] ?? '', (int)($b['is_current'] ?? 0), $b['employment_type'] ?? 'Full-time',
        $b['description'] ?? '', $b['tech_stack'] ?? '', (int)($b['sort_order'] ?? 0), $id
    ]);
    saveAchievements($id, $b['achievements'] ?? []);
    ok([], 'Experience updated');
}

// DELETE
if ($method === 'DELETE' && $id) {
    requireAdmin();
    db()->prepare("DELETE FROM experience WHERE id=?")->execute([$id]);
    ok([], 'Deleted');
}

function saveAchievements(int $expId, array $achievements): void {
    db()->prepare("DELETE FROM experience_achievements WHERE experience_id=?")->execute([$expId]);
    $stmt = db()->prepare("INSERT INTO experience_achievements (experience_id,achievement,sort_order) VALUES (?,?,?)");
    foreach (array_values(array_filter($achievements)) as $i => $a) {
        $stmt->execute([$expId, trim($a), $i + 1]);
    }
}

fail('Method not allowed', 405);