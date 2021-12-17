import { createContext, ReactNode, useState } from "react";

interface LoginContextProps {
  children: ReactNode;
}

interface LoginContextDefault {
  isLogined: boolean;
  toggleLogin: (action: boolean) => void;
}

const LoginContextInit = {
  isLogined: false,
  toggleLogin: () => {},
};

export const LoginContext =
  createContext<LoginContextDefault>(LoginContextInit);

const LoginContextProvider = ({ children }: LoginContextProps) => {
  const [islogin, setIsLogin] = useState(false);

  const login = (action: boolean) => {
    setIsLogin(action);
  };

  const LoginContextData = {
    isLogined: islogin,
    toggleLogin: login,
  };

  return (
    <LoginContext.Provider value={LoginContextData}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
