import { Router } from "express";
import { z } from "zod";
import { db } from "../db.js";
import { requireAuth } from "../middleware.js";
import { STATUSES } from "../constants.js";

export const ordersRouter = Router();

const createSchema = z.object({
  serviceId: z.number().int(),
  scheduledAt: z.string().min(4),
  address: z.string().min(5),
  notes: z.string().optional()
});

ordersRouter.get("/", requireAuth, async (req, res) => {
  const result = await db.query(
    "SELECT o.*, s.name AS service_name FROM orders o JOIN services s ON s.id = o.service_id WHERE o.user_id = $1 ORDER BY o.created_at DESC",
    [req.user.id]
  );
  res.json(result.rows);
});

ordersRouter.post("/", requireAuth, async (req, res) => {
  const parse = createSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const { serviceId, scheduledAt, address, notes } = parse.data;
  const result = await db.query(
    "INSERT INTO orders (user_id, service_id, scheduled_at, address, notes, status) VALUES ($1, $2, $3, $4, $5, 'Pending') RETURNING *",
    [req.user.id, serviceId, scheduledAt, address, notes || ""]
  );
  const order = result.rows[0];
  await db.query(
    "INSERT INTO order_status_history (order_id, status, updated_by) VALUES ($1, $2, $3)",
    [order.id, order.status, req.user.id]
  );
  res.status(201).json(order);
});

ordersRouter.get("/:id", requireAuth, async (req, res) => {
  const result = await db.query(
    "SELECT o.*, s.name AS service_name FROM orders o JOIN services s ON s.id = o.service_id WHERE o.id = $1 AND o.user_id = $2",
    [req.params.id, req.user.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(result.rows[0]);
});

ordersRouter.get("/:id/history", requireAuth, async (req, res) => {
  const result = await db.query(
    "SELECT status, updated_at FROM order_status_history WHERE order_id = $1 ORDER BY updated_at ASC",
    [req.params.id]
  );
  res.json(result.rows);
});

ordersRouter.patch("/:id/status", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const { status, assignedCleanerId } = req.body;
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const result = await db.query(
    "UPDATE orders SET status = $1, assigned_cleaner_id = COALESCE($2, assigned_cleaner_id) WHERE id = $3 RETURNING *",
    [status, assignedCleanerId || null, req.params.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "Not found" });
  }
  await db.query(
    "INSERT INTO order_status_history (order_id, status, updated_by) VALUES ($1, $2, $3)",
    [req.params.id, status, req.user.id]
  );
  res.json(result.rows[0]);
});
