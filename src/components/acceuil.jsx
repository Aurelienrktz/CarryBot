import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import "../App.css";
import s from "../styles/acceuil.module.css";
import Animation from "./animation";
import { imgISPM } from "../layout/image";

const Acceuil = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

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
          <h1>CarryBot</h1>
          <h2>"Le Robot de livraison intelligent , autonome et précis."</h2>
          <div>
            <NavLink to="/requete" className={s.link}>
              Faire une requete
            </NavLink>
          </div>
        </div>
        <img
          src="/image/people using robots-rafiki (1).png"
          alt="image illustration d'une personne utilisant un robot"
        />
      </div>

      <div>
        <h1 className={`${s.title} fadeIn`}>Comment ça marche</h1>
        <div className={`${s.tuto}`}>
          <div className=" fadeIn2">
            <img src="/image/customer.png" alt="" />
            <h2>1 - Le client commande </h2>
            <p>Le client choisit un produit et indique son emplacement</p>
          </div>
          <div className=" fadeIn2">
            <img src="/image/admin.png" alt="" />
            <h2>2 - L'administrateur valide </h2>
            <p>L'administrateur reçoit la commande et prépare le robot.</p>
          </div>
          <div className=" fadeIn3">
            <img src="/image/robot.png" alt="" />
            <h2>3 - CarryBot agit </h2>
            <p>
              Le robot se déplace de manière autonome jusqu'à la destination.
            </p>
          </div>
          <div className=" fadeIn3">
            <img src="/image/fast-delivery.png" alt="" />
            <h2>4 - Livraison réussie </h2>
            <p>L'objet est livré au bon endroit en toute sécurité.</p>
          </div>
        </div>
        <div>
          <h1 className={`${s.title} fadeIn`}>A propos</h1>
          <div className={s.apropos}>
            <div className="fadeIn2">
              <img
                id="slideShow"
                className={fade ? "fade-in" : "fade-out"}
                src={imgISPM[index]}
                alt={`Image ISPM ${index + 1}`}
              />

                
                <p>
                  L’Institut Supérieur Polytechnique de Madagascar est une
                  grande école d’ingénieurs reconnue pour sa formation axée sur
                  la pratique, l’innovation et la recherche. Située à Antsobolo,
                  Antananarivo, l’ <span>ISPM</span> forme chaque année des
                  étudiants passionnés dans divers domaines tels que
                  l’informatique, la finance, la comptabilité, le tourisme , le
                  génie civil ou encore l’agro-industrie. Grâce à son approche
                  basée sur les projets et l’entrepreneuriat technologique, l’
                  <span> ISPM </span>
                  encourage ses étudiants à concevoir des solutions concrètes
                  pour répondre aux besoins de la société malgache.
                </p>

            </div>
            <div className="fadeIn3">
              <p>
                Le projet <span>CarryBot</span> s’inscrit dans cette vision,
                illustrant la créativité et le savoir-faire des étudiants de la
                filière ESIIA{" "}
                <span className={s.filiere}>
                  (Électronique, Systèmes Informatiques et Intelligence
                  Artificielle)
                </span>{" "}
                . Ce projet académique vise à concevoir une solution
                intelligente et automatisée pour le transport d’objets,
                combinant robotique et intelligence artificielle. Il reflète non
                seulement la maîtrise technique des étudiants, mais aussi leur
                capacité à imaginer des applications concrètes et innovantes,
                alliant technologie et praticité.
              </p>
              <img src="/image/ispm2.jpg" alt="image ispm antsobolo" />
            </div>
          </div>
        </div>
        <h1 className={`${s.title} fadeIn`}>Avantages</h1>
        <ul>
          <li className="fadeIn">
            <img src="/image/startup.png" alt="" />
            Livraison rapide et autonome.
          </li>
          <li className="fadeIn">
            <img src="/image/ai-assistant.png" alt="" />
            Evite automatiquement les obstacles.
          </li>
          <li className="fadeIn">
            <img src="/image/precision.png" alt="" />
            Navigation précise à l'aide des capteurs.
          </li>
          <li className="fadeIn">
            <img src="/image/ecology.png" alt="" />
            Projet eco-respinsable et éducatif (ISPM).
          </li>
          <li className="fadeIn">
            <img src="/image/web-domain.png" alt="" />
            Commande simple via interface web.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Acceuil;
