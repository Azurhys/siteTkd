import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InscriptionForm = () => {
  const [formData, setFormData] = useState({
    adherentID: '',
    formuleID: '',
    dobokID: '',
    reductionFamille: 0,
    reductionPASS: 0,
    modePaiement: 'Espèces'
  });

  const [adherents, setAdherents] = useState([]);
  const [formules, setFormules] = useState([]);
  const [doboks, setDoboks] = useState([]);

  // Charger les adhérents, formules et doboks depuis l'API
  useEffect(() => {
    const fetchAdherents = async () => {
      try {
        const response = await axios.get('http://localhost:9017/api/adherents');
        setAdherents(response.data);
        //console.log(response.data)
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Données envoyées:', {
        adherentID: formData.adherentID,
        formuleID: formData.formuleID,
        dobokID: formData.dobokID,
        reductionFamille: formData.reductionFamille,
        reductionPASS: formData.reductionPASS,
        modePaiement: formData.modePaiement
      });

      const response = await axios.post('http://localhost:9017/api/inscriptions', {
        adherentID: formData.adherentID,
        formuleID: formData.formuleID,
        dobokID: formData.dobokID,
        reductionFamille: formData.reductionFamille,
        reductionPASS: formData.reductionPASS,
        modePaiement: formData.modePaiement
      });

      console.log('Inscription créée:', response.data);
      setFormData({
        adherentID: '',
        formuleID: '',
        dobokID: '',
        reductionFamille: 0,
        reductionPASS: 0,
        modePaiement: 'Espèces'
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'inscription:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Créer une inscription</h2>
      
      {/* Sélection de l'adhérent */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adherentID">
          Sélectionner un adhérent
        </label>
        <select
          name="adherentID"
          value={formData.adherentID}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">-- Sélectionner un adhérent --</option>
          {adherents.map(adherent => (
            <option key={adherent.id} value={adherent.id}>
              {adherent.nom} {adherent.prenom}
            </option>
          ))}
        </select>
      </div>

      {/* Sélection de la formule */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formuleID">
          Sélectionner une formule
        </label>
        <select
          name="formuleID"
          value={formData.formuleID}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">-- Sélectionner une formule --</option>
          {formules.map(formule => (
            <option key={formule.id} value={formule.id}>
              {formule.Nom} ({formule.TrancheAge})
            </option>
          ))}
        </select>
      </div>

      {/* Sélection du Dobok */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dobokID">
          Sélectionner un Dobok
        </label>
        <select
          name="dobokID"
          value={formData.dobokID}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">-- Sélectionner un Dobok --</option>
          {doboks.map(dobok => (
            <option key={dobok.ID} value={dobok.ID}>
              Taille: {dobok.Taille} cm (Prix: {dobok.Prix} €)
            </option>
          ))}
        </select>
      </div>

      {/* Réduction famille */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reductionFamille">
          Réduction famille nombreuse
        </label>
        <input
          type="number"
          name="reductionFamille"
          value={formData.reductionFamille}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Réduction PASS' SPORT */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reductionPASS">
          Réduction PASS' SPORT
        </label>
        <input
          type="number"
          name="reductionPASS"
          value={formData.reductionPASS}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Mode de paiement */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modePaiement">
          Mode de paiement
        </label>
        <select
          name="modePaiement"
          value={formData.modePaiement}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="Espèces">Espèces</option>
          <option value="Chèque">Chèque</option>
          <option value="CB">Carte Bancaire</option>
          <option value="ANCV">ANCV</option>
          <option value="Coupons-sport">Coupons-sport</option>
        </select>
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Ajouter l'inscription
      </button>
    </form>
  );
};

export default InscriptionForm;
