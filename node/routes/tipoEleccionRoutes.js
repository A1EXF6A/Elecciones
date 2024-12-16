import express from 'express';
import { getTipoElecciones, agregarTipoEleccion } from '../controllers/tipoEleccionController.js';

const router = express.Router();

// Ruta para obtener los tipos de elecciones
router.get('/', getTipoElecciones);

// Ruta para crear un tipo de elección
router.post('/', agregarTipoEleccion);

export default router;

