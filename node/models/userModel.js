import db from '../database/db.js';

const getUserByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE nom_use = ?', [username]);
    return rows[0];
};

export { getUserByUsername };
