<?php
class Timetable
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getAllScheduleActions()
    {
        $sql = "SELECT * FROM classes"; // Select all fields from the table
        $result = $this->conn->query($sql);

        $schedule = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $schedule[] = $row;
            }
            return $schedule;
        } else {
            return false;
        }
    }
    public function getScheduleActionById($id)
    {
        $sql = "SELECT * FROM classes WHERE id = $id";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            return false;
        }
    }

    public function createScheduleAction($data)
    {
        // Check if all required fields are present
        $required_fields = array('day', 'start_time', 'end_time', 'course', 'entry', 'room', 'teacher', 'capacity');
        foreach ($required_fields as $field) {
            if (!isset($data[$field])) {
                return false;
            }
        }

        // Extract data from the request body
        $day = $data['day'];
        $start_time = $data['start_time'];
        $end_time = $data['end_time'];
        $course = $data['course'];
        $entry = $data['entry'];
        $room = $data['room'];
        $teacher = $data['teacher'];
        $restriction = isset($data['restriction']) ? $data['restriction'] : '';
        $capacity = $data['capacity'];

        // Create a new record in the database
        $sql = "INSERT INTO classes (day, start_time, end_time, course, entry, room, teacher, restriction, capacity) VALUES ('$day', '$start_time', '$end_time', '$course', '$entry', '$room', '$teacher', '$restriction', '$capacity')";

        return mysqli_query($this->conn, $sql);
    }

    public function deleteScheduleAction($id)
    {
        // Check if the schedule with the given ID exists
        $existing_schedule = $this->conn->query("SELECT id FROM classes WHERE id = $id");
        if ($existing_schedule->num_rows == 0) {
            return false; // Return false if the schedule doesn't exist
        }

        // If the schedule exists, proceed with deletion
        $delete_sql = "DELETE FROM classes WHERE id = $id";
        return $this->conn->query($delete_sql);
    }

    public function modifyScheduleAction($id, $data)
    {
        // Check if the schedule with the given ID exists
        $existing_schedule = $this->conn->query("SELECT id FROM classes WHERE id = $id");
        if ($existing_schedule->num_rows == 0) {
            return false; // Return false if the schedule doesn't exist
        }

        // Check if all required fields are present
        $required_fields = array('day', 'start_time', 'end_time', 'course', 'entry', 'room', 'teacher', 'capacity');
        foreach ($required_fields as $field) {
            if (!isset($data[$field])) {
                return false;
            }
        }

        // Extract data from the request body
        $newDay = $data['day'];
        $newStartTime = $data['start_time'];
        $newEndTime = $data['end_time'];
        $newCourse = $data['course'];
        $newEntry = $data['entry'];
        $newRoom = $data['room'];
        $newTeacher = $data['teacher'];
        $newRestriction = $data['restriction'];
        $newCapacity = $data['capacity'];

        // Implement data modification in the database
        $sql = "UPDATE classes SET 
            day = '$newDay', 
            start_time = '$newStartTime', 
            end_time = '$newEndTime', 
            course = '$newCourse', 
            entry = '$newEntry', 
            room = '$newRoom', 
            teacher = '$newTeacher', 
            restriction = '$newRestriction', 
            capacity = '$newCapacity' 
        WHERE id = '$id'";

        return mysqli_query($this->conn, $sql);
    }
}
?>