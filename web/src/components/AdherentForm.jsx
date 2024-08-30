import React, { useState } from 'react';
import axios from 'axios';

const AdherentForm = () => {
  // État local pour les champs de formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    genre: 'M',
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

  // Gestionnaire de changement pour les champs de formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/adherents', formData);
      console.log('Adhérent créé:', response.data);
      // Réinitialiser le formulaire après la soumission
      setFormData({
        nom: '',
        prenom: '',
        genre: 'M',
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
      console.error('Erreur lors de la création de l\'adhérent:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Créer un adhérent</h2>
      
      {/* Nom */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
          Nom
        </label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Prénom */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenom">
          Prénom
        </label>
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
          Genre
        </label>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>

      {/* Date de Naissance */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateNaissance">
          Date de Naissance
        </label>
        <input
          type="date"
          name="dateNaissance"
          value={formData.dateNaissance}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Poids */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="poids">
          Poids (en kg)
        </label>
        <input
          type="number"
          name="poids"
          value={formData.poids}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Taille */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taille">
          Taille (en cm)
        </label>
        <input
          type="number"
          name="taille"
          value={formData.taille}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Adresse 1 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adresse1">
          Adresse 1
        </label>
        <input
          type="text"
          name="adresse1"
          value={formData.adresse1}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Adresse 2 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adresse2">
          Adresse 2
        </label>
        <input
          type="text"
          name="adresse2"
          value={formData.adresse2}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Code Postal */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codePostal">
          Code Postal
        </label>
        <input
          type="text"
          name="codePostal"
          value={formData.codePostal}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Ville */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ville">
          Ville
        </label>
        <input
          type="text"
          name="ville"
          value={formData.ville}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Email 1 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email1">
          Email 1
        </label>
        <input
          type="email"
          name="email1"
          value={formData.email1}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Email 2 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email2">
          Email 2
        </label>
        <input
          type="email"
          name="email2"
          value={formData.email2}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Portable 1 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="portable1">
          Portable 1
        </label>
        <input
          type="tel"
          name="portable1"
          value={formData.portable1}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Portable 2 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="portable2">
          Portable 2
        </label>
        <input
          type="tel"
          name="portable2"
          value={formData.portable2}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="bg-success hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Ajouter
      </button>
    </form>
  );
};

export default AdherentForm;
