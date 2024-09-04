const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router = express.Router();
const Inscription = require('../models/Inscription'); // Modèle d'inscription
const Adherent = require('../models/Adherent'); // Modèle d'adhérent
const Paiement = require('../models/Paiement'); // Modèle de paiement
const Commentaires = require('../models/Commentaires'); // Modèle de commentaire
const Dobok = require('../models/Dobok');
const Formule = require('../models/Formule');
const PersonneUrgence = require('../models/PersonneUrgence')

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
    const commentaires = adherent.ID ? await Commentaires.findAll({ where: { AdherentID: adherent.ID } }) : [];
    console.log('Commentaires récupérés:', commentaires);

    const formule = await Formule.findByPk(inscription.formuleID);
    const dobok = await Dobok.findByPk(inscription.dobokID);

    const personnesUrgence = await PersonneUrgence.findAll({ where: { adherentID: adherent.ID } });
    console.log('Personnes à prévenir récupérées:', personnesUrgence);

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
      doc.image(logoPath, 40, 10, { width: 100 }); // Ajustez les coordonnées et la largeur selon vos besoins
      doc.moveDown(2);
    } else {
      console.error('Logo non trouvé à l\'emplacement spécifié :', logoPath);
    }

    // Ajouter le titre
    doc.fontSize(20).font('Helvetica-Bold').text('Détails de l\'Inscription', { align: 'center' });
    doc.moveDown(1.5);

    // Section Informations Adhérent
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('1. ETAT CIVIL :');
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Nom : ${adherent.dataValues.Nom || ''}    Prenom : ${adherent.dataValues.Prenom || ''}    Genre : ${adherent.dataValues.Genre || ''}`);
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Date de naissance : ${adherent.dataValues.DateNaissance || ''}    Poids : ${adherent.dataValues.Poids || ''}    Taille : ${adherent.dataValues.Taille || ''}`);
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Adresse : ${adherent.dataValues.Adresse1 || ''} ${adherent.dataValues.CodePostal} ${adherent.dataValues.Ville}`);
    doc.fillColor('black').text(`Email 1: ${adherent.dataValues.Email1 || ''}   Email 2: ${adherent.dataValues.Email2 || ''}`);
    doc.fillColor('black').text(`Téléphone 1 : ${adherent.dataValues.Portable1 || ''}   Téléphone 2 : ${adherent.dataValues.Portable2 || ''}`);
    doc.moveDown(1);

    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('2. PERSONNES À PRÉVENIR EN CAS D\'URGENCE :');
    if (personnesUrgence.length > 0) {
      personnesUrgence.forEach((personne, index) => {
        doc.fontSize(12).fillColor('black').font('Helvetica').text(`Personne à prévenir ${index + 1}:`);
        doc.fontSize(12).fillColor('black').font('Helvetica').text(`  Nom : ${personne.dataValues.Nom || 'N/A'}`);
        doc.fontSize(12).fillColor('black').font('Helvetica').text(`  Prénom : ${personne.dataValues.Prenom || 'N/A'}`);
        doc.fontSize(12).fillColor('black').font('Helvetica').text(`  Lien de parenté : ${personne.dataValues.LienParente || 'N/A'}`);
        doc.fontSize(12).fillColor('black').font('Helvetica').text(`  Téléphone : ${personne.dataValues.Portable || 'N/A'}`);
        doc.moveDown(0.5);
      });
    } else {
      doc.fontSize(12).fillColor('black').font('Helvetica').text('Aucune personne à prévenir enregistrée.');
      doc.moveDown(0.5);
    }

    // Section Informations Inscription
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').text('3. DETAILS DE L\'INSCRIPTION:');
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Formule : ${formule.Nom} ${formule.Federation}`);
    doc.fillColor('black').text(`Réduction famille nombreuse : ${inscription.dataValues.reductionFamille ? inscription.dataValues.reductionFamille + ' €' : 'Aucune'}`);
    doc.fillColor('black').text(`Reduction PASS'SPORT : ${inscription.dataValues.reductionPASS ? inscription.dataValues.reductionPASS + ' €' : 'Aucune'} ${inscription.dataValues.codePassSport ? ', code PASS\'SPORT' + inscription.dataValues.codePassSport : ''} `);
    doc.fillColor('black').text(`Option achat de dobok : ${inscription.dataValues.dobokID ? 'Taille : ' + dobok.dataValues.Taille + 'cm, Prix : ' + dobok.dataValues.Prix + ' €' : 'Aucun dobok'}`);
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
        doc.fontSize(12).font('Helvetica').text(`  Paiement ${paiement.dataValues.Mois}: ${paiement.dataValues.Montant || 'N/A'} € - ${paiement.dataValues.MoyenPaiement || 'N/A'}`);
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
    doc.moveDown(5);

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

