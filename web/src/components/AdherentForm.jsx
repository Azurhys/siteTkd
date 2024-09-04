import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdherentForm = () => {
  // État local pour les champs de formulaire
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Nom: '',
    Prenom: '',
    Genre: 'M',
    DateNaissance: '',
    Poids: '',
    Taille: '',
    Adresse1: '',
    Adresse2: '',
    CodePostal: '',
    Ville: '',
    Email1: '',
    Email2: '',
    Portable1: '',
    Portable2: '',
    PersonneUrgence1Nom: '',
    PersonneUrgence1Prenom: '',
    PersonneUrgence1LienParente: '',
    PersonneUrgence1Portable: '',
    PersonneUrgence2Nom: '',
    PersonneUrgence2Prenom: '',
    PersonneUrgence2LienParente: '',
    PersonneUrgence2Portable: ''
  });

  // Gestionnaire de changement pour les champs de formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Créez l'adhérent en premier
      const response = await axios.post('http://localhost:3000/api/adherents', formData);
      
      const adherentId = response.data.ID; // Assurez-vous que le backend renvoie l'ID de l'adhérent créé
      
      // Créez les personnes à prévenir en cas d'urgence
      await axios.post('http://localhost:3000/api/personne-urgence', {
        Nom: formData.PersonneUrgence1Nom,
        Prenom: formData.PersonneUrgence1Prenom,
        LienParente: formData.PersonneUrgence1LienParente,
        Portable: formData.PersonneUrgence1Portable,
        AdherentID: adherentId
      });

      await axios.post('http://localhost:3000/api/personne-urgence', {
        Nom: formData.PersonneUrgence2Nom,
        Prenom: formData.PersonneUrgence2Prenom,
        LienParente: formData.PersonneUrgence2LienParente,
        Portable: formData.PersonneUrgence2Portable,
        AdherentID: adherentId
      });

      // Réinitialisez le formulaire
      setFormData({
        Nom: '',
        Prenom: '',
        Genre: 'M',
        DateNaissance: '',
        Poids: '',
        Taille: '',
        Adresse1: '',
        Adresse2: '',
        CodePostal: '',
        Ville: '',
        Email1: '',
        Email2: '',
        Portable1: '',
        Portable2: '',
        PersonneUrgence1Nom: '',
        PersonneUrgence1Prenom: '',
        PersonneUrgence1LienParente: '',
        PersonneUrgence1Portable: '',
        PersonneUrgence2Nom: '',
        PersonneUrgence2Prenom: '',
        PersonneUrgence2LienParente: '',
        PersonneUrgence2Portable: ''
      });

      toast.success('Adhérent et personnes à prévenir créés avec succès !');
      navigate('/inscription');
    } catch (error) {
      toast.error('Erreur lors de la création de l\'adhérent ou des personnes à prévenir : ' + error.message);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="m-4 p-4 border rounded bg-light">
      <h2 className="text-2xl font-bold mb-4 text-center">Créer un adhérent</h2>
      
      {/* Nom */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Nom">
          Nom
        </label>
        <input
          type="text"
          name="Nom"
          value={formData.Nom}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Prénom */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Prenom">
          Prénom
        </label>
        <input
          type="text"
          name="Prenom"
          value={formData.Prenom}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Genre">
          Genre
        </label>
        <select
          name="Genre"
          value={formData.Genre}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>

      {/* Date de Naissance */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="DateNaissance">
          Date de Naissance
        </label>
        <input
          type="date"
          name="DateNaissance"
          value={formData.DateNaissance}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Poids */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Poids">
          Poids (en kg)
        </label>
        <input
          type="number"
          name="Poids"
          value={formData.Poids}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Taille */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Taille">
          Taille (en cm)
        </label>
        <input
          type="number"
          name="Taille"
          value={formData.Taille}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Adresse 1 */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Adresse1">
          Adresse 1
        </label>
        <input
          type="text"
          name="Adresse1"
          value={formData.Adresse1}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Adresse 2 */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Adresse2">
          Adresse 2
        </label>
        <input
          type="text"
          name="Adresse2"
          value={formData.Adresse2}
          onChange={handleChange}
          className="form-control"
          />
      </div>

      {/* Code Postal */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="CodePostal">
          Code Postal
        </label>
        <input
          type="text"
          name="CodePostal"
          value={formData.CodePostal}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Ville */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Ville">
          Ville
        </label>
        <input
          type="text"
          name="Ville"
          value={formData.Ville}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Email 1 */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Email1">
          Email 1
        </label>
        <input
          type="email"
          name="Email1"
          value={formData.Email1}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Email 2 */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Email2">
          Email 2
        </label>
        <input
          type="email"
          name="Email2"
          value={formData.Email2}
          onChange={handleChange}
          className="form-control"
          />
      </div>

      {/* Portable 1 */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Portable1">
          Portable 1
        </label>
        <input
          type="tel"
          name="Portable1"
          value={formData.Portable1}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Portable 2 */}
      <div className="mb-4">
        <label className="form-label fs-4 fw-bold" htmlFor="Portable2">
          Portable 2
        </label>
        <input
          type="tel"
          name="Portable2"
          value={formData.Portable2}
          onChange={handleChange}
          className="form-control"
          />
      </div>

       {/* Personne à prévenir 1 */}
       <h3 className="text-xl font-bold mb-2">Personne à prévenir 1</h3>
        <div className="mb-4">
          <label className="form-label fs-4 fw-bold" htmlFor="PersonneUrgence1Nom">Nom</label>
          <input
            type="text"
            name="PersonneUrgence1Nom"
            value={formData.PersonneUrgence1Nom}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fs-4 fw-bold" htmlFor="PersonneUrgence1Prenom">Prénom</label>
          <input
            type="text"
            name="PersonneUrgence1Prenom"
            value={formData.PersonneUrgence1Prenom}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fs-4 fw-bold" htmlFor="PersonneUrgence1LienParente">Lien de parenté</label>
          <input
            type="text"
            name="PersonneUrgence1LienParente"
            value={formData.PersonneUrgence1LienParente}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label className="form-label fs-4 fw-bold" htmlFor="PersonneUrgence1Portable">Portable</label>
          <input
            type="tel"
            name="PersonneUrgence1Portable"
            value={formData.PersonneUrgence1Portable}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Personne à prévenir 2 */}
        <h3 className="text-xl font-bold mb-2">Personne à prévenir 2</h3>
        <div className="mb-4">
          <label className="form-label fs-4 fw-bold" htmlFor="PersonneUrgence2Nom">Nom</label>
          <input
            type="text"
            name="PersonneUrgence2Nom"
            value={formData.PersonneUrgence2Nom}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fs-4 fw-bold" htmlFor="PersonneUrgence2Prenom">Prénom</label>
          <input
            type="text"
            name="PersonneUrgence2Prenom"
            value={formData.PersonneUrgence2Prenom}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fs-4 fw-bold" htmlFor="PersonneUrgence2LienParente">Lien de parenté</label>
          <input
            type="text"
            name="PersonneUrgence2LienParente"
            value={formData.PersonneUrgence2LienParente}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label className="form-label fs-4 fw-bold" htmlFor="PersonneUrgence2Portable">Portable</label>
          <input
            type="tel"
            name="PersonneUrgence2Portable"
            value={formData.PersonneUrgence2Portable}
            onChange={handleChange}
            className="form-control"
            required
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
    </div>
  );
};

export default AdherentForm;
