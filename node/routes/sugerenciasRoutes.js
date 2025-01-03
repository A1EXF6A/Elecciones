import express from 'express';
import { agregarSugerencia, obtenerSugerencias, actualizarVisibilidad } from '../controllers/sugerenciasController.js';

const routerSug = express.Router();


routerSug.post('/', agregarSugerencia);


routerSug.get('/', obtenerSugerencias);


routerSug.patch('/:id_sug', actualizarVisibilidad);

export default routerSug;
