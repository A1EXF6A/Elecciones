import db from '../database/db.js';  // Usamos import en lugar de require

const getUserByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE nom_use = ?', [username]);
    return rows[0]; // Devuelve el primer usuario encontrado
};

export { getUserByUsername };  // Usamos export en lugar de module.exports
