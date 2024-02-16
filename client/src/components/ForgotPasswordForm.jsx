import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forgotPassword.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState(''); // Define the email state
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Send the request to initiate password reset
      const response = await axios.post(
        'http://localhost:3001/api/auth/reset-password',
        { email }
      );

      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to initiate password reset. Please try again.');
      console.error('Error initiating password reset:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the email state when the input changes
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button onClick={handleForgotPassword} disabled={loading}>
        {loading ? 'Loading...' : 'Reset Password'}
      </button>
    </div>
  );
};

export default ForgotPasswordForm;
