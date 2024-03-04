import React, { useState } from 'react';
import axios from 'axios';
import zxcvbn from 'zxcvbn'; // Import zxcvbn library
import '../styles/signup.css';

const SignupForm = () => {
  // State variables for form data and error message
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to calculate password strength score
  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    const result = zxcvbn(formData.password);
    return result.score;
  };

  // Function to determine meter color based on password strength
  const getMeterColor = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case 0:
        return 'transparent'; // Very Weak - Gray
      case 1:
        return '#ff3333'; // Weak - Red
      case 2:
        return '#ff9900'; // Fair - Orange
      case 3:
        return '#ffff66'; // Good - Yellow
      case 4:
        return '#66cc66'; // Strong - Green
      default:
        return '#cccccc'; // Gray
    }
  };

  // Function to display password strength text
  const getStrengthText = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case 0:
        return '';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Unknown';
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username, email, password } = formData;

    // Client-side validation
    if (!name || !username || !email || !password) {
      setError('Please fill out all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/signup', {
        name,
        username,
        email,
        password
      });

      if (!response.status === 201) {
        throw new Error('Signup failed');
      }

      // Clear form fields after successful submission
      setFormData({
        name: '',
        username: '',
        email: '',
        password: ''
      });

      alert('Signup successful');
       // Redirect user to the dashboard after successful signup
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error:', error.message);
      setError('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        
        {/* Display password strength meter */}
        <div className="password-strength-text">
          {getStrengthText()}
        </div>
        <div 
          className="password-strength-meter"
          style={{ 
            backgroundColor: '#f0f0f0', 
            height: '12px', 
            borderRadius: '5px', 
            position: 'relative',
            border: '1px solid #ccc',
            marginBottom: '10px' 
          }}
        >
          <div
            className="password-strength-meter-bar"
            style={{ 
              width: `${(getPasswordStrength() + 1) * 20}%`, 
              backgroundColor: getMeterColor(), 
              height: '100%', 
              borderRadius: '5px',
              transition: 'width 0.3s ease',
              
            }}
          />
        </div>
        
      </div>
      <button type="submit" id="signup">Sign Up</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default SignupForm;
