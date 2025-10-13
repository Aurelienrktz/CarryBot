import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import s from "../styles/navbar.module.css";

const Navbar = ({ show, setShow }) => {
  return (
    <div className={show ? `${s.navbar} ${s.navbar2}` : s.navbar}>
      <div className={`${s.burger2}`} onClick={() => setShow(!show)}>
        <div></div>
        <div></div>
      </div>
      <div style={{ display: show ? "flex" : "none" }}>
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
      <h5>© 2025 CarryBot. ESIIA 3A ISPM </h5>
    </div>
  );
};

export default Navbar;
