import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forgotPassword.css';

/**
 * ForgotPasswordForm component allows users to initiate a password reset
 * by providing their email address.
 */
const ForgotPasswordForm = () => {
  // Define state variables for email, error message, success message, and loading status
  const [email, setEmail] = useState(''); // State variable to hold the email address
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message
  const [successMessage, setSuccessMessage] = useState(''); // State variable for success message
  const [loading, setLoading] = useState(false); // State variable to track loading status

  // Function to handle password reset request
  const handleForgotPassword = async () => {
    try {
      setLoading(true); // Set loading to true while sending the request
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

      // Validate email format
      if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address'); // Set error message for invalid email
        setLoading(false); // Reset loading state
        return;
      }

      // Send the request to initiate password reset
      const response = await axios.post(
        'http://localhost:3001/api/auth/reset-password',
        { email }
      );

      // Set success message upon successful password reset request
      setSuccessMessage(response.data.message);
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      // Handle errors during password reset request
      setErrorMessage('Failed to initiate password reset. Please try again.');
      console.error('Error initiating password reset:', error);
    } finally {
      setLoading(false); // Reset loading state after request completion
    }
  };

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the email state when the input changes
  };

  // Render the ForgotPasswordForm component
  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      {/* Input field for email address */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      {/* Display error message if there is an error */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* Display success message if the password reset request is successful */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {/* Button to trigger the password reset process */}
      <button onClick={handleForgotPassword} disabled={loading}>
        {loading ? 'Loading...' : 'Reset Password'}
      </button>
    </div>
  );
};

export default ForgotPasswordForm;
