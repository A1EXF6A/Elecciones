import Noticia from '../models/newModel.js';

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

export { newsfavs };