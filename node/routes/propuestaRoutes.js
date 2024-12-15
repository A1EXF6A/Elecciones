import express from 'express';
import { agregarPropuesta } from '../controllers/propuestasController.js';

const router = express.Router();

// Ruta para agregar una nueva propuesta
router.post('/', agregarPropuesta);

export default router;
