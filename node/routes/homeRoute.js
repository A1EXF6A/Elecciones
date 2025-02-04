import express from 'express';
import { newsfavs, getEventosProximos, getPropuestasFav } from '../controllers/home.js';

const routerNoticias = express.Router();

routerNoticias.get('/notfav', newsfavs);
routerNoticias.get('/cer', getEventosProximos);
routerNoticias.get('/profav', getPropuestasFav);

export default routerNoticias
