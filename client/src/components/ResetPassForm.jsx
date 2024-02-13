import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/userContext';
import '../styles/resetPassword.css';

const ResetPasswordForm = () => {
  const { email } = useUser();
  console.log('Email state:', email);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    setToken(tokenFromUrl);
  }, []);

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:3001/api/auth/reset-password', {
        token,
        email,
        newPassword,
        confirmPassword,
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
