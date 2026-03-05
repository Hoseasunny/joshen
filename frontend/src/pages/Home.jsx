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

const whyChooseUs = [
  {
    title: "Verified cleaning teams",
    text: "Each cleaner is vetted and trained for safe, reliable, and detail-focused service."
  },
  {
    title: "Flexible booking windows",
    text: "Choose a schedule that fits your day with fast rescheduling when plans change."
  },
  {
    title: "Live status tracking",
    text: "See your cleaning progress in real time from assignment to completion."
  },
  {
    title: "Quality-first process",
    text: "We follow clear checklists and quality reviews to keep standards consistently high."
  }
];

const galleryItems = [
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
];

const testimonials = [
  {
    quote: "Booking took less than five minutes and the team arrived right on time. Excellent service.",
    name: "Mercy N."
  },
  {
    quote: "I like the tracking updates. I always know exactly what stage my order is in.",
    name: "David O."
  },
  {
    quote: "Our office cleaning quality has improved a lot since switching to JOSHEM.",
    name: "Amina K."
  }
];

const contacts = [
  {
    title: "Phone",
    value: "0717 785 782",
    href: "tel:+254717785782"
  },
  {
    title: "Email",
    value: "joshemcleaners@gmail.com",
    href: "mailto:joshemcleaners@gmail.com"
  },
  {
    title: "Working Hours",
    value: "Mon - Sat, 7:00 AM - 7:00 PM"
  },
  {
    title: "Location",
    value: "Nairobi, Kenya"
  }
];

/**
 * Home page component
 * @returns {JSX.Element} Home page with hero section, services section, split section, and callout section
 */
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

      <section className="section why-choose">
        <div className="container">
          <div className="section-head">
            <h2>Why choose us</h2>
            <p>Built for dependable results, transparent updates, and convenience at every step.</p>
          </div>
          <div className="feature-grid">
            {whyChooseUs.map((feature) => (
              <article key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery">
        <div className="container">
          <div className="section-head">
            <h2>Gallery</h2>
            <p>A glimpse of the spaces and surfaces our teams bring back to life.</p>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((image, index) => (
              <article key={image} className="gallery-item">
                <img src={image} alt={`Cleaning result showcase ${index + 1}`} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials">
        <div className="container">
          <div className="section-head">
            <h2>Testimonials</h2>
            <p>What customers say after using JOSHEM services.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card">
                <p>"{testimonial.quote}"</p>
                <h4>{testimonial.name}</h4>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contacts">
        <div className="container">
          <div className="section-head">
            <h2>Contact us</h2>
            <p>Reach out for inquiries, quotes, and fast booking support.</p>
          </div>
          <div className="contact-grid">
            {contacts.map((contact) => (
              <article key={contact.title} className="contact-card">
                <h3>{contact.title}</h3>
                {contact.href ? <a href={contact.href}>{contact.value}</a> : <p>{contact.value}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
