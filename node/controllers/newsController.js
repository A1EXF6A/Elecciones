import Noticia from "../models/NewModel.js";

const getAllNewsFav = async (req, res) => {
    try {
        const noticias = await Noticia.findAll({
            where: { favorita: 1 }
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

export { getAllNewsFav };