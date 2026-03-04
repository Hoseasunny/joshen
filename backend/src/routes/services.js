import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware.js";

export const servicesRouter = Router();

servicesRouter.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM services ORDER BY name ASC");
  res.json(result.rows);
});

servicesRouter.post("/", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }
  const result = await db.query(
    "INSERT INTO services (name, description) VALUES ($1, $2) RETURNING *",
    [name, description || ""]
  );
  res.status(201).json(result.rows[0]);
});
