import { useNavigate } from "react-router-dom";
import "./save.css";
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Remove the authentication token from local storage
    localStorage.removeItem("authToken");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="button">
      Logout
    </button>
  );
};

export default LogoutButton;
