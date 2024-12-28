import express from 'express';
import { agregarEvento } from '../controllers/eventoController.js';

const router = express.Router();

// Ruta para agregar un nuevo evento
router.post('/', agregarEvento);

export default router;
