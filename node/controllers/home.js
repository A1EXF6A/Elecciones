import Noticia from '../models/newModel.js';
import Evento from '../models/Evento.js';
import Propuesta from '../models/propuestaModel.js';
import { Op } from 'sequelize';

const newsfavs = async (req, res) => {
    try {

        const noticias = await Noticia.findAll({
            where: { favorita: 1 },
            attributes: ['titulo_not', 'des_not'],
        });

        if (!noticias || noticias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron noticias favoritas.' });
        }

        res.json({ data: noticias });
    } catch (error) {
        console.error('Error en getAllNewsFav:', error);
        res.status(500).json({ message: 'Hubo un error al obtener las noticias favoritas.' });
    }
};

const getEventosProximos = async (req, res) => {
    try {
        // Obtener la fecha actual
        const fechaActual = new Date().toISOString().split('T')[0]; // Solo la parte de la fecha (YYYY-MM-DD)

        // Consulta para obtener eventos futuros
        const eventos = await Evento.findAll({
            where: {
                fec_eve: {
                    [Op.gte]: fechaActual, // Filtra eventos cuya fecha sea mayor o igual a la actual
                },
            },
            attributes: ['nom_eve', 'desc_eve', 'fec_eve'],
            order: [['fec_eve', 'ASC']], // Ordenar por fecha ascendente
        });

        if (!eventos || eventos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron eventos próximos.' });
        }

        res.json({ data: eventos });
    } catch (error) {
        console.error('Error en getEventosProximos:', error);
        res.status(500).json({ message: 'Hubo un error al obtener los eventos próximos.' });
    }
};

const getPropuestasFav = async (req, res) => {
    try {
        const propuestas = await Propuesta.findAll({
            where: { favorita: 1 },
            attributes: ['titulo_pro', 'des_pro'] // Seleccionamos solo el título y la descripción
        });

        if (!propuestas || propuestas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron propuestas favoritas.' });
        }

        res.json({ data: propuestas });
    } catch (error) {
        console.error('Error en getPropuestasFav:', error);
        res.status(500).json({ message: 'Error al obtener propuestas favoritas: ' + error.message });
    }
};

export { newsfavs, getEventosProximos, getPropuestasFav };