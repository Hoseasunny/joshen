import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware.js";

export const notificationsRouter = Router();

notificationsRouter.get("/", requireAuth, async (req, res) => {
  const result = await db.query(
    `SELECT n.*, o.scheduled_at, s.name AS service_name
     FROM notifications n
     LEFT JOIN orders o ON o.id = n.related_order_id
     LEFT JOIN services s ON s.id = o.service_id
     WHERE n.user_id = $1
     ORDER BY n.created_at DESC
     LIMIT 50`,
    [req.user.id]
  );
  res.json(result.rows);
});

notificationsRouter.patch("/:id/read", requireAuth, async (req, res) => {
  const result = await db.query(
    "UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *",
    [req.params.id, req.user.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ error: "Notification not found" });
  }
  res.json(result.rows[0]);
});

notificationsRouter.patch("/mark-all-read", requireAuth, async (req, res) => {
  await db.query(
    "UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false",
    [req.user.id]
  );
  res.json({ message: "All notifications marked as read" });
});

notificationsRouter.get("/unread-count", requireAuth, async (req, res) => {
  const result = await db.query(
    "SELECT COUNT(*)::int AS count FROM notifications WHERE user_id = $1 AND is_read = false",
    [req.user.id]
  );
  res.json({ count: result.rows[0].count });
});

// Admin route to create notifications
notificationsRouter.post("/", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { userId, title, message, type, relatedOrderId } = req.body;

  if (!userId || !title || !message) {
    return res.status(400).json({ error: "User ID, title, and message are required" });
  }

  const result = await db.query(
    "INSERT INTO notifications (user_id, title, message, type, related_order_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, title, message, type || "info", relatedOrderId || null]
  );

  res.status(201).json(result.rows[0]);
});