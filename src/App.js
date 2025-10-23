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
import PrivateRoutes from "./components/privateRoute";


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
            <Route path="/" element={<PrivateRoutes><Acceuil /></PrivateRoutes>} />
            <Route path="/requete"element={<PrivateRoutes><Requete /></PrivateRoutes>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
