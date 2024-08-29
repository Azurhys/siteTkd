const { DataTypes } = require('sequelize');
const db = require('../frameworks/db/sequelize');
const sequelize = db.sequelize;


const Dobok = sequelize.define('Dobok', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Taille: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Prix: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'Dobok',
  timestamps: false 
});

module.exports = Dobok;
