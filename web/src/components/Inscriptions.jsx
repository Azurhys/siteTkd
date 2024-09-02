import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../pages/Dashboard';

const Inscriptions = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [adherents, setAdherents] = useState([]);
  const [formules, setFormules] = useState([]);
  const [doboks, setDoboks] = useState([]);
  const [newInscription, setNewInscription] = useState({
    adherentID: '',
    formuleID: '',
    dobokID: '',
    reductionFamille: 0,
    reductionPASS: false,
    codePassSport: '',
    passeportFFTDA: false,
    modePaiement: 'Espèces',
    coutTotal: 0
  });

  const [editing, setEditing] = useState(false);
  const [currentInscription, setCurrentInscription] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalCost(newInscription);
  }, [newInscription.formuleID, newInscription.dobokID, newInscription.reductionFamille, newInscription.reductionPASS, newInscription.passeportFFTDA]);

  useEffect(() => {
    if (currentInscription) {
      calculateTotalCost(currentInscription);
    }
  }, [currentInscription?.formuleID, currentInscription?.dobokID, currentInscription?.reductionFamille, currentInscription?.reductionPASS, currentInscription?.passeportFFTDA]);

  const fetchData = async () => {
    try {
      const [inscriptionsRes, adherentsRes, formulesRes, doboksRes] = await Promise.all([
        axios.get('http://localhost:9017/api/inscriptions'),
        axios.get('http://localhost:9017/api/adherents'),
        axios.get('http://localhost:9017/api/formules'),
        axios.get('http://localhost:9017/api/doboks'),
      ]);

      setInscriptions(inscriptionsRes.data);
      setAdherents(adherentsRes.data);
      setFormules(formulesRes.data);
      setDoboks(doboksRes.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error.message);
    }
  };

  const calculateTotalCost = (inscription) => {
    const formule = formules.find(f => f.id === parseInt(inscription.formuleID));
    const dobok = doboks.find(d => d.ID === parseInt(inscription.dobokID));

    let coutTotal = 0;

    if (formule) coutTotal += formule.CoutTotal; // Ajouter le coût de la formule
    if (dobok) coutTotal += dobok.Prix; // Ajouter le prix du dobok
    if (inscription.reductionFamille) coutTotal -= parseFloat(inscription.reductionFamille); // Soustraire la réduction famille
    if (inscription.reductionPASS) coutTotal -= 50; // Soustraire 50€ si PASS' SPORT est appliqué
    if (inscription.passeportFFTDA) coutTotal += 20; // Ajouter 20€ pour le passeport FFTDA

    setNewInscription(prevData => ({
      ...prevData,
      coutTotal: Math.max(coutTotal, 0) // Assurer que le coût total ne soit pas négatif
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewInscription(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        adherentID: newInscription.adherentID,
        formuleID: newInscription.formuleID,
        dobokID: newInscription.dobokID || null,
        reductionFamille: parseFloat(newInscription.reductionFamille),
        reductionPASS: newInscription.reductionPASS ? 1 : 0,
        passeportFFTDA: newInscription.passeportFFTDA ? 1 : 0,
        modePaiement: newInscription.modePaiement,
        coutTotal: newInscription.coutTotal,
        codePassSport: newInscription.reductionPASS ? newInscription.codePassSport : null
      };

      if (editing && currentInscription) {
        // Update existing inscription
        await axios.put(`http://localhost:9017/api/inscriptions/${currentInscription.id}`, dataToSend);
        setInscriptions(prevIns => prevIns.map(insc => insc.id === currentInscription.id ? { ...dataToSend, id: currentInscription.id } : insc));
      } else {
        // Create new inscription
        const response = await axios.post('http://localhost:9017/api/inscriptions', dataToSend);
        setInscriptions([...inscriptions, response.data]);
      }

      setNewInscription({
        adherentID: '',
        formuleID: '',
        dobokID: '',
        reductionFamille: 0,
        reductionPASS: false,
        codePassSport: '',
        passeportFFTDA: false,
        modePaiement: 'Espèces',
        coutTotal: 0
      });

      setEditing(false);
      setCurrentInscription(null);
    } catch (error) {
      console.error('Erreur lors de la création ou modification de l\'inscription:', error.message);
    }
  };

  const handleEdit = (inscription) => {
    setNewInscription({
      adherentID: inscription.adherentID,
      formuleID: inscription.formuleID,
      dobokID: inscription.dobokID,
      reductionFamille: inscription.reductionFamille,
      reductionPASS: inscription.reductionPASS === 1,
      codePassSport: inscription.codePassSport || '',
      passeportFFTDA: inscription.passeportFFTDA === 1,
      modePaiement: inscription.modePaiement,
      coutTotal: inscription.coutTotal
    });
    setEditing(true);
    setCurrentInscription(inscription);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9017/api/inscriptions/${id}`);
      setInscriptions(prevIns => prevIns.filter(insc => insc.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'inscription:', error.message);
    }
  };

  return (
    <div>
      <Dashboard />
    
    <div className="container mt-4">
      <h2 className="mb-4">Gestion des Inscriptions</h2>
      
      <h3 className="mb-3">Liste des inscriptions</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Adhérent</th>
            <th>Formule</th>
            <th>Dobok</th>
            <th>Réduction Famille</th>
            <th>Réduction PASS' SPORT</th>
            <th>Passeport FFTDA</th>
            <th>Coût Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map(inscription => (
            <tr key={inscription.id}>
              <td className='d-flex'> <p className='fw-bold mx-3'>{adherents.find(a => a.ID === inscription.adherentID)?.Nom} </p> {adherents.find(a => a.ID === inscription.adherentID)?.Prenom}</td>
              <td>{formules.find(f => f.id === inscription.formuleID)?.Nom} {formules.find(f => f.id === inscription.formuleID)?.Federation}</td>
              <td>{doboks.find(d => d.ID === inscription.dobokID)?.Taille}  </td>
              <td>{inscription.reductionFamille} €</td>
              <td>{inscription.reductionPASS ? 'Oui' : 'Non'}</td>
              <td>{inscription.passeportFFTDA ? 'Oui' : 'Non'}</td>
              <td>{inscription.coutTotal} €</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(inscription)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(inscription.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
        <h3 className="mb-3">{editing ? 'Modifier l\'inscription' : 'Ajouter une inscription'}</h3>

        <div className="mb-3">
          <label htmlFor="adherentID" className="form-label">Sélectionner un adhérent</label>
          <select
            id="adherentID"
            name="adherentID"
            value={newInscription.adherentID}
            onChange={handleChange}
            className="form-select"
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

        <div className="mb-3">
          <label htmlFor="formuleID" className="form-label">Sélectionner une formule</label>
          <select
            id="formuleID"
            name="formuleID"
            value={newInscription.formuleID}
            onChange={handleChange}
            className="form-select"
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

        <div className="mb-3">
          <label htmlFor="passeportFFTDA" className="form-check-label">Ajouter un passeport FFTDA (+20€)</label>
          <input
            type="checkbox"
            id="passeportFFTDA"
            name="passeportFFTDA"
            checked={newInscription.passeportFFTDA}
            onChange={handleChange}
            className="form-check-input"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dobokID" className="form-label">Sélectionner un Dobok</label>
          <select
            id="dobokID"
            name="dobokID"
            value={newInscription.dobokID}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">-- Aucun Dobok --</option>
            {doboks.map(dobok => (
              <option key={dobok.ID} value={dobok.ID}>
                Taille: {dobok.Taille} cm (Prix: {dobok.Prix} €)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="reductionFamille" className="form-label">Réduction famille nombreuse</label>
          <select
            id="reductionFamille"
            name="reductionFamille"
            value={newInscription.reductionFamille}
            onChange={handleChange}
            className="form-select"
          >
            <option value="0">Pas de réduction</option>
            <option value="15">-15 € (2ème membre inscrit)</option>
            <option value="20">-20 € (3ème membre inscrit)</option>
            <option value="25">-25 € (4ème membre et suivants)</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="reductionPASS" className="form-check-label">Appliquer la réduction PASS' SPORT</label>
          <input
            type="checkbox"
            id="reductionPASS"
            name="reductionPASS"
            checked={newInscription.reductionPASS}
            onChange={handleChange}
            className="form-check-input"
          />
          {newInscription.reductionPASS && (
            <input
              type="text"
              name="codePassSport"
              value={newInscription.codePassSport}
              onChange={handleChange}
              className="form-control mt-2"
              placeholder="Entrez le code PASS' SPORT"
            />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="modePaiement" className="form-label">Mode de paiement</label>
          <select
            id="modePaiement"
            name="modePaiement"
            value={newInscription.modePaiement}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="Espèces">Espèces</option>
            <option value="Chèque">Chèque</option>
            <option value="CB">Carte Bancaire</option>
            <option value="ANCV">ANCV</option>
            <option value="Coupons-sport">Coupons-sport</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Coût total: {newInscription.coutTotal} €</label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          {editing ? 'Modifier l\'inscription' : 'Ajouter l\'inscription'}
        </button>
      </form>

      
    </div>
    </div>
  );
};

export default Inscriptions;
