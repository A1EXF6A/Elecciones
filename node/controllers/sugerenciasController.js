import Sugerencia from '../models/sugerencia.js';

// Método para agregar una nueva sugerencia
export const agregarSugerencia = async (req, res) => {
    try {
        const { texto_sug, correo_usu_suge } = req.body;

        // Crear una nueva sugerencia
        const nuevaSugerencia = await Sugerencia.create({
            texto_sug,
            correo_usu_suge,
            visible: 1, // Las sugerencias son visibles por defecto
        });

        res.status(201).json(nuevaSugerencia); // Responder con la sugerencia creada
    } catch (error) {
        console.error('Error al agregar la sugerencia:', error);
        res.status(500).json({ error: 'Error al agregar la sugerencia' });
    }
};

// Método para obtener todas las sugerencias
export const obtenerSugerencias = async (req, res) => {
    try {
        const sugerencias = await Sugerencia.findAll(); // Obtener todas las sugerencias
        res.status(200).json(sugerencias); // Responder con la lista de sugerencias
    } catch (error) {
        console.error('Error al obtener las sugerencias:', error);
        res.status(500).json({ error: 'Error al obtener las sugerencias' });
    }
};

// Método para actualizar la visibilidad de una sugerencia
export const actualizarVisibilidad = async (req, res) => {
    try {
        const { id } = req.params; // ID de la sugerencia
        const { visible } = req.body; // Nuevo valor para visibilidad (1 o 0)

        const sugerencia = await Sugerencia.findByPk(id);
        if (!sugerencia) {
            return res.status(404).json({ error: 'Sugerencia no encontrada' });
        }

        sugerencia.visible = visible;
        await sugerencia.save();

        res.status(200).json(sugerencia); // Responder con la sugerencia actualizada
    } catch (error) {
        console.error('Error al actualizar visibilidad:', error);
        res.status(500).json({ error: 'Error al actualizar la visibilidad' });
    }
};
