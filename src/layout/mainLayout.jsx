import React from "react";
import { Outlet } from "react-router-dom";
import s from "../styles/navbar.module.css";
import Navbar from "../components/navbar";

const MainLayout = ({ setShow, show, setIsAuthentificated }) => {

  return (
    <div>
      <Navbar setIsAuthentificated={setIsAuthentificated} setShow={setShow} show={show} />
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
      </div>
      <Outlet />
      <footer>
        <p className="fadeIn">© 2025 CarryBot . Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