router.get('/facture/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer l'inscription
    const inscription = await Inscription.findByPk(id);
    if (!inscription) {
      return res.status(404).send('Inscription non trouvée');
    }

    // Récupérer l'adhérent lié
    const adherentID = inscription.adherentID; 
    const adherent = adherentID ? await Adherent.findByPk(adherentID) : null;
    if (!adherent) {
      return res.status(404).send('Adhérent non trouvé');
    }

    // Créer un nouveau document PDF
    const doc = new PDFDocument({ margin: 40, size: 'A4' });

    // Définir le type de contenu et disposition du fichier
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="facture_acquittee_${adherent.dataValues.Nom}_${adherent.dataValues.Prenom}.pdf"`);

    // Pipe le document vers la réponse HTTP
    doc.pipe(res);

    const logoPath = path.join(__dirname, '..', 'public', 'logo.png');

    // Vérifiez si le fichier existe avant de l'insérer dans le PDF
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 10, { width: 100 }); // Ajustez les coordonnées et la largeur selon vos besoins
      doc.moveDown(2);
    } else {
      console.error('Logo non trouvé à l\'emplacement spécifié :', logoPath);
    }

    const signPath = path.join(__dirname, '..', 'public', 'kj3.png');

    // Vérifiez si le fichier existe avant de l'insérer dans le PDF
    if (fs.existsSync(signPath)) {
      doc.image(signPath, 60, 400, { width: 500 }); // Ajustez les coordonnées et la largeur selon vos besoins
      doc.moveDown(2);
    } else {
      console.error('Signatures non trouvé à l\'emplacement spécifié :', logoPath);
    }

    // Ajouter le titre de la facture
    doc.fontSize(20).font('Helvetica-Bold').text('FACTURE ACQUITEE', { align: 'center' });
    doc.moveDown(1);

    // Ajouter les détails de la facture
    doc.fontSize(16).font('Helvetica-Bold').text('Inscription au cours de TAEKWONDO', { align: 'center' });
    doc.fontSize(14).font('Helvetica').text(`Saison 2024 / 2025 du 09/09/2024 au 30/06/2025`, { align: 'center' });
    doc.moveDown(4);

    doc.fontSize(14).font('Helvetica').text(`Prénom et Nom de l’adhérent : ${adherent.dataValues.Prenom} ${adherent.dataValues.Nom}`);
    doc.fontSize(14).font('Helvetica').text(`Montant de l’inscription annuelle : ${inscription.dataValues.coutTotal.toFixed(2)} €`);
    doc.moveDown(4);

     // Ajouter la date du jour
     const today = new Date();
     const formattedDate = today.toLocaleDateString('fr-FR', {
       day: '2-digit',
       month: '2-digit',
       year: 'numeric'
     });
 
     doc.fontSize(16).font('Helvetica-Bold').text(`Marolles En Hurepoix, le ${formattedDate}`,{ align: 'center' });
    
    doc.moveDown(15);

   
    

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
    console.error('Erreur lors de la génération de la facture:', error);
    res.status(500).send('Erreur lors de la génération de la facture');
  }
});

module.exports = router;


