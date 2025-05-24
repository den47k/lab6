import db from "#db/config.js";

class AttachmentsRepository {
    static async createAttachment(filename, path, postId) {
        const [result] = await db.query(
            "INSERT INTO attachments (filename, path, post_id) VALUES (?, ?, ?)",
            [filename, path, postId]
        );
        return result.insertId;
    }

    static async getAttachmentsByPostId(postId) {
        const [rows] = await db.query(
            "SELECT id, filename, path, created_at FROM attachments WHERE post_id = ?",
            [postId]
        );
        return rows;
    }

    static async getAttachmentById(attachmentId) {
        const [rows] = await db.query(
            "SELECT * FROM attachments WHERE id = ?",
            [attachmentId]
        );
        return rows.length ? rows[0] : null;
    }

    static async deleteAttachment(attachmentId) {
        const [result] = await db.query(
            "DELETE FROM attachments WHERE id = ?",
            [attachmentId]
        );
        return result.affectedRows > 0;
    }
}

export default AttachmentsRepository;