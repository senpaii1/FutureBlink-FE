import React, { useEffect, useState } from "react";
import { login } from "./authService"; // Import the login function from authService
import { useNavigate } from "react-router-dom";
import "./login.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "Onchange");
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <h4>Login</h4>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={"text"}
              name="username"
              // value={credentials.password}
              onChange={handleChange}
              label="username"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              // value={credentials.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" className="btn">
            Login
          </button>
          <button className="btn" onClick={handleClick}>
            Signup
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
