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
        defaultValue: 1, // 1 para visible, 0 para no visible
    },
    fec_sug: {
        type: DataTypes.DATE, // Cambiado a DataTypes.DATE
        defaultValue: DataTypes.NOW, // Fecha actual por defecto
    },
}, {
    tableName: 'sugerencias', // Nombre de la tabla en la base de datos
    timestamps: false, // No incluir columnas de tiempo (createdAt, updatedAt)
});

export default Sugerencia;
