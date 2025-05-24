import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "#controllers/userController.js";
import { isAuthenticated, hasPermission } from "#middlewares/authMiddleware.js";

async function userRoutes(fastify, options) {
    fastify.get("/user", getAllUsers);

    fastify.get("/user/:id", getUserById);

    fastify.post("/user", { preHandler: [isAuthenticated, hasPermission('create_user')] }, createUser);

    fastify.put("/user/:id", { preHandler: [isAuthenticated, hasPermission(['modify_any_user', 'modify_own_user'])] }, updateUser);
    
    fastify.delete("/user/:id", { preHandler: [isAuthenticated, hasPermission(['modify_any_user', 'modify_own_user'])] }, deleteUser);
}

export default userRoutes;
