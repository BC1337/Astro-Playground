import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forgotPassword.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address');
        return;
      }

      // Make API call to initiate password reset
      const response = await axios.post('http://localhost:3001/api/auth/reset-password', { email });

      // Display success message if password reset email is sent successfully
      setSuccessMessage(response.data.message);
    } catch (error) {
      // Display error message if there's an error with initiating password reset
      setErrorMessage('Failed to initiate password reset. Please try again.');
      console.error('Error initiating password reset:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPasswordForm;
