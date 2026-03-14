import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { authRequest } from "../lib/api.js";

const STATUS_FLOW = ["pending", "confirmed", "assigned", "in progress", "completed"];

const STATUS_ICONS = {
  pending: "📅",
  confirmed: "📅",
  assigned: "👤",
  "in progress": "🧹",
  completed: "✅"
};

const ETA_MINUTES = {
  pending: 110,
  confirmed: 80,
  assigned: 55,
  "in progress": 30,
  completed: 0,
  delayed: 95,
  cancelled: 0
};

function normalizeStatus(status) {
  return String(status || "").toLowerCase().replace(/[_-]+/g, " ").trim();
}

function getStatusStep(status) {
  const normalized = normalizeStatus(status);
  if (normalized === "delayed") return 3;
  if (normalized === "cancelled") return 0;
  const idx = STATUS_FLOW.indexOf(normalized);
  return idx === -1 ? 0 : idx;
}

function getStatusTone(status) {
  const normalized = normalizeStatus(status);
  if (normalized === "completed") return "complete";
  if (normalized === "delayed" || normalized === "cancelled") return "delayed";
  return "progress";
}

function buildEta(order) {
  const scheduled = new Date(order?.scheduled_at || Date.now());
  const normalized = normalizeStatus(order?.status);
  const extra = ETA_MINUTES[normalized] ?? 60;
  if (normalized === "completed") return "Arrived";
  if (normalized === "cancelled") return "Not available";
  return new Date(scheduled.getTime() + extra * 60000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function buildAiNotification(order, previousStatus) {
  const current = normalizeStatus(order.status);
  if (current === "delayed") {
    return `Order #${order.id} delayed. AI suggests assigning backup staff and notifying customer immediately.`;
  }
  if (current === "in progress" && previousStatus !== current) {
    return `Order #${order.id} is now in progress. Estimated completion around ${buildEta(order)}.`;
  }
  if (current === "completed") {
    return `Order #${order.id} completed successfully. AI recommends sending feedback request.`;
  }
  return `Order #${order.id} moved from ${previousStatus} to ${current}.`;
}

export default function Tracking() {
  const { token } = useAuth();
  const wrapperRef = useRef(null);
  const previousOrdersRef = useRef([]);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "Hello. I can help with ETA, delays, and tracking updates." }
  ]);

  useEffect(() => {
    const loadOrders = async (isPolling = false) => {
      if (!token) return;
      if (!isPolling) setLoadingOrders(true);
      try {
        const data = await authRequest("/api/orders", token);
        const previousById = new Map(
          (previousOrdersRef.current || []).map((order) => [order.id, normalizeStatus(order.status)])
        );
        if (isPolling) {
          const liveNotifications = [];
          data.forEach((order) => {
            const prevStatus = previousById.get(order.id);
            const current = normalizeStatus(order.status);
            if (prevStatus && prevStatus !== current) {
              liveNotifications.unshift({
                id: `${order.id}-${Date.now()}-${current}`,
                text: buildAiNotification(order, prevStatus),
                tone: getStatusTone(current),
                at: new Date().toLocaleTimeString()
              });
            }
          });
          if (liveNotifications.length > 0) {
            setNotifications((prev) => [...liveNotifications, ...prev].slice(0, 8));
          }
        }
        setOrders(data);
        previousOrdersRef.current = data;
      } catch (error) {
        setNotifications((prev) => [
          {
            id: `error-${Date.now()}`,
            text: "Tracking refresh failed. Retrying automatically.",
            tone: "delayed",
            at: new Date().toLocaleTimeString()
          },
          ...prev
        ]);
      } finally {
        if (!isPolling) setLoadingOrders(false);
      }
    };

    loadOrders();
    const interval = setInterval(() => loadOrders(true), 15000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const loadHistory = async () => {
      if (!selected) {
        setHistory([]);
        return;
      }
      setHistoryLoading(true);
      try {
        const data = await authRequest(`/api/orders/${selected.id}/history`, token);
        setHistory(data);
      } finally {
        setHistoryLoading(false);
      }
    };
    if (token) {
      loadHistory();
    }
  }, [selected, token]);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return undefined;
    let frame = null;
    const onMove = (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = node.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        node.style.setProperty("--track-mx", `${x.toFixed(3)}`);
        node.style.setProperty("--track-my", `${y.toFixed(3)}`);
      });
    };
    node.addEventListener("mousemove", onMove);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const visibleOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = search.trim().toLowerCase();
      const matchesQuery =
        !query ||
        order.service_name?.toLowerCase().includes(query) ||
        String(order.id).includes(query) ||
        String(order.address || "").toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" || normalizeStatus(order.status) === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  function sendChat(event) {
    event.preventDefault();
    const msg = chatInput.trim();
    if (!msg) return;
    let response = "I can help with status updates, ETA, and assigned staff details.";
    if (msg.toLowerCase().includes("eta")) {
      response = selected
        ? `Predicted ETA for order #${selected.id} is ${buildEta(selected)}.`
        : "Select an order card first and I will calculate a predictive ETA.";
    } else if (msg.toLowerCase().includes("delay")) {
      response = "If an order is delayed, I recommend notifying the customer and assigning backup staff.";
    } else if (msg.toLowerCase().includes("staff")) {
      response = selected
        ? `Assigned staff: ${selected.staff_name || selected.cleaner_name || "Pending assignment"}.`
        : "Open an order card to view staff assignment details.";
    }
    setChatMessages((prev) => [...prev, { role: "user", text: msg }, { role: "bot", text: response }]);
    setChatInput("");
  }

  return (
    <section className="section tracking-dashboard-section" ref={wrapperRef}>
      <div className="tracking-bg" aria-hidden="true">
        <span className="track-icon icon-spray">spray</span>
        <span className="track-icon icon-mop">mop</span>
        <span className="track-icon icon-bubble" />
        <span className="track-icon icon-bubble small" />
      </div>
      <div className="container tracking-dashboard">
        <div className="tracking-top">
          <div>
            <h2>AI Order Tracking Dashboard</h2>
            <p>Filter and monitor orders in real time with predictive ETA insights.</p>
          </div>
          <div className="tracking-controls">
            <input
              type="search"
              placeholder="Search by service, ID, address"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search orders"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="assigned">Assigned</option>
              <option value="in progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="smart-notifications" aria-live="polite">
            {notifications.slice(0, 3).map((item) => (
              <article key={item.id} className={`notif ${item.tone}`}>
                <strong>AI alert · {item.at}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        )}

        <div className="tracking-content-grid">
          <div>
            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : visibleOrders.length === 0 ? (
              <p>No orders match your current filters.</p>
            ) : (
              <div className="tracking-card-grid">
                {visibleOrders.map((order) => {
                  const status = normalizeStatus(order.status);
                  const step = getStatusStep(status);
                  const percent = Math.max(8, Math.min(100, (step / (STATUS_FLOW.length - 1)) * 100));
                  const tone = getStatusTone(status);
                  return (
                    <button
                      key={order.id}
                      type="button"
                      className={`track-order-card ${tone}`}
                      onClick={() => setSelected(order)}
                    >
                      <div className="order-head">
                        <strong>{order.service_name}</strong>
                        <span className={`status-dot ${tone}`} />
                      </div>
                      <p>Order #{order.id}</p>
                      <p>{new Date(order.scheduled_at).toLocaleString()}</p>
                      <p>Predictive ETA: {buildEta(order)}</p>
                      <div className="order-progress">
                        <span className={`progress-live ${tone}`} style={{ width: `${percent}%` }} />
                      </div>
                      <ol className="step-indicator" aria-label="Order step progression">
                        {STATUS_FLOW.map((item, idx) => (
                          <li key={`${order.id}-${item}`} className={idx <= step ? "done" : ""}>
                            <span className="step-icon">{STATUS_ICONS[item]}</span>
                            <span className="step-label">{item.replace(" ", "\n")}</span>
                          </li>
                        ))}
                      </ol>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="track-chat-widget">
            <h3>AI Support Assistant</h3>
            <div className="chat-log">
              {chatMessages.map((message, index) => (
                <p key={`track-chat-${index}`} className={`chat-${message.role}`}>
                  {message.text}
                </p>
              ))}
            </div>
            <form className="chat-form" onSubmit={sendChat}>
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about ETA, delay, or staff"
                aria-label="Message tracking assistant"
              />
              <button type="submit" className="btn solid">Send</button>
            </form>
          </aside>
        </div>
      </div>

      {selected && (
        <div className="track-modal-overlay" role="dialog" aria-modal="true" aria-label="Order details modal">
          <div className="track-modal">
            <button type="button" className="track-modal-close" onClick={() => setSelected(null)}>
              Close
            </button>
            <h3>{selected.service_name}</h3>
            <p>Order #{selected.id}</p>
            <div className="track-modal-meta">
              <article>
                <h4>Status</h4>
                <p>{selected.status}</p>
              </article>
              <article>
                <h4>Assigned Staff</h4>
                <p>{selected.staff_name || selected.cleaner_name || "Pending assignment"}</p>
              </article>
              <article>
                <h4>Predictive ETA</h4>
                <p>{buildEta(selected)}</p>
              </article>
            </div>
            <h4>Timeline</h4>
            {historyLoading ? (
              <p>Loading timeline...</p>
            ) : history.length === 0 ? (
              <p>No status updates yet.</p>
            ) : (
              <ul className="timeline">
                {history.map((item, index) => (
                  <li key={`${item.status}-${index}`}>
                    <strong>{item.status}</strong>
                    <span>{new Date(item.updated_at).toLocaleString()}</span>
                    {item.note && <p>{item.note}</p>}
                  </li>
                ))}
              </ul>
            )}
            <div className="track-modal-actions">
              <button className="btn" onClick={() => alert("Reschedule feature coming soon!")}>Reschedule</button>
              <button className="btn" onClick={() => alert("Cancel feature coming soon!")}>Cancel</button>
              <button className="btn solid" onClick={() => alert("Contact Support: support@joshem.com")}>Contact Support</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
