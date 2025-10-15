import React from "react";

import { NavLink } from "react-router-dom";
import "../App.css"
import s from "../styles/acceuil.module.css";
import Animation from "./animation";


const Acceuil = () => {
  Animation()
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
          <div className=" fadeIn2">
            <img src="/image/robot.png" alt="" />
            <h2>3 - CarryBot agit </h2>
            <p>
              Le robot se déplace de manière autonome jusqu'à la destination.
            </p>
          </div>
          <div className=" fadeIn2">
            <img src="/image/fast-delivery.png" alt="" />
            <h2>4 - Livraison réussie </h2>
            <p>L'objet est livré au bon endroit en toute sécurité.</p>
          </div>
        </div>
        <h1 className={`${s.title} fadeIn`}>A propos</h1>
        <p className="fadeIn">
          CarryBot est un robot mobile autonome conçu par des étudiants de
          l'ISPM. Il permet d'effectuer des livraisons à courte distance, en se
          déplaçant de façon autonome tout en évitant les obstacles. Notre
          objectif est de démontrer comment la robotique et le web peuvent
          collaborer pour automatiser la logistique.
        </p>
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
