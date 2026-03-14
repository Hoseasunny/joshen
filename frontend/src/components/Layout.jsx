import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  function closeMenu() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  function onDrawerTouchStart(event) {
    touchStartX.current = event.touches[0]?.clientX || 0;
    touchCurrentX.current = touchStartX.current;
  }

  function onDrawerTouchMove(event) {
    touchCurrentX.current = event.touches[0]?.clientX || touchCurrentX.current;
  }

  function onDrawerTouchEnd() {
    const delta = touchCurrentX.current - touchStartX.current;
    if (delta > 60) {
      closeMenu();
    }
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-grid">
          <Link to="/" className="brand" onClick={closeMenu}>
            <span>JOSHEM</span>
            <small>Cleaning Services</small>
          </Link>

          <nav className="top-links" aria-label="Top links">
            <a href="/#home">Home</a>
            <a href="/#services">Services</a>
            <a href="/#testimonials">Testimonials</a>
            <a href="/#faq">FAQ</a>
            <Link to="/blog">Blog</Link>
            <a href="/#contact">Contact</a>
          </nav>

          <div className="header-right">
            <div className="header-cta">
              {user ? (
                <>
                  <span className="user-pill">Hi, {user.name}</span>
                  <button type="button" className="btn nav-signin" onClick={logout}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="btn nav-signin" onClick={closeMenu}>
                    Sign in
                  </NavLink>
                  <NavLink to="/booking" className="btn solid nav-book" onClick={closeMenu}>
                    Book Now
                  </NavLink>
                </>
              )}
            </div>

            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="site-drawer-nav"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="menu-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <div className={`menu-overlay ${menuOpen ? "show" : ""}`} onClick={closeMenu} aria-hidden={!menuOpen} />

      <nav
        id="site-drawer-nav"
        className={`site-nav drawer ${menuOpen ? "open" : ""}`}
        aria-label="Primary navigation"
        onTouchStart={onDrawerTouchStart}
        onTouchMove={onDrawerTouchMove}
        onTouchEnd={onDrawerTouchEnd}
      >
        <div className="drawer-head">
          <strong>Navigation</strong>
          <button type="button" className="drawer-close" onClick={closeMenu} aria-label="Close menu">
            X
          </button>
        </div>

        <button
          type="button"
          className="drawer-item accordion-trigger"
          aria-expanded={servicesOpen}
          aria-controls="drawer-services"
          onClick={() => setServicesOpen((prev) => !prev)}
        >
          <span><span className="nav-icon" aria-hidden="true">🧽</span>Services</span>
          <span aria-hidden="true">{servicesOpen ? "−" : "+"}</span>
        </button>

        <div id="drawer-services" className={`drawer-submenu ${servicesOpen ? "open" : ""}`}>
          <a href="/#services" className="drawer-subitem" onClick={closeMenu}>All Services</a>
          <a href="/#gallery" className="drawer-subitem" onClick={closeMenu}>Gallery</a>
          <NavLink to="/booking" className="drawer-subitem" onClick={closeMenu}>Book Service</NavLink>
        </div>

        <a href="/#home" className="drawer-item" onClick={closeMenu}>
          <span className="nav-icon" aria-hidden="true">🏠</span>Home
        </a>
        <a href="/#testimonials" className="drawer-item" onClick={closeMenu}>
          <span className="nav-icon" aria-hidden="true">⭐</span>Testimonials
        </a>
        <a href="/#faq" className="drawer-item" onClick={closeMenu}>
          <span className="nav-icon" aria-hidden="true">❓</span>FAQ
        </a>
        <a href="/#blog" className="drawer-item" onClick={closeMenu}>
          <span className="nav-icon" aria-hidden="true">📰</span>Blog
        </a>
        <a href="/#contact" className="drawer-item" onClick={closeMenu}>
          <span className="nav-icon" aria-hidden="true">📞</span>Contact
        </a>
        <NavLink to="/tracking" className="drawer-item" onClick={closeMenu}>
          <span className="nav-icon" aria-hidden="true">📍</span>Track
        </NavLink>
        {user?.role === "admin" && (
          <NavLink to="/admin" className="drawer-item" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true">🛠</span>Admin
          </NavLink>
        )}
      </nav>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h4>JOSHEM Cleaning Services</h4>
            <p>Professional, reliable, and modern cleaning for homes and businesses.</p>
          </div>
          <div>
            <h5>Quick links</h5>
            <p><a href="/#about">About Us</a></p>
            <p><a href="/#services">Services</a></p>
            <p><a href="/#contact">Contact</a></p>
            <p><a href="/#blog">Blog</a></p>
          </div>
          <div>
            <h5>Contact</h5>
            <p><a href="tel:+254717785782">+254 717 785 782</a></p>
            <p><a href="mailto:joshemcleaners@gmail.com">joshemcleaners@gmail.com</a></p>
            <p>Nairobi, Kenya</p>
          </div>
          <div>
            <h5>Follow</h5>
            <p><a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></p>
            <p><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a></p>
            <p><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></p>
          </div>
        </div>
        <p className="footer-copy">Copyright 2026 JOSHEM General Cleaning Services LTD</p>
      </footer>
    </div>
  );
}
