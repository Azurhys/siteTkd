require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
  );

sequelize.authenticate()
  .then(() => {
    console.log('Connexion réussie à la base de données.');
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données:', error);
});

const Adherent = sequelize.define('Adherent', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    genre: DataTypes.STRING,
    dateNaissance: DataTypes.DATE,
    poids: DataTypes.FLOAT,
    taille: DataTypes.INTEGER,
    adresse1: DataTypes.STRING,
    adresse2: DataTypes.STRING,
    codePostal: DataTypes.STRING,
    ville: DataTypes.STRING,
    email1: DataTypes.STRING,
    email2: DataTypes.STRING,
    portable1: DataTypes.STRING,
    portable2: DataTypes.STRING,
}, {
    timestamps: false
});
const db = {
  sequelize,
  Sequelize,
  Adherent,
};

module.exports = db;
