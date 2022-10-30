import "./App.css";
import { Formdata } from "./components/Formdata";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <Router>
            <Routes>
              <Route path="/:id" element={<Formdata />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
