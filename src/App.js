import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Acceuil from "./components/acceuil";
import Requete from "./components/requete";
import Login from "./components/login";
import SignUp from "./components/signUp";
import { useEffect, useState } from "react";
import s from "./styles/navbar.module.css";
import Animation from "./components/animation";

function App() {
  Animation();
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  const [show, setShow] = useState(false);

  const PrivateRoute = ({ children }) =>
    isAuthentificated ? children : <Navigate to="/login" replace />;

  return (
    <Router>
      <div className="App">
        <Navbar show={show} setShow={setShow} />
        <div className={s.burger} onClick={() => setShow(!show)}>
          <div style={{ backgroundColor: show && "white" }}></div>
          <div style={{ backgroundColor: show && "white" }}></div>
          <div style={{ backgroundColor: show && "white" }}></div>
        </div>
        <h1 className="fadeIn2">CarryBot</h1>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthentificated={setIsAuthentificated} />}
          />
          <Route path="/signUp" element={<SignUp />} />
          {/* <Route path="/" element={<PrivateRoute><Acceuil /></PrivateRoute>} /> */}
          <Route path="/" element={<Acceuil />} />
          {/* <Route
            path="/requete"
            element={
              <PrivateRoute>
                <Requete />
              </PrivateRoute>
            }
          /> */}
          <Route path="/requete" element={<Requete />} />
        </Routes>
        <footer>
          <p className="fadeIn">© 2025 CarryBot . Tous droits réservés.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
