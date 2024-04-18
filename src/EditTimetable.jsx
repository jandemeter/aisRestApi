import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const EditTimetable = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      const response = await axios.get(
        `https://node29.webte.fei.stuba.sk/davidov/timetableAPI/api.php/timetable/${id}`
      );
      setInitialData(response.data);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  const validationSchema = Yup.object({
    day: Yup.string().required("Day is required"),
    start_time: Yup.string().required("Start Time is required"),
    end_time: Yup.string().required("End Time is required"),
    course: Yup.string().required("Course is required"),
    entry: Yup.string().required("Entry is required"),
    room: Yup.string().required("Room is required"),
    teacher: Yup.string().required("Teacher is required"),
    restriction: Yup.string(),
    capacity: Yup.number().required("Capacity is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.put(
        `https://node29.webte.fei.stuba.sk/davidov/timetableAPI/api.php/timetable/${id}`,
        values
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Timetable successfully updated!",
      }).then(() => {
        navigate("/timetable");
      });
    } catch (error) {
      console.error("Error editing schedule action:", error);
    }
  };

  if (initialData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Edit Timetable</h2>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="day">Day</label>
            <Field type="text" id="day" name="day" />
            <ErrorMessage name="day" component="div" />
          </div>
          <div>
            <label htmlFor="start_time">Start Time</label>
            <Field type="text" id="start_time" name="start_time" />
            <ErrorMessage name="start_time" component="div" />
          </div>
          <div>
            <label htmlFor="end_time">End Time</label>
            <Field type="text" id="end_time" name="end_time" />
            <ErrorMessage name="end_time" component="div" />
          </div>
          <div>
            <label htmlFor="course">Course</label>
            <Field type="text" id="course" name="course" />
            <ErrorMessage name="course" component="div" />
          </div>
          <div>
            <label htmlFor="entry">Entry</label>
            <Field type="text" id="entry" name="entry" />
            <ErrorMessage name="entry" component="div" />
          </div>
          <div>
            <label htmlFor="room">Room</label>
            <Field type="text" id="room" name="room" />
            <ErrorMessage name="room" component="div" />
          </div>
          <div>
            <label htmlFor="teacher">Teacher</label>
            <Field type="text" id="teacher" name="teacher" />
            <ErrorMessage name="teacher" component="div" />
          </div>
          <div>
            <label htmlFor="restriction">Restriction</label>
            <Field type="text" id="restriction" name="restriction" />
            <ErrorMessage name="restriction" component="div" />
          </div>
          <div>
            <label htmlFor="capacity">Capacity</label>
            <Field type="text" id="capacity" name="capacity" />
            <ErrorMessage name="capacity" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default EditTimetable;
