import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Noticia = db.define('noticia', {
    id_not: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo_not: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    des_not: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    favorita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 0 no favorita, 1 favorita
    },
}, {
    tableName: 'noticias',
    timestamps: false,
});

export default Noticia;
