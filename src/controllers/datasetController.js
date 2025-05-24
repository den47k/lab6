import DatasetRepository from "#repositories/datasetRepository.js";
import db from "#db/config.js";

export async function createDataset(req, reply) {
    try {
        const { name, description, query } = req.body;

        if (!name || !description || !query) {
            return reply.status(400).send({ message: "Name, description and query are required" });
        }

        const datasetId = await DatasetRepository.createDataset(name, description, query);
        reply.send({ message: "Dataset created successfully", datasetId });
    } catch (error) {
        return reply.code(400).send({ message: error.message });
    }
}

export async function getDataset(req, reply) {
    const { id } = req.params;
    const dataset = await DatasetRepository.getDatasetById(id);

    if (!dataset) {
        return reply.status(404).send({ message: "Dataset not found" });
    }

    reply.send(dataset);
}

export async function getDatasetData(req, reply) {
    try {
        const { id } = req.params;

        const dataset = await DatasetRepository.getDatasetById(id);
        if (!dataset) {
            return reply.code(404).send({ message: 'Dataset not found' });
        }

        const [data] = await db.query(dataset.query);
        return reply.send(data);
    } catch (error) {
        return reply.code(500).send({ message: 'Error executing dataset query' });
    }
}

export async function updateDataset(req, reply) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const existing = await DatasetRepository.getDatasetById(id);
        if (!existing) {
            return reply.code(404).send({ message: 'Dataset not found' });
        }

        const success = await DatasetRepository.updateDataset(id, updates);
        if (!success) {
            return reply.code(404).send({ message: 'Dataset not found' });
        }

        const updatedDataset = await DatasetRepository.getDatasetById(id);
        return reply.send(updatedDataset);
    } catch (error) {
        return reply.code(400).send({ message: error.message });
    }
}

export async function deleteDataset(req, reply) {
    try {
        const { id } = req.params;
        const existing = await DatasetRepository.getDatasetById(id);
        if (!existing) return reply.code(404).send({ message: 'Dataset not found' });

        const success = await DatasetRepository.deleteDataset(id);
        if (!success) return reply.code(404).send({ message: 'Dataset not found' });

        return reply.code(204).send({ message: 'Dataset deleted successfully' });
    } catch (error) {
        return reply.code(500).send({ message: 'Error deleting dataset' });
    }
}