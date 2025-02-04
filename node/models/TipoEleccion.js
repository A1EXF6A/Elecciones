import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const TipoEleccion = db.define('tipo_eleccion', {
    id_eleccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_eleccion: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'tipo_eleccion',
    timestamps: false,
});

export default TipoEleccion;
