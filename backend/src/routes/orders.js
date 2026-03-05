import { Router } from "express";
import { z } from "zod";
import { db } from "../db.js";
import { requireAuth } from "../middleware.js";
import { STATUSES } from "../constants.js";

export const ordersRouter = Router();

const createSchema = z.object({
  serviceId: z.number().int(),
  areaId: z.number().int().optional(),
  scheduledAt: z.string().min(4),
  address: z.string().min(5),
  notes: z.string().optional(),
  specialInstructions: z.string().optional()
});

ordersRouter.get("/", requireAuth, async (req, res) => {
  const result = await db.query(
    `SELECT o.*, s.name AS service_name, s.base_price, s.price_per_hour,
            sa.name AS area_name, u.name AS cleaner_name
     FROM orders o
     JOIN services s ON s.id = o.service_id
     LEFT JOIN service_areas sa ON sa.id = o.area_id
     LEFT JOIN users u ON u.id = o.assigned_cleaner_id
     WHERE o.user_id = $1
     ORDER BY o.created_at DESC`,
    [req.user.id]
  );
  res.json(result.rows);
});

ordersRouter.post("/", requireAuth, async (req, res) => {
  const parse = createSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid payload", details: parse.error.issues });
  }
  const { serviceId, areaId, scheduledAt, address, notes, specialInstructions } = parse.data;

  // Get service details for pricing
  const serviceResult = await db.query(
    "SELECT base_price, price_per_hour, estimated_duration_hours FROM services WHERE id = $1 AND is_active = true",
    [serviceId]
  );
  if (!serviceResult.rows[0]) {
    return res.status(400).json({ error: "Service not found or inactive" });
  }

  const service = serviceResult.rows[0];
  const totalPrice = service.price_per_hour
    ? service.price_per_hour * service.estimated_duration_hours
    : service.base_price;

  const result = await db.query(
    `INSERT INTO orders (user_id, service_id, area_id, scheduled_at, address, notes, special_instructions, total_price)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [req.user.id, serviceId, areaId || null, scheduledAt, address, notes || "", specialInstructions || "", totalPrice]
  );

  const order = result.rows[0];

  // Insert initial status history
  await db.query(
    "INSERT INTO order_status_history (order_id, new_status, changed_by) VALUES ($1, $2, $3)",
    [order.id, order.status, req.user.id]
  );

  // Create notification for user
  await db.query(
    "INSERT INTO notifications (user_id, title, message, type, related_order_id) VALUES ($1, $2, $3, $4, $5)",
    [req.user.id, "Order Created", "Your cleaning service order has been created successfully.", "success", order.id]
  );

  res.status(201).json(order);
});

ordersRouter.get("/:id", requireAuth, async (req, res) => {
  const result = await db.query(
    `SELECT o.*, s.name AS service_name, s.base_price, s.price_per_hour,
            sa.name AS area_name, u.name AS cleaner_name,
            p.status AS payment_status, p.payment_method
     FROM orders o
     JOIN services s ON s.id = o.service_id
     LEFT JOIN service_areas sa ON sa.id = o.area_id
     LEFT JOIN users u ON u.id = o.assigned_cleaner_id
     LEFT JOIN payments p ON p.order_id = o.id AND p.status = 'completed'
     WHERE o.id = $1 AND o.user_id = $2`,
    [req.params.id, req.user.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(result.rows[0]);
});

ordersRouter.get("/:id/history", requireAuth, async (req, res) => {
  // Check if user owns the order or is admin
  const orderCheck = await db.query(
    "SELECT id FROM orders WHERE id = $1 AND (user_id = $2 OR $3 = 'admin')",
    [req.params.id, req.user.id, req.user.role]
  );
  if (!orderCheck.rows[0]) {
    return res.status(404).json({ error: "Order not found" });
  }

  const result = await db.query(
    `SELECT osh.*, u.name AS changed_by_name
     FROM order_status_history osh
     LEFT JOIN users u ON u.id = osh.changed_by
     WHERE osh.order_id = $1
     ORDER BY osh.changed_at ASC`,
    [req.params.id]
  );
  res.json(result.rows);
});

ordersRouter.patch("/:id/status", requireAuth, async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "cleaner") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { status, assignedCleanerId, notes } = req.body;
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  // Get current order status
  const currentOrder = await db.query("SELECT status FROM orders WHERE id = $1", [req.params.id]);
  if (!currentOrder.rows[0]) {
    return res.status(404).json({ error: "Order not found" });
  }

  const oldStatus = currentOrder.rows[0].status;

  const result = await db.query(
    "UPDATE orders SET status = $1, assigned_cleaner_id = COALESCE($2, assigned_cleaner_id), updated_at = NOW() WHERE id = $3 RETURNING *",
    [status, assignedCleanerId || null, req.params.id]
  );

  if (!result.rows[0]) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Insert status history
  await db.query(
    "INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, notes) VALUES ($1, $2, $3, $4, $5)",
    [req.params.id, oldStatus, status, req.user.id, notes || ""]
  );

  // Create notifications based on status change
  const order = result.rows[0];
  const userResult = await db.query("SELECT name FROM users WHERE id = $1", [order.user_id]);
  const customerName = userResult.rows[0]?.name || "Customer";

  let notificationTitle = "";
  let notificationMessage = "";
  let notificationType = "info";

  switch (status) {
    case "confirmed":
      notificationTitle = "Order Confirmed";
      notificationMessage = "Your cleaning service order has been confirmed.";
      notificationType = "success";
      break;
    case "assigned":
      notificationTitle = "Cleaner Assigned";
      notificationMessage = "A cleaner has been assigned to your order.";
      notificationType = "info";
      break;
    case "in_progress":
      notificationTitle = "Service Started";
      notificationMessage = "Your cleaning service is now in progress.";
      notificationType = "info";
      break;
    case "completed":
      notificationTitle = "Service Completed";
      notificationMessage = "Your cleaning service has been completed successfully.";
      notificationType = "success";
      break;
    case "cancelled":
      notificationTitle = "Order Cancelled";
      notificationMessage = "Your cleaning service order has been cancelled.";
      notificationType = "warning";
      break;
  }

  if (notificationTitle) {
    await db.query(
      "INSERT INTO notifications (user_id, title, message, type, related_order_id) VALUES ($1, $2, $3, $4, $5)",
      [order.user_id, notificationTitle, notificationMessage, notificationType, order.id]
    );
  }

  res.json(result.rows[0]);
});

// Add review endpoint
ordersRouter.post("/:id/review", requireAuth, async (req, res) => {
  const { rating, comment } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  // Check if order belongs to user and is completed
  const orderResult = await db.query(
    "SELECT status FROM orders WHERE id = $1 AND user_id = $2",
    [req.params.id, req.user.id]
  );

  if (!orderResult.rows[0]) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (orderResult.rows[0].status !== "completed") {
    return res.status(400).json({ error: "Can only review completed orders" });
  }

  // Check if review already exists
  const existingReview = await db.query(
    "SELECT id FROM reviews WHERE order_id = $1 AND user_id = $2",
    [req.params.id, req.user.id]
  );

  if (existingReview.rows[0]) {
    return res.status(400).json({ error: "Review already exists for this order" });
  }

  const result = await db.query(
    "INSERT INTO reviews (order_id, user_id, rating, comment, is_verified) VALUES ($1, $2, $3, $4, true) RETURNING *",
    [req.params.id, req.user.id, rating, comment || ""]
  );

  res.status(201).json(result.rows[0]);
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
