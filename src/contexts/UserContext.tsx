import { InMemoryCache } from "@apollo/client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { connect, Socket } from "socket.io-client";
import { Comment, User, Video } from "../generated/graphql";

export interface State {
  token?: string;
  details?: User;
}

export interface UserContextDefault {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  socket: Socket;
  cache: InMemoryCache;
}

interface UserContextProps {
  children: ReactNode;
}

const socket = connect("http://localhost:8000");
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        videos: {
          keyArgs: false,
          merge(existing, incoming) {
            let paginatedVideos: Video[] = [];
            if (existing && existing.paginatedVideos) {
              paginatedVideos = paginatedVideos.concat(
                existing.paginatedVideos
              );
            }
            if (incoming && incoming.paginatedVideos) {
              paginatedVideos = paginatedVideos.concat(
                incoming.paginatedVideos
              );
            }
            return { ...incoming, paginatedVideos };
          },
        },
        comments: {
          keyArgs: false,
          merge(existing, incoming) {
            let paginatedComments: Comment[] = [];
            if (existing && existing.paginatedComments) {
              paginatedComments = paginatedComments.concat(
                existing.paginatedComments
              );
            }
            if (incoming && incoming.paginatedComments) {
              paginatedComments = paginatedComments.concat(
                incoming.paginatedComments
              );
            }
            return { ...incoming, paginatedComments: paginatedComments };
          },
        },
      },
    },
  },
});

const initialState = {
  state: {},
  setState: () => {},
  socket,
  cache,
};

export const UserContext = createContext<UserContextDefault>(initialState);

const UserContextProvider = ({ children }: UserContextProps) => {
  const [state, setState] = useState<State>(initialState.state);

  return (
    <UserContext.Provider value={{ state, setState, socket, cache }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useLogin = () => useContext(UserContext);
