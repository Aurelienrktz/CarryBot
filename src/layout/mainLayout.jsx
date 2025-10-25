import React from "react";
import { Outlet } from "react-router-dom";
import s from "../styles/navbar.module.css";
import Navbar from "../components/navbar";

const MainLayout = ({ setShow, show, setIsAuthentificated,t,changeLanguage }) => {

  return (
    <div>
      <Navbar
        setIsAuthentificated={setIsAuthentificated}
        setShow={setShow}
        show={show}
        changeLanguage={changeLanguage}
        t={t}
      />
      <div className="header">
        <div className={s.burger} onClick={() => setShow(!show)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <img
          className=" logo fadeIn2"
          src="/image/LogoSample_ByTailorBrands-removebg-preview.png"
          alt="logo carryBot"
        />
        <div className="flag2">
          <img
            onClick={() => changeLanguage("mlg")}
            src="/image/madagascar.png"
            alt="madagascar flag"
          />
          <img
            onClick={() => changeLanguage("fr")}
            src="/image/france.png"
            alt="french flag"
          />
          <img
            onClick={() => changeLanguage("en")}
            src="/image/united-kingdom (1).png"
            alt="english flag"
          />
        </div>
      </div>
      <Outlet />
      <footer>
        <p className="fadeIn">© 2025 CarryBot . Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
