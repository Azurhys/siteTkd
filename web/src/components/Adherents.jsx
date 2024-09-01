import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adherents = () => {
  const [adherents, setAdherents] = useState([]);
  const [newAdherent, setNewAdherent] = useState({
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

  const [editing, setEditing] = useState(false);
  const [currentAdherent, setCurrentAdherent] = useState(null);

  useEffect(() => {
    fetchAdherents();
  }, []);

  const fetchAdherents = async () => {
    try {
      const response = await axios.get('http://localhost:9017/api/adherents');
      setAdherents(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des adhérents:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewAdherent({ ...newAdherent, [e.target.name]: e.target.value });
  };

  const addAdherent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9017/api/adherents', newAdherent);
      fetchAdherents();
      setNewAdherent({
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
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'adhérent:', error.message);
    }
  };

  const deleteAdherent = async (id) => {
    try {
      await axios.delete(`http://localhost:9017/api/adherents/${id}`);
      fetchAdherents();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'adhérent:', error.message);
    }
  };

  const startEditing = (adherent) => {
    setEditing(true);
    setCurrentAdherent(adherent);
  };

  const cancelEditing = () => {
    setEditing(false);
    setCurrentAdherent(null);
  };

  const updateAdherent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9017/api/adherents/${currentAdherent.id}`, currentAdherent);
      setEditing(false);
      setCurrentAdherent(null);
      fetchAdherents();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'adhérent:', error.message);
    }
  };

  return (
    <div>
      <h2>Liste des Adhérents</h2>
      <ul>
        {adherents.map(adherent => (
          <li key={adherent.id}>
            {adherent.nom} {adherent.prenom} ({adherent.email1})
            <button onClick={() => deleteAdherent(adherent.id)}>Supprimer</button>
            <button onClick={() => startEditing(adherent)}>Modifier</button>
          </li>
        ))}
      </ul>

      {editing ? (
        <form onSubmit={updateAdherent}>
          <h3>Modifier Adhérent</h3>
          {/* Formulaire de modification */}
          <input type="text" name="nom" value={currentAdherent.nom} onChange={(e) => setCurrentAdherent({ ...currentAdherent, nom: e.target.value })} placeholder="Nom" />
          {/* Ajoutez les autres champs de formulaire ici */}
          <button type="submit">Mettre à jour</button>
          <button onClick={cancelEditing}>Annuler</button>
        </form>
      ) : (
        <form onSubmit={addAdherent}>
          <h3>Ajouter un Adhérent</h3>
          {/* Formulaire d'ajout */}
          <input type="text" name="nom" value={newAdherent.nom} onChange={handleInputChange} placeholder="Nom" />
          {/* Ajoutez les autres champs de formulaire ici */}
          <button type="submit">Ajouter</button>
        </form>
      )}
    </div>
  );
};

export default Adherents;
