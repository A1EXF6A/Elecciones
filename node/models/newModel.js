import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Noticia = db.define('noticia', {
    id_not: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo_not: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    des_not: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    favorita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    img_not: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'noticias', 
    timestamps: false,
});

export default Noticia;