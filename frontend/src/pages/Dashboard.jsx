import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { authRequest } from "../lib/api.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [upcomingOrder, setUpcomingOrder] = useState(null);
  const [services, setServices] = useState([]);
  const [quickBook, setQuickBook] = useState({ serviceId: "", date: null });
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersData, notificationsData, servicesData] = await Promise.all([
          authRequest("/api/orders", token),
          authRequest("/api/notifications", token),
          authRequest("/api/services", token)
        ]);
        setOrders(ordersData);
        setNotifications(notificationsData);
        setServices(servicesData);

        // Find upcoming order
        const now = new Date();
        const upcoming = ordersData
          .filter(order => new Date(order.scheduled_at) > now && ['pending', 'confirmed'].includes(order.status))
          .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))[0];
        setUpcomingOrder(upcoming);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) {
      loadData();
    }
  }, [token]);

  const handleQuickBook = async (e) => {
    e.preventDefault();
    if (!quickBook.serviceId || !quickBook.date) return;
    try {
      await authRequest("/api/orders", token, {
        method: "POST",
        body: JSON.stringify({
          serviceId: Number(quickBook.serviceId),
          scheduledAt: quickBook.date.toISOString(),
          address: "Quick book - update address later"
        })
      });
      // Refresh data
      const ordersData = await authRequest("/api/orders", token);
      setOrders(ordersData);
      setQuickBook({ serviceId: "", date: null });
      alert("Quick booking successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Ready to keep your space sparkling? Let's get started.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Key Actions Cards */}
          <div className="action-cards">
            <Link to="/booking" className="action-card">
              <div className="action-icon">📅</div>
              <h3>Book a Service</h3>
              <p>Schedule a new cleaning</p>
            </Link>
            <Link to="/tracking" className="action-card">
              <div className="action-icon">📋</div>
              <h3>View Bookings</h3>
              <p>Track your orders</p>
            </Link>
            <div className="action-card" onClick={() => setShowNotifications(!showNotifications)}>
              <div className="action-icon">🔔</div>
              <h3>Notifications</h3>
              <p>{unreadCount} unread</p>
            </div>
          </div>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="notifications-panel">
              <h3>Notifications</h3>
              {notifications.length === 0 ? (
                <p>No notifications yet.</p>
              ) : (
                <ul>
                  {notifications.map((notif) => (
                    <li key={notif.id} className={notif.is_read ? "read" : "unread"}>
                      <strong>{notif.title}</strong>
                      <p>{notif.message}</p>
                      <small>{new Date(notif.created_at).toLocaleString()}</small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="dashboard-grid">
            {/* Quick Booking Widget */}
            <div className="panel quick-book">
              <h3>Quick Book</h3>
              <form onSubmit={handleQuickBook}>
                <select
                  value={quickBook.serviceId}
                  onChange={(e) => setQuickBook({ ...quickBook, serviceId: e.target.value })}
                  required
                >
                  <option value="">Select service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <DatePicker
                  selected={quickBook.date}
                  onChange={(date) => setQuickBook({ ...quickBook, date })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={new Date()}
                  placeholderText="Select date & time"
                  className="date-picker"
                />
                <button type="submit" className="btn solid">Book Now</button>
              </form>
            </div>

            {/* Upcoming Booking Preview */}
            {upcomingOrder && (
              <div className="panel upcoming">
                <h3>Upcoming Service</h3>
                <div className="upcoming-card">
                  <div className="upcoming-icon">🧹</div>
                  <div>
                    <h4>{upcomingOrder.service_name}</h4>
                    <p>{new Date(upcomingOrder.scheduled_at).toLocaleString()}</p>
                    <span className={`status-pill status-${upcomingOrder.status.replace(/\s+/g, "-").toLowerCase()}`}>
                      {upcomingOrder.status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Card */}
            <div className="panel">
              <h3>Your Profile</h3>
              <div className="profile-card">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone}</p>
                <p><strong>Role:</strong> {user?.role}</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="panel">
              <h3>Recent Orders</h3>
              {orders.length === 0 ? (
                <p>No orders yet. Book your first service today.</p>
              ) : (
                <ul className="order-list">
                  {orders.slice(0, 5).map((order) => (
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

      {/* Mobile Sticky Nav */}
      <nav className="mobile-nav">
        <Link to="/booking" className="nav-item">
          <div className="nav-icon">📅</div>
          <span>Book</span>
        </Link>
        <Link to="/tracking" className="nav-item">
          <div className="nav-icon">📋</div>
          <span>Bookings</span>
        </Link>
        <Link to="/dashboard" className="nav-item active">
          <div className="nav-icon">🏠</div>
          <span>Dashboard</span>
        </Link>
      </nav>
    </>
  );
}
