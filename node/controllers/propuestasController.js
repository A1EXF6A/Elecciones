import { where } from 'sequelize';
import Propuesta from '../models/propuestaModel.js';

const addPropuesta = async (req, res) => {
    try {
        const { id_cand, nom_pro, des_pro, publico } = req.body;

        const nuevaPropuesta = await Propuesta.create({
            id_cand,
            nom_pro,
            des_pro,
            publico,
        });

        res.status(201).json(nuevaPropuesta);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la propuesta:' + error });
    }
};

const getAllPropuestas = async (req, res) => {
    try {
        const propuestas = await Propuesta.findAll();

        if (!propuestas || propuestas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron propuestas'});
        }

        res.json(propuestas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPropuestasFav = async (req, res) => {
    try {
        const propuestas = await Propuesta.findAll({
            where: { favorita: 1 }
        });

        if (!propuestas || propuestas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron propuestas favoritas.' });
        }

        res.json({ data: propuestas });
    } catch (error) {
        console.error('Error en getAllNoticiasFav:', error);
        res.status(500).json({ message: error });
    }
};

export { addPropuesta, getAllPropuestas, getPropuestasFav };
