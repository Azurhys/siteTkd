import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EcheancierPaiements = ({ coutTotal, inscriptionID, modePaiement }) => {
  const [nombreEcheances, setNombreEcheances] = useState(1);
  const [paiements, setPaiements] = useState([]);
  const [modesPaiement, setModesPaiement] = useState([
    'Espèces', 'Chèque', 'Carte Bancaire', 'ANCV', 'Coupons-sport'
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    calculerEcheancier();
  }, [nombreEcheances, coutTotal]);

  const getMonthName = (monthIndex) => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthIndex);
    return date.toLocaleString('fr-FR', { month: 'long' });
  };

  const calculerEcheancier = () => {
    const montantParEcheance = Math.round(coutTotal / nombreEcheances);
    const echeancier = Array.from({ length: nombreEcheances }, (_, i) => ({
      Montant: montantParEcheance,
      Mois: getMonthName(i), // Utiliser le nom du mois pour chaque échéance
      MoyenPaiement: modePaiement,
    }));

    const totalCalcule = montantParEcheance * nombreEcheances;
    const difference = totalCalcule - coutTotal;
    if (difference !== 0) {
      echeancier[echeancier.length - 1].Montant -= difference;
    }

    setPaiements(echeancier);
  };

  const handleNombreEcheancesChange = (e) => {
    setNombreEcheances(Number(e.target.value));
  };

  const handleModePaiementChange = (index, newMode) => {
    const updatedPaiements = paiements.map((paiement, i) =>
      i === index ? { ...paiement, MoyenPaiement: newMode } : paiement
    );
    setPaiements(updatedPaiements);
  };

  const enregistrerPaiements = async () => {
    try {
      const promises = paiements.map((paiement) =>
        axios.post('http://localhost:9017/api/paiements', {
          InscriptionID: inscriptionID,
          Montant: paiement.Montant,
          Mois: paiement.Mois,
          MoyenPaiement: paiement.MoyenPaiement,
        })
      );

      await Promise.all(promises);
      toast.success('Les paiements ont été enregistrés avec succès.');

      // Télécharger le PDF après avoir enregistré les paiements
      const pdfUrl = `http://localhost:9017/api/pdf/inscription/${inscriptionID}`;
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.download = `inscription-${inscriptionID}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Rediriger vers la page des adhérents après le téléchargement du PDF
      navigate('/adherent');
    } catch (error) {
      console.error('Erreur lors de la création des paiements :', error);
      toast.error('Erreur lors de la création des paiements.');
    }
  };

  return (
    <div>
      {/* Choix du nombre d'échéances */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="nombreEcheances">
          Nombre d'échéances
        </label>
        <select
          name="nombreEcheances"
          value={nombreEcheances}
          onChange={handleNombreEcheancesChange}
          className="form-control"
        >
          {[...Array(4).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des paiements */}
      <div className="mb-4">
        <h4>Échéancier de paiements</h4>
        <ul>
          {paiements.map((paiement, index) => (
            <li key={index}>
              {paiement.Mois}: {paiement.Montant} €
              <select
                value={paiement.MoyenPaiement}
                onChange={(e) => handleModePaiementChange(index, e.target.value)}
                className="form-control d-inline mx-2"
                style={{ width: 'auto' }}
              >
                {modesPaiement.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      </div>

          
      {/* Bouton pour enregistrer les paiements */}
      <button className="btn btn-success" onClick={enregistrerPaiements}>
        Enregistrer les paiements
      </button>
    </div>
  );
};

export default EcheancierPaiements;
