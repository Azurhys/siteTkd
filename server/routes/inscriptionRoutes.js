const express = require('express');
const router = express.Router();
const { Inscription, Adherents, Formule, Dobok } = require('../models/Formule');

router.post('/inscriptions', async (req, res) => {
  try {
    const { adherentData, formuleID, dobokID, reductionFamille, reductionPASS, modePaiement } = req.body;

    const adherent = await Adherents.create(adherentData);

    const inscription = await Inscription.create({
      AdherentID: adherent.ID,
      FormuleID: formuleID,
      DobokID: dobokID,
      ReductionFamille: reductionFamille,
      ReductionPASS: reductionPASS,
      ModePaiement: modePaiement,
    });

    res.status(201).json(inscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;