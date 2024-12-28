import express from 'express';
import { getAllNewsFav } from '../controllers/newsController.js';

const routerNoticias = express.Router();

routerNoticias.get('/favoritas', getAllNewsFav);

export default routerNoticias;
