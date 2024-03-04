import React from 'react';

const Navigation = () => {
  const handleLogout = () => {
    // Implement logout functionality here if needed
    // Clear localStorage, reset state, etc.
  };

  const handleDashboardClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="nav-links" transition:animate="slide">
      <a href="/">Home</a>
      <a href="/signup">Sign Up</a>
      <a href="/login">Login</a>
      <a onClick={handleDashboardClick}>Dashboard</a> {/* Redirect to dashboard */}
    </div>
  );
};

export default Navigation;
