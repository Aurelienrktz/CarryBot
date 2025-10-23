import React, { useEffect, useState } from "react";
import s from "../styles/requete.module.css";
import Animation from "./animation";
import { jwtDecode } from "jwt-decode";

const Requete = () => {
  Animation();
  const [message, setMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState(null);
  // NOMBRE DES REQUETE
  const [nbrEnCours, setNbrEnCours] = useState(0);
  const [nbrArrivé, setNbrArrivé] = useState(0);
  const [requeteActive, setRequeteActive] = useState({});

  const [requete, setRequete] = useState([]);
  const [ip] = useState("192.168.88.183");

  const fetchRequetes = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://192.168.88.183:8000/api/requete/liste/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Erreur HTTP :", res.status);
      return;
    }

    const data = await res.json();
    //console.log("Requêtes de l'utilisateur connecté :", data);
    setRequete(data);

    const active = data.find(
      (r) => r.etat === "en_cours" || r.etat === "arriver"
    );
    if (active) {
      setRequeteActive(active);
    } else {
      setRequeteActive({});
    }
  };

  useEffect(() => {
    fetchRequetes();
    const token = localStorage.getItem("access_token");
    const decoded = jwtDecode(token);
    const userId = decoded.user_id;
    const ws = new WebSocket(`ws://${ip}:8000/ws/requetes/`);

    ws.onopen = () => console.log("WebSocket connecté !");

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      //console.log("Message WS reçu :", message);

      const { event, data } = message; // correspond au WPF
      //console.log("WS event reçu :", event, data);

      // filtrer uniquement les requêtes de l'utilisateur connecté
      if (event === "delete" || data.utilisateurId == userId) {
        switch (event) {
          case "create":
            setRequete((prev) => [data, ...prev]);
            break;
          case "update":
            setRequete((prev) =>
              prev.map((r) => (r.id === data.id ? data : r))
            );
            setRequeteActive((prev) => {
              if (
                prev.id === data.id &&
                !["en_cours", "arriver"].includes(data.etat)
              ) {
                return {};
              } else if (["en_cours", "arriver"].includes(data.etat)) {
                return data;
              }
              return prev;
            });
            break;
          case "delete":
            setRequete((prev) =>
              prev.filter((r) => Number(r.id) !== Number(data.id))
            );
            break;
          default:
          //console.log("Événement WS inconnu :", event);
        }
      }
    };

    ws.onclose = () => console.log("WebSocket déconnecté !");
    ws.onerror = (err) => console.error("Erreur WS :", err);

    return () => ws.close();
  }, []);

  async function confirmerRequete(id) {
    const token = localStorage.getItem("access_token");

    const res = await fetch(
      `http://192.168.88.183:8000/api/requete/${id}/confirmer/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log("Requête confirmée :", data);
    } else {
      console.error("Erreur lors de la confirmation");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (destination.trim() === "") {
      setError("Veuillez entrer une destination ");
    } else if (message.trim() == "") {
      setError("Veuillez noter vos livraisons");
    } else {
      const accessToken = localStorage.getItem("access_token");

      await fetch("http://192.168.88.183:8000/api/requete/creer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          destination: destination,
          message: message,
        }),
      });
      setDestination("");
      setMessage("");
      setError(null);
    }
  }

  async function handleDelete(id) {
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `http://192.168.88.183:8000/api/requete/${id}/delete/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      // Supprimer localement dans le state
      setRequete((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer la requête");
    }
  }

  return (
    <div className={s.container}>
      <h1 className={`${s.title} fadeIn`}>Tableau de bord</h1>
      <div className={s.dashboard}>
        <div className="fadeIn">
          <h2>
            {requete.filter(r => r.etat === "en_attente").length}
            <br />
            {requete.filter(r => r.etat === "en_attente").length > 1 ? "Requetes en attente" : "Requete en attente" }
          </h2>
        </div>
        <div className="fadeIn2">
          <h2>
            {requete.filter(r => r.etat === "confirme").length}
            <br />
            {requete.filter(r => r.etat === "confirme").length > 1 ? "Requetes confirmé" : "Requete confirmé" }
          </h2>
        </div>
        <div className="fadeIn2">
          <h2>
            {requete.length} <br />
            Requete(s) Totale
          </h2>
        </div>
      </div>
      <h1 className={`${s.title} fadeIn`}>Faire une nouvelle requete</h1>

      {Object.keys(requeteActive).length > 0 && (
        <div>
          <h1>Requete active</h1>
          <p>Id: {requeteActive.id}</p>
          <p>Message : {requeteActive.message}</p>
          <p>Destination : {requeteActive.destination}</p>
          <p>Date : {requeteActive.date}</p>
          <p>Etat : {requeteActive.etat}</p>
          {requeteActive.etat == "arriver" && (
            <button onClick={() => confirmerRequete(requeteActive.id)}>
              Terminer
            </button>
          )}
        </div>
      )}

      <form className={`${s.requeteInp} fadeIn2`} onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="destination">
          Destination :
          <input
            value={destination}
            type="text"
            id="destination"
            placeholder="(x,y)"
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </label>

        <label htmlFor="message">
          Message :
          <input
            value={message}
            type="text"
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button type="submit">Envoyer</button>
      </form>

      <h1 className={`${s.title} fadeIn`}>Historique</h1>
      <table className="fadeIn">
        <thead>
          <tr>
            <th>Id</th>
            <th>Message</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Etat</th>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {requete.map((value, index) => {
            return (
              <tr
                key={index}
                style={{
                  backgroundColor: value.etat == "confirme" && "#009739",
                  color: value.etat == "arriver" && "white",
                }}
              >
                <td>{value.id}</td>
                <td>{value.message}</td>
                <td>{value.destination}</td>
                <td>{value.date}</td>
                <td>{value.etat}</td>
                {(value.etat === "en_attente" || value.etat === "confirme") && (
                  <td>
                    <img
                      src="/image/delete.png"
                      alt="icone delete"
                      onClick={() => handleDelete(value.id)}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Requete;
