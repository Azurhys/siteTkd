import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InscriptionForm = () => {
  const [formData, setFormData] = useState({
    adherentID: '',
    formuleID: '',
    dobokID: '', // Gérer l'option "Aucun Dobok"
    reductionFamille: 0,
    reductionPASS: false, // Change pour un booléen afin de cocher la case
    codePassSport: '', // Nouveau champ pour le code PASS' SPORT
    modePaiement: 'Espèces',
    commentaire: '' // Nouveau champ pour le commentaire
  });

  const [adherents, setAdherents] = useState([]);
  const [formules, setFormules] = useState([]);
  const [doboks, setDoboks] = useState([]);

  useEffect(() => {
    // Charger les adhérents, formules et doboks depuis l'API
    const fetchAdherents = async () => {
      try {
        const response = await axios.get('http://localhost:9017/api/adherents');
        setAdherents(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des adhérents:', error.message);
      }
    };

    const fetchFormules = async () => {
      try {
        const response = await axios.get('http://localhost:9017/api/formules');
        setFormules(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des formules:', error.message);
      }
    };

    const fetchDoboks = async () => {
      try {
        const response = await axios.get('http://localhost:9017/api/doboks');
        setDoboks(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des doboks:', error.message);
      }
    };

    fetchAdherents();
    fetchFormules();
    fetchDoboks();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        adherentID: formData.adherentID,
        formuleID: formData.formuleID,
        dobokID: formData.dobokID || null,
        reductionFamille: parseFloat(formData.reductionFamille),
        reductionPASS: formData.reductionPASS ? 1 : 0,
        passeportFFTDA: formData.passeportFFTDA ? 1 : 0,
        modePaiement: formData.modePaiement,
        coutTotal: formData.coutTotal,
        codePassSport: formData.reductionPASS ? formData.codePassSport : null
      };

      console.log('Données envoyées:', dataToSend);

      // Créer l'inscription
      const inscriptionResponse = await axios.post('http://localhost:9017/api/inscriptions', dataToSend);
      console.log('Inscription créée:', inscriptionResponse.data);

      // Créer un commentaire si un texte est saisi
      if (formData.commentaire) {
        const commentaireData = {
          AdherentID: formData.adherentID,
          Commentaire: formData.commentaire
        };

        const commentaireResponse = await axios.post('http://localhost:9017/api/commentaires', commentaireData);
        console.log('Commentaire créé:', commentaireResponse.data);
      }

      // Réinitialiser le formulaire après soumission
      setFormData({
        adherentID: '',
        formuleID: '',
        dobokID: '',
        reductionFamille: 0,
        reductionPASS: false,
        codePassSport: '',
        passeportFFTDA: false,
        modePaiement: 'Espèces',
        coutTotal: 0,
        commentaire: '' // Réinitialiser le champ commentaire
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'inscription ou du commentaire:', error.message);
    }
  };

  // Calcul du coût total
  useEffect(() => {
    const formule = formules.find(f => f.id === parseInt(formData.formuleID));
    const dobok = doboks.find(d => d.ID === parseInt(formData.dobokID));

    let coutTotal = 0;

    if (formule) coutTotal += formule.CoutTotal; // Ajouter le coût de la formule
    if (dobok) coutTotal += dobok.Prix; // Ajouter le prix du dobok
    if (formData.reductionFamille) coutTotal -= parseFloat(formData.reductionFamille); // Soustraire la réduction famille
    if (formData.reductionPASS) coutTotal -= 50; // Soustraire 50€ si PASS' SPORT est appliqué
    if (formData.passeportFFTDA) coutTotal += 20; // Ajouter 20€ pour le passeport FFTDA

    setFormData(prevData => ({
      ...prevData,
      coutTotal: Math.max(coutTotal, 0) // Assurer que le coût total ne soit pas négatif
    }));
  }, [formData.formuleID, formData.dobokID, formData.reductionFamille, formData.reductionPASS, formData.passeportFFTDA]);


  return (
    <form onSubmit={handleSubmit} className="m-4 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Créer une inscription</h2>
      
      {/* Sélection de l'adhérent */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="adherentID">
          Sélectionner un adhérent
        </label>
        <select
          name="adherentID"
          value={formData.adherentID}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">-- Sélectionner un adhérent --</option>
          {adherents.map(adherent => (
            <option key={adherent.ID} value={adherent.ID}>
              {adherent.Nom} {adherent.Prenom}
            </option>
          ))}
        </select>
      </div>

      {/* Sélection de la formule */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="formuleID">
          Sélectionner une formule
        </label>
        <select
          name="formuleID"
          value={formData.formuleID}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">-- Sélectionner une formule --</option>
          {formules.map(formule => (
            <option key={formule.id} value={formule.id}>
              {formule.Nom} {formule.Federation} ({formule.TrancheAge})
            </option>
          ))}
        </select>
      </div>
      
      {/* Passeport FFTDA */}
      <div className="mb-4">
        <label class="form-check-label" htmlFor="passeportFFTDA">
          Ajouter un passeport FFTDA (+20€)
        </label>
        <input
          type="checkbox"
          name="passeportFFTDA"
          checked={formData.passeportFFTDA}
          onChange={handleChange}
          className="form-check-input mx-3"
          />
      </div>

      {/* Sélection du Dobok */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="dobokID">
          Sélectionner un Dobok
        </label>
        <select
          name="dobokID"
          value={formData.dobokID}
          onChange={handleChange}
          className="form-control"
          >
          <option value="">-- Aucun Dobok --</option>
          {doboks.map(dobok => (
            <option key={dobok.ID} value={dobok.ID}>
              Taille: {dobok.Taille} cm (Prix: {dobok.Prix} €)
            </option>
          ))}
        </select>
      </div>

      {/* Réduction famille nombreuse */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="reductionFamille">
          Réduction famille nombreuse
        </label>
        <select
          name="reductionFamille"
          value={formData.reductionFamille}
          onChange={handleChange}
          className="form-control"
          >
          <option value="0">Pas de réduction</option>
          <option value="15">-15 € (2ème membre inscrit)</option>
          <option value="20">-20 € (3ème membre inscrit)</option>
          <option value="25">-25 € (4ème membre et suivants)</option>
        </select>
      </div>

      {/* Réduction PASS' SPORT */}
      <div className="mb-4">
        <label class="form-check-label" htmlFor="reductionPASS">
          Appliquer la réduction PASS' SPORT
        </label>
        <input
          type="checkbox"
          name="reductionPASS"
          checked={formData.reductionPASS}
          onChange={handleChange}
          className="form-check-input mx-3"
          />
        {formData.reductionPASS && (
          <input
            type="text"
            name="codePassSport"
            value={formData.codePassSport}
            onChange={handleChange}
            className="form-control my-3"
            placeholder="Entrez le code PASS' SPORT"
          />
        )}
      </div>

      {/* Mode de paiement */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="modePaiement">
          Mode de paiement
        </label>
        <select
          name="modePaiement"
          value={formData.modePaiement}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="Espèces">Espèces</option>
          <option value="Chèque">Chèque</option>
          <option value="CB">Carte Bancaire</option>
          <option value="ANCV">ANCV</option>
          <option value="Coupons-sport">Coupons-sport</option>
        </select>
      </div>

        {/* Affichage du coût total */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold">
          Coût total: {formData.coutTotal} €
        </label>
      </div>
      
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="commentaire">
          Ajouter un commentaire
        </label>
        <textarea
          name="commentaire"
          value={formData.commentaire}
          onChange={handleChange}
          className="form-control"
          placeholder="Entrez un commentaire ici..."
        />
      </div>
      
      {/* Bouton de soumission */}
      <button
        type="submit"
        className='btn btn-success'
      >
        Ajouter l'inscription
      </button>
    </form>
  );
};

export default InscriptionForm;
