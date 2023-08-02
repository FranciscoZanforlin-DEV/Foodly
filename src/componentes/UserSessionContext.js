import React, { createContext, useState } from 'react';

const UserSessionContext = createContext();

const UserSessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserSessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserSessionContext.Provider>
  );
};

export { UserSessionProvider, UserSessionContext };
