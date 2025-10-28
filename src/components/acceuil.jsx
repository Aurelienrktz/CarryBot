import React, { useState ,useEffect} from "react";

import { NavLink } from "react-router-dom";
import "../App.css"
import s from "../styles/acceuil.module.css";
import Animation from "./animation";
import { imgISPM, imgCarrybot } from "../layout/image";
import { Trans } from "react-i18next";


const Acceuil = ({t}) => {
  const [index,setIndex]=useState(0);
  const [fade,setFade]=useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % imgISPM.length); // changer l'image
        setFade(true); // fade in
      }, 500); // durée du fade
    }, 5000);

    return () => clearInterval(interval);
  }, [imgISPM.length]);

  Animation();

  return (
    <div className={s.container}>
      <div className={`${s.header} ${s.curvey}`}>
        <div className=" fadeIn">
          <h1>{t("acceuil.name")}</h1>
          <h2>{t("acceuil.title")}</h2>
          <div>
            <a href="/requete">
              <Trans
                i18nKey={"acceuil.link"}
                components={[<NavLink to="/requete" className={s.link} />]}
              />
            </a>
          </div>
        </div>
        <img
          className=" fadeIn2"
          src="/image/people using robots-rafiki (1).png"
          alt="image illustration d'une personne utilisant un robot"
        />
      </div>

      <div>
        <h1 className={`${s.title} fadeIn`}>{t("acceuil.subTitle1")}</h1>
        <div className={`${s.tuto}`}>
          <div className=" fadeIn2">
            <img src="/image/customer.png" alt="" />
            <h2>1 - {t("acceuil.1")}</h2>
            <p>{t("acceuil.stape1")}</p>
          </div>
          <div className=" fadeIn2">
            <img src="/image/admin.png" alt="" />
            <h2>2 - {t("acceuil.2")} </h2>
            <p>{t("aceuil.stape2")}</p>
          </div>
          <div className=" fadeIn3">
            <img src="/image/robot.png" alt="" />
            <h2>3 - {t("acceuil.3")}</h2>
            <p>{t("acceuil.stape3")}</p>
          </div>
          <div className=" fadeIn3">
            <img src="/image/fast-delivery.png" alt="" />
            <h2>4 - {t("acceuil.4")}</h2>
            <p>{t("acceuil.stape4")}</p>
          </div>
        </div>
        <div>
          <h1 className={`${s.title} fadeIn`}>{t("acceuil.subTitle2")}</h1>
          <div className={s.apropos}>
            <div className="fadeIn2">
              <img
                id="slideShow"
                className={fade ? "fade-in" : "fade-out"}
                src={imgISPM[index]}
                alt={`Image ISPM ${index + 1}`}
              />

              <p>
                <Trans
                  i18nKey={"acceuil.descriptionISPM"}
                  components={[
                    <span />,
                    <span />,
                    <a
                      target="blank"
                      href="https://web.facebook.com/ISPM2014"
                    />,
                  ]}
                />
              </p>
            </div>
            <div className="fadeIn3">
              <p>
                <Trans
                  i18nKey={"acceuil.descriptionCarryBot"}
                  components={[<span />, <span className={s.filiere} />]}
                />
              </p>
              <img src="/image/561777318_24596868960005049_1934023389779969411_n.gif" alt="image robot carryBot" />
            </div>
          </div>
        </div>
        <h1 className={`${s.title} fadeIn`}>{t("acceuil.subTitle3")}</h1>
        <ul>
          <li className="fadeIn">
            <img src="/image/startup.png" alt="" />
            {t("acceuil.av1")}
          </li>
          <li className="fadeIn">
            <img src="/image/ai-assistant.png" alt="" />
            {t("acceuil.av2")}
          </li>
          <li className="fadeIn">
            <img src="/image/precision.png" alt="" />
            {t("acceuil.av3")}
          </li>
          <li className="fadeIn">
            <img src="/image/ecology.png" alt="" />
            {t("acceuil.av4")}
          </li>
          <li className="fadeIn">
            <img src="/image/web-domain.png" alt="" />
            {t("acceuil.av5")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Acceuil;
