// routes/dobokRoutes.js
const express = require('express');
const router = express.Router();
const Dobok = require('../models/Dobok'); // Import du modèle Dobok

// Route pour récupérer tous les doboks
router.get('/doboks', async (req, res) => {
  try {
    // Utiliser le modèle Dobok pour récupérer les données
    const doboks = await Dobok.findAll();
    res.json(doboks);
  } catch (error) {
    console.error('Erreur lors de la récupération des doboks:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des doboks' });
  }
});

module.exports = router;
