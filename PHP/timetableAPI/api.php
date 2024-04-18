<?php
require_once('../../../config.php');
require_once('Timetable.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json");

$timetable = new Timetable($conn);

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

    case 'GET':
        if ($request_uri == '/timetable') {
            $result = $timetable->getAllScheduleActions();
            if ($result) {
                http_response_code(200); 
                echo json_encode($result);
            } else {
                http_response_code(404); 
                echo json_encode(array("message" => "No schedule actions found."));
            }
        } elseif (preg_match('/^\/timetable\/(\d+)$/', $request_uri, $matches)) {
            $id = $matches[1];
            $result = $timetable->getScheduleActionById($id);
            if ($result) {
                http_response_code(200); 
                echo json_encode($result);
            } else {
                http_response_code(404); 
                echo json_encode(array("message" => "Schedule action not found."));
            }
        } else {
            http_response_code(404); 
            echo json_encode(array("message" => "Endpoint not found."));
        }
        break;

    case 'POST':
        if ($request_uri == '/timetable') {
            $data = json_decode(file_get_contents("php://input"), true);
            $result = $timetable->createScheduleAction($data);
            if ($result) {
                http_response_code(201); 
                echo json_encode(array("message" => "New schedule action created successfully."));
            } else {
                http_response_code(500); 
                echo json_encode(array("message" => "Error creating new schedule action."));
            }
        } else {
            http_response_code(404); 
            echo json_encode(array("message" => "Endpoint not found."));
        }
        break;

    case 'DELETE':
        if (preg_match('/^\/timetable\/(\d+)$/', $request_uri, $matches)) {
            $id = $matches[1];
            if ($timetable->deleteScheduleAction($id)) {
                http_response_code(200); 
                echo json_encode(array("message" => "Schedule action deleted successfully."));
            } else {
                http_response_code(404); 
                echo json_encode(array("message" => "Schedule action not found."));
            }
        } else {
            http_response_code(404); 
            echo json_encode(array("message" => "Endpoint not found."));
        }
        break;

    case 'PUT':
        if (preg_match('/^\/timetable\/(\d+)$/', $request_uri, $matches)) {
            $id = $matches[1];
            $data = json_decode(file_get_contents("php://input"), true);
            $result = $timetable->modifyScheduleAction($id, $data);
            if ($result) {
                http_response_code(200); 
                echo json_encode(array("message" => "Schedule action modified successfully."));
            } else {
                http_response_code(404); 
                echo json_encode(array("message" => "Schedule action not found."));
            }
        } else {
            http_response_code(404); 
            echo json_encode(array("message" => "Endpoint not found."));
        }
        break;

    default:
        http_response_code(405); 
        echo json_encode(array("message" => "Method not allowed."));
}

$conn->close();
?>
