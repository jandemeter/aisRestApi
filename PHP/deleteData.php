<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,DELETE, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "xdemeterj";
$password = "Jankodemeter1";
$dbname = "timetable";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Spojenie zlyhalo: " . $conn->connect_error);
}

$sql = "DELETE FROM classes";

if ($conn->query($sql) === TRUE) {
    echo "Všetky záznamy boli úspešne vymazané";
} else {
    echo "Chyba pri mazaní záznamov: " . $conn->error;
}

$conn->close();
?>
