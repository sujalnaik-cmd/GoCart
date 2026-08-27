import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("gocart_token")));

  useEffect(() => {
    const token = localStorage.getItem("gocart_token");
    if (!token) return;
    request("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch(() => localStorage.removeItem("gocart_token"))
      .finally(() => setLoading(false));
  }, []);

  const authenticate = async (path, credentials) => {
    const data = await request(path, { method: "POST", body: JSON.stringify(credentials) });
    localStorage.setItem("gocart_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("gocart_token");
    setUser(null);
  };

  const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("gocart_token")}` });
  const createOrder = useCallback((order) => request("/orders", { method: "POST", headers: authHeaders(), body: JSON.stringify(order) }), []);
  const getOrders = useCallback(() => request("/orders", { headers: authHeaders() }), []);

  return <AuthContext.Provider value={{ user, loading, authenticate, logout, createOrder, getOrders }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
