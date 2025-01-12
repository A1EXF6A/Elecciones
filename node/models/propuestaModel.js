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
        allowNull: false,
        references: {
            model: 'candidatos',
            key: 'id_cand',
        },
        onDelete: 'CASCADE',
    },
    titulo_pro: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    des_pro: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    publico_pro: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    favorita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    img_pro: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'propuestas',
    timestamps: false,
});

export default Propuesta;
