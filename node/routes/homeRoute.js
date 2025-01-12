import express from 'express';
import { newsfavs } from '../controllers/home.js';

const routerNoticias = express.Router();

routerNoticias.get('/fav', newsfavs);


export default routerNoticias
