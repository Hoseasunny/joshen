import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { authRequest } from "../lib/api.js";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await authRequest("/api/orders", token);
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) {
      loadOrders();
    }
  }, [token]);

  return (
    <section className="section">
      <div className="container">
        <div className="dashboard-grid">
          <div className="panel">
            <h2>Welcome, {user?.name}</h2>
            <p>Manage your profile and track all your bookings in one place.</p>
            <div className="profile-card">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
              <p><strong>Role:</strong> {user?.role}</p>
            </div>
          </div>
          <div className="panel">
            <h3>Recent orders</h3>
            {orders.length === 0 ? (
              <p>No orders yet. Book your first service today.</p>
            ) : (
              <ul className="order-list">
                {orders.map((order) => (
                  <li key={order.id}>
                    <div>
                      <strong>{order.service_name}</strong>
                      <p>{new Date(order.scheduled_at).toLocaleString()}</p>
                    </div>
                    <span className={`status-pill status-${order.status.replace(/\s+/g, "-").toLowerCase()}`}>
                      {order.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
