import React from "react";
import { Outlet } from "react-router-dom";
import s from "../styles/login.module.css";
import { Trans } from "react-i18next";
import i18next from "i18next";

const AuthLayout = ({ t,changeLanguage }) => {
  return (
    <div className={`${s.mainContainer} `}>
      <div className={`${s.about} ${s.curvey}`}>
        <div className={`fadeIn ${s.textContainer}`}>
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
          <h1 dangerouslySetInnerHTML={{ __html: t("auth.title") }} />
          <p>
            <Trans
              i18nKey="auth.description"
              components={[<span className={s.filiere} />]}
            />
          </p>
          <p />
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
