import Noticia from "../models/newModel.js";

const getAllNewsFav = async (req, res) => {
    try {
        const noticias = await Noticia.findAll({
            where: { favorita: 1 },
            limit: 3,
        });

        if (!noticias || noticias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron noticias' });
        }

        res.json({ data: noticias });
    } catch (error) {
        console.error('Error en getAllNoticiasFav:', error);
        res.status(500).json({ message: error.message });
    }
};

const obtenerNoticias = async (req, res) => {
    try {
        const noticias = await Noticia.findAll();
        res.status(200).json(noticias);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        res.status(500).json({ error: 'Error al obtener las noticias.' });
    }
};



const cambiarFavorita = async (req, res) => {
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

const crearNoticia = async (req, res) => {
    try {
        const { titulo_not, des_not, favorita } = req.body;

        // Validar campos requeridos
        if (!titulo_not || !des_not) {
            return res.status(400).json({ error: 'Título y descripción son obligatorios.' });
        }

        // Crear noticia sin fecha
        const nuevaNoticia = await Noticia.create({
            titulo_not,
            des_not,
            favorita: favorita || 0, // Valor predeterminado
        });

        res.status(201).json({ message: 'Noticia creada con éxito', noticia: nuevaNoticia });
    } catch (error) {
        console.error('Error al crear la noticia:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

export { getAllNewsFav, obtenerNoticias, crearNoticia, cambiarFavorita };