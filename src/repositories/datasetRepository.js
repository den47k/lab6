import db from "#db/config.js";

class DatasetRepository {
    static async createDataset(name, description, query) {
        const [result] = await db.query(
            "INSERT INTO datasets (name, description, query) VALUES (?, ?, ?)",
            [name, description, query]
        );
        return result.insertId;
    }

    static async getDatasetById(id) {
        const [rows] = await db.query("SELECT * FROM datasets WHERE id = ?", [id]);
        return rows[0] || null;
    }

    static async getAllDatasets() {
        const [rows] = await db.query("SELECT * FROM datasets");
        return rows;
    }

    static async updateDataset(id, updates) {
        const fields = [];
        const values = [];

        Object.entries(updates).forEach(([key, value]) => {
            fields.push(`${key} = ?`);
            values.push(value);
        });

        values.push(id);

        const [result] = await db.query(
            `UPDATE datasets SET ${fields.join(", ")} WHERE id = ?`,
            values
        );
        return result.affectedRows > 0;
    }

    static async deleteDataset(id) {
        const [result] = await db.query("DELETE FROM datasets WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}

export default DatasetRepository;
