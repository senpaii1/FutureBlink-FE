import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/login";
import RegistrationPage from "./components/registration";
import ReactFlowComponent from "./components/chart"; // Your existing ReactFlow component
import { isAuthenticated } from "./components/authService"; // Your authentication service (functions to check authentication status)

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    const isAuthenticatedResult = isAuthenticated();
    console.log("isAuthenticated result:", isAuthenticatedResult);
    setAuthenticated(isAuthenticated());
  }, []);

  useEffect(() => {
    console.log("authenticated state:", authenticated);
  }, [authenticated]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for Registration Page */}
        <Route path="/register" element={<RegistrationPage />} />

        {/* Route for Chart Page */}
        <Route
          path="/chart"
          element={
            authenticated ? <ReactFlowComponent /> : <Navigate to="/login" />
          }
        />

        {/* Redirect to Login Page if no matching route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
