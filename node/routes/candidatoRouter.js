// routers/candidatoRoutes.js
import express from 'express';
import { registerCandidato, registerVote, getCandidatosPorTipo } from '../controllers/candidatoController.js';

const router = express.Router();

router.get('/:tipoId', getCandidatosPorTipo);
router.post('/register', registerCandidato);
router.post('/vote', registerVote);

export default router;
