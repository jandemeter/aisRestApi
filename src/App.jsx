import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TimetableButtons from "./TimetableButtons";
import Timetable from "./Timetable";
import EditTimetable from "./EditTimetable";
import Thesis from "./Thesis";
import Swagger from "./Swagger";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTimetable from "./AddTimetable";
import SwaggerThesis from "./SwaggerThesis"; // Importing SwaggerThesis component

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              My App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/timetable">
                    Timetable
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/thesis">
                    Thesis
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/swagger">
                    Swagger Timetable
                  </Link>
                </li>
                <li className="nav-item"> {/* Added new route link for SwaggerThesis */}
                  <Link className="nav-link" to="/swaggerthesis">
                    Swagger Thesis
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<TimetableButtons />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/thesis" element={<Thesis />} />
        <Route path="/swagger" element={<Swagger />} />
        <Route path="/swaggerthesis" element={<SwaggerThesis />} /> {/* Added route for SwaggerThesis */}
        <Route path="/add" element={<AddTimetable />} />
        <Route path="/edit/:id" element={<EditTimetable />} />
      </Routes>
    </Router>
  );
}

export default App;
