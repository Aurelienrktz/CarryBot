import React from "react";
import { Outlet } from "react-router-dom";
import s from "../styles/login.module.css";
const AuthLayout = () => {
  return (
    <div className={`${s.mainContainer} `}>
      <div className={`${s.about} ${s.curvey}`}>
        <div className={`fadeIn ${s.textContainer}`}>
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
        {/* 🌊 Vague SVG */}
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
