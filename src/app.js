import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv";

import authRoutes from "#routes/auth.js";
import userRoutes from "#routes/user.js";
import postRoutes from "#routes/post.js";
import commentRoutes from "#routes/comment.js";
import datasetRoutes from "#routes/dataset.js";
import { auditLogger } from "#middlewares/auditMiddleware.js";

dotenv.config();

const fastify = Fastify({ logger: true });

// Register Plugins
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET });
fastify.register(fastifyCors);

// Logger middleware
auditLogger(fastify);

// Register Routes
fastify.register(authRoutes, { prefix: "/api" });
fastify.register(userRoutes, { prefix: "/api" });
fastify.register(postRoutes, { prefix: "/api" });
fastify.register(commentRoutes, { prefix: "/api" });
fastify.register(datasetRoutes, { prefix: "/api" });

// Export the Fastify instance
export default fastify;

// Start Server
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT || 5000 });
        console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
