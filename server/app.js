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

app.use(cors());

app.use(express.json());

app.use('/api', adherentRoutes);
app.use('/api', formuleRoutes);
app.use('/api', inscriptionRoutes);
app.use('/api', dobokRoutes);
app.use('/api/paiements', paiementRoutes);
app.use('/api/commentaires', commentairesRoutes);

app.listen(9017, () => {
  console.log('Server is running on port 9017');
});

module.exports = app;
