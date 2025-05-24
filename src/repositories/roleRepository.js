import db from "#db/config.js";

class RoleRepository {
    static async findByName(name) {
        const [rows] = await db.query(
            "SELECT * FROM roles WHERE name = ?",
            [name]
        );
        return rows[0] || null;
    }

    static async getPermissionsByRoleId(roleId) {
        const [rows] = await db.query(`
            SELECT p.name 
            FROM role_permissions rp
            JOIN permissions p ON rp.permission_id = p.id
            WHERE rp.role_id = ?
        `, [roleId]);
        return rows.map(row => row.name);
    }

    static async getRoleById(roleId) {
        const [rows] = await db.query(
            "SELECT * FROM roles WHERE id = ?",
            [roleId]
        );
        return rows.length ? rows[0] : null;
    }
}

export default RoleRepository;