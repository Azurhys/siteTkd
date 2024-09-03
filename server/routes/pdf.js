// routes/pdf.js

const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();
const Inscription = require('../models/Inscription'); // Assurez-vous que ce modèle est correct

router.get('/inscription/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer les informations d'inscription
    const inscription = await Inscription.findByPk(id);
    console.log('Données d\'inscription:', inscription);

    if (!inscription) {
      return res.status(404).send('Inscription non trouvée');
    }

    // Créer un nouveau document PDF
    const doc = new PDFDocument();

    // Définir le type de contenu
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="inscription-${inscription.dataValues.id}.pdf"`);

    doc.fontSize(20).text('Détails de l\'Inscription', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`ID d'inscription: ${inscription.dataValues.id || 'N/A'}`);
    doc.text(`Adherent ID: ${inscription.dataValues.adherentID || 'N/A'}`);
    doc.text(`Formule ID: ${inscription.dataValues.formuleID || 'N/A'}`);
    doc.text(`Coût Total: ${inscription.dataValues.coutTotal || '0'} €`);
    // Ajoutez d'autres détails nécessaires...

    // Finaliser le PDF
    doc.end();

    // Pipe le PDF vers la réponse HTTP
    doc.pipe(res);
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    res.status(500).send('Erreur lors de la génération du PDF');
  }
});

module.exports = router;
