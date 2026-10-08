import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../redux/authReducer";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ field: "", message: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError({ field: "email", message: "Enter your email address." });
      return;
    }

    if (!EMAIL_PATTERN.test(cleanEmail)) {
      setError({
        field: "email",
        message: "Enter a valid email address, like name@example.com.",
      });
      return;
    }

    if (!password) {
      setError({ field: "password", message: "Enter your password." });
      return;
    }

    if (password.length < 6) {
      setError({
        field: "password",
        message: "Your password needs at least 6 characters.",
      });
      return;
    }

    setError({ field: "", message: "" });

    dispatch(
      login({
        email: cleanEmail,
      })
    );

    navigate("/profile");
  };

  return (
    <div className="login-page">
      <div className="login-aside">
        <p className="login-statement">Keep track of what you want to watch.</p>
      </div>

      <div className="login-main">
        <form className="login-form" onSubmit={handleLogin} noValidate>
          <h1 className="login-title">Log in</h1>
          <p className="login-lead">
            Save favorites and build a watchlist. Your lists stay in this
            browser.
          </p>

          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              aria-invalid={error.field === "email"}
              aria-describedby={error.field === "email" ? "login-error" : undefined}
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              aria-invalid={error.field === "password"}
              aria-describedby={
                error.field === "password" ? "login-error" : undefined
              }
            />
          </div>

          {error.message && (
            <p className="form-error" id="login-error" role="alert">
              {error.message}
            </p>
          )}

          <button type="submit" className="btn btn-amber">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
