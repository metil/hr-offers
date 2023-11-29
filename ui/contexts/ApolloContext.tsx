import { ApolloProvider } from '@apollo/client'
import { useAuth } from '@/ui/contexts/AuthContext'
import { createContext, useMemo } from 'react'
import { buildApolloClient } from '@/gql/client'


const ApolloContext = createContext(null)

export default function ApolloProviderCTX({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth()
  const client = useMemo(
    () => buildApolloClient(auth),
    [auth],
  )
  return (
    <ApolloContext.Provider value={null}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloContext.Provider>
  )
}
