import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { connect, Socket } from "socket.io-client";
import { User } from "../generated/graphql";

export interface State {
  token?: string;
  details?: User;
}

export interface UserContextDefault {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  socket: Socket;
}

interface UserContextProps {
  children: ReactNode;
}

const socket = connect("http://localhost:8000");

const initialState = {
  state: {},
  setState: () => {},
  socket,
};

export const UserContext = createContext<UserContextDefault>(initialState);

const UserContextProvider = ({ children }: UserContextProps) => {
  const [state, setState] = useState<State>(initialState.state);

  return (
    <UserContext.Provider value={{ state, setState, socket }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useLogin = () => useContext(UserContext);
