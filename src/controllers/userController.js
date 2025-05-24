import RoleRepository from "#repositories/roleRepository.js";
import UserRepository from "#repositories/userRepository.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, reply) => {
    try {
        const users = await UserRepository.getAllUsers() || [];
        const safeUsers = users.filter(user => {
          const { password, ...safeUser } = user;
          return safeUser;
        })
        reply.send(safeUsers);
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const getUserById = async (req, reply) => {
    try {
        const { id } = req.params;
        const { password, ...safeUser } = await UserRepository.getUserById(id);
        reply.send(safeUser ? safeUser : { message: "User not found" });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const createUser = async (req, reply) => {
    try {
        const { username, password, role } = req.body;

        const roleRecord = await RoleRepository.findByName(role || 'user');
        if (!roleRecord) {
            return reply.status(400).send({ message: "Invalid role" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserRepository.createUser(username, hashedPassword, roleRecord.id);
        reply.send({ message: "User created successfully" });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const updateUser = async (req, reply) => {
    try {
        const { id } = req.params;
        const { username, password, role } = req.body;
        const { id: userId, permissions } = req.user;

        const targetUser = await UserRepository.getUserById(id);
        if (!targetUser) {
            return reply.status(404).send({ message: "User not found" });
        }

        const isAdmin = permissions.includes('modify_any_user');
        const isSelf = targetUser.id === userId;
        const targetUserRole = await RoleRepository.getRoleById(targetUser.role_id);

        if (!isAdmin && !(isSelf && permissions.includes('modify_own_user'))) {
            return reply.status(403).send({ message: "Forbidden: Insufficient permissions" });
        }

        if (isSelf && role === 'admin') {
            return reply.status(403).send({ message: "Forbidden: Cannot promote yourself to admin" });
        }

        if (isAdmin && !isSelf && targetUserRole.name === 'admin') {
            return reply.status(403).send({ message: "Forbidden: Cannot modify other admins" });
        }

        const fields = { username };
        if (password) fields.password = await bcrypt.hash(password, 10);
        if (role) {
            const roleRecord = await RoleRepository.findByName(role);
            if (!roleRecord) return reply.status(400).send({ message: "Invalid role" });
            fields.role_id = roleRecord.id;
        }

        const updated = await UserRepository.updateUser(id, fields);
        if (!updated) return reply.status(400).send({ message: "Update failed" });

        reply.send({ message: "User updated successfully" });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const deleteUser = async (req, reply) => {
    try {
        const { id } = req.params;
        const { id: userId, permissions } = req.user;

        const targetUser = await UserRepository.getUserById(id);
        if (!targetUser) return reply.status(404).send({ message: "User not found" });

        const isAdmin = permissions.includes('modify_any_user');
        const isSelf = targetUser.id === userId;
        const targetUserRole = await RoleRepository.getRoleById(targetUser.role_id);

        if (!isAdmin && !(isSelf && permissions.includes('modify_own_user'))) {
            return reply.status(403).send({ message: "Forbidden: Insufficient permissions" });
        }

        if (isAdmin && targetUserRole.name === 'admin') {
            return reply.status(403).send({ message: "Forbidden: Cannot delete other admins" });
        }

        const deleted = await UserRepository.deleteUser(id);
        if (!deleted) return reply.status(400).send({ message: "Delete failed" });
        
        reply.send({ message: "User deleted successfully" });
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};
