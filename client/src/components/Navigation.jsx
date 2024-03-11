import React from 'react';
import '../styles/global.css'
const Navigation = () => {
  const handleLogout = () => {
    // Clear localStorage and reset state
    localStorage.removeItem('token');
    // You may need to add more state variables to reset here if needed

    // Redirect the user to the login page after logout
    window.location.href = '/login';
  };

  const handleDashboardClick = () => {
    window.location.href = '/dashboard';
  };

  // Check if localStorage is available
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token') ? true : false;

  return (
    <div className="nav-links" transition:animate="slide">
      <a href="/">Home</a>
      {/* Conditionally render links based on isLoggedIn state */}
      {isLoggedIn ? (
        <>
          <a href="/dashboard">Dashboard</a>
          <a href="/workout">Workouts</a>
          <button className="rounded-logoutButton" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <a href="/signup">Sign Up</a>
          <a href="/login">Login</a>
        </>
      )}
    </div>
  );
};

export default Navigation;
