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

// Función para crear un tipo de elección
export const agregarTipoEleccion = async (req, res) => {
    try {
        const { nombre_eleccion, descripcion } = req.body; // Coincide con los datos enviados desde el frontend

        // Validación de los datos
        if (!nombre_eleccion || !descripcion) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Crear el nuevo tipo de elección
        const nuevoTipoEleccion = await TipoEleccion.create({
            nombre_eleccion,
            descripcion,
        });

        res.status(201).json({
            message: 'Tipo de elección agregado con éxito',
            tipoEleccion: nuevoTipoEleccion,
        });
    } catch (error) {
        console.error('Error al agregar el tipo de elección:', error);
        res.status(500).json({ error: 'Error al agregar el tipo de elección' });
    }
};

