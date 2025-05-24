import { createDataset, deleteDataset, getDataset, getDatasetData, updateDataset } from "#controllers/datasetController.js";
import { isAuthenticated, hasPermission } from "#middlewares/authMiddleware.js";

async function datasetRoutes(fastify, options) {
    fastify.post("/dataset", {
        preHandler: [isAuthenticated, hasPermission(['create_dataset'])],
        handler: createDataset
    });

    fastify.get("/dataset/:id", {
        preHandler: [isAuthenticated, hasPermission(['create_dataset'])],
        handler: getDataset
    });

    fastify.get("/dataset/:id/data", {
        preHandler: [isAuthenticated, hasPermission(['create_dataset'])],
        handler: getDatasetData
    });

    fastify.put("/dataset/:id", {
        preHandler: [isAuthenticated, hasPermission(['update_dataset'])],
        handler: updateDataset
    });

    fastify.delete("/dataset/:id", {
        preHandler: [isAuthenticated, hasPermission(['delete_dataset'])],
        handler: deleteDataset
    });
}

export default datasetRoutes;