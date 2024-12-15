import express from 'express';
import { getTipoElecciones } from '../controllers/tipoEleccionController.js';

const router = express.Router();

// Ruta para obtener los tipos de elecciones
router.get('/', getTipoElecciones);

export default router;
