import { runSQLFiles } from "./utils";

export const runSeeders = async () => {
  await runSQLFiles("./seeders");
};

(async () => {
  console.log("🔄 Running Seeder...");
  await runSeeders();
  console.log("✅ Seeders completed!");

  process.exit(0);
})();