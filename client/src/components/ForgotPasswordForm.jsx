import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/userContext';
import '../styles/forgotPassword.css';

const ForgotPasswordForm = () => {
  // const { email } = useUser() || {};
  const { setEmail } = useUser();
  const [email, setEmailLocal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address');
        return;
      }

      console.log('Email before axios request:', email); // Log the value of email before axios request
  
      const response = await axios.post('http://localhost:3001/api/auth/reset-password', { email });
  
      setSuccessMessage(response.data.message);
  
    } catch (error) {
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
        onChange={(e) => setEmailLocal(e.target.value)}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPasswordForm;
