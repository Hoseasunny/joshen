import { Link } from "react-router-dom";

const services = [
  "Residential Cleaning + Washroom",
  "Office Cleaning + Washroom",
  "Laundry Services",
  "Sofa & Upholstery Cleaning",
  "Carpet & Rug Cleaning",
  "Washroom & Toilet Cleaning Only",
  "Upholstery & Fabric Cleaning",
  "Move-In / Move-Out Cleaning",
  "Outdoor & Compound Cleaning"
];

const statusList = [
  "Pending",
  "Confirmed",
  "Assigned",
  "In Progress",
  "Completed",
  "Cancelled"
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Modern cleaning platform</span>
            <h1>Book. Track. Relax. A smarter way to keep everything spotless.</h1>
            <p>
              JOSHEM delivers professional cleaning with real-time order tracking, trusted teams,
              and flexible scheduling built for busy homes and growing businesses.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn solid">Create account</Link>
              <Link to="/booking" className="btn ghost">Book a service</Link>
            </div>
          </div>
          <div className="hero-card">
            <h3>Live order flow</h3>
            <ul>
              {statusList.map((status) => (
                <li key={status}>{status}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section services">
        <div className="container">
          <div className="section-head">
            <h2>Services that fit every space</h2>
            <p>Choose from a full catalog of residential, commercial, and specialty cleaning.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article key={service} className="service-tile">
                <h3>{service}</h3>
                <p>Trusted teams, safe products, and flexible scheduling.</p>
                <Link to="/booking">Book this service</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section split">
        <div className="container split-grid">
          <div>
            <h2>Designed for customers and operations</h2>
            <p>
              The platform connects booking, scheduling, and tracking in one experience. Customers
              stay informed while the admin team manages assignments, statuses, and analytics.
            </p>
          </div>
          <div className="split-card">
            <h4>What you can do</h4>
            <ul>
              <li>Create an account and manage your profile.</li>
              <li>Book cleaning services in minutes.</li>
              <li>Track order status updates end-to-end.</li>
              <li>Admins assign cleaners and monitor performance.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section callout">
        <div className="container callout-grid">
          <div>
            <h2>Ready to experience a cleaner workflow?</h2>
            <p>Join the digital cleaning platform built for speed, trust, and transparency.</p>
          </div>
          <Link to="/register" className="btn solid">Start now</Link>
        </div>
      </section>
    </div>
  );
}
