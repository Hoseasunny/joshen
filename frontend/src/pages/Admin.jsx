import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { authRequest } from "../lib/api.js";
import Seo from "../components/Seo.jsx";

export default function Admin() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({ ordersByStatus: [], totalCustomers: 0 });
  const [notifications, setNotifications] = useState([]);
  const [statusEdits, setStatusEdits] = useState({});
  const [savingIds, setSavingIds] = useState({});
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderHistory, setOrderHistory] = useState({});
  const [loadingHistory, setLoadingHistory] = useState({});

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "assigned", label: "Assigned" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
  ];

  useEffect(() => {
    const loadAdmin = async () => {
      setError("");
      try {
        const [ordersData, analyticsData, notificationsData] = await Promise.all([
          authRequest("/api/admin/orders", token),
          authRequest("/api/admin/analytics", token),
          authRequest("/api/notifications", token)
        ]);
        setOrders(ordersData);
        setAnalytics(analyticsData);
        setNotifications(notificationsData);
      } catch (err) {
        setError(err.message);
      }
    };
    if (token) {
      loadAdmin();
    }
  }, [token]);

  useEffect(() => {
    const nextEdits = {};
    orders.forEach((order) => {
      nextEdits[order.id] = order.status;
    });
    setStatusEdits(nextEdits);
  }, [orders]);

  const formatStatus = (status) =>
    String(status || "").replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());

  const fetchHistory = async (orderId) => {
    setLoadingHistory((prev) => ({ ...prev, [orderId]: true }));
    setError("");
    try {
      const history = await authRequest(`/api/orders/${orderId}/history`, token);
      setOrderHistory((prev) => ({ ...prev, [orderId]: history }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingHistory((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const onSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
    if (!orderHistory[orderId]) {
      fetchHistory(orderId);
    }
  };

  const updateStatus = async (orderId) => {
    const nextStatus = statusEdits[orderId];
    if (!nextStatus) return;
    setSavingIds((prev) => ({ ...prev, [orderId]: true }));
    setError("");
    try {
      const updated = await authRequest(`/api/orders/${orderId}/status`, token, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus })
      });
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: updated.status } : order))
      );
      if (selectedOrderId === orderId) {
        fetchHistory(orderId);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingIds((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const filteredOrders =
    statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter);

  return (
    <section className="section">
      <Seo
        title="Admin"
        description="Admin dashboard for managing orders, analytics, and customer activity."
        canonical="https://joshemcleaning.com/admin"
        noIndex
      />
      <div className="container admin-grid">
        <div className="panel">
          <h2>Admin dashboard</h2>
          <p>Monitor customer activity and order statuses.</p>
          {error && <p className="error">{error}</p>}
          <div className="metric-grid">
            <div>
              <span>Total customers</span>
              <strong>{analytics.totalCustomers}</strong>
            </div>
            {analytics.ordersByStatus.map((row) => (
              <div key={row.status}>
                <span>{formatStatus(row.status)}</span>
                <strong>{row.count}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="admin-panel-head">
            <h3>Latest orders</h3>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter orders by status"
            >
              <option value="all">All statuses</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <ul className="order-list">
            {filteredOrders.map((order) => (
              <li
                key={order.id}
                className={selectedOrderId === order.id ? "active" : ""}
                onClick={() => onSelectOrder(order.id)}
              >
                <div>
                  <strong>{order.customer_name}</strong>
                  <p>{order.service_name}</p>
                </div>
                <span className={`status-pill status-${order.status.replace(/[\s_]+/g, "-").toLowerCase()}`}>
                  {formatStatus(order.status)}
                </span>
                <div className="admin-order-actions">
                  <select
                    value={statusEdits[order.id] || order.status}
                    onChange={(event) =>
                      setStatusEdits((prev) => ({ ...prev, [order.id]: event.target.value }))
                    }
                    onClick={(event) => event.stopPropagation()}
                    aria-label={`Set status for order ${order.id}`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn solid"
                    onClick={(event) => {
                      event.stopPropagation();
                      updateStatus(order.id);
                    }}
                    disabled={savingIds[order.id]}
                  >
                    {savingIds[order.id] ? "Updating..." : "Update"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Owner notifications</h3>
          <ul className="admin-notifications">
            {notifications.map((note) => (
              <li key={note.id}>
                <strong>{note.title}</strong>
                <p>{note.message}</p>
                {note.service_name && <small>{note.service_name}</small>}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Order timeline</h3>
          {selectedOrderId ? (
            <div className="admin-timeline">
              {loadingHistory[selectedOrderId] && <p>Loading history...</p>}
              {!loadingHistory[selectedOrderId] && (
                <ul className="timeline">
                  {(orderHistory[selectedOrderId] || []).map((event) => (
                    <li key={event.id || `${event.new_status}-${event.changed_at}`}>
                      <strong>{formatStatus(event.new_status || event.status)}</strong>
                      <span>{event.changed_by_name || "System"}</span>
                      <small>
                        {event.changed_at
                          ? new Date(event.changed_at).toLocaleString()
                          : event.updated_at
                            ? new Date(event.updated_at).toLocaleString()
                            : ""}
                      </small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p>Select an order to view its timeline.</p>
          )}
        </div>
      </div>
    </section>
  );
}
