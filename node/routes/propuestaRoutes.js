import express from 'express';
import { agregarPropuesta } from '../controllers/propuestasController.js';
import { getAllPropuestas } from '../controllers/PropuestaController.js';

const routerPro = express.Router();

routerPro.post('/', agregarPropuesta);
routerPro.get('/ver', getAllPropuestas);

export default routerPro;
