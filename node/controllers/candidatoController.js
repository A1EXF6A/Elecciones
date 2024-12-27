import Candidato from '../models/Candidatos.js';

const getCandidatosPorTipo = async (req, res) => {
    try {
        const { tipoId } = req.params;
        const candidatos = await Candidato.findAll({
            where: { id_eleccion: tipoId }
        });
        res.json({ success: true, data: candidatos });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los candidatos' });
    }
};

const registerVote = async (req, res) => {
    try {
        const { partido_id } = req.body;
        const candidato = await Candidato.findByPk(partido_id);
        if (!candidato) {
            return res.status(404).json({ success: false, message: 'Candidato no encontrado' });
        }

        candidato.num_votos = candidato.num_votos + 1;
        await candidato.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al votar por el candidato' });
    }
};

const registerCandidato = async (req, res) => {
    try {
        const { nomCan, cargoCan, nomCan2, cargoCan2, id_eleccion, eslogan, imgCan1, imgCan2 } = req.body;
        const newCandidato = await Candidato.create({
            nom_can: nomCan,
            cargo_can: cargoCan,
            img_can: imgCan1,
            nom_can2: nomCan2,
            cargo_can2: cargoCan2,
            img_can2: imgCan2,
            eslogan_can: eslogan,
            id_eleccion: id_eleccion,
        });

        res.json(newCandidato);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el candidato' + error });
    }
}

export { getCandidatosPorTipo, registerCandidato, registerVote}

