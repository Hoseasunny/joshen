import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

const services = [
  {
    title: "Residential Cleaning",
    description: "Deep cleaning for apartments and homes with eco-safe products and checklist quality control.",
    icon: "home"
  },
  {
    title: "Office Cleaning",
    description: "Flexible daily, weekly, and after-hours office cleaning built for productive workspaces.",
    icon: "office"
  },
  {
    title: "Laundry and Ironing",
    description: "Pickup-ready laundry workflow with fabric-safe handling and same-day options.",
    icon: "laundry"
  },
  {
    title: "Carpet and Upholstery",
    description: "Targeted stain treatment, deodorizing, and texture-safe extraction methods.",
    icon: "sofa"
  },
  {
    title: "Move-In and Move-Out",
    description: "Complete transition cleaning for tenants, landlords, and property managers.",
    icon: "move"
  },
  {
    title: "Outdoor and Compound",
    description: "Compound sweeping, pressure washing, and external surface care for first impressions.",
    icon: "outdoor"
  }
];

const counters = [
  { label: "Clients served", value: 3200, suffix: "+" },
  { label: "Years in business", value: 9, suffix: "+" },
  { label: "Jobs completed", value: 14800, suffix: "+" },
  { label: "Satisfaction score", value: 98, suffix: "%" }
];

const testimonials = [
  {
    name: "Mercy N.",
    role: "Homeowner",
    quote: "The team was punctual, polite, and detail-focused. My house looked brand new.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=80",
    rating: 5
  },
  {
    name: "David O.",
    role: "Facility Manager",
    quote: "Live tracking and status updates make operations easier for our office branches.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=80",
    rating: 5
  },
  {
    name: "Amina K.",
    role: "Business Owner",
    quote: "Booking and rescheduling are seamless. The cleaners are consistent and professional.",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=180&q=80",
    rating: 4
  }
];

const faqItems = [
  {
    icon: "clock",
    q: "How quickly can I get a booking?",
    a: "Most bookings are confirmed within minutes, and same-day slots are available based on area coverage."
  },
  {
    icon: "shield",
    q: "Do you bring cleaning supplies?",
    a: "Yes. Our teams arrive with professional supplies and equipment unless you request specific products."
  },
  {
    icon: "track",
    q: "Can I track my order in real time?",
    a: "Yes. You can monitor status from confirmation to completion through your tracking dashboard."
  },
  {
    icon: "calendar",
    q: "Do you clean offices outside business hours?",
    a: "Yes. We support early morning, evening, and weekend schedules for minimal disruption."
  }
];

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
    alt: "Sparkling modern kitchen after deep cleaning",
    tag: "Kitchen Refresh"
  },
  {
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80",
    alt: "Living room carpet and upholstery after stain removal",
    tag: "Living Room"
  },
  {
    src: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1000&q=80",
    alt: "Bathroom sanitization and washroom detailing",
    tag: "Washroom Care"
  },
  {
    src: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1000&q=80",
    alt: "Office desk and floor cleaning service",
    tag: "Office Zone"
  },
  {
    src: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1000&q=80",
    alt: "Before and after cleaning supplies in organized cart",
    tag: "Pro Team"
  },
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80",
    alt: "Freshly cleaned and organized bedroom",
    tag: "Bedroom Reset"
  }
];

const blogPosts = [
  {
    title: "5 AI-backed ways to keep your home cleaner between visits",
    excerpt: "Simple routines driven by usage patterns and high-touch zone prioritization.",
    date: "March 2026"
  },
  {
    title: "How to reduce office dust buildup by 40%",
    excerpt: "A practical workflow combining ventilation checks, zoning, and scheduling strategy.",
    date: "February 2026"
  },
  {
    title: "Before/After checklist for move-out cleaning",
    excerpt: "A room-by-room framework to secure faster handovers and fewer disputes.",
    date: "January 2026"
  }
];

const trackingStages = ["Pending", "Confirmed", "Assigned", "In Progress", "Completed"];
const trustBadges = ["Verified Reviews", "Insured Teams", "Eco-Safe Products"];

