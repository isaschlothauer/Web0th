import React, { createContext, useState, ReactNode, useContext } from 'react';

interface LoginContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const LoginContext = createContext<LoginContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};