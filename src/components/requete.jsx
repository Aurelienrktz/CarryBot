import React, { useEffect, useState } from "react";
import s from "../styles/requete.module.css";
import Animation from "./animation";

const Requete = () => {
    Animation()
    const [nomClient,setNomClient]=useState("");
    const [localistation,setLocalisation]=useState("");
    const [objet,setObjet]=useState("");
    // const [etat,setEtat]=useState("");
    const [error,setError]=useState(null);
    const [animate, setAnimate] = useState(false);

    const [requete, setRequete] = useState([
    //   {
    //     id: 1,
    //     nomClient: "Andry R.",
    //     localisation: 3,
    //     objet: "Stylo à plume",
    //     etat: "en cours",
    //   },
    //   {
    //     id: 2,
    //     nomClient: "Mialy T.",
    //     localisation: 1,
    //     objet: "Bougie parfumée",
    //     etat: "arrivé",
    //   },
    //   {
    //     id: 3,
    //     nomClient: "Hery N.",
    //     localisation: 5,
    //     objet: "Cahier relié",
    //     etat: "arrivé",
    //   },
    //   {
    //     id: 4,
    //     nomClient: "Fanja L.",
    //     localisation: 2,
    //     objet: "Lampe de chevet",
    //     etat: "arrivé",
    //   },
    //   {
    //     id: 5,
    //     nomClient: "Tojo K.",
    //     localisation: 6,
    //     objet: "Sac à dos en cuir",
    //     etat: "en cours",
    //   },
    //   {
    //     id: 6,
    //     nomClient: "Nirina P.",
    //     localisation: 4,
    //     objet: "Tasse en céramique",
    //     etat: "arrivé",
    //   },
    //   {
    //     id: 7,
    //     nomClient: "Rado M.",
    //     localisation: 2,
    //     objet: "Montre en acier",
    //     etat: "en cours",
    //   },
    //   {
    //     id: 8,
    //     nomClient: "Tiana A.",
    //     localisation: 1,
    //     objet: "Paquet de crayons de couleur",
    //     etat: "arrivé",
    //   },
    //   {
    //     id: 9,
    //     nomClient: "Joel B.",
    //     localisation: 5,
    //     objet: "Boîte de bougies décoratives",
    //     etat: "en cours",
    //   },
    //   {
    //     id: 10,
    //     nomClient: "Lova S.",
    //     localisation: 3,
    //     objet: "Coussin décoratif",
    //     etat: "arrivé",
    //   },
    ]);

    // NOMBRE DES REQUETE
    const [nbrEnCours,setNbrEnCours]=useState(0);
    const [nbrArrivé,setNbrArrivé]=useState(0);
    const [vide,setVide]=useState(false)

    useEffect(() => {
        let enCours=0;
        let arrivé=0;
        requete.forEach((value) => {
            if(value.etat=="en cours"){
                enCours++
            }else if(value.etat=="arrivé"){
                arrivé++
            }
        })
        requete.length > 0 && setAnimate(true)
        setNbrEnCours(enCours);
        setNbrArrivé(arrivé);

    }, [requete]);

    function handleSubmit(e) {
        e.preventDefault();

        if(nomClient.trim()===""){
            setError("Veuillez entrer un nom ");
        }else if (objet.trim()==""){
            setError("Veuillez entrer un nom d'objet");
            }else if(localistation==""){
                setError("Veuillez entrer le numero du lieu");
            }else{

                //AJOUT DANS LA LISTE
                setRequete([
                  ...requete,
                  {
                    id: requete.length + 1,
                    nomClient: nomClient,
                    localisation: localistation,
                    objet: objet,
                    etat: "en cours",
                  },
                ]);
              alert("Requete envoyée");
              setNomClient("")
              setObjet("")
              setLocalisation("");
              setError(null);
            }

    }

    function handleDelete(id){
      const nvListe=requete.filter((value) => value.id!=id )
      setRequete(nvListe);
    }

  return (
    <div className={s.container}>
      <h1 className={`${s.title} fadeIn`}>Tableau de bord</h1>
      <div className={s.dashboard}>
          <div className="fadeIn">
            <h2>
              {nbrEnCours}
              <br />
              Requete(s) en cours
            </h2>
          </div>
        <div className="fadeIn2">
          <h2>
            {nbrArrivé}
            <br />
            Requete(s) terminées
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
                  backgroundColor: value.etat == "arrivé" && "#009739",
                  color: value.etat == "arrivé" && "white",
                }}
              >
                <td>{value.id}</td>
                <td>{value.nomClient}</td>
                <td>{value.objet}</td>
                <td>Lieu {value.localisation}</td>
                <td>{value.etat}</td>
                <td>
                  <img src="/image/delete.png" alt="icone delete" onClick={()=>handleDelete(value.id)} />
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