function iconFor(type) {
  switch (type) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 11.4 12 4l9 7.4V21h-6v-5h-6v5H3z" />
        </svg>
      );
    case "office":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 20V6l8-3v17H4zm10 0V8h6v12h-6zM7 9h2v2H7V9zm0 4h2v2H7v-2z" />
        </svg>
      );
    case "laundry":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 3h16v18H4V3zm3 2h2v2H7V5zm4 0h6v2h-6V5zm1 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
        </svg>
      );
    case "sofa":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 10a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6h-2v2h-2v-2H8v2H6v-2H4v-6zm4 0h8v4H8v-4z" />
        </svg>
      );
    case "move":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 7h11v11H3V7zm13 3h5l-2.5 4L16 10zm-9 0h3v3H7v-3z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 18h18v2H3v-2zm3-3 3-7h6l3 7H6zm5-9h2v2h-2V6z" />
        </svg>
      );
  }
}

function buildChatReply(message) {
  const input = message.toLowerCase();
  if (input.includes("price") || input.includes("cost")) {
    return "Pricing depends on space size and service type. Share your location and service and I can suggest the best package.";
  }
  if (input.includes("book") || input.includes("booking")) {
    return "You can book instantly from the smart booking form below or the Book Now button in the hero section.";
  }
  if (input.includes("track") || input.includes("status")) {
    return "Use the Track page for full progress updates. Typical flow: Pending -> Confirmed -> Assigned -> In Progress -> Completed.";
  }
  if (input.includes("time") || input.includes("hour")) {
    return "Our standard service window is Monday to Saturday, 7:00 AM to 7:00 PM, with flexible business bookings.";
  }
  return "Thanks for your message. I can help with booking, pricing, tracking, and service recommendations.";
}

function faqIconFor(type) {
  if (type === "clock") return "⏱";
  if (type === "shield") return "🛡";
  if (type === "track") return "📍";
  return "📅";
}

