<?php
require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$content = $data['content'];

$sql = "UPDATE about_us SET content = ? WHERE id = 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $content);

$result = $stmt->execute();

echo json_encode(['success' => $result]);

$stmt->close();
$conn->close();
?>