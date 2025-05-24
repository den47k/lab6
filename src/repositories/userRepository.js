import db from "#db/config.js";

class UserRepository {
    static async createUser(username, hashedPassword, roleId) {
        const [result] = await db.query(
            "INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)",
            [username, hashedPassword, roleId]
        );
        return result.insertId;
    }

    static async findByUsername(username) {
        const [results] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        return results.length ? results[0] : null;
    }

    static async getAllUsers() {
      const [rows] = await db.query("SELECT * FROM users");
      return rows;
    }

    static async getUserById(id) {
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }

    static async updateUser(id, fields) {
        const validFields = Object.entries(fields).filter(([key, value]) => value !== undefined && value !== null);

        if (validFields.length === 0) {
            return false;
        }

        const setClause = validFields.map(([key]) => `${key} = ?`).join(", ");
        const values = validFields.map(([key, value]) => value);
        values.push(id); 

        const [result] = await db.query(
            `UPDATE users SET ${setClause} WHERE id = ?`,
            values
        );

        return result.affectedRows > 0; 
    }

    static async deleteUser(id) {
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}

export default UserRepository;
