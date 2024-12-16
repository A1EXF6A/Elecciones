// models/Candidato.js
import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import TipoEleccion from './TipoEleccion.js';

const Candidato = db.define('candidato', {
    id_cand: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nom2: {
        type: DataTypes.STRING,
    },
    ape1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ape2: {
        type: DataTypes.STRING,
    },
    id_eleccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'candidato',
    timestamps: false,
});
Candidato.belongsTo(TipoEleccion, { foreignKey: 'id_eleccion' });

export default Candidato;


