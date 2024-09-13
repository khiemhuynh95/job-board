'use client'

import React, { createContext, useState, useContext  } from 'react';

interface User {
  fullname: string;
  email: string;
}

const UserContext = createContext<User | null>();

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

export const useUserContext = () => {
  return useContext(UserContext);
};