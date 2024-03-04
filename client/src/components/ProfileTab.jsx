import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProfileTab.css'; 

const ProfileTab = () => {
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
  const [newAvatar, setNewAvatar] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

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
        setAvatarUrl(`http://localhost:3001/${response.data.user.avatar}?${new Date().getTime()}`);
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
    setShowPasswordChange(false);
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
      const avatarFullPath = `http://localhost:3001/${response.data.user.avatar}`;
      setAvatarUrl(avatarFullPath);
      setNewAvatar(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to the sign-in page
  };

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        setPasswordChangeError('New passwords do not match.');
        return;
      }
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const payload = {
        currentPassword,
        newPassword,
        confirmNewPassword,
      };
      const response = await axios.put('http://localhost:3001/api/auth/user/password', payload, config);
      setPasswordChangeSuccess(true);
      setPasswordChangeError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setPasswordChangeError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <h2>User Information</h2>
        {!isEditing ? (
          <button className="edit-button" onClick={handleEditToggle}>
            Edit Information
          </button>
        ) : (
          <div>
            {!showPasswordChange && (
              <button className="change-password-button" onClick={() => setShowPasswordChange(true)}>
                Edit Password
              </button>
            )}
          </div>
        )}
      </div>
      {user && (
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
      )}
      {showPasswordChange && (
        <div className="password-change-form">
          <h2 className="password-change-title"><strong>Password Change</strong></h2>
          <input
            type="password"
            className="password-input"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            className="password-input"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            className="password-input"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button className="edit-button" onClick={handlePasswordChange}>Change Password</button>
          {passwordChangeError && <div className="error-message">{passwordChangeError}</div>}
          {passwordChangeSuccess && <div>Password changed successfully!</div>}
        </div>
      )}
      {isEditing && (
        <div className="edit-buttons-container">
          <button className="cancel-button" onClick={handleCancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button className="update-button" onClick={handleUpdate}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
