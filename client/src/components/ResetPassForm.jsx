import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/resetPassword.css';

const ResetPasswordForm = () => {
  // State variables for new password, email, token, error message, and success message
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Extract token from URL parameters and decode it to retrieve email
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

  // Function to decode the JWT token
  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Function to handle the password reset process
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
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <p className="email-info">Password reset for:</p>
          <p className="user-email">{email}</p>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message if exists */}
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message if exists */}
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
