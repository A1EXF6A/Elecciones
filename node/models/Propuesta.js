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
    tableName: 'propuestas1', // Nombre de la tabla en la base de datos
    timestamps: false,
});

export default Propuesta;
