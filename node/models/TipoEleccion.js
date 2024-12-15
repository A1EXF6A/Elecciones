import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const TipoEleccion = db.define('TipoEleccion', {
    id_eleccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_eleccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'tipo_eleccion', // Asegúrate de que el nombre coincida con tu tabla
    timestamps: false, // Si no tienes columnas createdAt y updatedAt
});

export default TipoEleccion;