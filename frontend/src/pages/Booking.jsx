import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { authRequest } from "../lib/api.js";

export default function Booking() {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    serviceId: "",
    scheduledAt: "",
    address: "",
    notes: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      const data = await authRequest("/api/services", token);
      setServices(data);
    };
    if (token) {
      loadServices();
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const payload = {
      serviceId: Number(form.serviceId),
      scheduledAt: form.scheduledAt,
      address: form.address,
      notes: form.notes
    };
    try {
      await authRequest("/api/orders", token, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setMessage("Booking created. You can track the order status in Tracking.");
      setForm({ serviceId: "", scheduledAt: "", address: "", notes: "" });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="section">
      <div className="container booking-grid">
        <div>
          <h2>Book a cleaning service</h2>
          <p>Choose a service, schedule a time, and confirm your address.</p>
          {message && <p className="notice">{message}</p>}
          <form className="booking-form" onSubmit={handleSubmit}>
            <label>
              Service
              <select value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })} required>
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
            </label>
            <label>
              Date & time
              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                required
              />
            </label>
            <label>
              Address
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Estate, building, apartment"
                required
              />
            </label>
            <label>
              Notes (optional)
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows="3"
              />
            </label>
            <button type="submit" className="btn solid">Confirm booking</button>
          </form>
        </div>
        <aside className="booking-info">
          <h3>What happens next</h3>
          <ol>
            <li>We confirm your booking details.</li>
            <li>A cleaner is assigned to your order.</li>
            <li>You receive status updates until completion.</li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
