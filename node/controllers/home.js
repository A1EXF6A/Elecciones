import Noticia from '../models/newModel.js';

export const getNoticiasFavoritas = async (req, res) => {
    try {

        const noticiasFavoritas = await Noticia.findAll({
            where: { favorita: 1 },
            attributes: ['titulo_not', 'des_not'],
        });


        if (noticiasFavoritas.length === 0) {
            return res.status(404).json({
                message: 'No hay noticias marcadas como favoritas.',
                data: [],
            });
        }

        res.status(200).json({
            message: 'Noticias favoritas obtenidas exitosamente.',
            data: noticiasFavoritas,
        });
    } catch (error) {
        console.error('Error al obtener las noticias favoritas:', error);
        res.status(500).json({
            message: 'Hubo un error al obtener las noticias favoritas.',
        });
    }
};
