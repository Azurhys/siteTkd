const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router = express.Router();
const Inscription = require('../models/Inscription'); // Modèle d'inscription
const Adherent = require('../models/Adherent'); // Modèle d'adhérent
const Paiement = require('../models/Paiement'); // Modèle de paiement
const Commentaires = require('../models/Commentaires'); // Modèle de commentaire
const path = require('path');

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
      const key = paiement.mois || ''; // Utilisez une clé unique pour chaque échéance
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

    const logoPath = path.join(__dirname, '..', 'public', 'logo.png');

    // Vérifiez si le fichier existe avant de l'insérer dans le PDF
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 0, { width: 100 }); // Ajustez les coordonnées et la largeur selon vos besoins
      doc.moveDown(2);
    } else {
      console.error('Logo non trouvé à l\'emplacement spécifié :', logoPath);
    }

    // Ajouter le titre
    doc.fontSize(20).font('Helvetica-Bold').text('Détails de l\'Inscription', { align: 'center' });
    doc.moveDown(1.5);

    // Section Informations Adhérent
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('1. ETAT CIVIL :');
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Nom : ${adherent.dataValues.Nom || ''}`);
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Prenom : ${adherent.dataValues.Prenom || ''}`);
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Genre : ${adherent.dataValues.Genre || ''}`);
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Date de naissance : ${adherent.dataValues.DateNaissance || ''}`);
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Poids : ${adherent.dataValues.Poids || ''}`);
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Taille : ${adherent.dataValues.Taille || ''}`);
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Adresse : ${adherent.dataValues.Adresse1 || ''} ${adherent.dataValues.CodePostal} ${adherent.dataValues.Ville}`);
    doc.fillColor('black').text(`Email 1: ${adherent.dataValues.Email1 || ''}`);
    doc.fillColor('black').text(`Email 2: ${adherent.dataValues.Email2 || ''}`);
    doc.fillColor('black').text(`Téléphone 1 : ${adherent.dataValues.Portable1 || ''}`);
    doc.fillColor('black').text(`Téléphone 2 : ${adherent.dataValues.Portable2 || ''}`);
    doc.moveDown(1);

    // Section Informations Inscription
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('3. DETAILS DE L\'INSCRIPTION:');
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Formule : ${inscription.dataValues.formuleID}`);
    doc.fillColor('black').text(`Réduction famille nombreuse : ${inscription.dataValues.reductionFamille ? inscription.dataValues.reductionFamille + ' €' : 'Aucune'}`);
    doc.fillColor('black').text(`Reduction PASS'SPORT : ${inscription.dataValues.reductionPASS ? inscription.dataValues.reductionPASS + ' €' : 'Aucune'} ${inscription.dataValues.codePassSport ? ', code PASS\'SPORT' + inscription.dataValues.codePassSport : ''} `);
    doc.fillColor('black').text(`Option achat de dobok : ${inscription.dataValues.dobokID ? inscription.dataValues.dobokID + ' €' :'Aucun dobok'} `);
    doc.fontSize(14).fillColor('black').font('Helvetica-Bold').text(`Coût Total: ${inscription.dataValues.coutTotal} €`);
    doc.moveDown(1);

    // Section Paiements
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('4. MODE DE PAIEMENT & ECHEANCIERS :');
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
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('5. COMMENTAIRE:');
    if (commentaires.length > 0) {
      commentaires.forEach((commentaire, index) => {
        doc.fontSize(12).fillColor('black').font('Helvetica').text(`Commentaire ${index + 1}: ${commentaire.dataValues.Commentaire || 'N/A'}`);
      });
    } else {
      doc.fontSize(12).fillColor('black').font('Helvetica').text('');
    }
    doc.moveDown(1);

    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('6. SIGNATURE:');
    doc.fontSize(12).fillColor('black').font('Helvetica').text('Date et Signature de l’adhérent ou de son représentant légal : ');
    doc.moveDown(3);

    doc.fontSize(10).fillColor('#3a9fbf  ').text('U.S.M. (UNION SPORTIVE DE MAROLLES)')
    doc.fontSize(10).fillColor('black').text('N° SIRET 447 720 699 000 19 / Agrément Sportif Jeunesse et Sports N°12232')
    doc.fontSize(10).fillColor('#3a9fbf  ').text('SECTION USM TAEKWONDO')
    doc.fontSize(10).fillColor('black').text('Mairie de Marolles En Hurepoix - 1, avenue Charles De Gaulle - 91630 MAROLLES EN HUREPOIX')
    doc.fontSize(10).fillColor('#3a9fbf  ').text('06.62.50.36.69 / 06.17.45.14.91')
    doc.fontSize(10).fillColor('blue').text('marollestaekwondo@gmail.com')
    doc.fontSize(10).fillColor('blue').text('https://www.facebook.com/UsmTaekwondo')
    doc.fontSize(10).fillColor('#3a9fbf  ').text('N° d\'affiliation F.F.S.T. : 10-91-2550 / FFTDA : 910474')
    // Finaliser le PDF
    doc.end();

  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    res.status(500).send('Erreur lors de la génération du PDF');
  }
});

module.exports = router;
