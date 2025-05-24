import Fastify from "fastify";
import dotenv from "dotenv";
import fastifyMysql from "@fastify/mysql";

dotenv.config();

const fastify = Fastify();

fastify.register(fastifyMysql, {
  promise: true,
  connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

const dbReady = new Promise((resolve) => {
  fastify.ready().then(() => {
    console.log("✅ MySQL connection is ready");
    resolve(fastify.mysql);
  });
});

const db = new Proxy({}, {
  get: (_, prop) => {
    return async (...args) => {
      const mysql = await dbReady;
      return mysql[prop](...args);
    };
  }
});

export default db;
