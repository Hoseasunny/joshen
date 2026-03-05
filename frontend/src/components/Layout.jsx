import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-grid">
          <Link to="/" className="brand" onClick={closeMenu}>
            <span>JOSHEM</span>
            <small>Cleaning Services</small>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Menu
          </button>

          <nav className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
            <a href="/#home" onClick={closeMenu}>Home</a>
            <a href="/#about" onClick={closeMenu}>About</a>

            <div className="nav-dropdown">
              <button type="button" className="dropdown-trigger" aria-haspopup="true">
                Services
              </button>
              <div className="dropdown-menu">
                <a href="/#services" onClick={closeMenu}>All Services</a>
                <a href="/#gallery" onClick={closeMenu}>Gallery</a>
                <NavLink to="/booking" onClick={closeMenu}>Book Service</NavLink>
              </div>
            </div>

            <a href="/#testimonials" onClick={closeMenu}>Testimonials</a>
            <a href="/#faq" onClick={closeMenu}>FAQ</a>
            <a href="/#blog" onClick={closeMenu}>Blog</a>
            <NavLink to="/tracking" onClick={closeMenu}>Track</NavLink>
            {user?.role === "admin" && <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>}
          </nav>

          <div className="header-cta">
            {user ? (
              <>
                <span className="user-pill">Hi, {user.name}</span>
                <button type="button" className="btn ghost" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn ghost" onClick={closeMenu}>
                  Sign in
                </NavLink>
                <NavLink to="/booking" className="btn solid" onClick={closeMenu}>
                  Book Now
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

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
