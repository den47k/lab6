import bcrypt from "bcrypt";
import UserRepository from "#repositories/userRepository.js";
import RoleRepository from "#repositories/roleRepository.js";

import fastify from "#app.js";

export const register = async (req, reply) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return reply.status(400).send({ message: "Username and password are required" });
        }

        const existingUser = await UserRepository.findByUsername(username);
        if (existingUser) {
            return reply.status(409).send({ message: "Username is already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRole = await RoleRepository.findByName('user');
        if (!userRole) throw new Error('Default user role not found');

        const userId = await UserRepository.createUser(
            username, 
            hashedPassword, 
            userRole.id
        );

        reply.status(201).send({ message: "User registered successfully!", userId });
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};

export const login = async (req, reply) => {
    try {
        const { username, password } = req.body;

        const user = await UserRepository.findByUsername(username);
        if (!user) return reply.status(401).send({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return reply.status(401).send({ message: "Invalid credentials" });

        const token = fastify.jwt.sign({ id: user.id, role_id: user.role_id });

        reply.send({ token });
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};
