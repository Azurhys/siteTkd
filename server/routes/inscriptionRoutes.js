const express = require('express');
const router = express.Router();
const Inscription = require('../models/Inscription'); 

router.post('/inscriptions', async (req, res) => {
  try {
    const { 
      adherentID, 
      formuleID, 
      dobokID, 
      reductionFamille, 
      reductionPASS, 
      codePassSport,  
      passeportFFTDA, 
      modePaiement,
      coutTotal  
    } = req.body;

    const newInscription = await Inscription.create({
      adherentID,
      formuleID,
      dobokID,
      reductionFamille,
      reductionPASS,
      codePassSport,
      passeportFFTDA,
      modePaiement,
      coutTotal
    });

    res.status(201).json(newInscription);
  } catch (error) {
    console.error('Erreur lors de la création de l\'inscription:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création de l\'inscription', details: error.message });
  }  
});

// Lire toutes les inscriptions
router.get('/inscriptions', async (req, res) => {
  try {
    const inscriptions = await Inscription.findAll();
    res.status(200).json(inscriptions);
  } catch (error) {
    console.error('Erreur lors de la récupération des inscriptions:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des inscriptions', details: error.message });
  }
});

// Lire une inscription spécifique par ID
router.get('/inscriptions/:id', async (req, res) => {
  try {
    const inscription = await Inscription.findByPk(req.params.id);
    if (inscription) {
      res.status(200).json(inscription);
    } else {
      res.status(404).json({ error: 'Inscription non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'inscription:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'inscription', details: error.message });
  }
});

// Mettre à jour une inscription par ID
router.put('/inscriptions/:id', async (req, res) => {
  try {
    const { 
      adherentID, 
      formuleID, 
      dobokID, 
      reductionFamille, 
      reductionPASS, 
      codePassSport,  
      passeportFFTDA, 
      modePaiement,
      coutTotal 
    } = req.body;

    const inscription = await Inscription.findByPk(req.params.id);
    if (inscription) {
      inscription.adherentID = adherentID;
      inscription.formuleID = formuleID;
      inscription.dobokID = dobokID;
      inscription.reductionFamille = reductionFamille;
      inscription.reductionPASS = reductionPASS;
      inscription.codePassSport = codePassSport;
      inscription.passeportFFTDA = passeportFFTDA;
      inscription.modePaiement = modePaiement;
      inscription.coutTotal = coutTotal;

      await inscription.save();
      res.status(200).json(inscription);
    } else {
      res.status(404).json({ error: 'Inscription non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'inscription:', error.message);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'inscription', details: error.message });
  }
});

// Supprimer une inscription par ID
router.delete('/inscriptions/:id', async (req, res) => {
  try {
    const inscription = await Inscription.findByPk(req.params.id);
    if (inscription) {
      await inscription.destroy();
      res.status(204).send(); // Pas de contenu à renvoyer après suppression
    } else {
      res.status(404).json({ error: 'Inscription non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'inscription:', error.message);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'inscription', details: error.message });
  }
});

module.exports = router;