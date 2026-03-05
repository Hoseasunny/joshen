import { Router } from "express";
import { db } from "../db.js";
import { requireAuth, requireRole } from "../middleware.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));

adminRouter.get("/users", async (req, res) => {
  const result = await db.query(
    "SELECT id, name, email, phone, role, is_active, created_at, updated_at FROM users ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

adminRouter.get("/orders", async (req, res) => {
  const result = await db.query(
    `SELECT o.*, u.name AS customer_name, s.name AS service_name,
            sa.name AS area_name, c.name AS cleaner_name,
            p.status AS payment_status, p.amount AS payment_amount
     FROM orders o
     JOIN users u ON u.id = o.user_id
     JOIN services s ON s.id = o.service_id
     LEFT JOIN service_areas sa ON sa.id = o.area_id
     LEFT JOIN users c ON c.id = o.assigned_cleaner_id
     LEFT JOIN payments p ON p.order_id = o.id AND p.status = 'completed'
     ORDER BY o.created_at DESC`
  );
  res.json(result.rows);
});

adminRouter.get("/analytics", async (req, res) => {
  const [orders, customers, revenue, services] = await Promise.all([
    db.query("SELECT status, COUNT(*)::int AS count FROM orders GROUP BY status"),
    db.query("SELECT COUNT(*)::int AS total FROM users WHERE role = 'customer'"),
    db.query("SELECT COALESCE(SUM(amount), 0)::float AS total FROM payments WHERE status = 'completed'"),
    db.query("SELECT s.name, COUNT(o.id)::int AS order_count FROM services s LEFT JOIN orders o ON s.id = o.service_id GROUP BY s.id, s.name ORDER BY order_count DESC LIMIT 5")
  ]);

  res.json({
    ordersByStatus: orders.rows,
    totalCustomers: customers.rows[0]?.total || 0,
    totalRevenue: revenue.rows[0]?.total || 0,
    popularServices: services.rows
  });
});

adminRouter.get("/cleaners", async (req, res) => {
  const result = await db.query(
    `SELECT u.id, u.name, u.email, u.phone, u.is_active,
            COUNT(o.id) AS total_orders,
            COUNT(CASE WHEN o.status = 'completed' THEN 1 END) AS completed_orders,
            AVG(r.rating) AS average_rating
     FROM users u
     LEFT JOIN orders o ON u.id = o.assigned_cleaner_id
     LEFT JOIN reviews r ON o.id = r.order_id
     WHERE u.role = 'cleaner'
     GROUP BY u.id, u.name, u.email, u.phone, u.is_active
     ORDER BY u.name`
  );
  res.json(result.rows);
});

adminRouter.get("/services", async (req, res) => {
  const result = await db.query(
    `SELECT s.*, sc.name AS category_name,
            COUNT(o.id) AS total_orders,
            AVG(r.rating) AS average_rating
     FROM services s
     LEFT JOIN service_categories sc ON sc.id = s.category_id
     LEFT JOIN orders o ON s.id = o.service_id AND o.status = 'completed'
     LEFT JOIN reviews r ON o.id = r.order_id
     GROUP BY s.id, sc.name
     ORDER BY s.name`
  );
  res.json(result.rows);
});

adminRouter.get("/reviews", async (req, res) => {
  const result = await db.query(
    `SELECT r.*, u.name AS customer_name, s.name AS service_name, o.scheduled_at
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     JOIN orders o ON o.id = r.order_id
     JOIN services s ON s.id = o.service_id
     ORDER BY r.created_at DESC`
  );
  res.json(result.rows);
});

adminRouter.patch("/users/:id/status", async (req, res) => {
  const { isActive } = req.body;
  const result = await db.query(
    "UPDATE users SET is_active = $1, updated_at = NOW() WHERE id = $2 RETURNING id, name, email, is_active",
    [isActive, req.params.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(result.rows[0]);
});

adminRouter.patch("/services/:id", async (req, res) => {
  const { isActive, basePrice, pricePerHour } = req.body;
  const result = await db.query(
    `UPDATE services SET is_active = $1, base_price = COALESCE($2, base_price),
     price_per_hour = COALESCE($3, price_per_hour), updated_at = NOW()
     WHERE id = $4 RETURNING *`,
    [isActive, basePrice, pricePerHour, req.params.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "Service not found" });
  }
  res.json(result.rows[0]);
});
