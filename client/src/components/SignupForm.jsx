import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      // You can redirect the user to another page or perform any other action here
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
      </div>
      <button type="submit" id="signup">Sign Up</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default SignupForm;
