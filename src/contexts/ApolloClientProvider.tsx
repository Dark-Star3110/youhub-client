import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client";
import { ReactNode } from "react";
import { useLogin } from "./UserContext";

const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  const {
    state: { token },
    cache,
  } = useLogin();

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
      credentials: "include",
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }),
    connectToDevTools: true,
    cache,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
