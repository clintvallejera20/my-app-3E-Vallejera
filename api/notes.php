<?php
// Example REST endpoint: /api/notes.php
//   GET              -> list notes
//   POST   {title}   -> create
//   PUT    ?id= {title} -> update
//   DELETE ?id=      -> delete
// Copy this file as a starting point for your own resources (e.g. requests.php, users.php).
require __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {
    case 'GET':
        json_out(db()->query('SELECT id, title, created_at FROM notes ORDER BY id DESC')->fetchAll());

    case 'POST':
        $title = trim((string)(json_in()['title'] ?? ''));
        if ($title === '' || mb_strlen($title) > 200) json_out(['error' => 'Title is required (max 200 characters)'], 422);
        $stmt = db()->prepare('INSERT INTO notes (title) VALUES (?)');   // prepared statement = no SQL injection
        $stmt->execute([$title]);
        json_out(['id' => (int)db()->lastInsertId(), 'title' => $title], 201);

    case 'PUT':
        if (!$id) json_out(['error' => 'Missing id'], 400);
        $title = trim((string)(json_in()['title'] ?? ''));
        if ($title === '' || mb_strlen($title) > 200) json_out(['error' => 'Title is required (max 200 characters)'], 422);
        $stmt = db()->prepare('UPDATE notes SET title = ? WHERE id = ?');
        $stmt->execute([$title, $id]);
        json_out(['ok' => true]);

    case 'DELETE':
        if (!$id) json_out(['error' => 'Missing id'], 400);
        db()->prepare('DELETE FROM notes WHERE id = ?')->execute([$id]);
        json_out(['ok' => true]);

    default:
        json_out(['error' => 'Method not allowed'], 405);
}
