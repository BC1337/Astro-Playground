// userContext.jsx
import { createContext, useState, useContext } from 'react';

const UserContext = createContext({ email: '', setEmail: () => {} });

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
