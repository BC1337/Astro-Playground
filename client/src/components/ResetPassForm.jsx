import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/resetPassword.css';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setToken(token);
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.email) {
        setEmail(decodedToken.email);
      }
    } else {
      // Handle token not found in URL
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/auth/reset-password/${token}`, {
        email,
        newPassword,
        token,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage('Failed to reset password. Please try again.');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Password Reset</h1>
      <p>Resetting password for: {email}</p>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPasswordForm;
