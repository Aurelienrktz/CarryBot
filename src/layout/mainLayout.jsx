import React from "react";
import { Outlet } from "react-router-dom";
import s from "../styles/navbar.module.css";
import Navbar from "../components/navbar";
import i18next from "i18next";

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
            src="/image/madagascar(2).png"
            alt="madagascar flag"
            className={i18next.language === "mlg" ? "active" : ""}
          />
          <img
            onClick={() => changeLanguage("fr")}
            src="/image/france(2).png"
            alt="french flag"
            className={i18next.language === "fr" ? "active" : ""}
          />
          <img
            onClick={() => changeLanguage("en")}
            src="/image/united-kingdom (2).png"
            alt="english flag"
            className={i18next.language === "en" ? "active" : ""}
          />
        </div>
      </div>
      <Outlet />
      <footer>
        <p className="fadeIn">© 2025 CarryBot . {t("footer")}</p>
      </footer>
    </div>
  );
};

export default MainLayout;
