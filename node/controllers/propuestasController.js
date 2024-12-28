import Propuesta from '../models/Propuesta.js';

// Método para agregar una nueva propuesta
export const agregarPropuesta = async (req, res) => {
    try {
        const { id_cand, titulo_pro, des_pro, publico_pro, favorita = 0 } = req.body;

        // Crear la nueva propuesta
        const nuevaPropuesta = await Propuesta.create({
            id_cand,
            titulo_pro,
            des_pro,
            publico_pro,
            favorita, // Valor predeterminado de 0 si no se proporciona
        });

        // Enviar la respuesta con la propuesta creada
        res.status(201).json(nuevaPropuesta);
    } catch (error) {
        console.error('Error al agregar la propuesta:', error);
        res.status(500).json({ error: 'Error al agregar la propuesta' });
    }
};

// Método para obtener todas las propuestas
export const obtenerPropuestas = async (req, res) => {
    try {
        const propuestas = await Propuesta.findAll(); // Obtener todas las propuestas
        res.status(200).json(propuestas); // Enviar la lista de propuestas
    } catch (error) {
        console.error('Error al obtener las propuestas:', error);
        res.status(500).json({ error: 'Error al obtener las propuestas' });
    }
};

// Método para actualizar el estado de favorita de una propuesta
export const actualizarFavorita = async (req, res) => {
    try {
        const { id } = req.params; // ID de la propuesta
        const { favorita } = req.body; // Nuevo valor para favorita

        const propuesta = await Propuesta.findByPk(id);
        if (!propuesta) {
            return res.status(404).json({ error: 'Propuesta no encontrada' });
        }

        propuesta.favorita = favorita;
        await propuesta.save();

        res.status(200).json(propuesta); // Enviar la propuesta actualizada
    } catch (error) {
        console.error('Error al actualizar favorita:', error);
        res.status(500).json({ error: 'Error al actualizar favorita' });
    }
};

