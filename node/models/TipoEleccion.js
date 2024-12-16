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
    descripcion: { // Nueva columna
        type: DataTypes.TEXT, // Usa TEXT si esperas descripciones largas
        allowNull: false,
    },
}, {
    tableName: 'tipo_eleccion',
    timestamps: false,
});

export default TipoEleccion;
