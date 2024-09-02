const express = require('express');
const router = express.Router();
const Adherent = require('../models/Adherent');

// Créer un nouvel adhérent
router.post('/adherents', async (req, res) => {
  try {
    const {
      Nom,
      Prenom,
      Genre,
      DateNaissance,
      Poids,
      Taille,
      Adresse1,
      Adresse2,
      CodePostal,
      Ville,
      Email1,
      Email2,
      Portable1,
      Portable2
    } = req.body;

    const newAdherent = await Adherent.create({
      Nom,
      Prenom,
      Genre,
      DateNaissance,
      Poids,
      Taille,
      Adresse1,
      Adresse2,
      CodePostal,
      Ville,
      Email1,
      Email2,
      Portable1,
      Portable2
    });

    res.status(201).json(newAdherent);
  } catch (error) {
    console.error("Erreur lors de la création de l'adhérent:", error.message);
    res.status(500).json({ error: "Erreur lors de la création de l'adhérent", details: error.message });
  }
});

// Lire tous les adhérents
router.get('/adherents', async (req, res) => {
  try {
    const adherents = await Adherent.findAll();
    res.status(200).json(adherents);
  } catch (error) {
    console.error("Erreur lors de la récupération des adhérents:", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des adhérents", details: error.message });
  }
});

// Lire un adhérent spécifique par ID
router.get('/adherents/:id', async (req, res) => {
  try {
    const adherent = await Adherent.findByPk(req.params.id);
    if (adherent) {
      res.status(200).json(adherent);
    } else {
      res.status(404).json({ error: 'Adhérent non trouvé' });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'adhérent:", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération de l'adhérent", details: error.message });
  }
});

// Mettre à jour un adhérent par ID
router.put('/adherents/:id', async (req, res) => {
  try {
    const {
      Nom,
      Prenom,
      Genre,
      DateNaissance,
      Poids,
      Taille,
      Adresse1,
      Adresse2,
      CodePostal,
      Ville,
      Email1,
      Email2,
      Portable1,
      Portable2
    } = req.body;

    const adherent = await Adherent.findByPk(req.params.id);
    if (adherent) {
      adherent.Nom = Nom;
      adherent.Prenom = Prenom;
      adherent.Genre = Genre;
      adherent.DateNaissance = DateNaissance;
      adherent.Poids = Poids;
      adherent.Taille = Taille;
      adherent.Adresse1 = Adresse1;
      adherent.Adresse2 = Adresse2;
      adherent.CodePostal = CodePostal;
      adherent.Ville = Ville;
      adherent.Email1 = Email1;
      adherent.Email2 = Email2;
      adherent.Portable1 = Portable1;
      adherent.Portable2 = Portable2;

      await adherent.save();
      res.status(200).json(adherent);
    } else {
      res.status(404).json({ error: 'Adhérent non trouvé' });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adhérent:", error.message);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'adhérent", details: error.message });
  }
});

// Supprimer un adhérent par ID
router.delete('/adherents/:id', async (req, res) => {
  try {
    const adherent = await Adherent.findByPk(req.params.id);
    if (adherent) {
      await adherent.destroy();
      res.status(204).send(); // Pas de contenu à renvoyer après suppression
    } else {
      res.status(404).json({ error: 'Adhérent non trouvé' });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adhérent:", error.message);
    res.status(500).json({ error: "Erreur lors de la suppression de l'adhérent", details: error.message });
  }
});

module.exports = router;
