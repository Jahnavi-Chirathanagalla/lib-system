import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    student_id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://lib-system-back-end.onrender.com",
        credentials
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate(res.data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError("Invalid Student ID or Password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email ID</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setCredentials({ ...credentials, student_id: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Login to Library
          </button>
          <div className="text-center mt-3">
  <p className="mb-0">
    Don't have an account?{" "}
    <Link to="/register" className="fw-bold text-decoration-none">
      Register
    </Link>
  </p>
</div>
        </form>
      </div>
    </div>
  );
};
export default Login;
