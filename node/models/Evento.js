import { DataTypes } from 'sequelize';
import sequelize from "../database/db.js";

const Evento = sequelize.define('Evento', {
    id_eve: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom_eve: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    desc_eve: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fec_eve: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'eventos',
    timestamps: false,
});

export default Evento;  
