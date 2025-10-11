import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import s from "../styles/navbar.module.css";

const Navbar = ({show,setShow }) => {
  return (
    <div className={show ? `${s.navbar} ${s.navbar2}` : s.navbar}>
      <div className={`${s.burger2}`} onClick={() => setShow(!show)}>
        <div></div>
        <div></div>
      </div>
      <div style={{ display: show ? "flex" : "none" }}>
        <NavLink to="/" onClick={() => setShow(!show)}>
          Acceuil
        </NavLink>
        <NavLink to="/requete" onClick={() => setShow(!show)}>
          Requete
        </NavLink>
      </div>
      <h5>© 2025 CarryBot. ESIIA 3A ISPM </h5>
    </div>
  );
};

export default Navbar;
