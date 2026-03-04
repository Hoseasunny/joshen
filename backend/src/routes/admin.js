import { Router } from "express";
import { db } from "../db.js";
import { requireAuth, requireRole } from "../middleware.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));

adminRouter.get("/users", async (req, res) => {
  const result = await db.query("SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC");
  res.json(result.rows);
});

adminRouter.get("/orders", async (req, res) => {
  const result = await db.query(
    "SELECT o.*, u.name AS customer_name, s.name AS service_name FROM orders o JOIN users u ON u.id = o.user_id JOIN services s ON s.id = o.service_id ORDER BY o.created_at DESC"
  );
  res.json(result.rows);
});

adminRouter.get("/analytics", async (req, res) => {
  const [orders, customers] = await Promise.all([
    db.query("SELECT status, COUNT(*)::int AS count FROM orders GROUP BY status"),
    db.query("SELECT COUNT(*)::int AS total FROM users WHERE role = 'customer'")
  ]);
  res.json({
    ordersByStatus: orders.rows,
    totalCustomers: customers.rows[0]?.total || 0
  });
});
