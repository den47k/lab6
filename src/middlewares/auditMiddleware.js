import db from "#db/config.js";

export function auditLogger(fastify) {
    fastify.addHook('onResponse', async (request, reply) => {
        const routeConfig = request.routeOptions.config?.audit;
        if (!routeConfig || reply.statusCode >= 400) return;

        const { method, user } = request;
        const { entity, idParam = 'id' } = routeConfig;

        const actionMap = {
            GET: 'read',
            PUT: 'update',
            DELETE: 'delete'
        };

        const action = actionMap[method];
        if (!action) return;

        const entityId = request.params[idParam];
        if (!entityId) {
            fastify.log.warn(`Audit logging skipped: entityId not found for ${action} ${entity}`);
            return;
        }

        try {
            await db.query(
                "INSERT INTO access_logs (action, entity, entity_id) VALUES (?, ?, ?)",
                [action, entity, entityId]
            );
        } catch (error) {
            fastify.log.error('Audit logging failed:', error);
        }
    });
}