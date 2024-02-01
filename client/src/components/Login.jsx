import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css'; // Import the same CSS file used for signup

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', token);
      // Redirect to another page or update UI
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className=""> {/* Apply the container class */}
      <h1>Login</h1> 
      <form onSubmit={handleLogin}> {/* Convert to a form */}
        <div>
          <label htmlFor="username">Username</label> {/* Use label for accessibility */}
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label> {/* Use label for accessibility */}
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" id="signup">Login</button> {/* Apply the same button styles */}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
