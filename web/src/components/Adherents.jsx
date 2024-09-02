import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../pages/Dashboard';

const Adherents = () => {
  const [adherents, setAdherents] = useState([]);
  const [newAdherent, setNewAdherent] = useState({
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
    Portable2: ''
  });

  const [editing, setEditing] = useState(false);
  const [currentAdherent, setCurrentAdherent] = useState(null);

  // State pour les commentaires
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentAdherentIdForComment, setCurrentAdherentIdForComment] = useState(null);

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

  const fetchComments = async (adherentId) => {
    try {
      // Mise à jour de l'URL pour récupérer les commentaires par adherentID
      const response = await axios.get(`http://localhost:9017/api/commentaires/adherent/${adherentId}`);
      setComments(response.data);
      setCurrentAdherentIdForComment(adherentId);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdherent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing && currentAdherent) {
        // Mettre à jour l'adhérent existant
        await axios.put(`http://localhost:9017/api/adherents/${currentAdherent.ID}`, newAdherent);
        setAdherents((prevAdherents) =>
          prevAdherents.map((adherent) =>
            adherent.ID === currentAdherent.ID ? { ...newAdherent, ID: currentAdherent.ID } : adherent
          )
        );
      } else {
        // Ajouter un nouvel adhérent
        const response = await axios.post('http://localhost:9017/api/adherents', newAdherent);
        setAdherents([...adherents, response.data]);
      }

      // Réinitialiser le formulaire
      setNewAdherent({
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
        Portable2: ''
      });

      setEditing(false);
      setCurrentAdherent(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou mise à jour de l\'adhérent:', error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentAdherentIdForComment) return;

    try {
      // Mise à jour de l'URL pour ajouter un commentaire pour un adherent spécifique
      const response = await axios.post(`http://localhost:9017/api/commentaires`, {
        content: newComment,
        adherentId: currentAdherentIdForComment
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Mise à jour de l'URL pour la suppression d'un commentaire
      await axios.delete(`http://localhost:9017/api/commentaires/${commentId}`);
      setComments((prevComments) => prevComments.filter((comment) => comment.ID !== commentId));
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error.message);
    }
  };

  const handleEdit = (adherent) => {
    setNewAdherent(adherent);
    setEditing(true);
    setCurrentAdherent(adherent);
  };

  const handleDelete = async (ID) => {
    try {
      await axios.delete(`http://localhost:9017/api/adherents/${ID}`);
      setAdherents((prevAdherents) => prevAdherents.filter((adherent) => adherent.ID !== ID));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'adhérent:', error.message);
    }
  };

  return (
    <div>
      <Dashboard />
    
    <div className="container mt-4">
      <h2 className="mb-4">Gestion des Adhérents</h2>

      <h3 className="mb-3">Liste des adhérents</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adherents.map((adherent) => (
            <tr key={adherent.ID}>
              <td>{adherent.Nom}</td>
              <td>{adherent.Prenom}</td>
              <td>{adherent.Email1}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(adherent)}>
                  Modifier
                </button>
                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(adherent.ID)}>
                  Supprimer
                </button>
                <button className="btn btn-info btn-sm" onClick={() => fetchComments(adherent.ID)}>
                  Voir Commentaires
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentAdherentIdForComment && (
        <div className="mt-4">
          <h3>Commentaires pour l'adhérent {currentAdherentIdForComment}</h3>
          <ul className="list-group">
            {comments.map((comment) => (
              <li key={comment.ID} className="list-group-item d-flex justify-content-between align-items-center">
                {comment.content}
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment.ID)}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleCommentSubmit} className="mt-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ajouter un commentaire"
                value={newComment}
                onChange={handleCommentChange}
                required
              />
              <button type="submit" className="btn btn-primary">Ajouter</button>
            </div>
          </form>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
        <h3 className="mb-3">{editing ? 'Modifier l\'adhérent' : 'Ajouter un adhérent'}</h3>

        {/* Utilisation du champ "Nom" */}
        <div className="mb-3">
          <label htmlFor="Nom" className="form-label">Nom</label>
          <input
            type="text"
            id="Nom"
            name="Nom"
            value={newAdherent.Nom}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Nom"
            required
          />
        </div>

        {/* Champ: Prénom */}
        <div className="mb-3">
          <label htmlFor="Prenom" className="form-label">Prénom</label>
          <input
            type="text"
            id="Prenom"
            name="Prenom"
            value={newAdherent.Prenom}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Prénom"
            required
          />
        </div>

        {/* Champ: Genre */}
        <div className="mb-3">
          <label htmlFor="Genre" className="form-label">Genre</label>
          <select
            id="Genre"
            name="Genre"
            value={newAdherent.Genre}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">-- Sélectionner le genre --</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {/* Champ: Date de naissance */}
        <div className="mb-3">
          <label htmlFor="DateNaissance" className="form-label">Date de Naissance</label>
          <input
            type="date"
            id="DateNaissance"
            name="DateNaissance"
            value={newAdherent.DateNaissance}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        {/* Champ: Poids */}
        <div className="mb-3">
          <label htmlFor="Poids" className="form-label">Poids (kg)</label>
          <input
            type="number"
            id="Poids"
            name="Poids"
            value={newAdherent.Poids}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Poids"
          />
        </div>

        {/* Champ: Taille */}
        <div className="mb-3">
          <label htmlFor="Taille" className="form-label">Taille (cm)</label>
          <input
            type="number"
            id="Taille"
            name="Taille"
            value={newAdherent.Taille}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Taille"
          />
        </div>

        {/* Champ: Adresse 1 */}
        <div className="mb-3">
          <label htmlFor="Adresse1" className="form-label">Adresse 1</label>
          <input
            type="text"
            id="Adresse1"
            name="Adresse1"
            value={newAdherent.Adresse1}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Adresse 1"
            required
          />
        </div>

        {/* Champ: Adresse 2 */}
        <div className="mb-3">
          <label htmlFor="Adresse2" className="form-label">Adresse 2</label>
          <input
            type="text"
            id="Adresse2"
            name="Adresse2"
            value={newAdherent.Adresse2}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Adresse 2"
          />
        </div>

        {/* Champ: Code Postal */}
        <div className="mb-3">
          <label htmlFor="CodePostal" className="form-label">Code Postal</label>
          <input
            type="text"
            id="CodePostal"
            name="CodePostal"
            value={newAdherent.CodePostal}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Code Postal"
            required
          />
        </div>

        {/* Champ: Ville */}
        <div className="mb-3">
          <label htmlFor="Ville" className="form-label">Ville</label>
          <input
            type="text"
            id="Ville"
            name="Ville"
            value={newAdherent.Ville}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Ville"
            required
          />
        </div>

        {/* Champ: Email 1 */}
        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">Email 1</label>
          <input
            type="email"
            id="Email1"
            name="Email1"
            value={newAdherent.Email1}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Email 1"
            required
          />
        </div>

        {/* Champ: Email 2 */}
        <div className="mb-3">
          <label htmlFor="Email2" className="form-label">Email 2</label>
          <input
            type="email"
            id="Email2"
            name="Email2"
            value={newAdherent.Email2}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Email 2"
          />
        </div>

        {/* Champ: Portable 1 */}
        <div className="mb-3">
          <label htmlFor="Portable1" className="form-label">Portable 1</label>
          <input
            type="tel"
            id="Portable1"
            name="Portable1"
            value={newAdherent.Portable1}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Portable 1"
          />
        </div>

        {/* Champ: Portable 2 */}
        <div className="mb-3">
          <label htmlFor="Portable2" className="form-label">Portable 2</label>
          <input
            type="tel"
            id="Portable2"
            name="Portable2"
            value={newAdherent.Portable2}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Portable 2"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editing ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Adherents;
