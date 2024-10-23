<?php
$host = "localhost";  // Menggunakan variabel $host
$username = "root";
$password = "";
$dbname = "contact_form_db";

// Membuat koneksi
$conn = new mysqli($host, $username, $password, $dbname);

// Mengecek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>