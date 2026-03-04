import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-grid">
          <Link to="/" className="brand">
            <span>JOSHEM</span>
            <small>Cleaning Services</small>
          </Link>
          <nav className="site-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/booking">Book</NavLink>
            <NavLink to="/tracking">Track</NavLink>
            {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
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
                <NavLink to="/login" className="btn ghost">
                  Sign in
                </NavLink>
                <NavLink to="/register" className="btn solid">
                  Get started
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
            <h5>Contact</h5>
            <p>Phone: 0717785782</p>
            <p>Email: joshemcleaners@gmail.com</p>
          </div>
          <div>
            <h5>Services</h5>
            <p>Residential, Office, Upholstery, Laundry, Outdoor</p>
          </div>
        </div>
        <p className="footer-copy">© 2026 JOSHEM General Cleaning Services LTD</p>
      </footer>
    </div>
  );
}
