import PostRepository from "#repositories/postRepository.js";
import AttachmentsRepository from "#repositories/attachmentsRepository.js";

export const createPost = async (req, reply) => {
    try {
        const { title, content, attachments } = req.body;
        const userId = req.user.id;

        if (!title || !content) {
            return reply.status(400).send({ message: "Title and content are required" });
        }

        const postId = await PostRepository.createPost(title, content, userId);

        if (attachments && Array.isArray(attachments)) {
            for (const { filename, path } of attachments) {
                if (filename && path) {
                    await AttachmentsRepository.createAttachment(filename, path, postId);
                }
            }
        }

        reply.send({ message: "Post created successfully!", postId });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const getAllPosts = async (req, reply) => {
    try {
        const posts = await PostRepository.getAllPosts();
        reply.send(posts);
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const getPostById = async (req, reply) => {
    try {
        const { id } = req.params;
        const post = await PostRepository.getPostById(id);

        if (!post) {
            return reply.status(404).send({ message: "Post not found" });
        }

        reply.send(post);
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const updatePost = async (req, reply) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const { id: userId, permissions } = req.user;
        
        if (!title || !content) {
            return reply.status(400).send({ message: "Title and content are required" });
        }

        const post = await PostRepository.getPostById(id);
        if (!post) {
            return reply.status(404).send({ message: "Post not found" });
        }

        const isAdminUpdate = permissions.includes('update_any_post');
        const isOwnUpdate = post.user_id === userId && permissions.includes('update_own_post');

        if (!isAdminUpdate && !isOwnUpdate) {
            return reply.status(403).send({ message: "Forbidden: Insufficient permissions to update this post" });
        }

        await PostRepository.updatePost(id, title, content);
        reply.send({ message: "Post updated successfully!" });

    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const deletePost = async (req, reply) => {
    try {
        const { id } = req.params;
        const { id: userId, permissions } = req.user;

        const post = await PostRepository.getPostById(id);
        if (!post) {
            return reply.status(404).send({ message: "Post not found" });
        }

        const isAdminDelete = permissions.includes('delete_any_post');
        const isOwnDelete = post.user_id === userId && permissions.includes('delete_own_post');

        if (!isAdminDelete && !isOwnDelete) {
            return reply.status(403).send({ message: "Unauthorized: You can only delete your own posts" });
        }

        await PostRepository.deletePost(id);
        reply.send({ message: "Post deleted successfully!" });

    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const addAttachment = async (req, reply) => {
    try {
        const { postId } = req.params;
        const { filename, path } = req.body;
        const { id: userId, permissions } = req.user;

        const post = await PostRepository.getPostById(postId);
        if (!post) {
            return reply.status(404).send({ message: "Post not found" });
        }

        const isAdmin = permissions.includes('update_any_post');
        const isOwner = post.user_id === userId && permissions.includes('update_own_post');

        if (!isAdmin && !isOwner) {
            return reply.status(403).send({ message: "Insufficient permissions" });
        }

        const attachmentId = await AttachmentsRepository.createAttachment(filename, path, postId);
        reply.send({ message: "Attachment added", attachmentId });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const deleteAttachment = async (req, reply) => {
    try {
        const { postId, attachmentId } = req.params;
        const { id: userId, permissions } = req.user;

        const post = await PostRepository.getPostById(postId);
        if (!post) {
            return reply.status(404).send({ message: "Post not found" });
        }

        const attachment = await AttachmentsRepository.getAttachmentById(attachmentId);
        if (!attachment || attachment.post_id !== parseInt(postId)) {
            return reply.status(404).send({ message: "Attachment not found" });
        }

        const isAdmin = permissions.includes('update_any_post');
        const isOwner = post.user_id === userId && permissions.includes('update_own_post');

        if (!isAdmin && !isOwner) {
            return reply.status(403).send({ message: "Insufficient permissions" });
        }

        await AttachmentsRepository.deleteAttachment(attachmentId);
        reply.send({ message: "Attachment deleted" });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};
