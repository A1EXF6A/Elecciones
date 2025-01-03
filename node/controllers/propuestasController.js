import Propuesta from '../models/propuestaModel.js';

const addPropuesta = async (req, res) => {
    try {
        const { id_cand, titulo_pro, des_pro, publico_pro, favorita = 0 } = req.body;

        const nuevaPropuesta = await Propuesta.create({
            id_cand,
            titulo_pro,
            des_pro,
            publico_pro,
            favorita,
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

const actualizarFavorita = async (req, res) => {
    try {
        const { id } = req.params;
        const { favorita } = req.body;

        const propuesta = await Propuesta.findByPk(id);
        if (!propuesta) {
            return res.status(404).json({ error: 'Propuesta no encontrada' });
        }

        propuesta.favorita = favorita;
        await propuesta.save();

        res.status(200).json(propuesta);
    } catch (error) {
        console.error('Error al actualizar favorita:', error);
        res.status(500).json({ error: 'Error al actualizar favorita' });
    }
};

export { addPropuesta, getAllPropuestas, getPropuestasFav, actualizarFavorita };

