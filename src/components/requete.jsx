import React, { useEffect, useState } from "react";
import s from "../styles/requete.module.css";
import Animation from "./animation";
// import { jwtDecode } from "jwt-decode";

const Requete = () => {
  Animation();
  const [message, setMessage] = useState("");
  const [destination, setDestination] = useState(1);
  const [error, setError] = useState(null);
  const [error1,setError1]=useState(false);
  const [error2,setError2]=useState(false);

  const [requeteActive, setRequeteActive] = useState({});
  const [colMax] = useState(4);
  const [rawMax] = useState(3);

  const [requete, setRequete] = useState([]);
  const [ip] = useState("192.168.88.183");

  const fetchRequetes = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://" + ip + ":8000/api/requete/liste/", {
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

      const { event, data } = message; // correspond au WPF

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

    const res = await fetch(`http://${ip}:8000/api/requete/${id}/confirmer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Requête confirmée :", data);
    } else {
      console.error("Erreur lors de la confirmation");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (Number(destination) < 1 || Number(destination) > rawMax * colMax) {
      setError(
        "Veuillez entrer une destination valable entre 1 et " + rawMax * colMax
      );
      setError2(true)
    } else if (message.trim() == "") {
      setError("Veuillez entrer un objet à livrer");
      setError1(true)
    } else {
      const pos = indexToRowCol(Number(destination), rawMax, colMax);
      const dest = "(" + pos.row + "," + pos.col + ")";
      const accessToken = localStorage.getItem("access_token");
      
      await fetch("http://" + ip + ":8000/api/requete/creer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          destination: dest,
          message: message,
        }),
      });

      setError1(false);
      setError2(false)
      setDestination("");
      setMessage("");
      setError(null);
    }
  }

  function indexToRowCol(x, n, m, zeroBased = false) {
    if (!Number.isFinite(x) || !Number.isFinite(n) || !Number.isFinite(m))
      return null;
    n = Math.floor(n);
    m = Math.floor(m);
    if (n <= 0 || m <= 0) return null;

    const xi = zeroBased ? Math.floor(x) : Math.floor(x) - 1;
    if (xi < 0 || xi >= n * m) return null;
    const row = Math.floor(xi / m);
    const col = xi % m;
    return { row, col };
  }

  function rowColToIndex(str, n = rawMax, m = colMax, zeroBased = false) {
    let [row, col] = str.slice(1, -1).split(",").map(Number);

    if (
      !Number.isFinite(row) ||
      !Number.isFinite(col) ||
      !Number.isFinite(n) ||
      !Number.isFinite(m)
    )
      return null;
    n = Math.floor(n);
    m = Math.floor(m);
    row = Math.floor(row);
    col = Math.floor(col);
    if (row < 0 || row >= n || col < 0 || col >= m) return null;
    const xi = row * m + col;
    return zeroBased ? xi : xi + 1;
  }

  async function handleDelete(id) {
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(`http://${ip}:8000/api/requete/${id}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      // Supprimer localement dans le state
      setRequete((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer la requête");
    }
  }

  function giveDate(dateString) {
    const date = new Date(dateString);
    const readable = date.toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return readable;
  }

  return (
    <div className={s.container}>
      <h1 className={`${s.title} fadeIn`}>Tableau de bord</h1>
      <div className={s.dashboard}>
        <div className="fadeIn2">
          <h2>
            {requete.filter((r) => r.etat === "en_attente").length}
            <br />
            {requete.filter((r) => r.etat === "en_attente").length > 1
              ? "Requetes En ttente"
              : "Requete En attente"}
          </h2>
        </div>
        <div className="fadeIn2">
          <h2>
            {requete.filter((r) => r.etat === "confirme").length}
            <br />
            {requete.filter((r) => r.etat === "confirme").length > 1
              ? "Requetes Confirmé"
              : "Requete Confirmé"}
          </h2>
        </div>
        <div className="fadeIn2">
          <h2>
            {requete.length} <br />
            {requete.length > 1 ? "Requetes Totale" : "Requete Totale"}
          </h2>
        </div>
      </div>
      <h1 className={`${s.title} fadeIn`}>Faire une nouvelle requete</h1>

      <div className={s.requette}>
        <form className={`${s.requeteInp} fadeIn2`} onSubmit={handleSubmit}>
          <h1>Formulaire</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <label htmlFor="message">
            Objet :
            <input
              value={message}
              type="text"
              id="message"
              placeholder="Stylo"
              onChange={(e) => setMessage(e.target.value)}
              style={{ boxShadow: error1 && "0px 0px 5px red" }}
            />
          </label>

          <label htmlFor="destination">
            Destination :
            <input
              value={destination}
              type="number"
              id="destination"
              placeholder="1"
              min={1}
              onChange={(e) => setDestination(e.target.value)}
              required
              style={{ boxShadow: error2 && "0px 0px 5px red" }}
            />
          </label>

          <button type="submit">Envoyer</button>
        </form>
        {Object.keys(requeteActive).length > 0 && (
          <div>
            <h1>Requete en cours</h1>
            <p>Objet : {requeteActive.message}</p>
            <p>Destination : {requeteActive.destination}</p>
            <p>Etat : {requeteActive.etat}</p>
            {requeteActive.etat == "arriver" && (
              <button onClick={() => confirmerRequete(requeteActive.id)}>
                Terminer
              </button>
            )}
          </div>
        )}
      </div>

      <h1 className={`${s.title} fadeIn`}>Historique</h1>

      {requete.length === 0 ? (
        <h2>Aucune requete</h2>
      ) : (
        <table className="fadeIn2">
          <thead>
            <tr>
              <th>Id</th>
              <th>Message</th>
              <th>Destination</th>
              <th>Date d'envoye</th>
              <th>Etat</th>
              <th>Action</th>
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
                  <td>{rowColToIndex(value.destination)}</td>
                  <td>{giveDate(value.date)}</td>
                  <td>{value.etat}</td>
                  {(value.etat === "en_attente" ||
                    value.etat === "confirme") && (
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
      )}
    </div>
  );
};

export default Requete;
