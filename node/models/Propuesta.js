import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Propuesta = db.define('propuesta', {
    id_pro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_pro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    des_pro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_cand: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'propuestas1', 
    timestamps: false,
});

export default Propuesta;
