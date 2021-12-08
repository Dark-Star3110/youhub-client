import { createContext, ReactNode, useState } from "react";

interface NavContextProps {
  children: ReactNode;
}

interface NavContextDefault {
  action: string;
  toggleNav: () => void;
}

const NavContextDefaultInit = {
  action: "",
  toggleNav: () => {},
};

export const NavContext = createContext<NavContextDefault>(
  NavContextDefaultInit
);

const NavContextProvider = ({ children }: NavContextProps) => {
  const [action, setAction] = useState<string>("");

  const toggleNav = () => {
    let newAction = action === "" ? "active" : "";
    setAction(newAction);
  };

  const NavContextData = { action, toggleNav };

  return (
    <NavContext.Provider value={NavContextData}>{children}</NavContext.Provider>
  );
};

export default NavContextProvider;
