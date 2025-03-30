import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert for notifications
import { LogInAPI } from "./LogInApi";

import { context } from "../Context/Context";

const LoginPage = () => {
  const { setShow } = useContext(context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [showRegister, setShowRegister] = useState(false); // Track login failure
  const navigate = useNavigate();

  useEffect(() => {
    fetch(LogInAPI)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Unexpected API response:", data);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      Swal.fire("Error", "Invalid email or password!", "error");
      setShowRegister(true); // Show Register link when login fails
    } else {
      Swal.fire("Success", "Login successful!", "success");
      localStorage.setItem("auth", "true"); // Store login session
      navigate("/home"); // Redirect to home page
      setShow(true);
      setShowRegister(false); // Hide Register link on successful login
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <h3 className="text-center">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>
            <div className="text-center mt-3">
              <a href="#">Forgot Password?</a>
              {showRegister && <Link to={'/register'} className="btn btn-success d-block mt-2">Register</Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
