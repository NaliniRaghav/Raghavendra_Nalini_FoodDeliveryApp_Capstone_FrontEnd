 
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RestaurantDisplayForm from './pages/RestaurantDisplayForm';
import ResetPasswordPage from './pages/PasswordResetPage';
import SignupPage from './pages/SignUpForm';
import MenuItemDisplay from './pages/MenuItemDisplayForm';
import './styles.css';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage setCurrentForm={setCurrentForm} />} />
          <Route path="/signup" element={<SignupPage setCurrentForm={setCurrentForm} />} />
          <Route path="/reset" element={<ResetPasswordPage setCurrentForm={setCurrentForm} />} />
          <Route
            path="/restaurantDisplay"
            element={
              currentForm === 'restaurantDisplay' ? (
                <RestaurantDisplayForm setCurrentForm={setCurrentForm} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/menu/:restaurantId" element={<MenuItemDisplay />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
