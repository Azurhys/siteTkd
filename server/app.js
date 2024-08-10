require('dotenv').config(); 
const express = require('express');
const app = express();
const adherentRoutes = require('./routes/adherentRoutes');

app.use(express.json());

// Utilisez les routes
app.use('/api', adherentRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
