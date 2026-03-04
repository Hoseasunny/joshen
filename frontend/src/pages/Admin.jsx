import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { authRequest } from "../lib/api.js";

export default function Admin() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({ ordersByStatus: [], totalCustomers: 0 });

  useEffect(() => {
    const loadAdmin = async () => {
      const [ordersData, analyticsData] = await Promise.all([
        authRequest("/api/admin/orders", token),
        authRequest("/api/admin/analytics", token)
      ]);
      setOrders(ordersData);
      setAnalytics(analyticsData);
    };
    if (token) {
      loadAdmin();
    }
  }, [token]);

  return (
    <section className="section">
      <div className="container admin-grid">
        <div className="panel">
          <h2>Admin dashboard</h2>
          <p>Monitor customer activity and order statuses.</p>
          <div className="metric-grid">
            <div>
              <span>Total customers</span>
              <strong>{analytics.totalCustomers}</strong>
            </div>
            {analytics.ordersByStatus.map((row) => (
              <div key={row.status}>
                <span>{row.status}</span>
                <strong>{row.count}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h3>Latest orders</h3>
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id}>
                <div>
                  <strong>{order.customer_name}</strong>
                  <p>{order.service_name}</p>
                </div>
                <span className={`status-pill status-${order.status.replace(/\s+/g, "-").toLowerCase()}`}>
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
