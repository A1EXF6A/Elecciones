import express from 'express';
import { getTipoElecciones } from '../controllers/tipoEleccionController.js';

const router = express.Router();

router.get('/', getTipoElecciones);

export default router;

