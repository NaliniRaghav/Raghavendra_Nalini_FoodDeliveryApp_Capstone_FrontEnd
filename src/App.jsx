// // To import necessary modules and components
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RestaurantDisplayForm from "./pages/RestaurantDisplayForm";
import ResetPasswordPage from "./pages/PasswordResetPage";
import SignupPage from "./pages/SignUpForm";
import MenuItemDisplay from "./pages/MenuItemDisplayForm";
import "./css/styles.css";

// Main App component to manage form navigation and routing
function App() {
  // To store the current form state for conditional navigation
  const [currentForm, setCurrentForm] = useState("login");

  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the login page */}
          <Route
            path="/"
            element={<LoginPage setCurrentForm={setCurrentForm} />}
          />
          {/* Route for the signup page */}
          <Route
            path="/signup"
            element={<SignupPage setCurrentForm={setCurrentForm} />}
          />
          {/* Route for the reset password page */}
          <Route
            path="/reset"
            element={<ResetPasswordPage setCurrentForm={setCurrentForm} />}
          />
          {/* Route for displaying restaurants if currentForm is set to restaurantDisplay */}
          <Route
            path="/restaurantDisplay"
            element={
              currentForm === "restaurantDisplay" ? (
                <RestaurantDisplayForm setCurrentForm={setCurrentForm} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* Route for displaying menu items of a specific restaurant */}
          <Route path="/menu/:restaurantId" element={<MenuItemDisplay />} />
          {/* Route for undefined paths redirecting to login page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

// To export the App component
export default App;
