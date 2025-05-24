import RoleRepository from "#repositories/roleRepository.js"

export const isAuthenticated = async (req, reply) => {
    try {
        await req.jwtVerify();
    } catch (err) {
        return reply.status(401).send({ message: "Unauthorized: Invalid or expired token" });
    }
};

export const hasPermission = (requiredPermission) => async (req, reply) => {
    try {
        await req.jwtVerify();
        const { role_id } = req.user;

        const permissions = await RoleRepository.getPermissionsByRoleId(role_id);
        let hasRequired;
        if (Array.isArray(requiredPermission)) {
            hasRequired = requiredPermission.some(p => permissions.includes(p));
        } else {
            hasRequired = permissions.includes(requiredPermission);
        }

        if (!hasRequired) {
            return reply.status(403).send({ message: "Forbidden: Insufficient permissions" });
        }

        req.user.permissions = permissions;
    } catch (err) {
        return reply.status(401).send({ message: "Unauthorized: Invalid or expired token" });
    }
};
