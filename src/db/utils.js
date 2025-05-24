import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "./config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runSQLFiles = async (directory) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, directory));

    for (const file of files) {
      const sql = fs.readFileSync(path.join(__dirname, directory, file), "utf8");
      await db.query(sql);
      console.log(`✅ Executed: ${file}`);
    }
  } catch (error) {
    console.error(`🚨 Error executing ${directory}:`, error);
  }
};