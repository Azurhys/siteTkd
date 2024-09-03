import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Pour récupérer les paramètres de l'URL
import EcheancierPaiements from '../components/EcheancierPaiements';

const PaiementsPage = () => {
    const { inscriptionID } = useParams(); // Récupérer l'ID d'inscription depuis l'URL
    const [inscription, setInscription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchInscription = async () => {
        try {
          const response = await axios.get(`http://localhost:9017/api/inscriptions/${inscriptionID}`);
          setInscription(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement de l'inscription:", error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchInscription();
    }, [inscriptionID]);
  
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
      </div>
    );
  };
  
  export default PaiementsPage;