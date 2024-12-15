// routers/candidatoRoutes.js
import express from 'express';
import { getCandidatosPorTipo } from '../controllers/candidatoController.js';

const router = express.Router();

// Ruta para obtener los candidatos por tipo de elección
router.get('/:tipoId', getCandidatosPorTipo); // El tipo de elección se pasa como parámetro

export default router;
