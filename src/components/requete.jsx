import React, { useEffect, useState } from "react";
import s from "../styles/requete.module.css";
import Animation from "./animation";

const Requete = () => {
  Animation();
  const [nomClient, setNomClient] = useState("");
  const [localistation, setLocalisation] = useState("");
  const [objet, setObjet] = useState("");
  const [error, setError] = useState(null);
  const [animate,setAnimate]=useState(false);
  const [requete, setRequete] = useState([]);
  const [requetteEnCours, setRequetteEnCours] = useState(null);

  // NOMBRE DES REQUETE
  const [nbrEnCours, setNbrEnCours] = useState(0);
  const [nbrEnAttente, setNbrEnAttente] = useState(0);
  
  function handleSubmit(e) {
    e.preventDefault();

    if (nomClient.trim() === "") {
      setError("Veuillez entrer un nom ");
    } else if (objet.trim() === "") {
      setError("Veuillez entrer un nom d'objet");
    } else if (localistation === "") {
      setError("Veuillez entrer le numero du lieu");
    } else {
      //AJOUT DANS LA LISTE
      setRequete([
        ...requete,
        {
          id: requete.length + 1,
          nomClient: nomClient,
          localisation: localistation,
          objet: objet,
          etat: "en attente",
        },
      ]);
      alert("Requete envoyée");
      setNomClient("");
      setObjet("");
      setLocalisation("");
      setError(null);
    }
  }

  function handleDelete(id) {
    const nvListe = requete.filter((value) => value.id !== id);
    setRequete(nvListe);
  }

  // FONCTION TERMINER
  function handleFinish(value){
    // Mis à jour etat dans historique
    requete.map((value) =>
      value.id == requetteEnCours.id ? {...value,etat : "terminé"}:value
    );
    alert("effectué");
    // setRequetteEnCours({
    //   id:value.id,
    //   nomClient:value.nomClient,
    //   objet:value.objet,
    //   localistation:value.localisation,
    //   etat:"terminé"
    // })
    // const requeteTotale = requete.filter(
    //   (value) => value.id !== requetteEnCours.id
    // );
    // setRequete(requeteTotale);
    // setRequete([
    //   ...requete,
    //   {
    //     id: requetteEnCours.id,
    //     nomClient: requetteEnCours.nomClient,
    //     objet: requetteEnCours.objet,
    //     localisation: requetteEnCours.localisation,
    //     etat: requeteEnCours.etat,
    //   },
    // ]);
  }

  useEffect(() => {
    let enCours = 0;
    let enAttente = 0;
    requete.forEach((value) => {
      if (value.etat === "en cours") {
        enCours++;
      } else if (value.etat === "en attente") {
        enAttente++;
      }
    });
    requete.length > 0 && setAnimate(true);
    // Recherche de requette en attente
    const requeteEnCours = requete.find((value) => value.etat === "en attente") || null;
    
    // Modification des states
    setRequetteEnCours(requeteEnCours);
    setNbrEnCours(enCours);
    setNbrEnAttente(enAttente);
    console.log(requetteEnCours);
  }, [requete, requetteEnCours]);

  return (
    <div className={s.container}>
      <h1 className={`${s.title} fadeIn`}>Tableau de bord</h1>
      <div className={s.dashboard}>
        <div className="fadeIn">
          <h2>
            {nbrEnCours}
            <br />
            Requete en cours
          </h2>
        </div>
        <div className="fadeIn2">
          <h2>
            {nbrEnAttente}
            <br />
            Requete(s) en attente
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
      <div className={s.requette}>
        <form className={`${s.requeteInp} fadeIn2`} onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label htmlFor="nomClient">
            Nom :
            <input
              value={nomClient}
              type="text"
              id="nomClient"
              placeholder="Aurelien"
              onChange={(e) => setNomClient(e.target.value)}
            />
          </label>
          <label htmlFor="objet">
            Objet :
            <input
              value={objet}
              type="text"
              id="objet"
              placeholder="Stylo"
              onChange={(e) => setObjet(e.target.value)}
            />
          </label>
          <label htmlFor="localisation">
            Localisation :
            <input
              value={localistation}
              type="number"
              min={1}
              max={6}
              id="localisation"
              placeholder="5"
              onChange={(e) => setLocalisation(e.target.value)}
            />
          </label>
          <button type="submit">Envoyer</button>
        </form>
        {requetteEnCours && (
          <div>
            <h1>Requete en cours</h1>
            <p>Objet : {requetteEnCours.objet} </p>
            <p>Destination : {requetteEnCours.localisation}</p>
            <button onClick={()=>handleFinish(requetteEnCours)}>Terminer</button>
          </div>
        )}
      </div>
      <h1 className={`${s.title} fadeIn`}>Historique</h1>
      <table className="fadeIn">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Objet</th>
            <th>Destination</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requete.map((value, index) => {
            return (
              <tr
                key={index}
                style={{
                  backgroundColor: value.etat === "terminé" && "#009739",
                  color: value.etat === "terminé" && "white",
                }}
              >
                <td>{value.id}</td>
                <td>{value.nomClient}</td>
                <td>{value.objet}</td>
                <td>Lieu {value.localisation}</td>
                <td>{value.etat}</td>
                <td>
                  {value.etat == "terminé" && (
                    <img
                      src="/image/delete.png"
                      alt="icone delete"
                      onClick={() => handleDelete(value.id)}
                    />
                  )}
                </td>
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
