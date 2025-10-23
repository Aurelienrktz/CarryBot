import React from "react";
import { useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import axios from "axios";
import s from "../styles/login.module.css";
import Animation from "./animation";

const Login = ({ setIsAuthentificated }) => {
  Animation();
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState(null);

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
      <form className={s.formulaire} onSubmit={handleLogin}>
        <img src="/image/user.png" alt="icon user" />
        <h1>
          Connectez-vous et laissez <span>CarryBot</span> vous aider
        </h1>
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

        <label htmlFor="mdp">
          <input
            type="password"
            placeholder="Mot de passe"
            id="mdp"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
        </label>

        <button type="submit">Connexion</button>
      </form>
      <p>
        Pas encore de compte ? <Link to="/signUp">S'inscrire</Link>
      </p>
    </div>
  );
};

export default Login;
