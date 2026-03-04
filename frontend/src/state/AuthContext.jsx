import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("joshem_auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("joshem_auth", JSON.stringify(data));
  };

  const register = async (payload) => {
    await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    await login(payload.email, payload.password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("joshem_auth");
  };

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
