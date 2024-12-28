import express from 'express';
import { agregarPropuesta, obtenerPropuestas, actualizarFavorita } from '../controllers/propuestasController.js';

const routerPro = express.Router();
routerPro.post('/', agregarPropuesta);
routerPro.get('/', obtenerPropuestas);
routerPro.patch('/:id', actualizarFavorita);

export default routerPro;
