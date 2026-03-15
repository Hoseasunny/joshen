import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { db } from "../src/db.js";

dotenv.config();

async function createAdmin() {
  const name = process.env.ADMIN_NAME || "Admin User";
  const email = process.env.ADMIN_EMAIL;
  const phone = process.env.ADMIN_PHONE || "0700000000";
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
    process.exit(1);
  }

  const existing = await db.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows[0]) {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.query(
      "UPDATE users SET name = $1, phone = $2, password_hash = $3, role = 'admin' WHERE email = $4",
      [name, phone, passwordHash, email]
    );
    console.log("Admin updated:", email);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, 'admin') RETURNING id, name, email, role",
    [name, email, phone, passwordHash]
  );

  console.log("Admin created:", result.rows[0]);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error("Failed to create admin:", err.message);
  process.exit(1);
});
