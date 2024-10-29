import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

function LoginPage({ setCurrentForm }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!name || !password) {
      alert("Please enter both name and password.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentForm('restaurantDisplay');
        navigate('/restaurantDisplay');
      } else {
        alert(data.message); // Display error from backend
      }
    } catch (error) {
      console.error('Login error:', error);
      alert("An error occurred. Check the console for details.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Food on the Fly</h2>
        <h3>(Online food delivery app)</h3>
        <h2>Login</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!name || !password}>
          Login
        </button>
        <p>
          Don’t have an account? <span onClick={() => navigate('/signup')} className="link">Sign Up</span>
        </p>
        <p>
          Forgot your password? <span onClick={() => navigate('/reset')} className="link">Reset Password</span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;