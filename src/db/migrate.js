import { runSQLFiles } from "./utils";

const runMigrations = async () => {
  await runSQLFiles("./migrations");
};

(async () => {
  console.log("🔄 Running Migrations...");
  await runMigrations();
  console.log("✅ Migrations completed!");

  process.exit(0);
})();