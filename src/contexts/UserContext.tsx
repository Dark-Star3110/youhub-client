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
  checkPass?: boolean;
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

const socket = connect(process.env.REACT_APP_ENDPOINT as string);
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        videos: {
          keyArgs: false,
          merge(existing, incoming) {
            if (existing?.cursor && incoming?.cursor) {
              const date1 = new Date(existing.cursor);
              const date2 = new Date(incoming.cursor);
              if (date1.getTime() <= date2.getTime()) {
                return existing;
              }
            }

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
            if (existing?.cursor && incoming?.cursor) {
              const date1 = new Date(existing.cursor);
              const date2 = new Date(incoming.cursor);
              if (date1.getTime() <= date2.getTime()) {
                return existing;
              }
            }
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
        videoUser: {
          keyArgs: false,
          merge(existing, incoming) {
            if (existing?.cursor && incoming?.cursor) {
              const date1 = new Date(existing.cursor);
              const date2 = new Date(incoming.cursor);
              if (date1.getTime() <= date2.getTime()) {
                return existing;
              }
            }
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
        find: {
          keyArgs: false,
          merge(existing, incoming) {
            if (existing?.cursor && incoming?.cursor) {
              const date1 = new Date(existing.cursor);
              const date2 = new Date(incoming.cursor);
              if (date1.getTime() <= date2.getTime()) {
                return existing;
              }
            }

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
      },
    },
  },
});

const initialState: UserContextDefault = {
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
