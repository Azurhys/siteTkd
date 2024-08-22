const express = require('express');
const router = express.Router();
const Formule = require('../models/Formule');

// Create (POST)
router.post('/formules', async (req, res) => {
    try {
        const formule = await Formule.create(req.body);
        res.status(201).json(formule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read All (GET)
router.get('/formules', async (req, res) => {
    try {
        const formules = await Formule.findAll();
        res.status(200).json(formules);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read One (GET)
router.get('/formules/:id', async (req, res) => {
    try {
        const formule = await Formule.findByPk(req.params.id);
        if (formule) {
            res.status(200).json(formule);
        } else {
            res.status(404).json({ error: 'Formule not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update (PUT)
router.put('/formules/:id', async (req, res) => {
    try {
        const [updated] = await Formule.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedFormule = await Formule.findByPk(req.params.id);
            res.status(200).json(updatedFormule);
        } else {
            res.status(404).json({ error: 'Formule not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete (DELETE)
router.delete('/formules/:id', async (req, res) => {
    try {
        const deleted = await Formule.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Formule not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
