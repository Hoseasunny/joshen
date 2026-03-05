import { Router } from "express";
import { z } from "zod";
import { db } from "../db.js";
import { requireAuth } from "../middleware.js";
import { PAYMENT_METHODS, PAYMENT_STATUSES } from "../constants.js";

export const paymentsRouter = Router();

const createPaymentSchema = z.object({
  orderId: z.number().int(),
  amount: z.number().positive(),
  paymentMethod: z.enum(PAYMENT_METHODS),
  transactionId: z.string().optional()
});

paymentsRouter.get("/", requireAuth, async (req, res) => {
  const result = await db.query(
    `SELECT p.*, o.scheduled_at, s.name AS service_name
     FROM payments p
     JOIN orders o ON o.id = p.order_id
     JOIN services s ON s.id = o.service_id
     WHERE o.user_id = $1
     ORDER BY p.created_at DESC`,
    [req.user.id]
  );
  res.json(result.rows);
});

paymentsRouter.post("/", requireAuth, async (req, res) => {
  const parse = createPaymentSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid payload", details: parse.error.issues });
  }

  const { orderId, amount, paymentMethod, transactionId } = parse.data;

  // Verify order belongs to user and is not already paid
  const orderResult = await db.query(
    `SELECT o.total_price, o.status, p.id AS payment_id
     FROM orders o
     LEFT JOIN payments p ON p.order_id = o.id AND p.status = 'completed'
     WHERE o.id = $1 AND o.user_id = $2`,
    [orderId, req.user.id]
  );

  if (!orderResult.rows[0]) {
    return res.status(404).json({ error: "Order not found" });
  }

  const order = orderResult.rows[0];

  if (order.payment_id) {
    return res.status(400).json({ error: "Order already paid" });
  }

  if (Math.abs(amount - order.total_price) > 0.01) {
    return res.status(400).json({ error: "Payment amount does not match order total" });
  }

  const result = await db.query(
    `INSERT INTO payments (order_id, amount, payment_method, transaction_id, status, payment_date)
     VALUES ($1, $2, $3, $4, 'completed', NOW()) RETURNING *`,
    [orderId, amount, paymentMethod, transactionId || null]
  );

  const payment = result.rows[0];

  // Create notification
  await db.query(
    "INSERT INTO notifications (user_id, title, message, type, related_order_id) VALUES ($1, $2, $3, $4, $5)",
    [req.user.id, "Payment Successful", `Payment of KES ${amount} received for your order.`, "success", orderId]
  );

  res.status(201).json(payment);
});

paymentsRouter.get("/:id", requireAuth, async (req, res) => {
  const result = await db.query(
    `SELECT p.*, o.scheduled_at, s.name AS service_name
     FROM payments p
     JOIN orders o ON o.id = p.order_id
     JOIN services s ON s.id = o.service_id
     WHERE p.id = $1 AND o.user_id = $2`,
    [req.params.id, req.user.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "Payment not found" });
  }
  res.json(result.rows[0]);
});

// Admin routes for payment management
paymentsRouter.patch("/:id/status", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { status } = req.body;
  if (!PAYMENT_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const result = await db.query(
    "UPDATE payments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [status, req.params.id]
  );

  if (!result.rows[0]) {
    return res.status(404).json({ error: "Payment not found" });
  }

  res.json(result.rows[0]);
});