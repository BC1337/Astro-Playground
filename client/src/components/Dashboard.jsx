import React, { useState, useEffect } from 'react';
import ProfileTab from './ProfileTab';
import CalendarTab from './CalendarTab';
import FavoritesTab from './FavoritesTab';
import '../styles/dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect the user to the login page or any other desired page
    window.location.href = '/login';
  };

  if (!isLoggedIn) {
    return (
      <div className="dashboard-container">
        <h1>Please log in to view the dashboard</h1>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
      <div className="sign-out-button" onClick={handleSignOut}>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </div>
      <div className="tabs">
        <ul>
          <li className={activeTab === 'Profile' ? 'active' : ''} onClick={() => handleTabClick('Profile')}>
            Profile
          </li>
          <li className={activeTab === 'Calendar' ? 'active' : ''} onClick={() => handleTabClick('Calendar')}>
            Calendar
          </li>
          <li className={activeTab === 'Favorites' ? 'active' : ''} onClick={() => handleTabClick('Favorites')}>
            Favorites
          </li>
        </ul>
      </div>
      <div className="tab-content">
        {activeTab === 'Profile' && <ProfileTab />}
        {activeTab === 'Calendar' && <CalendarTab />}
        {activeTab === 'Favorites' && <FavoritesTab />}
      </div>
    </div>
  );
};

export default Dashboard;
