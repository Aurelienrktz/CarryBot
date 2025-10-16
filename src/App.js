import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import AuthLayout from "./layout/authLayout";
import Acceuil from "./components/acceuil";
import Requete from "./components/requete";
import Login from "./components/login";
import SignUp from "./components/signUp";
import { useEffect, useState } from "react";
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
        <Routes>
          <Route element={<AuthLayout/>}>
            <Route
              path="/login"
              element={<Login setIsAuthentificated={setIsAuthentificated} />}
            />
            <Route path="/signUp" element={<SignUp />} />
          </Route>

          <Route
            element={
              <MainLayout
                setShow={setShow}
                show={show}
                setIsAuthentificated={setIsAuthentificated}
              />
            }
          >
            <Route path="/" element={<Acceuil />} />
            <Route path="/requete" element={<Requete />} />
            {/* <Route path="/" element={<PrivateRoute><Acceuil /></PrivateRoute>} /> */}
            {/* <Route path="/requete"element={<PrivateRoute><Requete /></PrivateRoute>}/> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
