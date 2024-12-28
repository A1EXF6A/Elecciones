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
            model: 'candidatos', // Nombre de la tabla referenciada
            key: 'id_cand',
        },
        onDelete: 'CASCADE', // Acción al eliminar el candidato
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
}, {
    tableName: 'propuesta', // Nombre de la tabla en la base de datos
    timestamps: false, // No incluir columnas de tiempo (createdAt, updatedAt)
});

export default Propuesta;
