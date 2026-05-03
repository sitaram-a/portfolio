<?php
// /htdocs/api/projects.php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $rows = db()->query("SELECT * FROM projects WHERE is_visible=1 ORDER BY sort_order ASC")->fetchAll();
    foreach ($rows as &$r) {
        $r['highlights_arr'] = $r['highlights'] ? explode(',', $r['highlights']) : [];
        $r['tech_arr']       = $r['tech_stack'] ? explode(',', $r['tech_stack']) : [];
    }
    ok($rows);
}

if ($method === 'POST') {
    requireAdmin();
    $b = body();
    $stmt = db()->prepare("INSERT INTO projects (title,category,description,highlights,tech_stack,url,color,emoji,sort_order,is_visible) VALUES (?,?,?,?,?,?,?,?,?,?)");
    $stmt->execute([$b['title']??'',$b['category']??'',$b['description']??'',$b['highlights']??'',$b['tech_stack']??'',$b['url']??'',$b['color']??'#6c63ff',$b['emoji']??'🚀',(int)($b['sort_order']??0),(int)($b['is_visible']??1)]);
    ok(['id'=>db()->lastInsertId()],'Project created');
}

if ($method === 'PUT' && $id) {
    requireAdmin();
    $b = body();
    $stmt = db()->prepare("UPDATE projects SET title=?,category=?,description=?,highlights=?,tech_stack=?,url=?,color=?,emoji=?,sort_order=?,is_visible=? WHERE id=?");
    $stmt->execute([$b['title']??'',$b['category']??'',$b['description']??'',$b['highlights']??'',$b['tech_stack']??'',$b['url']??'',$b['color']??'#6c63ff',$b['emoji']??'🚀',(int)($b['sort_order']??0),(int)($b['is_visible']??1),$id]);
    ok([],'Project updated');
}

if ($method === 'DELETE' && $id) {
    requireAdmin();
    db()->prepare("DELETE FROM projects WHERE id=?")->execute([$id]);
    ok([],'Deleted');
}

fail('Method not allowed',405);