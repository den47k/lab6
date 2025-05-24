import CommentRepository from "#repositories/commentRepository.js";

export const createComment = async (req, reply) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;
        const userId = req.user.id;

        if (!content || !postId) {
            return reply.status(400).send({ message: "Content and post ID are required" });
        }

        const commentId = await CommentRepository.createComment(content, userId, postId);
        reply.send({ message: "Comment created successfully", commentId });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const getCommentsByPost = async (req, reply) => {
    try {
        const { postId } = req.params;
        const comments = await CommentRepository.getCommentsByPostId(postId);
        reply.send(comments);
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const deleteComment = async (req, reply) => {
    try {
        const { id } = req.params;
        const { id: userId, permissions } = req.user;

        const comment = await CommentRepository.getCommentById(id);
        if (!comment) {
            return reply.status(404).send({ message: "Comment not found" });
        }

        const isAdmin = permissions.includes('delete_any_comment');
        const isOwner = comment.user_id === userId;

        if (!isAdmin && !(isOwner && permissions.includes('delete_own_comment'))) {
            return reply.status(403).send({ message: "Unauthorized to delete this comment" });
        }

        await CommentRepository.deleteComment(id);
        reply.send({ message: "Comment deleted successfully" });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};