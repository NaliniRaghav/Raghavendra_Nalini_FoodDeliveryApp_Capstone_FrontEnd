// // To create a login form for users to access their accounts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LoginPage({ setCurrentForm }) {
  // To store the user's name input
  const [name, setName] = useState("");
  // To store the user's password input
  const [password, setPassword] = useState("");
  // To manage page navigation
  const navigate = useNavigate();

  // To handle the login form submission and authenticate the user
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!name || !password) {
      alert("Please enter both name and password.");
      return;
    }

    try {
      // Send login request to backend
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, password }),
      });

      // Parse response data
      const data = await response.json();

      if (response.ok) {
        // Update form state on successful login
        setCurrentForm("restaurantDisplay");
        // Navigate to the restaurant display page
        navigate("/restaurantDisplay");
      } else {
        // Display error from backend
        alert(data.message);
      }
    } catch (error) {
      // Log any errors in the console
      console.error("Login error:", error);
      // Display general error message
      alert("An error occurred. Check the console for details.");
    }
  };

  return (
    <div className="login-page">
      {" "}
      {/* Container for login form */}
      <form onSubmit={handleLogin}>
        {" "}
        {/* Form submission handler */}
        <img
          src={"/assets/images/logo.jpg"}
          alt="Food on the Fly Logo"
          className="logo"
        />{" "}
        {/* App logo display */}
        <h2 style={{ color: "#ff6600", fontSize: "28px", marginBottom: "5px" }}>
          Food on the Fly
        </h2>{" "}
        {/* App title */}
        <h3
          style={{
            color: "#333",
            fontSize: "16px",
            fontWeight: "normal",
            marginTop: "0",
          }}
        >
          (Online food delivery app)
        </h3>{" "}
        {/* App description */}
        {/* <label>
          Name:
          <input
            type="text"
            value={name}
            // Handle name input change
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            // Handle password input change
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label> */}
        <label
          style={{ display: "block", textAlign: "left", marginBottom: "5px" }}
        >
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", marginTop: "3px" }} // Input styling for spacing
          />
        </label>
        <label
          style={{ display: "block", textAlign: "left", marginBottom: "5px" }}
        >
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle password input change
            style={{ display: "block", marginTop: "3px" }} // Input styling for spacing
          />
        </label>
        <button type="submit" disabled={!name || !password}>
          Login
        </button>{" "}
        {/* Login button, disabled if fields are empty */}
        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="link">
            Sign Up
          </span>
        </p>{" "}
        {/* Link to sign up page */}
        <p>
          Forgot your password?{" "}
          <span onClick={() => navigate("/reset")} className="link">
            Reset Password
          </span>
        </p>{" "}
        {/* Link to reset password page */}
      </form>
    </div>
  );
}

// Export the LoginPage component
export default LoginPage;
