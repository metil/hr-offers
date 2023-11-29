import { Auth, User } from '@firebase/auth'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { enqueueSnackbar } from 'notistack'

export const buildApolloClient = (
  auth: Auth,
) => {
  const authLink = setContext((_, { headers }) => {
    if (auth.currentUser) {
      return (auth.currentUser as User).getIdToken().then(async (token) => {
        return {
          ...(token
            ? {
              headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
              },
            }
            : { ...headers }),
        }
      })
    } else {
      return {
        headers,
      }
    }
  })

  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_URI,
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `Message: ${message}, Location: ${locations}, Path: ${path}, Type: GraphQL error`,
        ),
      )

    if (networkError)
      enqueueSnackbar(`Message: ${networkError}, Type: Network error`, { variant: 'error' })
  })


  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, errorLink, httpLink]),
    connectToDevTools: JSON.parse(process.env.CONNECT_APOLLO_CLIENT_TO_DEVTOOLS || 'false'),
  })
}
