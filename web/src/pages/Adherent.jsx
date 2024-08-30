import React, { useState, useEffect } from 'react';
import AdherentForm from '../components/AdherentForm';

const Adherent = () => {
  // États pour l'adhérent
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

  return (
    <>
      <AdherentForm />
    </>
  );
};

export default Adherent;
