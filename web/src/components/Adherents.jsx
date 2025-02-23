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
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [currentAdherentForComment, setCurrentAdherentForComment] = useState(null);
  const [hasComments, setHasComments] = useState(false);
  const [adherentDetails, setAdherentDetails] = useState(null); // État pour les détails de l'adhérent

  useEffect(() => {
    fetchAdherents();
    fetchAllComments(); // Ajout de l'appel pour récupérer tous les commentaires
  }, []);

  useEffect(() => {
    if (currentAdherentForComment) {
      fetchAdherentDetails(currentAdherentForComment);
      fetchComments(currentAdherentForComment);
    }
  }, [currentAdherentForComment]);

  const fetchAdherents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/adherents`);
      setAdherents(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des adhérents:', error.message);
    }
  };

  const fetchAllComments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/commentaires`);
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error.message);
    }
  };

  const fetchAdherentDetails = async (adherentId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/adherents/${adherentId}`);
      setAdherentDetails(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des détails de l\'adhérent:', error.message);
      setAdherentDetails(null); // Réinitialiser les détails en cas d'erreur
    }
  };

  const fetchComments = async (adherentId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/commentaires/adherent/${adherentId}`);
      const comments = response.data;
      setComments(comments);
      setHasComments(comments.length > 0);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error.message);
      setComments([]);
      setHasComments(false); // Met à jour pour s'assurer que le formulaire de commentaire est affiché
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
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/adherents/${currentAdherent.ID}`, newAdherent);
        setAdherents((prevAdherents) =>
          prevAdherents.map((adherent) =>
            adherent.ID === currentAdherent.ID ? { ...newAdherent, ID: currentAdherent.ID } : adherent
          )
        );
      } else {
        // Ajouter un nouvel adhérent
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/adherents`, newAdherent);
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
    if (!currentAdherentForComment) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/commentaires`, {
        Commentaire: newComment,
        AdherentID: currentAdherentForComment
      });
      setComments([...comments, response.data]);
      setNewComment('');
      setHasComments(true); // S'assure que le champ est affiché même lorsqu'il y a déjà des commentaires
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error.message);
    }
  };

  const handleEditComment = async (commentId, updatedComment) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/commentaires/${commentId}`, { Commentaire: updatedComment });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.ID === commentId ? response.data : comment
        )
      );
      setCommentToEdit(null); // Réinitialiser l'état après la modification
      setNewComment(''); // Réinitialiser le champ de commentaire
    } catch (error) {
      console.error('Erreur lors de la modification du commentaire:', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/commentaires/${commentId}`);
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
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/adherents/${ID}`);
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
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => setCurrentAdherentForComment(adherent.ID)}
                  >
                    Commentaires
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentAdherentForComment && adherentDetails && (
          <div className="mt-4">
            <h3>Commentaires pour l'adhérent : {adherentDetails.Nom} {adherentDetails.Prenom}</h3>
            
            <ul className="list-group mb-3">
              {comments.map((comment) => (
                <li key={comment.ID} className="list-group-item d-flex justify-content-between align-items-center">
                  {commentToEdit && commentToEdit.ID === comment.ID ? (
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleEditComment(comment.ID, newComment)}
                      >
                        Enregistrer
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setCommentToEdit(null)}
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between w-100">
                      <span>{comment.Commentaire}</span>
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setCommentToEdit(comment);
                            setNewComment(comment.Commentaire);
                          }}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteComment(comment.ID)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Formulaire d'ajout de commentaire */}
            <form onSubmit={handleCommentSubmit} className="my-3">
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
