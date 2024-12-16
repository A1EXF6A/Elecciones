import Propuesta from "../models/Propuesta.js";

export const getAllPropuestas = async (req, res) => {
    try {
        console.log('Intentando obtener propuestas...');
        const propuestas = await Propuesta.findAll();

        console.log('Propuestas encontradas:', propuestas);

        if (!propuestas || propuestas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron propuestas' });
        }

        res.json(propuestas);
    } catch (error) {
        console.error('Error en getAllPropuestas:', error);
        res.status(500).json({ message: error.message });
    }
};