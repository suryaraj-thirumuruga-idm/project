import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { LogInAPI } from "./LogInApi";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(LogInAPI, {
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Registration successful! Redirecting to login...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
        setFormData({ email: "", password: "", confirmPassword: "", mobile: "" });
      }
    } catch (error) {
      Swal.fire("Error", "Registration failed!", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.password}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.mobile}</div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
