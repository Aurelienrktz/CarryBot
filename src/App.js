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

import i18next from "./layout/translation";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

function App() {
  Animation();
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  const [show, setShow] = useState(false);

  const PrivateRoute = ({ children }) =>
    isAuthentificated ? children : <Navigate to="/login" replace />;

  // changement de langue
  const { t } = useTranslation();
  function changeLanguage(lng) {
    i18next.changeLanguage(lng);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<AuthLayout changeLanguage={changeLanguage} t={t} />}>
            <Route
              path="/login"
              element={
                <Login
                  changeLanguage={changeLanguage}
                  t={t}
                  setIsAuthentificated={setIsAuthentificated}
                />
              }
            />
            <Route
              path="/signUp"
              element={<SignUp changeLanguage={changeLanguage} t={t} />}
            />
          </Route>

          <Route
            element={
              <MainLayout
                setShow={setShow}
                show={show}
                setIsAuthentificated={setIsAuthentificated}
                changeLanguage={changeLanguage}
                t={t}
              />
            }
          >
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <Acceuil changeLanguage={changeLanguage} t={t} />
                </PrivateRoutes>
              }
            />
            <Route
              path="/requete"
              element={
                <PrivateRoutes>
                  <Requete changeLanguage={changeLanguage} t={t} />
                </PrivateRoutes>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
