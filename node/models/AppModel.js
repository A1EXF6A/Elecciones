import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const AppModel = sequelize.define('Users', {
    id_use: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_use: { type: DataTypes.STRING },
    cor_use: { type: DataTypes.STRING },
    pas_use: { type: DataTypes.STRING },
    vot_use: { type: DataTypes.TINYINT },
}, {
    timestamps: false
})

export default AppModel;