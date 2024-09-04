const express = require('express');
const router = express.Router();
const PersonneUrgence = require('../models/PersonneUrgence');

// Route pour créer une nouvelle personne en cas d'urgence
router.post('/', async (req, res) => {
  try {
    const { Nom, Prenom, LienParente, Portable, AdherentID } = req.body;
    const nouvellePersonneUrgence = await PersonneUrgence.create({ Nom, Prenom, LienParente, Portable, AdherentID });
    res.status(201).json(nouvellePersonneUrgence);
  } catch (error) {
    console.error('Erreur lors de la création de la personne en cas d\'urgence:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la personne en cas d\'urgence' });
  }
});

// Route pour obtenir toutes les personnes en cas d'urgence
router.get('/', async (req, res) => {
  try {
    const personnesUrgence = await PersonneUrgence.findAll();
    res.json(personnesUrgence);
  } catch (error) {
    console.error('Erreur lors de la récupération des personnes en cas d\'urgence:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des personnes en cas d\'urgence' });
  }
});

// Route pour obtenir une personne en cas d'urgence par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const personneUrgence = await PersonneUrgence.findByPk(id);
    if (!personneUrgence) {
      return res.status(404).json({ message: 'Personne en cas d\'urgence non trouvée' });
    }
    res.json(personneUrgence);
  } catch (error) {
    console.error('Erreur lors de la récupération de la personne en cas d\'urgence:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la personne en cas d\'urgence' });
  }
});

// Route pour mettre à jour une personne en cas d'urgence
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Nom, Prenom, LienParente, Portable, AdherentID } = req.body;
  try {
    const personneUrgence = await PersonneUrgence.findByPk(id);
    if (!personneUrgence) {
      return res.status(404).json({ message: 'Personne en cas d\'urgence non trouvée' });
    }

    personneUrgence.Nom = Nom;
    personneUrgence.Prenom = Prenom;
    personneUrgence.LienParente = LienParente;
    personneUrgence.Portable = Portable;
    personneUrgence.AdherentID = AdherentID;

    await personneUrgence.save();
    res.json(personneUrgence);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la personne en cas d\'urgence:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la personne en cas d\'urgence' });
  }
});

// Route pour supprimer une personne en cas d'urgence
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const personneUrgence = await PersonneUrgence.findByPk(id);
    if (!personneUrgence) {
      return res.status(404).json({ message: 'Personne en cas d\'urgence non trouvée' });
    }

    await personneUrgence.destroy();
    res.json({ message: 'Personne en cas d\'urgence supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la personne en cas d\'urgence:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la personne en cas d\'urgence' });
  }
});

module.exports = router;
