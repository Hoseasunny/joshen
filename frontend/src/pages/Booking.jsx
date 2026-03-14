import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { authRequest } from "../lib/api.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Booking() {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({
    address: "",
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      const data = await authRequest("/api/services", token);
      setServices(data);
    };
    if (token) {
      loadServices();
    }
  }, [token]);

  const validate = () => {
    const newErrors = {};
    if (!selectedService) newErrors.service = "Please select a service";
    if (!selectedDate) newErrors.date = "Please select a date and time";
    if (!form.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!validate()) return;
    const payload = {
      serviceId: selectedService.id,
      scheduledAt: selectedDate.toISOString(),
      address: form.address,
      notes: form.notes
    };
    try {
      const result = await authRequest("/api/orders", token, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setBookingDetails({
        id: result.id,
        serviceName: selectedService.name,
        scheduledAt: selectedDate.toLocaleString(),
        address: form.address
      });
      setSuccess(true);
      setForm({ address: "", notes: "" });
      setSelectedService(null);
      setSelectedDate(null);
      setErrors({});
    } catch (err) {
      setMessage(err.message);
    }
  };

  const progress = (() => {
    let p = 0;
    if (selectedService) p += 33;
    if (selectedDate) p += 33;
    if (form.address.trim()) p += 34;
    return p;
  })();

  if (success) {
    return (
      <section className="section">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Your cleaning service has been scheduled.</p>
            <div className="booking-details">
              <p><strong>Service:</strong> {bookingDetails?.serviceName}</p>
              <p><strong>Date & Time:</strong> {bookingDetails?.scheduledAt}</p>
              <p><strong>Address:</strong> {bookingDetails?.address}</p>
              <p><strong>Order ID:</strong> {bookingDetails?.id}</p>
            </div>
            <button className="btn solid" onClick={() => setSuccess(false)}>Book Another</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container booking-container">
        <div className="booking-card">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            <div className="progress-steps">
              <span className={selectedService ? "active" : ""}>1. Service</span>
              <span className={selectedDate ? "active" : ""}>2. Time</span>
              <span className={form.address ? "active" : ""}>3. Details</span>
            </div>
          </div>
          <h2>Book a cleaning service</h2>
          <p>Choose a service, schedule a time, and confirm your address.</p>
          {message && <p className="notice error">{message}</p>}
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Service</label>
              <div className="service-options">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`service-card ${selectedService?.id === service.id ? "selected" : ""}`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="service-icon">
                      {service.name.includes("Home") ? "🏠" : service.name.includes("Office") ? "🏢" : "🧹"}
                    </div>
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>
              {errors.service && <span className="field-error">{errors.service}</span>}
            </div>
            <div className="form-group">
              <label>Date & time</label>
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                placeholderText="Select date and time"
                className="date-picker"
              />
              {errors.date && <span className="field-error">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Estate, building, apartment"
                required
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </div>
            <div className="form-group">
              <label>Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows="3"
              />
            </div>
            <button type="submit" className="btn solid sticky-btn">Confirm booking</button>
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
