<?php
// Mengimpor koneksi database
require 'db_connect.php';

// Membuat koneksi
$conn = new mysqli($host, $username, $password, $dbname);

// Memeriksa apakah koneksi berhasil
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Memeriksa apakah form telah di-submit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Mengambil data dari form
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Menyiapkan pernyataan SQL untuk menyimpan data ke database
    $sql = "INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)";

    // Menggunakan prepared statement untuk mencegah SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $phone, $email, $message);

    // Menjalankan query dan memeriksa apakah berhasil
    if ($stmt->execute()) {
        // Redirect ke halaman index dengan pesan sukses
        header("Location: index.html?status=sukses");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    // Menutup statement dan koneksi
    $stmt->close();
}

// Menutup koneksi
$conn->close();
?>
