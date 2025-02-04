import express from 'express';
import { addPropuesta, getAllPropuestas, getPropuestasFav, actualizarFavorita } from '../controllers/propuestasController.js';

const routerPro = express.Router();

routerPro.post('/', addPropuesta);
routerPro.get('/ver', getAllPropuestas);
routerPro.get('/favoritas', getPropuestasFav);
routerPro.patch('/:id', actualizarFavorita);

export default routerPro;
