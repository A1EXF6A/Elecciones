import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Admin = db.define('administrador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario: {
        type: DataTypes.TEXT(50),
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.TEXT(255),
    }
}, {
    tableName: 'administrador', 
    timestamps: false,
});

export default Admin;

