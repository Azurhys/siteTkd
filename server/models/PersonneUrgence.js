const { DataTypes } = require('sequelize');
const db = require('../frameworks/db/sequelize');
const sequelize = db.sequelize;

const PersonneUrgence = sequelize.define('PersonneUrgence', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Prenom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  LienParente: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  Portable: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  AdherentID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Adherents',
      key: 'ID'
    },
  },
}, {
  tableName: 'PersonneUrgence', // Nom de la table
  timestamps: false, // Si vous ne souhaitez pas utiliser les champs createdAt et updatedAt
});

module.exports = PersonneUrgence;
