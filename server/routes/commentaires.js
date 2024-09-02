const express = require('express');
const router = express.Router();
const Commentaires = require('../models/Commentaires');

// GET tous les commentaires
router.get('/', async (req, res) => {
  try {
    const commentaires = await Commentaires.findAll();
    res.json(commentaires);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires.' });
  }
});

// GET commentaire par ID
router.get('/:id', async (req, res) => {
  try {
    const commentaire = await Commentaires.findByPk(req.params.id);
    if (commentaire) {
      res.json(commentaire);
    } else {
      res.status(404).json({ error: 'Commentaire non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du commentaire.' });
  }
});

// POST créer un nouveau commentaire
router.post('/', async (req, res) => {
  try {
    const newCommentaire = await Commentaires.create(req.body);
    res.status(201).json(newCommentaire);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du commentaire.' });
  }
});

// PUT mise à jour d'un commentaire
router.put('/:id', async (req, res) => {
  try {
    const commentaire = await Commentaires.findByPk(req.params.id);
    if (commentaire) {
      await commentaire.update(req.body);
      res.json(commentaire);
    } else {
      res.status(404).json({ error: 'Commentaire non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du commentaire.' });
  }
});

// DELETE supprimer un commentaire
router.delete('/:id', async (req, res) => {
  try {
    const commentaire = await Commentaires.findByPk(req.params.id);
    if (commentaire) {
      await commentaire.destroy();
      res.json({ message: 'Commentaire supprimé avec succès.' });
    } else {
      res.status(404).json({ error: 'Commentaire non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du commentaire.' });
  }
});

module.exports = router;
