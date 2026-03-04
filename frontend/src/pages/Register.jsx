import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth-section">
      <div className="container auth-card">
        <h2>Create your account</h2>
        <p>Book services, track progress, and manage your profile.</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
          </label>
          <label>
            Email
            <input value={form.email} onChange={(e) => handleChange("email", e.target.value)} type="email" required />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
          </label>
          <label>
            Password
            <input value={form.password} onChange={(e) => handleChange("password", e.target.value)} type="password" required />
          </label>
          <button className="btn solid" type="submit">Create account</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
