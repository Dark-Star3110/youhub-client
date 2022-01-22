import { ApolloClient, ApolloProvider, from, HttpLink } from "@apollo/client";
import { ReactNode } from "react";
import { useLogin } from "./UserContext";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";

const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  const {
    state: { token },
    cache,
  } = useLogin();

  const errorLink = onError((errors) => {
    if (errors.networkError) {
      if (typeof window !== "undefined" && !window.navigator.onLine) {
        toast.error("Bạn đang ngoại tuyến. Hãy kiểm tra lại kết nối");
      } else {
        toast.error("Không thể kết nối tới server");
      }
    }
  });
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
    credentials: "include",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([errorLink, httpLink]),
    connectToDevTools: true,
    cache,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
