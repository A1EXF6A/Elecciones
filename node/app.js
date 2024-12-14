import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import userRouter from './routes/router.js';
import propuestaRouter from './routes/propuestaRouter.js';
import authRouter from './routes/authRouter.js'; // Importa las rutas de autenticación

dotenv.config();
const app = express();

// Configuración de CORS más específica
app.use(cors({
    origin: 'http://localhost:5173', // Puerto donde corre tu app de React+Vite
    credentials: true
}));

app.use(express.json());

// Rutas
//app.use('/users', userRouter);
app.use('/propuestas', propuestaRouter);
app.use('/users', authRouter); // Ruta de autenticación para administradores

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