import { Router } from 'express';
import { getNoticiasFavoritas } from '../controllers/home.js';

const router = Router();

// Ruta para obtener las noticias favoritas
router.get('/fav', getNoticiasFavoritas);

export default router;
