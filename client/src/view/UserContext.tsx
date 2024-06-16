import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { IUserData } from './types/UserData';

interface UserContextProps {
  user: IUserData | null;
  setUser: Dispatch<SetStateAction<IUserData | null>>;
}

const defaultUserContext: UserContextProps = {
  user: null,
  setUser: () => {}
};

export const UserContext = createContext<UserContextProps>(defaultUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};