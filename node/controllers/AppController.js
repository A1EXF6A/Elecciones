import AppModel from "../models/AppModel.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await AppModel.findAll()
        res.json(users)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        await AppModel.create(req.body)
        res.json({ success: true, message: 'Usuario creado' })
    } catch (error) {
        res.json({ success: false, message: "Error: " + error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await AppModel.findByPk(req.params.id)

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        res.json({ success: true, user: user, message: "Usuario encontrado" })
    } catch (error) {
        res.json({ success: false, user: null, message: "Error: " + error.message })
    }
}

const getUserByEmailAndPassword = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        const whereClause = {};
        whereClause.pas_use = password;

        if (!userName && !email) {
            throw new Error("Se debe enviar un correo o un nombre de usuario");
        }

        if (email) whereClause.cor_use = email;
        if (userName) whereClause.nom_use = userName;

        const user = await AppModel.findOne({
            where: whereClause,
        });

        if (!user) {
            throw new Error("Usuario no encontrado");
            return;
        }

        res.json({ success: true, user: user, message: "Usuario encontrado" });
    } catch (error) {
        res.json({ success: false, user: null, message: "Error: " + error.message })
    }
}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { vot_use } = req.body;

        if (vot_use === undefined) {
            return res.status(400).json({
                success: false,
                message: 'El voto es obligatorio',
            });
        }

        const user = await AppModel.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        await user.update({ vot_use });

        res.json({
            success: true,
            message: 'Usuario actualizado correctamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el usuario: ' + error.message,
        });
    }
};


export { getAllUsers, createUser, getUserById, getUserByEmailAndPassword, updateUserById }