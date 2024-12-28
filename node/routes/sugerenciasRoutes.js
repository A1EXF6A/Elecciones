import express from 'express';
import { agregarSugerencia, obtenerSugerencias, actualizarVisibilidad } from '../controllers/sugerenciasController.js';

const routerSug = express.Router();

// Ruta para agregar una nueva sugerencia
routerSug.post('/', agregarSugerencia);

// Ruta para obtener todas las sugerencias
routerSug.get('/', obtenerSugerencias);

// Ruta para actualizar la visibilidad de una sugerencia
routerSug.patch('/:id', actualizarVisibilidad);

export default routerSug;
