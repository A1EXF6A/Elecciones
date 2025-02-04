import Admin from "../models/adminModel.js";

const getAdminByEmailAndPassword = async (req, res) => {
    try {
        const { userName, password } = req.body

        const whereClause = {};
        whereClause.usuario = userName;
        whereClause.contraseña = password;

        const user = await Admin.findOne({
            where: whereClause,
        });

        if (!user) {
            throw new Error("Admin no encontrado");
        }

        res.json({ success: true, user: user, message: "Admin encontrado" });
    } catch (error) {
        res.json({ success: false, user: null, message: "Error: " + error.message })
    }
}

export default getAdminByEmailAndPassword;