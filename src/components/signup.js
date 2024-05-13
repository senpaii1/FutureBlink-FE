import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { signup } from "./authService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
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
const SignupPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "", // new field for role
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const roles = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Leads",
      label: "Leads",
    },
    {
      value: "User",
      label: "User",
    },
    {
      value: "Developer",
      label: "Developer",
    },
  ];

  return (
    <div className="login">
      <h4>Sign Up</h4>
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
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={"text"}
              name="email"
              // value={credentials.password}
              onChange={handleChange}
              label="email"
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
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
