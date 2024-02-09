import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleForgotPassword = () => {
    window.location.href = '/forgot-password-page';
  };

  return (
    <div className="">
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
            </div>
            <button type="submit" id="signup">Login</button>
            <br></br>
            <br></br>
            <p>
              Forgot your password? Click <button onClick={handleForgotPassword}>here</button> to reset.
            </p>
          </form>
          {error && <p>{error}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
