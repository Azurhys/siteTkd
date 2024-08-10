const express = require('express');
const router = express.Router();
const db = require('../frameworks/db/sequelize');
const AdherentRepository = require('../repositories/AdherentRepository');
const CreateAdherent = require('../usecases/CreateAdherent');
const AdherentController = require('../controllers/AdherentController');

const adherentRepository = new AdherentRepository(db);
const createAdherent = new CreateAdherent(adherentRepository);
const adherentController = new AdherentController(createAdherent);

router.post('/adherents', (req, res) => adherentController.createAdherent(req, res));
router.get('/adherents', (req, res) => adherentController.getAllAdherents(req, res));

router.get('/test-create-adherent', async (req, res) => {
    try {
      const adherent = await adherentController.createAdherent({
        body: {
          nom: "Test",
          prenom: "Adherent",
          genre: "M",
          dateNaissance: "1990-01-01",
          poids: 70.5,
          taille: 180,
          adresse1: "123 rue de Test",
          adresse2: "",
          codePostal: "75001",
          ville: "Paris",
          email1: "test@example.com",
          email2: "",
          portable1: "0601020304",
          portable2: ""
        }
      }, res);
      res.status(201).json(adherent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
