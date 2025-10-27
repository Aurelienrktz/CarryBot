import React from "react";
import { useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import axios from "axios";
import s from "../styles/login.module.css";
import Animation from "./animation";


import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

const Login = ({ setIsAuthentificated,t }) => {
  Animation();
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://192.168.88.183:8000/api/token/", {
        // ton IP locale
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: mdp }),
      });

      const data = await res.json();

      if (res.ok) {
        // Stocker les tokens pour réutilisation
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("email_user", email);
        navigate("/");
      } else {
        alert(data.detail || "Erreur lors de la connexion");
      }
    } catch (err) {
      setError("Email ou Mot de passe incorrect");
    }
  }

  return (
    <div className={`${s.container} fadeIn2`}>

      <img src="/image/Mobile login-amico.png" alt="icon user" />
      <form className={s.formulaire} onSubmit={handleLogin}>
        <h1 dangerouslySetInnerHTML={{ __html: t("login.title") }} />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="email">
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="mdp" style={{ position: "relative" }}>
          <input
            type={visible ? "text" : "password"}
            placeholder="Mot de passe"
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
        <button type="submit">{t("login.submit")}</button>
      </form>
      <Trans i18nKey="login.link" components={[<Link to="/signUp" />]}>
      </Trans>
    </div>
  );
};

export default Login;
