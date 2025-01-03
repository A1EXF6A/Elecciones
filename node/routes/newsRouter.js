import express from 'express';
import { getAllNewsFav, obtenerNoticias, crearNoticia, cambiarFavorita } from '../controllers/newsController.js';

const routerNoticias = express.Router();

routerNoticias.get('/favoritas', getAllNewsFav);
routerNoticias.get('/', obtenerNoticias);

routerNoticias.post('/', crearNoticia);

routerNoticias.patch('/:id_not', cambiarFavorita);

export default routerNoticias;
