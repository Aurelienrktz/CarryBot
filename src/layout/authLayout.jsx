import React from "react";
import { Outlet } from "react-router-dom";
import s from "../styles/login.module.css";
const AuthLayout = ({ changeLanguage }) => {
  return (
    <div className={`${s.mainContainer} `}>
      <div className={`${s.about} ${s.curvey}`}>
        <div className={`fadeIn ${s.textContainer}`}>
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
          <h1>
            Bienvenue sur <span>CarryBot</span>
          </h1>
          <p>
            CarryBot est un projet académique développé par des étudiants de
            l’Institut Supérieur Polytechnique de Madagascar, filière
            Electronique, Systèmes Informatiques et Intelligence Artificielle
            <span className={s.filiere}> (ESIIA3A)</span>. <br /> Notre objectif
            : concevoir une solution intelligente et innovante pour automatiser
            et simplifier le transport d’objets grâce à la robotique.
          </p>
        </div>
        <div className={s.imageContainer}>
          <img
            className={s.illustration}
            src="/image/Devices-pana(2).png"
            // src="/image/logo_ispm.png"
            alt="illustration"
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
