import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css'; // Import CSS file for dashboard styling

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:3001/api/auth/user', config);
        setUser(response.data.user);
        setUpdatedUser(response.data.user);
        setIsLoggedIn(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user information:', error);
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put('http://localhost:3001/api/auth/user', updatedUser, config);
      alert('User information updated successfully!');
      // Update the user state to reflect the changes
      setUser(updatedUser);
      setIsEditing(false); // Turn off editing mode
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('Failed to update user information. Please try again.');
    }
  };

  const handleCancel = () => {
    setUpdatedUser(user); // Revert back to the original user information
    setIsEditing(false); // Turn off editing mode
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
      {isLoading ? (
        <div>Loading user information...</div>
      ) : isLoggedIn ? (
        <div className="user-card">
          <div className="user-card-header">
            <h2>User Information</h2>
            {!isEditing ? (
              <button className="edit-button" onClick={handleEditToggle}>
                Edit Information
              </button>
            ) : (
              <div>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="update-button" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            )}
          </div>
          <div className="user-info">
            <p><strong>Username:</strong> {isEditing ? (
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
              />
            ) : (
              user.username
            )}</p>
            <p><strong>Name:</strong> {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
              />
            ) : (
              user.name
            )}</p>
            <p><strong>Email:</strong> {isEditing ? (
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
              />
            ) : (
              user.email
            )}</p>
          </div>
        </div>
      ) : (
        <div>Please log in to view the dashboard.</div>
      )}
    </div>
  );
};

export default Dashboard;
