import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import tipoEleccionRoutes from './routes/tipoEleccionRoutes.js';
import candidatoRoutes from './routes/candidatoRouter.js';
import routerPro from './routes/propuestaRouter.js';
import adminRouter from './routes/adminRouter.js';
import eventos from './routes/eventoRouter.js';
import routerNoticias from './routes/newsRouter.js';
import sugerencias from './routes/sugerenciasRoutes.js';
import home from './routes/homeRoute.js';
import bodyParser from 'body-parser'; // Importar body-parser

dotenv.config();
const app = express();

app.use(cors());

// Limitar el tamaño del cuerpo JSON a 10MB usando body-parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Rutas de la API
app.use('/api/tipoEleccion', tipoEleccionRoutes);
app.use('/api/candidatos', candidatoRoutes);
app.use('/api/propuestas', routerPro);
app.use('/api/administradores', adminRouter);
app.use('/api/eventos', eventos);
app.use('/api/sugerencias', sugerencias);
app.use('/api/noticias', routerNoticias);
app.use('/api/home', home);

app.get('/test', (req, res) => {
    res.json({ message: 'Backend is running' });
});

const PORT = process.env.PORT;

try {
    await db.authenticate();
    console.log('Conexión establecida con la base de datos');

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Error al iniciar el servidor:', error);
}
