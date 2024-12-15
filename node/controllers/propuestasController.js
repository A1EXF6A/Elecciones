import Propuesta from '../models/Propuesta.js';

export const agregarPropuesta = async (req, res) => {
    try {
        const { id_cand, nom_pro, des_pro, publico } = req.body;

        // Crear la nueva propuesta
        const nuevaPropuesta = await Propuesta.create({
            id_cand,
            nom_pro,
            des_pro,
            publico,
        });

        // Enviar la respuesta con la propuesta creada
        res.status(201).json(nuevaPropuesta);
    } catch (error) {
        console.error('Error al agregar la propuesta:', error);
        res.status(500).json({ error: 'Error al agregar la propuesta' });
    }
};
