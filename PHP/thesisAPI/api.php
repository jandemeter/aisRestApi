<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json");
require_once('../../../config.php');
require_once("Thesis.php");

$thesis = new Thesis($conn);

$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$api_index = strpos($request_uri, 'api.php');

if ($api_index !== false) {
    $request_uri = substr($request_uri, $api_index + strlen('api.php'));
}

switch ($method) {
    case 'OPTIONS':
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: *");
        http_response_code(200);
        break;
    case 'POST':
        if ($request_uri == '/thesis') {

            $requestData = json_decode(file_get_contents("php://input"), true);

            $pracoviste = isset($requestData['pracoviste']) ? $requestData['pracoviste'] : null;

            $type = isset($requestData['type']) ? $requestData['type'] : null;
            $type = $type === "" ? null : $type; 

            $supervisor = isset($requestData['supervisor']) ? $requestData['supervisor'] : null;
            $supervisor = $supervisor === "" ? null : $supervisor; // Převést prázdný řetězec na null

            $program = isset($requestData['program']) ? $requestData['program'] : null;
            $program = $program === "" ? null : $program; 

            if ($pracoviste !== null) {
                http_response_code(200); 
                echo json_encode($thesis->getFreeTopics($pracoviste, $type, $supervisor, $program));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Missing parameter."));
            }
        } else {
            http_response_code(404); // Not Found
            echo json_encode(array("message" => "Endpoint not found."));
        }
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(array("message" => "Method Not Allowed."));
        break;
}
?>
