import React, { useState, useEffect } from 'react';

const Inscriptions = () => {
  // États pour l'adhérent
  const [adherentData, setAdherentData] = useState({
    nom: '',
    prenom: '',
    genre: '',
    dateNaissance: '',
    poids: '',
    taille: '',
    adresse1: '',
    adresse2: '',
    codePostal: '',
    ville: '',
    email1: '',
    email2: '',
    portable1: '',
    portable2: ''
  });

  // États pour la personne d'urgence
  const [personneUrgence, setPersonneUrgence] = useState({
    nom: '',
    prenom: '',
    lienParente: '',
    portable: ''
  });

  // États pour les formules et doboks
  const [formules, setFormules] = useState([]);
  const [doboks, setDoboks] = useState([]);
  const [formuleID, setFormuleID] = useState('');
  const [dobokID, setDobokID] = useState('');

  // Autres états
  const [reductionFamille, setReductionFamille] = useState(0);
  const [reductionPASS, setReductionPASS] = useState(0);
  const [modePaiement, setModePaiement] = useState('');

  useEffect(() => {
    // Fetch les formules et doboks pour remplir les sélections
    const fetchData = async () => {
      try {
        const formuleResponse = await fetch('http://localhost:9017/api/formules');
        const formuleData = await formuleResponse.json();
        setFormules(formuleData);

        const dobokResponse = await fetch('http://localhost:9017/api/doboks');
        const dobokData = await dobokResponse.json();
        setDoboks(dobokData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9017/api/inscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          adherentData,
          personneUrgence,
          formuleID,
          dobokID,
          reductionFamille,
          reductionPASS,
          modePaiement
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission du formulaire');
      }

      alert('Inscription réussie !');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5">
      <h2>Formulaire d'inscription</h2>

      {/* Champs d'adhérent */}
      <div className="mb-3">
        <label>Nom</label>
        <input
          type="text"
          name="nom"
          value={adherentData.nom}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label>Prénom</label>
        <input
          type="text"
          name="prenom"
          value={adherentData.prenom}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label>Genre</label>
        <select
          name="genre"
          value={adherentData.genre}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
          required
        >
          <option value="">Sélectionner</option>
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Date de Naissance</label>
        <input
          type="date"
          name="dateNaissance"
          value={adherentData.dateNaissance}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label>Poids (kg)</label>
        <input
          type="number"
          step="0.1"
          name="poids"
          value={adherentData.poids}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Taille (cm)</label>
        <input
          type="number"
          name="taille"
          value={adherentData.taille}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Adresse 1</label>
        <input
          type="text"
          name="adresse1"
          value={adherentData.adresse1}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Adresse 2</label>
        <input
          type="text"
          name="adresse2"
          value={adherentData.adresse2}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Code Postal</label>
        <input
          type="text"
          name="codePostal"
          value={adherentData.codePostal}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Ville</label>
        <input
          type="text"
          name="ville"
          value={adherentData.ville}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Email 1</label>
        <input
          type="email"
          name="email1"
          value={adherentData.email1}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Email 2</label>
        <input
          type="email"
          name="email2"
          value={adherentData.email2}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Portable 1</label>
        <input
          type="tel"
          name="portable1"
          value={adherentData.portable1}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Portable 2</label>
        <input
          type="tel"
          name="portable2"
          value={adherentData.portable2}
          onChange={(e) => handleChange(e, setAdherentData)}
          className="form-control"
        />
      </div>

      {/* Champs de la personne d'urgence */}
      <h3>Personne à contacter en cas d'urgence</h3>

      <div className="mb-3">
        <label>Nom</label>
        <input
          type="text"
          name="nom"
          value={personneUrgence.nom}
          onChange={(e) => handleChange(e, setPersonneUrgence)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Prénom</label>
        <input
          type="text"
          name="prenom"
          value={personneUrgence.prenom}
          onChange={(e) => handleChange(e, setPersonneUrgence)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Lien de Parenté</label>
        <input
          type="text"
          name="lienParente"
          value={personneUrgence.lienParente}
          onChange={(e) => handleChange(e, setPersonneUrgence)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Portable</label>
        <input
          type="tel"
          name="portable"
          value={personneUrgence.portable}
          onChange={(e) => handleChange(e, setPersonneUrgence)}
          className="form-control"
        />
      </div>

      {/* Sélection de la formule */}
      <div className="mb-3">
        <label>Formule</label>
        <select
          value={formuleID}
          onChange={(e) => setFormuleID(e.target.value)}
          className="form-control"
          required
        >
          <option value="">Sélectionner une formule</option>
          {formules.map((formule) => (
            <option key={formule.ID} value={formule.ID}>
              {formule.Nom} - {formule.TrancheAge} - {formule.Federation}
            </option>
          ))}
        </select>
      </div>

      {/* Sélection du Dobok */}
      <div className="mb-3">
        <label>Dobok</label>
        <select
          value={dobokID}
          onChange={(e) => setDobokID(e.target.value)}
          className="form-control"
          required
        >
          <option value="">Sélectionner un Dobok</option>
          {doboks.map((dobok) => (
            <option key={dobok.ID} value={dobok.ID}>
              Taille {dobok.Taille} - {dobok.Prix} EUR
            </option>
          ))}
        </select>
      </div>

      {/* Réductions et mode de paiement */}
      <div className="mb-3">
        <label>Réduction Famille (%)</label>
        <input
          type="number"
          name="reductionFamille"
          value={reductionFamille}
          onChange={(e) => setReductionFamille(Number(e.target.value))}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Réduction PASS (%)</label>
        <input
          type="number"
          name="reductionPASS"
          value={reductionPASS}
          onChange={(e) => setReductionPASS(Number(e.target.value))}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Mode de Paiement</label>
        <input
          type="text"
          name="modePaiement"
          value={modePaiement}
          onChange={(e) => setModePaiement(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">S'inscrire</button>
    </form>
  );
};

export default Inscriptions;
