import React from 'react';
import { useState } from "react";
import { Link,replace,useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from "../styles/login.module.css";
import Animation from './animation';

const Login = ({setIsAuthentificated}) => {
  Animation()
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://itakalo-back-fp5nc.sevalla.app/api/v1/auth/login/",
        {
          email: email,
          password: mdp,
        }
      );

      //VERIFICATION dans console
      console.log("Connexion reussis");
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsAuthentificated(true);
        navigate("/", { replace: true });
        
      } else {
        setError("Erreur de connexion : Token non reçue");
      }
    } catch (err) {
      setError("Email ou Mot de passe incorrect");
    }
  }

  return (
    <div className={s.mainContainer}>
      <div className={`${s.container} fadeIn2`}>
        <form onSubmit={handleLogin}>
          <img src="/image/user.png" alt="icon user" />
          <h1>Utilisateur Connexion</h1>
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
    </div>
  );
};

export default Login;
