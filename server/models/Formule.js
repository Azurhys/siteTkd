const { DataTypes } = require('sequelize');
const db = require('../frameworks/db/sequelize');
const sequelize = db.sequelize;

const Formule = sequelize.define('Formule', {
    Nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TrancheAge: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Federation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AdherentClub: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Licence: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Cours: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    CoutTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Creneau_1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Creneau_2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Lieu: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Formule',
    timestamps: false
});

module.exports = Formule;
