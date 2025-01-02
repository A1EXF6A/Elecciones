import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Sugerencia = db.define('sugerencia', {
    id_sug: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    texto_sug: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    correo_usu_suge: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    visible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    fec_sug: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'sugerencias',
    timestamps: false,
});

export default Sugerencia;
