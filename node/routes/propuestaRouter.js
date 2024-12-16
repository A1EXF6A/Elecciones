// propuestaRouter.js
import express from 'express';
import { getAllPropuestas } from '../controllers/PropuestaController.js';

const router = express.Router();

// Ruta para obtener todas las propuestas
router.get('/', getAllPropuestas); 

export default router;
