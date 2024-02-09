import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from React Router
import axios from 'axios';
import '../styles/resetPassword.css'; // Import CSS file for reset password page styling

const ResetPasswordForm = () => {
  const { token } = useParams(); // Extract the token from the URL using useParams
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      // Add validation logic for new password and confirm password fields

      // Check if new password matches confirm password
      if (newPassword !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      // Make API call to reset password with token
      const response = await axios.post(`http://localhost:3001/api/auth/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });

      // Display success message if password reset is successful
      setSuccessMessage(response.data.message);
    } catch (error) {
      // Display error message if there's an error with password reset
      setErrorMessage('Failed to reset password. Please try again.');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Password Reset</h1>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPasswordForm;
