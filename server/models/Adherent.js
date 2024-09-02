const { DataTypes } = require('sequelize');
const db = require('../frameworks/db/sequelize');
const sequelize = db.sequelize;

const Adherent = sequelize.define('Adherent', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Genre: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  DateNaissance: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Poids: {
    type: DataTypes.FLOAT
  },
  Taille: {
    type: DataTypes.INTEGER
  },
  Adresse1: {
    type: DataTypes.STRING
  },
  Adresse2: {
    type: DataTypes.STRING
  },
  CodePostal: {
    type: DataTypes.STRING
  },
  Ville: {
    type: DataTypes.STRING
  },
  Email1: {
    type: DataTypes.STRING
  },
  Email2: {
    type: DataTypes.STRING
  },
  Portable1: {
    type: DataTypes.STRING
  },
  Portable2: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'adherents',
  timestamps: false 
});

module.exports = Adherent;
