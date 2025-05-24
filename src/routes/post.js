import { createPost, getAllPosts, getPostById, updatePost, deletePost, addAttachment, deleteAttachment } from "#controllers/postController";
import { isAuthenticated, hasPermission } from "#middlewares/authMiddleware.js";

async function postRoutes(fastify, options) {
    fastify.get("/post", {
        handler: getAllPosts
    });

    fastify.get("/post/:id", {
        config: { audit: { entity: 'post' } },
        handler: getPostById
    });

    fastify.post("/post", {
        preHandler: isAuthenticated,
        handler: createPost
    });

    fastify.put("/post/:id", { 
        config: { audit: { entity: 'post' } },
        preHandler: [isAuthenticated, hasPermission(['update_any_post', 'update_own_post'])],
        handler: updatePost
    });

    fastify.delete("/post/:id", { 
        config: { audit: { entity: 'post' } },
        preHandler: [isAuthenticated, hasPermission(['delete_any_post', 'delete_own_post'])],
        handler: deletePost
    });

    fastify.post("/post/:postId/attachments", { 
        preHandler: [isAuthenticated, hasPermission(['update_any_post', 'update_own_post'])],
        handler: addAttachment
    });

    fastify.delete("/post/:postId/attachments/:attachmentId", { 
        config: { audit: { entity: 'attachment', idParam: 'attachmentId' } },
        preHandler: [isAuthenticated, hasPermission(['update_any_post', 'update_own_post'])],
        handler: deleteAttachment
    });
}

export default postRoutes;
