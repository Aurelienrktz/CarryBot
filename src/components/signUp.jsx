import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "../styles/login.module.css";
import Animation from "./animation";
import { Trans } from "react-i18next";

const SignUp = ({t}) => {
  Animation();
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [error, setError] = useState(null);
  const [visible,setVisible]=useState(false);

  //initialisation du hook useNavigate
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await fetch("http://192.168.88.183:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          email: email,
          mot_de_passe: mdp,
        }),
      });

      //Redirection après Inscription reussis
      navigate("/login")
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data.error.password[0] ||
        "Erreur lors de l'inscription";
      setError(msg);
    }
  }

  return (
    <div className={`${s.container2} fadeIn2`}>
      <img src="image/Sign up-amico.png" alt="icon sign up user" />
      <form onSubmit={handleSubmit}>
        <h1>
          <Trans i18nKey={"signUp.title"} components={[<span />]} />
        </h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="email">
          <input
            type="text"
            placeholder={t("signUp.inp1")}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="nom">
          <input
            type="text"
            placeholder={t("signUp.inp2")}
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </label>

        <label htmlFor="prenom">
          <input
            type="text"
            placeholder={t("signUp.inp3")}
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </label>

        <label htmlFor="mdp" style={{ position: "relative" }}>
          <input
            type={visible ? "text" : "password"}
            placeholder={t("signUp.inp4")}
            id="mdp"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
          <img
            onClick={() => setVisible(!visible)}
            style={{
              width: "30px",
              height: "30px",
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              userSelect: "none",
            }}
            src={visible ? "/image/hidden.png" : "/image/eye.png"}
          />
        </label>

        <button type="submit">{t("signUp.submit")}</button>
      </form>

      <p>
        <Trans
          i18nKey={"signUp.link"}
          components={[<Link to="/login">Se connecter</Link>]}
        />
      </p>
    </div>
  );
};

export default SignUp;
