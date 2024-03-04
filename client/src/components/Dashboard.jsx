import React, { useState } from 'react';
import ProfileTab from './ProfileTab';
import CalendarTab from './CalendarTab'; // Import the CalendarTab component
import FavoritesTab from './FavoritesTab'; // Import the FavoritesTab component
import '../styles/dashboard.css'; 

const Dashboard = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('Profile'); // Set the default active tab to 'Profile'

  // Function to handle tab switching
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
      {/* Tabs */}
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
      
      {/* Content for each tab */}
      <div className="tab-content">
        {/* Profile Tab */}
        {activeTab === 'Profile' && <ProfileTab />}
        {/* Calendar Tab */}
        {activeTab === 'Calendar' && <CalendarTab />}
        {/* Favorites Tab */}
        {activeTab === 'Favorites' && <FavoritesTab />}
      </div>
    </div>
  );
};

export default Dashboard;
