import { createContext, ReactNode, useState } from "react";

interface ExtraNavContextProps {
  children: ReactNode;
}

interface ExtraNavContextDefault {
  Eaction: string;
  toggleExtraNav: () => void;
}

const ExtraNavContextDefaultInit = {
  Eaction: "",
  toggleExtraNav: () => {},
};

export const ExtraNavContext = createContext<ExtraNavContextDefault>(
  ExtraNavContextDefaultInit
);

const ExtraNavContextProvider = ({ children }: ExtraNavContextProps) => {
  const [Eaction, setEAction] = useState<string>("");

  const toggleExtraNav = () => {
    let newEAction = Eaction === "" ? "active" : "";
    setEAction(newEAction);
  };

  const ExtraNavContextData = { Eaction, toggleExtraNav };

  return (
    <ExtraNavContext.Provider value={ExtraNavContextData}>
      {children}
    </ExtraNavContext.Provider>
  );
};

export default ExtraNavContextProvider;
