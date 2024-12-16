// controllers/candidatoController.js
import Candidato from '../models/Candidatos.js';
import TipoEleccion from '../models/TipoEleccion.js';

// Función para obtener los candidatos por tipo de elección
export const getCandidatosPorTipo = async (req, res) => {
    try {
        const { tipoId } = req.params;
        const candidatos = await Candidato.findAll({
            where: { id_eleccion: tipoId }, 
            include: TipoEleccion,
        });
        res.json(candidatos);
    } catch (error) {
        console.error('Error al obtener los candidatos:', error);
        res.status(500).json({ error: 'Error al obtener los candidatos' });
    }
};

export const registerCandidato = async (req, res) => {
    try {
        const { nom1, nom2, ape1, ape2, id_eleccion, cargo } = req.body;
        const newCandidato = await Candidato.create({
            nom1,
            nom2,
            ape1,
            ape2,
            id_eleccion,
            cargo,
        });
        res.json(newCandidato);
    } catch (error) {
        console.error('Error al registrar el candidato:', error);
        res.status(500).json({ error: 'Error al registrar el candidato' + error });
    }
}
