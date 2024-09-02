const { DataTypes } = require('sequelize');
const db = require('../frameworks/db/sequelize');
const sequelize = db.sequelize;

const Paiement = sequelize.define('Paiement', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  InscriptionID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Montant: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Mois: {
    type: DataTypes.STRING,
    allowNull: false
  },
  MoyenPaiement: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Paiement',
  timestamps: false
});

module.exports = Paiement;
