const express = require('express');
const router = express.Router();
const Inscription = require('../models/Inscription'); 

router.post('/inscriptions', async (req, res) => {
  try {
    const { adherentID, formuleID, dobokID, reductionFamille, reductionPASS, modePaiement } = req.body;

    // Créez une nouvelle inscription
    const newInscription = await Inscription.create({
      adherentID,
      formuleID,
      dobokID,
      reductionFamille,
      reductionPASS,
      modePaiement
    });

    res.status(201).json(newInscription);
  } catch (error) {
    console.error('Erreur lors de la création de l\'inscription:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'Erreur lors de la création de l\'inscription', details: error.message });
  }  
});

module.exports = router;
