import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Pour récupérer les paramètres de l'URL
import EcheancierPaiements from '../components/EcheancierPaiements';

const PaiementsPage = () => {
    const { inscriptionID } = useParams(); // Récupérer l'ID d'inscription depuis l'URL
    const [inscription, setInscription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [generateInvoice, setGenerateInvoice] = useState(false);
    
    useEffect(() => {
      const fetchInscription = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inscriptions/${inscriptionID}`);
          setInscription(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement de l'inscription:", error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchInscription();
    }, [inscriptionID]);
    
    useEffect(() => {
      if (generateInvoice) {
        const pdfUrl = `${import.meta.env.VITE_BACKEND_URL}/api/pdf/facture/${inscriptionID}`;
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank'; // Ouvrir dans un nouvel onglet (optionnel)
        link.download = `facture_${inscriptionID}.pdf`; // Nom du fichier à télécharger
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setGenerateInvoice(false); // Réinitialiser l'état après le téléchargement
      }
    }, [generateInvoice, inscriptionID]);

    if (isLoading) {
      return <div>Chargement...</div>;
    }
  
    return (
      <div className="m-4 p-4 border rounded bg-light">
        <h2 className="text-2xl font-bold mb-4 text-center">Échéanciers de Paiements</h2>
        <p>Inscription ID: {inscriptionID}</p>
        <p>Coût Total: {inscription.coutTotal} €</p>
  
        {/* Utiliser le composant EcheancierPaiements */}
        <EcheancierPaiements
          coutTotal={inscription.coutTotal}
          inscriptionID={inscriptionID}
          modePaiement={inscription.modePaiement}
        />

        <div className="mt-4">
          <input
            type="checkbox"
            id="generateInvoice"
            checked={generateInvoice}
            onChange={(e) => setGenerateInvoice(e.target.checked)}
          />
        <label htmlFor="generateInvoice" className="ml-2">
          Générer la facture
        </label>
      </div>

      </div>
    );
  };
  
  export default PaiementsPage;