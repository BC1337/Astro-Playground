import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Advanced validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    // Comprehensive username format check
    
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!usernameRegex.test(username)) {
      setError('Invalid username format. Use alphanumeric characters and underscores (3-16 characters).');
      return;
    }

    // Comprehensive password policy enforcement

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      // Redirect to the dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleForgotPassword = () => {
    window.location.href = '/forgot-password-page';
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <Dashboard client:load />
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin} method="post">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error-message">{error}</p>}
            </div>
            <button type="submit" id="signup">Login</button>
            <br></br>
            <br></br>
            <p>
              Forgot your password? Click <button onClick={handleForgotPassword}>here</button> to reset.
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
