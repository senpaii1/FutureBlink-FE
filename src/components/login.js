import React, { useState } from "react";
import { login } from "./authService"; // Import the login function from authService
import { useNavigate } from "react-router-dom";
import "./login.css";
const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(credentials);
      // Handle successful login, e.g., redirect to dashboard
      console.log("Login successful:", user);
      localStorage.setItem("authToken", user.token); // Save the authentication token to local storage
      // window.location.href = "/chart"; // Redirect to the dashboard page
      navigate("/chart");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <div className="text_area">
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            defaultValue="username"
            placeholder="Username"
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
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" className="btn">
          Login
        </button>
        <button className="btn" onClick={handleClick}>
          Signup
        </button>
      </form>
      {/* <a className="link" href="/signup">Sign Up</a> */}
    </div>
    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="username">Username or Email:</label>
    //       <input
    //         type="text"
    //         id="username"
    //         name="username"
    //         value={credentials.username}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={credentials.password}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     {error && <div style={{ color: "red" }}>{error}</div>}
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
};

export default LoginPage;
