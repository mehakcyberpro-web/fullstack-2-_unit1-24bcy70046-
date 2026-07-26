import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { login } from "../features/auth/authSlice";
import {
  selectAuthError,
  selectAuthLoading,
} from "../features/auth/authSelectors";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const resultAction = await dispatch(
      login({ email, password })
    );

    if (login.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;