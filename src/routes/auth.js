import { register, login } from "#controllers/authController.js";

async function authRoutes(fastify, options) {
    fastify.post("/auth/register", register);
    fastify.post("/auth/login", login);
}

export default authRoutes;