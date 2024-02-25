import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css'; // Import CSS file for dashboard styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

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
  const [avatarUrl, setAvatarUrl] = useState('');
  const [newAvatar, setNewAvatar] = useState(null); // State for the new avatar image

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/api/auth/sse');
  
    eventSource.onmessage = (event) => {
      const userData = JSON.parse(event.data);
      const newAvatarUrl = userData.user.avatar + `?${new Date().getTime()}`;
      console.log('New avatar URL:', newAvatarUrl); // Log the new avatar URL
      setAvatarUrl(newAvatarUrl);
    };
  
    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      // Handle SSE connection error
    };
  
    return () => {
      eventSource.close();
    };
  }, []);

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
        setAvatarUrl(`http://localhost:3001/${response.data.user.avatar}?${new Date().getTime()}`);// edited
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
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('Failed to update user information. Please try again.');
    }
  };

  const handleCancel = () => {
    setUpdatedUser(user);
    setIsEditing(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  };

  const handleAvatarUpload = async () => {
    const formData = new FormData();
    formData.append('avatar', newAvatar);
  
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put('http://localhost:3001/api/auth/user/avatar', formData, config);
      const avatarFullPath = `http://localhost:3001/${response.data.user.avatar}`; // Construct full URL
      setAvatarUrl(avatarFullPath);
      console.log('Avatar upload response:', response.data);
      setNewAvatar(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    }
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
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <button className="update-button" onClick={handleUpdate}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            )}
          </div>
          <div className="user-info">
            <div className="avatar-container">
              <img src={avatarUrl} alt="User Avatar" className="avatar" />
            </div>
            {isEditing && (
              <div>
                <input type="file" onChange={handleFileChange} />
                <button className="upload-button" onClick={handleAvatarUpload}>
                  Upload Avatar
                </button>
              </div>
            )}
            <p>
              <strong>Username:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleInputChange}
                />
              ) : (
                user.username
              )}
            </p>
            <p>
              <strong>Name:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleInputChange}
                />
              ) : (
                user.name
              )}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                />
              ) : (
                user.email
              )}
            </p>
          </div>
        </div>
      ) : (
        <div>Please log in to view the dashboard.</div>
      )}
    </div>
  );
};

export default Dashboard;
