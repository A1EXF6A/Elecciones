import Noticia from '../models/noticia.js';

// Obtener todas las noticias
export const obtenerNoticias = async (req, res) => {
    try {
        const noticias = await Noticia.findAll();
        res.status(200).json(noticias);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        res.status(500).json({ error: 'Error al obtener las noticias.' });
    }
};

// Crear una nueva noticia
export const crearNoticia = async (req, res) => {
    try {
        const { titulo_not, des_not, favorita } = req.body;
        const nuevaNoticia = await Noticia.create({ titulo_not, des_not, favorita: favorita || 0 });
        res.status(201).json(nuevaNoticia);
    } catch (error) {
        console.error('Error al crear la noticia:', error);
        res.status(500).json({ error: 'Error al crear la noticia.' });
    }
};

// Cambiar el estado de favorita de una noticia
export const cambiarFavorita = async (req, res) => {
    try {
        const { id_not } = req.params;
        const { favorita } = req.body;

        const noticia = await Noticia.findByPk(id_not);
        if (!noticia) {
            return res.status(404).json({ error: 'Noticia no encontrada.' });
        }

        noticia.favorita = favorita;
        await noticia.save();

        res.status(200).json(noticia);
    } catch (error) {
        console.error('Error al cambiar el estado de favorita:', error);
        res.status(500).json({ error: 'Error al cambiar el estado de favorita.' });
    }
};
