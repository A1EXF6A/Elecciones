import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import tipoEleccionRoutes from './routes/tipoEleccionRoutes.js';
import candidatoRoutes from './routes/candidatoRouters.js';
import propuestas from './routes/propuestaRoutes.js'
import adminRouter from './routes/adminRouter.js';
import eventos from './routes/eventoRouters.js';

dotenv.config();
const app = express();

// Configuración de CORS más específica
app.use(cors());

app.use(express.json());

app.use('/api/tipoEleccion', tipoEleccionRoutes);
app.use('/api/candidatos', candidatoRoutes);
app.use('/api/propuestas', propuestas);
app.use('/api/administradores', adminRouter);
// app.use('/api/eventos', eventos);
app.use('/api/eventos', eventos);

app.get('/test', (req, res) => {
    res.json({ message: 'Backend is running' });
});

const PORT = process.env.PORT;

try {
    await db.authenticate();
    console.log('Conexión establecida con la base de datos');

    // Sincronizar modelos con la base de datos
    await db.sync();
    console.log('Modelos sincronizados con la base de datos');

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Error al iniciar el servidor:', error);
}