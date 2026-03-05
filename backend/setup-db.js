import { readFileSync } from "fs";
import { db } from "./src/db.js";

async function setupDatabase() {
  try {
    console.log("Setting up database...");

    // Run schema
    console.log("Creating tables...");
    const schemaSQL = readFileSync("./src/schema.sql", "utf8");
    await db.query(schemaSQL);
    console.log("Tables created successfully");

    // Run seed data
    console.log("Seeding data...");
    const seedSQL = readFileSync("./src/seed.sql", "utf8");
    await db.query(seedSQL);
    console.log("Data seeded successfully");

    console.log("Database setup complete!");
    process.exit(0);
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();