import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Propuesta = db.define('propuesta', {
    id_pro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_cand: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo_pro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    des_pro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publico_pro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    favorita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'propuestas', 
    timestamps: false,
});

export default Propuesta;
