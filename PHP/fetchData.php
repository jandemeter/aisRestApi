<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

//malo by byt v config
$username = '*********';
$password = '********';
$aisId = '*******';

$ch = curl_init();


curl_setopt($ch, CURLOPT_URL, "https://is.stuba.sk/system/login.pl");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'lang=sk&login_hidden=1&auth_2fa_type=no&credential_0=' . $username . '&credential_1=' . $password);
curl_setopt($ch, CURLOPT_COOKIEJAR, realpath('cookie.txt'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);


curl_setopt($ch, CURLOPT_URL, 'https://is.stuba.sk/auth/katalog/rozvrhy_view.pl?rozvrh_student_obec=1?zobraz=1;format=html;rozvrh_student=' . $aisId . ';lang=sk');
curl_setopt($ch, CURLOPT_COOKIEFILE, realpath('cookie.txt'));
$content = curl_exec($ch);


$postData = array(
    'osobni' => '1',
    'z' => '1',
    'k' => '1',
    'f' => '0',
    'studijni_zpet' => '0',
    'rozvrh' => '5687',
    'format' => 'list', 
    'zobraz' => 'Zobraziť' 
);

$postString = http_build_query($postData);

curl_setopt($ch, CURLOPT_URL, 'https://is.stuba.sk/auth/katalog/rozvrhy_view.pl?lang=sk');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);

$content = curl_exec($ch);

echo $content;

$dom = new DOMDocument();
@$dom->loadHTML($content);

//malo by byt v config
$servername = "localhost"; 
$username = "**********";
$password = "**********";
$dbname = "timetable";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$table = $dom->getElementById('tmtab_1');
$rows = $table->getElementsByTagName('tr');

foreach ($rows as $row) {
    $columns = $row->getElementsByTagName('td');
    if ($columns->length > 0) {
        $day = $columns->item(0)->nodeValue;
        $start_time = $columns->item(1)->nodeValue;
        $end_time = $columns->item(2)->nodeValue;
        $course = trim($columns->item(3)->textContent);
        $entry = trim($columns->item(4)->textContent);
        $room = trim($columns->item(5)->textContent);
        $teacher = trim($columns->item(6)->textContent);
        $restriction = trim($columns->item(7)->textContent);
        $capacity = $columns->item(8)->nodeValue;

        $sql = "INSERT INTO classes (day, start_time, end_time, course, entry, room, teacher, restriction, capacity) VALUES ('$day', '$start_time', '$end_time', '$course', '$entry', '$room', '$teacher', '$restriction', '$capacity')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();

curl_close($ch);

?>
