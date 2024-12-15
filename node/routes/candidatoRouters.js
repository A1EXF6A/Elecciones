// routers/candidatoRoutes.js
import express from 'express';
import { getCandidatosPorTipo } from '../controllers/candidatoController.js';
import { registerCandidato } from '../controllers/candidatoController.js';

const router = express.Router();

router.get('/:tipoId', getCandidatosPorTipo);
router.post('/register', registerCandidato);

export default router;
