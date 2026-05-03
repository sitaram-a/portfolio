<?php
// /htdocs/api/skills.php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $rows = db()->query("SELECT * FROM skills ORDER BY sort_order ASC")->fetchAll();
    ok($rows);
}

if ($method === 'POST') {
    requireAdmin();
    $b = body();
    $stmt = db()->prepare("INSERT INTO skills (name,level,category,icon,color,sort_order) VALUES (?,?,?,?,?,?)");
    $stmt->execute([$b['name']??'',(int)($b['level']??80),$b['category']??'',$b['icon']??'⚡',$b['color']??'#6c63ff',(int)($b['sort_order']??0)]);
    ok(['id'=>db()->lastInsertId()],'Skill created');
}

if ($method === 'PUT' && $id) {
    requireAdmin();
    $b = body();
    $stmt = db()->prepare("UPDATE skills SET name=?,level=?,category=?,icon=?,color=?,sort_order=? WHERE id=?");
    $stmt->execute([$b['name']??'',(int)($b['level']??80),$b['category']??'',$b['icon']??'⚡',$b['color']??'#6c63ff',(int)($b['sort_order']??0),$id]);
    ok([],'Skill updated');
}

if ($method === 'DELETE' && $id) {
    requireAdmin();
    db()->prepare("DELETE FROM skills WHERE id=?")->execute([$id]);
    ok([],'Deleted');
}

fail('Method not allowed',405);