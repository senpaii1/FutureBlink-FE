import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { signup } from "./authService";
const SignupPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "", // new field for role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate the email address
      if (!validateEmail(credentials.email)) {
        setError("Invalid email address");
        return;
      }
      // implement your signup logic here
      const user = await signup(credentials);
      console.log("Signup successful!");
      localStorage.setItem("authToken", user.token);
      // window.location.href = "/chart"; // redirect to dashboard page
      navigate("/chart");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <h4>Sign Up</h4>
      <form onSubmit={handleSubmit}>
        <div className="text_area">
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
            defaultValue="username"
            className="text_input"
            required
          />
        </div>
        <div className="text_area">
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            defaultValue=""
            className="text_input"
            required
          />
        </div>
        <div className="text_area">
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            defaultValue="password"
            className="text_input"
            required
          />
        </div>
        <div className="select-role">
          <select name="role" value={credentials.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" className="btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
