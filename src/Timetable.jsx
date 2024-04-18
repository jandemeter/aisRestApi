import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./Timetable.css";

import { Link } from "react-router-dom";

const Timetable = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://node29.webte.fei.stuba.sk/davidov/timetableAPI/api.php/timetable"
      );
      setScheduleData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://node29.webte.fei.stuba.sk/davidov/timetableAPI/api.php/timetable/${id}`
      );
      // Refetch data after successful deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting schedule action:", error);
    }
  };

  const columns = [
    {
      name: "Day",
      selector: (row) => row.day,
      sortable: true,
      wrap: true,
    },
    {
      name: "Start Time",
      selector: (row) => row.start_time,
      sortable: true,
      wrap: true,
    },
    {
      name: "End Time",
      selector: (row) => row.end_time,
      sortable: true,
      wrap: true,
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
      wrap: true,
    },
    {
      name: "Entry",
      selector: (row) => row.entry,
      sortable: true,
      wrap: true,
    },
    {
      name: "Room",
      selector: (row) => row.room,
      sortable: true,
      wrap: true,
    },
    {
      name: "Teacher",
      selector: (row) => row.teacher,
      sortable: true,
      wrap: true,
    },
    {
      name: "Restriction",
      selector: (row) => row.restriction,
      sortable: true,
      wrap: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
      sortable: true,
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button onClick={() => handleDelete(row.id)}>Del</button>
          <Link to={`/edit/${row.id}`}>Edit</Link>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <Link className="add-link" to="/add">
        Add
      </Link>

      <DataTable
        className="data-table"
        title="Schedule"
        columns={columns}
        data={scheduleData}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default Timetable;
