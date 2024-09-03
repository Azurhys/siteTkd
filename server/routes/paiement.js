// routes/paiement.js

const express = require('express');
const router = express.Router();
const Paiement = require('../models/Paiement');

// GET tous les paiements
router.get('/', async (req, res) => {
  try {
    const paiements = await Paiement.findAll();
    res.json(paiements);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des paiements.' });
  }
});

// GET paiement par ID
router.get('/:id', async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id);
    if (paiement) {
      res.json(paiement);
    } else {
      res.status(404).json({ error: 'Paiement non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du paiement.' });
  }
});

//GET by inscriptionID
router.get('/inscription/:inscriptionId', async (req, res) => {
  try {
    const paiements = await Paiement.findAll({
      where: { inscriptionID: req.params.inscriptionId }
    });
    res.json(paiements);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des paiements pour l\'inscription donnée.' });
  }
});

// POST créer un nouveau paiement
router.post('/', async (req, res) => {
  try {
    const newPaiement = await Paiement.create(req.body);
    res.status(201).json(newPaiement);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du paiement.' });
  }
});

// PUT mise à jour d'un paiement
router.put('/:id', async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id);
    if (paiement) {
      await paiement.update(req.body);
      res.json(paiement);
    } else {
      res.status(404).json({ error: 'Paiement non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du paiement.' });
  }
});

// DELETE supprimer un paiement
router.delete('/:id', async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id);
    if (paiement) {
      await paiement.destroy();
      res.json({ message: 'Paiement supprimé avec succès.' });
    } else {
      res.status(404).json({ error: 'Paiement non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du paiement.' });
  }
});

module.exports = router;
