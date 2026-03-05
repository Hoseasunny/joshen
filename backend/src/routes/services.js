import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware.js";

export const servicesRouter = Router();

servicesRouter.get("/", async (req, res) => {
  const result = await db.query(
    `SELECT s.*, sc.name AS category_name,
            COUNT(o.id) AS total_orders,
            AVG(r.rating) AS average_rating
     FROM services s
     LEFT JOIN service_categories sc ON sc.id = s.category_id
     LEFT JOIN orders o ON s.id = o.service_id AND o.status = 'completed'
     LEFT JOIN reviews r ON o.id = r.order_id
     WHERE s.is_active = true
     GROUP BY s.id, sc.name
     ORDER BY s.name ASC`
  );
  res.json(result.rows);
});

servicesRouter.get("/categories", async (req, res) => {
  const result = await db.query("SELECT * FROM service_categories ORDER BY name ASC");
  res.json(result.rows);
});

servicesRouter.get("/areas", async (req, res) => {
  const result = await db.query("SELECT * FROM service_areas WHERE is_active = true ORDER BY name ASC");
  res.json(result.rows);
});

servicesRouter.get("/:id", async (req, res) => {
  const result = await db.query(
    `SELECT s.*, sc.name AS category_name,
            COUNT(o.id) AS total_orders,
            AVG(r.rating) AS average_rating,
            COUNT(CASE WHEN r.rating = 5 THEN 1 END) AS five_star_reviews
     FROM services s
     LEFT JOIN service_categories sc ON sc.id = s.category_id
     LEFT JOIN orders o ON s.id = o.service_id AND o.status = 'completed'
     LEFT JOIN reviews r ON o.id = r.order_id
     WHERE s.id = $1 AND s.is_active = true
     GROUP BY s.id, sc.name`,
    [req.params.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "Service not found" });
  }
  res.json(result.rows[0]);
});

servicesRouter.post("/", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const { name, description, categoryId, basePrice, pricePerHour, estimatedDurationHours } = req.body;
  if (!name || !basePrice) {
    return res.status(400).json({ error: "Name and base price are required" });
  }
  const result = await db.query(
    `INSERT INTO services (name, description, category_id, base_price, price_per_hour, estimated_duration_hours)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, description || "", categoryId || null, basePrice, pricePerHour || null, estimatedDurationHours || null]
  );
  res.status(201).json(result.rows[0]);
});

servicesRouter.patch("/:id", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const { name, description, categoryId, basePrice, pricePerHour, estimatedDurationHours, isActive } = req.body;
  const result = await db.query(
    `UPDATE services SET name = COALESCE($1, name), description = COALESCE($2, description),
     category_id = COALESCE($3, category_id), base_price = COALESCE($4, base_price),
     price_per_hour = COALESCE($5, price_per_hour), estimated_duration_hours = COALESCE($6, estimated_duration_hours),
     is_active = COALESCE($7, is_active), updated_at = NOW()
     WHERE id = $8 RETURNING *`,
    [name, description, categoryId, basePrice, pricePerHour, estimatedDurationHours, isActive, req.params.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "Service not found" });
  }
  res.json(result.rows[0]);
});
