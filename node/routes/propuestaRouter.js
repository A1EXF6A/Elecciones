import express from 'express';
import { addPropuesta, getAllPropuestas, getPropuestasFav } from '../controllers/propuestasController.js';

const routerPro = express.Router();

routerPro.post('/', addPropuesta);
routerPro.get('/ver', getAllPropuestas);
routerPro.get('/favoritas', getPropuestasFav);

export default routerPro;
