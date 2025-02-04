
import Evento from '../models/Evento.js'; // Modelo correspondiente a la tabla "eventos"

// Backend controller
export const agregarEvento = async (req, res) => {
    try {
        const { nom_eve, desc_eve, fec_eve } = req.body; // Match the frontend field names

        // Validate the fields
        if (!nom_eve || !desc_eve || !fec_eve) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Create the event
        const nuevoEvento = await Evento.create({ nom_eve, desc_eve, fec_eve });

        res.status(201).json({ mensaje: 'Evento agregado con éxito', evento: nuevoEvento });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el evento' });
    }
};


export const obtenerEventos = async (req, res) => {
    try {
        // Obtenemos todos los eventos
        const eventos = await Evento.findAll();

        if (!eventos || eventos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron eventos' });
        }

        res.status(200).json(eventos); // Respondemos con los eventos encontrados
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
};