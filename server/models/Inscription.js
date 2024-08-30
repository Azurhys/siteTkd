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
    allowNull: false
  },
  reductionFamille: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  reductionPASS: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  modePaiement: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'inscription',
  timestamps: false 
});

module.exports = Inscription;
