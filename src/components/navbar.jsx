import React, { useEffect, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import s from "../styles/navbar.module.css";

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
        <NavLink to="/" onClick={() => setShow(!show)}>
          <img className={s.icon} src="/image/home.png" alt="icon home" />
          Acceuil
        </NavLink>
        <NavLink to="/requete" onClick={() => setShow(!show)}>
          <img
            className={s.icon}
            src="/image/request-for-proposal.png"
            alt="icon request"
          />
          Requete
        </NavLink>
      </div>
      <button className={s.logout} onClick={handleLogOut}>
        <img src="/image/logout (1).png" alt="icon logout" />
        Deconnexion
      </button>
      <h5>© 2025 CarryBot. ESIIA 3A ISPM </h5>
      <div className="flag">
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
  );
};

export default Navbar;
