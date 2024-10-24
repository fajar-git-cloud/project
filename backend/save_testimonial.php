<?php
require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$name = $data['name'];
$content = $data['content'];
$image = $data['image'];

if ($id) {
    $sql = "UPDATE testimonials SET name = ?, content = ?, image = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $name, $content, $image, $id);
} else {
    $sql = "INSERT INTO testimonials (name, content, image) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $content, $image);
}

$result = $stmt->execute();

echo json_encode(['success' => $result]);

$stmt->close();
$conn->close();
?>