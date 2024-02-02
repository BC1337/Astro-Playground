// Dashboard.jsx

import React from 'react';
import { checkAuthentication } from '../scripts/auth'; // Adjust the import path as needed

const DashboardPage = () => {
  const isAuthenticated = checkAuthentication();

  if (!isAuthenticated) {
    // Redirect or show a message to the user if they are not authenticated
    return <div>You are not authenticated. Please log in.</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      {/* Display user information here */}
    </div>
  );
};

export default DashboardPage;
