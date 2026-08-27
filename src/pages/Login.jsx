import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await authenticate(`/auth/${mode}`, form);
      navigate(location.state?.from || "/");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return <>
    <Navbar />
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <p className="eyebrow">GoCart account</p>
        <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="muted">Sign in to place orders and see your delivery history.</p>
        {mode === "register" && <input required placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />}
        <input required type="email" placeholder="Email address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <input required minLength="6" type="password" placeholder="Password (6+ characters)" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {error && <p className="form-error">{error}</p>}
        <button type="submit">{mode === "login" ? "Sign in" : "Create account"}</button>
        <p className="auth-switch">{mode === "login" ? "New to GoCart?" : "Already have an account?"} <button type="button" className="link-button" onClick={() => setMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "Register" : "Sign in"}</button></p>
        <Link className="back-link" to="/">Continue shopping</Link>
      </form>
    </main>
  </>;
}

export default Login;
