import Propuesta from '../models/Propuesta.js';


export const agregarPropuesta = async (req, res) => {
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
        console.error('Error al agregar la propuesta:', error);
        res.status(500).json({ error: 'Error al agregar la propuesta' });
    }
};


export const obtenerPropuestas = async (req, res) => {
    try {
        const propuestas = await Propuesta.findAll();
        res.status(200).json(propuestas);
    } catch (error) {
        console.error('Error al obtener las propuestas:', error);
        res.status(500).json({ error: 'Error al obtener las propuestas' });
    }
};


export const actualizarFavorita = async (req, res) => {
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

