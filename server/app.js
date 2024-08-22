require('dotenv').config(); 
const express = require('express');
const app = express();
const adherentRoutes = require('./routes/adherentRoutes');
const formuleRoutes = require('./routes/formuleRoutes');

app.use(express.json());

app.use('/api', adherentRoutes);
app.use('/api', formuleRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
