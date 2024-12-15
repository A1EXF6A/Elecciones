import TipoEleccion from '../models/TipoEleccion.js';

// Función para obtener todos los tipos de elecciones
export const getTipoElecciones = async (req, res) => {
    try {
        const tipoElecciones = await TipoEleccion.findAll();
        if (tipoElecciones.length === 0) {
            return res.status(404).json({ message: 'No hay tipos de elecciones disponibles' });
        }
        res.json(tipoElecciones);
    } catch (error) {
        console.error('Error al obtener tipos de elecciones:', error);
        res.status(500).json({ error: 'Error al obtener tipos de elecciones' });
    }
};

