import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { authRequest } from "../lib/api.js";

export default function Tracking() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await authRequest("/api/orders", token);
      setOrders(data);
    };
    if (token) {
      loadOrders();
    }
  }, [token]);

  useEffect(() => {
    const loadHistory = async () => {
      if (!selected) {
        setHistory([]);
        return;
      }
      const data = await authRequest(`/api/orders/${selected.id}/history`, token);
      setHistory(data);
    };
    if (token) {
      loadHistory();
    }
  }, [selected, token]);

  return (
    <section className="section">
      <div className="container tracking-grid">
        <div>
          <h2>Track your order</h2>
          <p>Select an order to see status updates.</p>
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className={selected?.id === order.id ? "active" : ""}>
                <button type="button" onClick={() => setSelected(order)}>
                  <div>
                    <strong>{order.service_name}</strong>
                    <p>{new Date(order.scheduled_at).toLocaleString()}</p>
                  </div>
                  <span className={`status-pill status-${order.status.replace(/\s+/g, "-").toLowerCase()}`}>
                    {order.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Status timeline</h3>
          {history.length === 0 ? (
            <p>No status updates yet.</p>
          ) : (
            <ul className="timeline">
              {history.map((item, index) => (
                <li key={`${item.status}-${index}`}>
                  <strong>{item.status}</strong>
                  <span>{new Date(item.updated_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
