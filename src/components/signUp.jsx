import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import s from "../styles/login.module.css";
import Animation from "./animation";

const SignUp = () => {
  Animation()
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [type, setType] = useState("ADMIN"); // par défaut ADMIN
  const [error, setError] = useState(null);

  //initialisation du hook useNavigate
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://carryBot.sevalla.app/api/v1/auth/register/",
        {
          email: email,
          password: mdp,
          first_name: nom,
          last_name: prenom,
          type: type,
        }
      );

      //Redirection après Inscription reussis
      alert("Inscription reussis");
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data.error.password[0] ||
        "Erreur lors de l'inscription";
      setError(msg);
    }
  }

  return (
    <div className={s.mainContainer}>
      <div className={`${s.container2} fadeIn2`}>
        <form onSubmit={handleSubmit}>
          <img src="image/add-user.png" alt="icon sign up user" />
          <h1>Inscription</h1>

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

          <label htmlFor="nom">
            <input
              type="text"
              placeholder="Nom"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </label>

          <label htmlFor="prenom">
            <input
              type="text"
              placeholder="Prénom"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
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

          <button type="submit">Inscription</button>
        </form>

        <p>
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
