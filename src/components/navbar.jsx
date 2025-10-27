import React, { useEffect, useState } from "react";
import { NavLink,useNavigate,Link } from "react-router-dom";
import s from "../styles/navbar.module.css";
import { Trans } from "react-i18next";
import i18next from "i18next";

const Navbar = ({ setIsAuthentificated, show, setShow, t, changeLanguage }) => {
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("access_token");
    setIsAuthentificated(false);
    navigate("/login");
    setShow(!show);
  }

  return (
    <div className={show ? `${s.navbar} ${s.navbar2}` : s.navbar}>
      <div className={`${s.burger2}`} onClick={() => setShow(!show)}>
        <div></div>
        <div></div>
      </div>
      <div>
        <div className={s.logo_container}>
          <img
            className={s.logo}
            src="/image/LogoSample_ByTailorBrands-removebg-preview.png"
            alt="logo carryBot"
          />
        </div>
        <Link to="/" onClick={() => setShow(!show)}>
          <img className={s.icon} src="/image/home.png" alt="icon home" />
          {t("navbar.link1")}
        </Link>

        <NavLink to="/requete" onClick={() => setShow(!show)}>
          <img
            className={s.icon}
            src="/image/request-for-proposal.png"
            alt="icon request"
          />
          {t("navbar.link2")}
        </NavLink>
      </div>
      <button className={s.logout} onClick={handleLogOut}>
        <img src="/image/logout (1).png" alt="icon logout" />
        {t("navbar.btn")}
      </button>
      <div className="flag">
        <img
          onClick={() => changeLanguage("mlg")}
          src="/image/madagascar(2).png"
          alt="madagascar flag"
          className={i18next.language === "mlg" ? "active2" : ""}
        />
        <img
          onClick={() => changeLanguage("fr")}
          src="/image/france(2).png"
          alt="french flag"
          className={i18next.language === "fr" ? "active2" : ""}
        />
        <img
          onClick={() => changeLanguage("en")}
          src="/image/united-kingdom (2).png"
          alt="english flag"
          className={i18next.language === "en" ? "active2" : ""}
        />
      </div>
      <h5>© 2025 CarryBot. ESIIA 3A ISPM </h5>
    </div>
  );
};

export default Navbar;
