import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        setIsLoggedIn(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user information:', error);
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      {isLoading ? (
        <div>Loading user information...</div>
      ) : isLoggedIn ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <div>Please log in to view the dashboard.</div>
      )}
    </div>
  );
};

export default Dashboard;
