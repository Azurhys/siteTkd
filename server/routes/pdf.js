const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router = express.Router();
const Inscription = require('../models/Inscription'); // Modèle d'inscription
const Adherent = require('../models/Adherent'); // Modèle d'adhérent
const Paiement = require('../models/Paiement'); // Modèle de paiement
const Commentaires = require('../models/Commentaires'); // Modèle de commentaire

router.get('/inscription/:id', async (req, res) => {
  const { id } = req.params;
  console.log('ID de l\'inscription:', id);

  try {
    // Récupérer l'inscription
    const inscription = await Inscription.findByPk(id);
    console.log('Inscription récupérée:', inscription);

    if (!inscription) {
      return res.status(404).send('Inscription non trouvée');
    }

    // Récupérer l'adhérent lié
    const adherentID = inscription.adherentID; 
    console.log('ID de l\'adherent:', adherentID);

    const adherent = adherentID ? await Adherent.findByPk(adherentID) : null;
    console.log('Adherent récupéré:', adherent);

    if (!adherent) {
      return res.status(404).send('Adhérent non trouvé');
    }

    // Récupérer les paiements liés
    const paiements = await Paiement.findAll({ where: { inscriptionID: id } });
    console.log('Paiements récupérés:', paiements);

    // Récupérer les commentaires liés à l'adhérent
    const commentaires = adherent.id ? await Commentaires.findAll({ where: { adherentID: adherent.id } }) : [];
    console.log('Commentaires récupérés:', commentaires);

    const paiementsGroupes = {};
    paiements.forEach((paiement) => {
      const key = paiement.mois || ' unique'; // Utilisez une clé unique pour chaque échéance
      if (!paiementsGroupes[key]) {
        paiementsGroupes[key] = [];
      }
      paiementsGroupes[key].push(paiement);
    });

    // Créer un nouveau document PDF
    const doc = new PDFDocument({ margin: 40, size: 'A4' });

    // Définir le type de contenu et disposition du fichier
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="inscription_${adherent.dataValues.Nom}_${adherent.dataValues.Prenom}.pdf"`);

    // Pipe le document vers la réponse HTTP
    doc.pipe(res);

    const logoPath = '../public/logo.jpg'; // Chemin vers votre image
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 50, { width: 100 }); // Insère une image à la position (x=50, y=50) avec une largeur de 100
      doc.moveDown(2);
    }

    // Ajouter le titre
    doc.fontSize(20).font('Helvetica-Bold').text('Détails de l\'Inscription', { align: 'center' });
    doc.moveDown(1.5);

    // Section Informations Adhérent
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('1. Informations de l\'Adhérent:');
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Nom: ${adherent.dataValues.Nom || 'N/A'}`);
    doc.fillColor('black').text(`Email: ${adherent.dataValues.Email1 || 'N/A'}`);
    doc.fillColor('black').text(`Téléphone: ${adherent.dataValues.Portable1 || 'N/A'}`);
    doc.moveDown(1);

    // Section Informations Inscription
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('2. Détails de l\'Inscription:');
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`ID d'inscription: ${inscription.dataValues.id}`);
    doc.fillColor('black').text(`Formule ID: ${inscription.dataValues.formuleID}`);
    doc.fillColor('black').text(`Coût Total: ${inscription.dataValues.coutTotal} €`);
    doc.moveDown(1);

    // Section Paiements
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('3. Échéancier de Paiements:');
    doc.fillColor('black');
    
    // Afficher les paiements regroupés
    Object.keys(paiementsGroupes).forEach((key, index) => {
      const groupe = paiementsGroupes[key];
      doc.fontSize(12).font('Helvetica-Bold').text(`Échéance ${key}:`);
      groupe.forEach((paiement, subIndex) => {
        doc.fontSize(12).font('Helvetica').text(`  Paiement ${subIndex + 1}: ${paiement.dataValues.Montant || 'N/A'} € - ${paiement.dataValues.MoyenPaiement || 'N/A'}`);
      });
      doc.moveDown(0.5);
    });

    // Section Commentaires
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('4. Commentaires:');
    if (commentaires.length > 0) {
      commentaires.forEach((commentaire, index) => {
        doc.fontSize(12).fillColor('black').font('Helvetica').text(`Commentaire ${index + 1}: ${commentaire.dataValues.Commentaire || 'N/A'}`);
      });
    } else {
      doc.fontSize(12).fillColor('black').font('Helvetica').text('Aucun commentaire disponible.');
    }
    doc.moveDown(2);


    // Finaliser le PDF
    doc.end();

  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    res.status(500).send('Erreur lors de la génération du PDF');
  }
});

module.exports = router;
