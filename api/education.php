<?php
// /htdocs/api/education.php
require_once __DIR__ . '/config.php';

$method   = $_SERVER['REQUEST_METHOD'];
$id       = isset($_GET['id']) ? (int)$_GET['id'] : null;
$resource = $_GET['resource'] ?? 'education'; // 'education' or 'certifications'

if ($method === 'GET') {
    if ($resource === 'certifications') {
        ok(db()->query("SELECT * FROM certifications ORDER BY sort_order ASC")->fetchAll());
    }
    ok(db()->query("SELECT * FROM education ORDER BY sort_order ASC")->fetchAll());
}

if ($method === 'POST') {
    requireAdmin();
    $b = body();
    if ($resource === 'certifications') {
        $stmt = db()->prepare("INSERT INTO certifications (name,year,icon,sort_order) VALUES (?,?,?,?)");
        $stmt->execute([$b['name']??'',$b['year']??'',$b['icon']??'🏆',(int)($b['sort_order']??0)]);
        ok(['id'=>db()->lastInsertId()],'Certification created');
    }
    $stmt = db()->prepare("INSERT INTO education (degree,institution,university,year,sort_order) VALUES (?,?,?,?,?)");
    $stmt->execute([$b['degree']??'',$b['institution']??'',$b['university']??'',$b['year']??'',(int)($b['sort_order']??0)]);
    ok(['id'=>db()->lastInsertId()],'Education created');
}

if ($method === 'PUT' && $id) {
    requireAdmin();
    $b = body();
    if ($resource === 'certifications') {
        $stmt = db()->prepare("UPDATE certifications SET name=?,year=?,icon=?,sort_order=? WHERE id=?");
        $stmt->execute([$b['name']??'',$b['year']??'',$b['icon']??'🏆',(int)($b['sort_order']??0),$id]);
        ok([],'Certification updated');
    }
    $stmt = db()->prepare("UPDATE education SET degree=?,institution=?,university=?,year=?,sort_order=? WHERE id=?");
    $stmt->execute([$b['degree']??'',$b['institution']??'',$b['university']??'',$b['year']??'',(int)($b['sort_order']??0),$id]);
    ok([],'Education updated');
}

if ($method === 'DELETE' && $id) {
    requireAdmin();
    $tbl = $resource === 'certifications' ? 'certifications' : 'education';
    db()->prepare("DELETE FROM $tbl WHERE id=?")->execute([$id]);
    ok([],'Deleted');
}

fail('Method not allowed',405);