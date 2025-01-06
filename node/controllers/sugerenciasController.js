import Sugerencia from '../models/sugerencia.js';


export const agregarSugerencia = async (req, res) => {
    try {
        const { texto_sug, correo_usu_suge } = req.body;


        const nuevaSugerencia = await Sugerencia.create({
            texto_sug,
            correo_usu_suge,
            visible: 1,
        });

        res.status(201).json(nuevaSugerencia);
    } catch (error) {
        console.error('Error al agregar la sugerencia:', error);
        res.status(500).json({ error: 'Error al agregar la sugerencia' });
    }
};


export const obtenerSugerencias = async (req, res) => {
    try {
        const sugerencias = await Sugerencia.findAll();
        res.status(200).json(sugerencias);
    } catch (error) {
        console.error('Error al obtener las sugerencias:', error);
        res.status(500).json({ error: 'Error al obtener las sugerencias' });
    }
};


export const actualizarVisibilidad = async (req, res) => {
    try {
        const { id_sug } = req.params;
        const { visible } = req.body;

        const sugerencia = await Sugerencia.findByPk(id_sug);
        if (!sugerencia) {
            return res.status(404).json({ error: 'Sugerencia no encontrada' });
        }

        sugerencia.visible = visible;
        await sugerencia.save();

        res.status(200).json(sugerencia);
    } catch (error) {
        console.error('Error al actualizar visibilidad:', error);
        res.status(500).json({ error: 'Error al actualizar la visibilidad' });
    }
};
