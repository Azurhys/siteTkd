const { DataTypes } = require('sequelize');
const db = require('../frameworks/db/sequelize');
const sequelize = db.sequelize;

const Inscription = sequelize.define('Inscription', {
  adherentID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  formuleID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dobokID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  reductionFamille: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  reductionPASS: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  codePassSport: {
    type: DataTypes.STRING,
    allowNull: true // Ce champ est facultatif
  },
  modePaiement: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coutTotal: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'Inscription',
  timestamps: false
});

module.exports = Inscription;
