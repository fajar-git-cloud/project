<?php
// Mulai sesi untuk menyimpan pesan sukses atau error
session_start();

// Koneksi ke database MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contact_form_db";

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Menangani pengiriman form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Menyiapkan pernyataan SQL untuk menyimpan data
    $sql = "INSERT INTO contacts (name, phone, email, message) VALUES ('$name', '$phone', '$email', '$message')";

    // Mengeksekusi query dan memeriksa apakah berhasil
    if ($conn->query($sql) === TRUE) {
        $_SESSION['message'] = "Pesan berhasil disimpan!";
        $_SESSION['msg_type'] = "success"; // Tipe pesan sukses
    } else {
        $_SESSION['message'] = "Error: " . $conn->error;
        $_SESSION['msg_type'] = "error"; // Tipe pesan error
    }

    // Redirect agar form tidak dikirim ulang saat refresh halaman
    header("Location: index.html");
    exit();
}

// Menutup koneksi
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hubungi Kami</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- START: Contact Us Section -->
    <section class="contact-us py-5 bg-light" id="contact">
        <h2>Hubungi Kami</h2>
        <div class="contact-container">

            <!-- Menampilkan pesan sukses atau error -->
            <?php
            if (isset($_SESSION['message'])): ?>
                <div class="alert alert-<?=$_SESSION['msg_type']?>">
                    <?php
                    echo $_SESSION['message'];
                    unset($_SESSION['message']); // Hapus pesan setelah ditampilkan
                    ?>
                </div>
            <?php endif; ?>

            <form class="contact-form" action="submit_form.php" method="POST">
                <input type="text" name="name" placeholder="Nama" required>
                <input type="tel" name="phone" placeholder="Nomor HP" required>
                <input type="email" name="email" placeholder="Email" required>
                <textarea name="message" placeholder="Pesan" required></textarea>
                <button type="submit" class="send-button">Kirim</button>
            </form>

        </div>
    </section>
</body>
</html>
