const { DataTypes } = require('sequelize');
const db = require('../frameworks/db/sequelize');
const sequelize = db.sequelize;


const Commentaires = sequelize.define('Commentaires', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  AdherentID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Commentaire: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Commentaires',
  timestamps: false
});

module.exports = Commentaires;
