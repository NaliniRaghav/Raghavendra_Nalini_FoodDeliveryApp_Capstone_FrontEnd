// // To import necessary hooks and modules for component functionality
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RestaurantDisplayForm.css";

// Component to display the reset password form
const ResetPasswordPage = () => {
  // To store the user's email input
  const [email, setEmail] = useState("");
  // To store the new password input
  const [newPassword, setNewPassword] = useState("");
  // To store the confirmation password input
  const [confirmPassword, setConfirmPassword] = useState("");
  // To store error messages
  const [error, setError] = useState("");
  // To store success messages
  const [success, setSuccess] = useState("");
  // To navigate to other pages
  const navigate = useNavigate();

  // To handle form submission and reset password
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    // To check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // To send password reset request to the server
      const response = await fetch(
        "http://localhost:3000/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      // To parse response data
      const data = await response.json();

      // To handle successful password reset
      if (response.ok) {
        setSuccess("Password reset successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      {" "}
      {/* To display reset password form container */}
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
      <button type="button" onClick={() => navigate("/")}>
        Back to Login
      </button>
    </div>
  );
};

// To export the ResetPasswordPage component
export default ResetPasswordPage;
