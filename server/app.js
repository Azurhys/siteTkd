require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const app = express();
const adherentRoutes = require('./routes/adherentRoutes');
const formuleRoutes = require('./routes/formuleRoutes');

app.use(cors());

app.use(express.json());

app.use('/api', adherentRoutes);
app.use('/api', formuleRoutes);

app.listen(9017, () => {
  console.log('Server is running on port 9017');
});

module.exports = app;
