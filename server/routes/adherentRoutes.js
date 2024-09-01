const express = require('express');
const router = express.Router();
const db = require('../frameworks/db/sequelize');
const AdherentRepository = require('../repositories/AdherentRepository');
const CreateAdherent = require('../usecases/CreateAdherent');
const AdherentController = require('../controllers/AdherentController');

const adherentRepository = new AdherentRepository(db);
const createAdherent = new CreateAdherent(adherentRepository);
const adherentController = new AdherentController(createAdherent);

// Route pour créer un nouvel adhérent
router.post('/adherents', (req, res) => adherentController.createAdherent(req, res));

// Route pour récupérer tous les adhérents
router.get('/adherents', (req, res) => adherentController.getAllAdherents(req, res));

// Route pour récupérer un adhérent spécifique par ID
router.get('/adherents/:id', async (req, res) => {
  try {
    const adherent = await adherentRepository.findById(req.params.id);
    if (adherent) {
      res.status(200).json(adherent);
    } else {
      res.status(404).json({ error: 'Adhérent non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'adhérent:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'adhérent', details: error.message });
  }
});

// Route pour mettre à jour un adhérent par ID
router.put('/adherents/:id', async (req, res) => {
  try {
    const adherent = await adherentRepository.findById(req.params.id);
    if (adherent) {
      await adherentRepository.update(req.params.id, req.body);
      res.status(200).json({ message: 'Adhérent mis à jour avec succès' });
    } else {
      res.status(404).json({ error: 'Adhérent non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'adhérent:', error.message);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'adhérent', details: error.message });
  }
});

// Route pour supprimer un adhérent par ID
router.delete('/adherents/:id', async (req, res) => {
  try {
    const adherent = await adherentRepository.findById(req.params.id);
    if (adherent) {
      await adherentRepository.delete(req.params.id);
      res.status(204).send(); // Pas de contenu à renvoyer après suppression
    } else {
      res.status(404).json({ error: 'Adhérent non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'adhérent:', error.message);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'adhérent', details: error.message });
  }
});


module.exports = router;
