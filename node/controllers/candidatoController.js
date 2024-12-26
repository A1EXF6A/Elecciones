// controllers/candidatoController.js
import Candidato from '../models/Candidatos.js';
import TipoEleccion from '../models/TipoEleccion.js';

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
        const { cargo1, cargo2, id_eleccion, eslogan } = req.body;
        const newCandidato = await Candidato.create({
            nom_can: cargo1,
            nom_can2: cargo2,
            id_eleccion: id_eleccion,
            eslogan_can: eslogan
        });
        
        res.json(newCandidato);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el candidato' + error});
    }
}