export default function Home() {
  const homeRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [countValues, setCountValues] = useState(counters.map(() => 0));
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeService, setActiveService] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [trackingIndex, setTrackingIndex] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "Hi, I am JOSHEM AI assistant. Ask me about booking, pricing, or tracking." }
  ]);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    notes: ""
  });
  const [bookingErrors, setBookingErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState("");
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: `${6 + (index * 7) % 86}%`,
        size: `${10 + (index % 5) * 6}px`,
        delay: `${index * 0.28}s`,
        duration: `${5 + (index % 4)}s`
      })),
    []
  );

  const suggestedService = useMemo(() => {
    const note = bookingForm.notes.toLowerCase();
    if (!note) return "";
    if (note.includes("office") || note.includes("work")) return "Office Cleaning";
    if (note.includes("sofa") || note.includes("carpet")) return "Carpet and Upholstery";
    if (note.includes("move") || note.includes("tenant")) return "Move-In and Move-Out";
    if (note.includes("compound") || note.includes("outside")) return "Outdoor and Compound";
    return "Residential Cleaning";
  }, [bookingForm.notes]);

  useEffect(() => {
    document.title = "JOSHEM Cleaning Services | Professional Modern Cleaning";

    const sections = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const homeNode = homeRef.current;
    if (!homeNode) return undefined;
    let frame = null;

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        homeNode.style.setProperty("--page-shift", `${window.scrollY.toFixed(1)}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const heroNode = heroRef.current;
    if (!heroNode) return undefined;
    let frame = null;

    const onMouseMove = (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = heroNode.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        heroNode.style.setProperty("--mx", `${x.toFixed(3)}`);
        heroNode.style.setProperty("--my", `${y.toFixed(3)}`);
      });
    };

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollFactor = window.matchMedia("(max-width: 740px)").matches ? 0.035 : 0.08;
        heroNode.style.setProperty("--sy", `${window.scrollY * scrollFactor}px`);
      });
    };

    heroNode.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      heroNode.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTrackingIndex((prev) => (prev + 1) % trackingStages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const statsNode = statsRef.current;
    if (!statsNode) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;

        const duration = 1200;
        const start = performance.now();

        const animate = (timestamp) => {
          const progress = Math.min((timestamp - start) / duration, 1);
          setCountValues(counters.map((counter) => Math.floor(counter.value * progress)));
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(statsNode);
    return () => observer.disconnect();
  }, []);

  function submitChat(event) {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    const userMessage = { role: "user", text: trimmed };
    const botMessage = { role: "bot", text: buildChatReply(trimmed) };
    setChatMessages((prev) => [...prev, userMessage, botMessage]);
    setChatInput("");
  }

  function validateBooking() {
    const errors = {};
    if (bookingForm.name.trim().length < 2) errors.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(bookingForm.email)) errors.email = "Enter a valid email.";
    if (!/^\+?[0-9\s-]{10,15}$/.test(bookingForm.phone)) errors.phone = "Enter a valid phone number.";
    if (!bookingForm.service.trim()) errors.service = "Choose a service.";
    if (!bookingForm.date) errors.date = "Select a preferred date.";
    return errors;
  }

  function submitBooking(event) {
    event.preventDefault();
    const errors = validateBooking();
    setBookingErrors(errors);
    if (Object.keys(errors).length > 0) {
      setBookingSuccess("");
      return;
    }
    setBookingSuccess("Booking request submitted. Our AI scheduler will confirm your slot shortly.");
  }

  function onServiceClick(title) {
    setActiveService(title);
    setTimeout(() => setActiveService(""), 300);
  }

  function onTiltMove(event) {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;
    node.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    node.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  }

  function resetTilt(event) {
    const node = event.currentTarget;
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div className="home modern-home" id="top" ref={homeRef}>
      <section className="hero reveal depth-near" id="home" ref={heroRef}>
        <div className="hero-scene" aria-hidden="true">
          <span className="layer layer-one" />
          <span className="layer layer-two" />
          <span className="layer layer-three" />
          <span className="tool tool-spray">spray</span>
          <span className="tool tool-bucket">wash</span>
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="sparkle"
              style={{
                left: particle.left,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
        <div className="container hero-grid">
          <div className="hero-copy hero-enter">
            <span className="eyebrow">Trusted cleaning for modern homes and businesses</span>
            <h1>Professional cleaning that is easy to book, track, and trust.</h1>
            <p>
              JOSHEM combines vetted teams, AI-assisted scheduling, and real-time tracking to deliver
              consistent results across residential and commercial spaces.
            </p>
            <div className="hero-actions">
              <Link to="/booking" className="btn solid nav-book">Book Now</Link>
              <a href="#services" className="btn ghost hero-secondary">Explore Services</a>
            </div>
          </div>
          <div className="hero-card" aria-label="Live order tracking preview">
            <h3>AI Order Tracking Dashboard</h3>
            <ul className="flow-list">
              {trackingStages.map((stage, index) => (
                <li key={stage} className={index <= trackingIndex ? "is-live" : ""}>
                  <span className="dot" aria-hidden="true" />
                  <span>{stage}</span>
                </li>
              ))}
            </ul>
            <div className="tracking-progress" aria-label="Order progress">
              {trackingStages.map((stage, index) => (
                <div key={`progress-${stage}`} className="progress-row">
                  <span>{stage}</span>
                  <div className="progress-track">
                    <span
                      className={`progress-fill ${index <= trackingIndex ? "active" : ""}`}
                      style={{ width: index <= trackingIndex ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mini-note">Live status refresh every few seconds.</p>
          </div>
        </div>
      </section>

      <section className="section stats reveal" id="about" ref={statsRef}>
        <div className="container">
          <div className="section-head">
            <h2>Built on consistency, transparency, and quality</h2>
            <p>
              We help households and businesses maintain cleaner spaces through process-driven
              operations and responsive support.
            </p>
          </div>
          <div className="counter-grid" aria-label="Company statistics">
            {counters.map((counter, index) => (
              <article key={counter.label} className="counter-card">
                <h3>{countValues[index].toLocaleString()}{counter.suffix}</h3>
                <p>{counter.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services reveal" id="services">
        <div className="container">
          <div className="section-head">
            <h2>Our services</h2>
            <p>Comprehensive cleaning options delivered by trained professionals.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
            <article
              key={service.title}
              className={`service-tile ${activeService === service.title ? "pulse" : ""}`}
              style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" }}
              onMouseMove={onTiltMove}
              onMouseLeave={resetTilt}
              onClick={() => onServiceClick(service.title)}
              role="button"
              tabIndex={0}
                onKeyDown={(event) => event.key === "Enter" && onServiceClick(service.title)}
                aria-label={`Open ${service.title}`}
              >
                <div className="service-icon" aria-hidden="true">{iconFor(service.icon)}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/booking" className="service-link">Book this service</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials reveal" id="testimonials">
        <div className="container">
          <div className="section-head">
            <h2>What our clients say</h2>
            <p>Verified feedback from homes, offices, and facilities we support.</p>
          </div>
          <div className="testimonial-slider" aria-live="polite">
            <button
              type="button"
              className="slider-control"
              aria-label="Previous testimonial"
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              ‹
            </button>
            <article key={activeTestimonial} className="testimonial-active flip-card">
              <img src={testimonials[activeTestimonial].photo} alt={`${testimonials[activeTestimonial].name} portrait`} loading="lazy" />
              <p>"{testimonials[activeTestimonial].quote}"</p>
              <div className="rating" aria-label={`${testimonials[activeTestimonial].rating} out of 5 stars`}>
                {"★".repeat(testimonials[activeTestimonial].rating)}
                {"☆".repeat(5 - testimonials[activeTestimonial].rating)}
              </div>
              <h4>{testimonials[activeTestimonial].name}</h4>
              <small>{testimonials[activeTestimonial].role}</small>
              <div className="trust-badges" aria-label="Trust badges">
                {trustBadges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </article>
            <button
              type="button"
              className="slider-control"
              aria-label="Next testimonial"
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="section faq reveal depth-far" id="faq">
        <div className="container">
          <div className="section-head">
            <h2>Frequently asked questions</h2>
            <p>Answers to common concerns before you place a booking.</p>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <article key={item.q} className={`faq-item ${openFaq === index ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="faq-label">
                    <span className="faq-icon" aria-hidden="true">{faqIconFor(item.icon)}</span>
                    <span>{item.q}</span>
                  </span>
                  <span aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery reveal depth-mid" id="gallery">
        <div className="container">
          <div className="section-head">
            <h2>Before and after gallery</h2>
            <p>Tap any image to view details in lightbox mode.</p>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <button
                key={item.src}
                type="button"
                className="gallery-item"
                style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" }}
                onMouseMove={onTiltMove}
                onMouseLeave={resetTilt}
                onClick={() => setLightbox(item)}
                aria-label={`Open image: ${item.tag}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span>{item.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section reveal" id="contact">
        <div className="container contact-layout">
          <div>
            <div className="section-head section-left">
              <h2>Contact and smart booking</h2>
              <p>Use our AI-assisted booking form for faster service matching and validation.</p>
            </div>
            <form className="smart-booking" onSubmit={submitBooking} noValidate>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                value={bookingForm.name}
                onChange={(event) => setBookingForm((prev) => ({ ...prev, name: event.target.value }))}
                aria-invalid={Boolean(bookingErrors.name)}
              />
              {bookingErrors.name && <p className="field-error">{bookingErrors.name}</p>}

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={bookingForm.email}
                onChange={(event) => setBookingForm((prev) => ({ ...prev, email: event.target.value }))}
                aria-invalid={Boolean(bookingErrors.email)}
              />
              {bookingErrors.email && <p className="field-error">{bookingErrors.email}</p>}

              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                value={bookingForm.phone}
                onChange={(event) => setBookingForm((prev) => ({ ...prev, phone: event.target.value }))}
                aria-invalid={Boolean(bookingErrors.phone)}
              />
              {bookingErrors.phone && <p className="field-error">{bookingErrors.phone}</p>}

              <label htmlFor="service">Service</label>
              <input
                id="service"
                list="services"
                value={bookingForm.service}
                onChange={(event) => setBookingForm((prev) => ({ ...prev, service: event.target.value }))}
                aria-invalid={Boolean(bookingErrors.service)}
                placeholder="Start typing to get suggestions"
              />
              <datalist id="services">
                {services.map((service) => (
                  <option key={service.title} value={service.title} />
                ))}
              </datalist>
              {bookingErrors.service && <p className="field-error">{bookingErrors.service}</p>}

              <label htmlFor="date">Preferred date</label>
              <input
                id="date"
                type="date"
                value={bookingForm.date}
                onChange={(event) => setBookingForm((prev) => ({ ...prev, date: event.target.value }))}
                aria-invalid={Boolean(bookingErrors.date)}
              />
              {bookingErrors.date && <p className="field-error">{bookingErrors.date}</p>}

              <label htmlFor="notes">Notes for AI suggestion</label>
              <textarea
                id="notes"
                rows="3"
                value={bookingForm.notes}
                onChange={(event) => setBookingForm((prev) => ({ ...prev, notes: event.target.value }))}
                placeholder="Example: small office, 4 rooms, weekends preferred"
              />

              {suggestedService && (
                <p className="ai-hint">
                  Suggested service: <strong>{suggestedService}</strong>
                  <button
                    type="button"
                    onClick={() => setBookingForm((prev) => ({ ...prev, service: suggestedService }))}
                  >
                    Use suggestion
                  </button>
                </p>
              )}

              <button type="submit" className="btn solid">Submit booking request</button>
              {bookingSuccess && <p className="success-note">{bookingSuccess}</p>}
            </form>
          </div>

          <div className="contact-side">
            <div className="contact-cards">
              <article>
                <h3>Phone</h3>
                <a href="tel:+254717785782">+254 717 785 782</a>
              </article>
              <article>
                <h3>Email</h3>
                <a href="mailto:joshemcleaners@gmail.com">joshemcleaners@gmail.com</a>
              </article>
              <article>
                <h3>Hours</h3>
                <p>Mon - Sat, 7:00 AM - 7:00 PM</p>
              </article>
            </div>

            <div className="map-wrap">
              <iframe
                title="JOSHEM Cleaning Services location map"
                src="https://www.google.com/maps?q=Nairobi%2C%20Kenya&z=12&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section blog reveal" id="blog">
        <div className="container">
          <div className="section-head">
            <h2>Cleaning tips and insights</h2>
            <p>AI-assisted guides and best practices from our operations team.</p>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.title} className="blog-card">
                <small>{post.date}</small>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href="#contact">Read more</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <a
        className="whatsapp-float"
        href="https://wa.me/254717785782"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with JOSHEM on WhatsApp"
      >
        WhatsApp
      </a>

      <div className={`chatbot ${chatOpen ? "open" : ""}`} aria-live="polite">
        <button
          type="button"
          className="chatbot-toggle"
          onClick={() => setChatOpen((prev) => !prev)}
          aria-expanded={chatOpen}
          aria-label="Toggle AI assistant"
        >
          {chatOpen ? "Close AI" : "AI Help"}
        </button>

        {chatOpen && (
          <div className="chatbot-panel">
            <h3>JOSHEM AI Support</h3>
            <div className="chat-log">
              {chatMessages.map((message, index) => (
                <p key={`${message.role}-${index}`} className={`chat-${message.role}`}>
                  {message.text}
                </p>
              ))}
            </div>
            <form onSubmit={submitChat} className="chat-form">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about booking or tracking"
                aria-label="Message AI support"
              />
              <button type="submit" className="btn solid">Send</button>
            </form>
          </div>
        )}
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery preview">
          <button type="button" className="lightbox-close" onClick={() => setLightbox(null)}>
            Close
          </button>
          <img src={lightbox.src} alt={lightbox.alt} />
          <p>{lightbox.tag}</p>
        </div>
      )}
    </div>
  );
}
