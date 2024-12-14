import express from 'express';
import { getUserByEmailAndPassword } from '../controllers/authController.js'; // Asegúrate de importar el controlador correctamente

const router = express.Router();

// Ruta de login para administradores
router.post('/', getUserByEmailAndPassword);

export default router;
