import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const AddTimetable = () => {
  const navigate = useNavigate();
  const initialValues = {
    day: "",
    start_time: "",
    end_time: "",
    course: "",
    entry: "",
    room: "",
    teacher: "",
    restriction: "",
    capacity: "",
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
    capacity: Yup.number()
      .required("Capacity is required")
      .typeError("Capacity must be a number")
      .integer("Capacity must be an integer")
      .min(1, "Capacity must be at least 1"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://node29.webte.fei.stuba.sk/davidov/timetableAPI/api.php/timetable",
          values
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Class successfully added!",
        }).then(() => {
          navigate("/timetable");
        });
      } catch (error) {
        console.error("Error adding schedule action:", error);
      }
    },
  });

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={formik.handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="day">Day</label>
            <Field type="text" id="day" name="day" placeholder="Day" />
            <ErrorMessage name="day" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="start_time">Start Time</label>
            <Field
              type="text"
              id="start_time"
              name="start_time"
              placeholder="Start Time"
            />
            <ErrorMessage name="start_time" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="end_time">End Time</label>
            <Field
              type="text"
              id="end_time"
              name="end_time"
              placeholder="End Time"
            />
            <ErrorMessage name="end_time" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <Field type="text" id="course" name="course" placeholder="Course" />
            <ErrorMessage name="course" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="entry">Entry</label>
            <Field type="text" id="entry" name="entry" placeholder="Entry" />
            <ErrorMessage name="entry" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room</label>
            <Field type="text" id="room" name="room" placeholder="Room" />
            <ErrorMessage name="room" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="teacher">Teacher</label>
            <Field
              type="text"
              id="teacher"
              name="teacher"
              placeholder="Teacher"
            />
            <ErrorMessage name="teacher" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="restriction">Restriction</label>
            <Field
              type="text"
              id="restriction"
              name="restriction"
              placeholder="Restriction"
            />
            <ErrorMessage
              name="restriction"
              component="div"
              className="error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <Field
              type="text"
              id="capacity"
              name="capacity"
              placeholder="Capacity"
            />
            <ErrorMessage name="capacity" component="div" className="error" />
          </div>
          <button type="submit">Add</button>
        </Form>
      </Formik>
    </>
  );
};

export default AddTimetable;
