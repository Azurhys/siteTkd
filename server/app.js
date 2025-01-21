require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const app = express();
const adherentRoutes = require('./routes/adherentRoutes');
const formuleRoutes = require('./routes/formuleRoutes');
const inscriptionRoutes = require('./routes/inscriptionRoutes');
const dobokRoutes = require('./routes/dobokRoutes');
const paiementRoutes = require('./routes/paiement');
const commentairesRoutes = require('./routes/commentaires');
const pdfRoutes = require('./routes/pdf')
const personneUrgenceRoutes = require('./routes/personneUrgence');

const path = require('path')
// Utiliser cors avec les options par défaut (autorise toutes les origines)
app.use(cors());

// Ou définir des options CORS spécifiques
app.use(cors({
  //origin: '*', // Pour autoriser toutes les origines
  origin: 'http://localhost:5173', // Pour autoriser seulement une origine spécifique
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  //allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api', adherentRoutes);
app.use('/api', formuleRoutes);
app.use('/api', inscriptionRoutes);
app.use('/api', dobokRoutes);
app.use('/api/paiements', paiementRoutes);
app.use('/api/commentaires', commentairesRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/personne-urgence', personneUrgenceRoutes);

app.listen(9017, () => {
  console.log('Server is running on port 9017');
});

module.exports = app;
