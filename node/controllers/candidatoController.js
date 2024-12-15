// controllers/candidatoController.js
import Candidato from '../models/Candidatos.js';
import TipoEleccion from '../models/TipoEleccion.js';

// Función para obtener los candidatos por tipo de elección
export const getCandidatosPorTipo = async (req, res) => {
    try {
        const { tipoId } = req.params; // Obtener el tipo de elección desde los parámetros de la URL
        const candidatos = await Candidato.findAll({
            where: { id_eleccion: tipoId },  // Filtrar por el id de elección
            include: TipoEleccion,  // Incluir el tipo de elección relacionado
        });
        res.json(candidatos);  // Enviar los datos de los candidatos
    } catch (error) {
        console.error('Error al obtener los candidatos:', error);
        res.status(500).json({ error: 'Error al obtener los candidatos' });
    }
};
