import AppModel from "../models/AppModel.js"; // Asegúrate de importar tu modelo correctamente
import bcrypt from 'bcryptjs'; // Si vas a utilizar bcrypt para comparar contraseñas cifradas

const getUserByEmailAndPassword = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Verifica que se haya proporcionado al menos un dato de usuario (nombre de usuario o correo)
        if (!userName && !email) {
            throw new Error("Se debe enviar un correo o un nombre de usuario");
        }

        // Construir la cláusula WHERE para la búsqueda
        const whereClause = {};
        if (email) whereClause.cor_use = email;  // Si se proporciona un correo, añade al WHERE
        if (userName) whereClause.nom_use = userName;  // Si se proporciona un nombre de usuario, añade al WHERE

        // Buscar al usuario en la base de datos
        const user = await AppModel.findOne({
            where: whereClause, // Buscar por correo o nombre de usuario
        });

        // Si el usuario no es encontrado
        if (!user) {
            throw new Error("Usuario no encontrado o contraseña incorrecta");
        }

        // Verificar la contraseña (si está cifrada)
        // Si estás utilizando bcrypt para cifrar las contraseñas
        const isPasswordValid = await bcrypt.compare(password, user.pas_use);

        if (!isPasswordValid) {
            throw new Error("Contraseña incorrecta");
        }

        // Si la contraseña es válida, devolver el usuario
        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.nom_use,
                email: user.cor_use,
            },
            message: "Usuario autenticado correctamente",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            user: null,
            message: error.message || "Error al autenticar el usuario",
        });
    }
};

export { getUserByEmailAndPassword };
