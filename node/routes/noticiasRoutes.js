import express from 'express';
import { obtenerNoticias, crearNoticia, cambiarFavorita } from '../controllers/noticiasController.js';

const routerNot = express.Router();

// Ruta para obtener todas las noticias
routerNot.get('/', obtenerNoticias);

// Ruta para crear una nueva noticia
routerNot.post('/', crearNoticia);

// Ruta para cambiar el estado de favorita de una noticia
routerNot.patch('/:id_not', cambiarFavorita);

export default routerNot;
