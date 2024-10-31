// // To import necessary modules and hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Component to display the signup form
function SignupPage() {
  // To store the form data for signup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  // To store any error messages
  const [error, setError] = useState("");
  // To track loading state during form submission
  const [loading, setLoading] = useState(false);
  // To navigate to other pages after signup
  const navigate = useNavigate();

  // To handle form submission and user signup
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // To send signup data to the server
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // To parse the server response
      const data = await response.json();

      // To handle successful signup and navigate to login
      if (response.ok) {
        console.log("hi");
        navigate("/");
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {" "}
      {/* Container for signup form */}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <button type="button" onClick={() => navigate("/")}>
        Back to Login
      </button>
    </div>
  );
}

// To export the SignupPage component
export default SignupPage;
