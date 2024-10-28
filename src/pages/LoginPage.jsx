 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ setCurrentForm }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert("An error occurred. Check the console for details.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
        <p>
          Forgot your password? <a href="/reset">Reset Password</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
