import { isAuthenticated, hasPermission } from "#middlewares/authMiddleware.js";
import { getCommentsByPost, createComment, deleteComment } from "#controllers/commentController";

async function commentRoutes(fastify, options) {
    fastify.get("/post/:postId/comment", {
        handler: getCommentsByPost
    });

    fastify.post("/post/:postId/comment", {
        preHandler: isAuthenticated,
        handler: createComment
    });

    fastify.delete("/comment/:id", {
        config: { audit: { entity: 'comment' } },
        preHandler: [isAuthenticated, hasPermission(['delete_any_comment', 'delete_own_comment'])],
        handler: deleteComment
    });
}

export default commentRoutes;