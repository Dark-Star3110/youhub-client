import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"
import { ReactNode } from "react"
import { Video } from "../generated/graphql"
import { useLogin } from "./UserContext"

const ApolloClientProvider = ({ children }: { children: ReactNode}) => {
  
  const {state: {token}} = useLogin()
  
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
      credentials: 'include',
      headers: {
        'authorization': token ? `Bearer ${token}` : ''
      }
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            videos: {
              keyArgs: false,
              merge(existing, incoming) {
                let paginatedVideos: Video[] = []
                if (existing && existing.paginatedVideos) {
                  paginatedVideos = paginatedVideos.concat(existing.paginatedVideos)
                }
                if (incoming && incoming.paginatedVideos) {
                  paginatedVideos = paginatedVideos.concat(incoming.paginatedVideos)
                }
                return {...incoming, paginatedVideos}
              }
            }
          }
        }
      }
    })
  })
  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloClientProvider
