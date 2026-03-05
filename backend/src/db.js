import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Check backend/.env");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const db = {
  query: (text, params) => pool.query(text, params)
};
