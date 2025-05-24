import db from "#db/config.js";
import AttachmentsRepository from "./attachmentsRepository";

class PostRepository {
    static async createPost(title, content, userId) {
        const [result] = await db.query(
            "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
            [title, content, userId]
        );
        return result.insertId;
    }

    static async getPostById(postId) {
        const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [postId]);
        if (!rows.length) return null;
        const post = rows[0];
        post.attachments = await AttachmentsRepository.getAttachmentsByPostId(postId);
        return post;
    }

    static async getAllPosts() {
        const [rows] = await db.query("SELECT * FROM posts");
        for (const post of rows) {
            post.attachments = await AttachmentsRepository.getAttachmentsByPostId(post.id);
        }
        return rows;
    }

    static async updatePost(postId, title, content) {
        const [result] = await db.query(
            "UPDATE posts SET title = ?, content = ? WHERE id = ?",
            [title, content, postId]
        );
        return result.affectedRows > 0;
    }

    static async deletePost(postId) {
        const [result] = await db.query(
            "DELETE FROM posts WHERE id = ?",
            [postId]
        );
        return result.affectedRows > 0;
    }
}

export default PostRepository;
