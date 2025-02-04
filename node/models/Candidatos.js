// models/Candidato.js
import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import TipoEleccion from './TipoEleccion.js';

const Candidato = db.define('candidatos', {
    id_cand: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_can: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo_can: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_can: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nom_can2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo_can2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_can2: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    eslogan_can: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_eleccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    num_votos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'candidatos',
    timestamps: false,
});

Candidato.belongsTo(TipoEleccion, { foreignKey: 'id_eleccion' });

export default Candidato;


