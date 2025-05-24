import db from "#db/config.js";

class CommentRepository {
    static async createComment(content, userId, postId) {
        const [result] = await db.query(
            "INSERT INTO comments (content, user_id, post_id) VALUES (?, ?, ?)",
            [content, userId, postId]
        );
        return result.insertId;
    }

    static async getCommentsByPostId(postId) {
        const [rows] = await db.query(`
            SELECT c.*, u.username 
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.created_at DESC
        `, [postId]);
        return rows;
    }

    static async deleteComment(commentId) {
        const [result] = await db.query(
            "DELETE FROM comments WHERE id = ?",
            [commentId]
        );
        return result.affectedRows > 0;
    }

    static async getCommentById(commentId) {
        const [rows] = await db.query(
            "SELECT * FROM comments WHERE id = ?",
            [commentId]
        );
        return rows[0] || null;
    }
}

export default CommentRepository;