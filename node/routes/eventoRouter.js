import express from 'express';
import { agregarEvento, obtenerEventos } from '../controllers/eventoController.js';

const router = express.Router();

// Ruta para agregar un nuevo evento
router.post('/', agregarEvento);
router.get('/eve', obtenerEventos);

export default router;
