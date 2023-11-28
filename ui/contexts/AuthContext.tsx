import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FirebaseAuthContextType } from "@/ui/types";
import { auth } from "@/ui/auth";
import { signInWithEmailAndPassword, signOut, User } from "@firebase/auth";
import { User as UserRaw } from "@/__generated__/graphql";

const AuthContext = createContext<FirebaseAuthContextType | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isInitialised, setIsInitialised] = useState<boolean>(false)
  const [ userData, setUserData] = useState<null | Partial<UserRaw>>(null)
  useEffect(
    () =>
      auth.onAuthStateChanged(async (user: User | null) => {
        if (user) {
          const token = await user.getIdToken()
          setToken(token)
        } else {
          setToken(null)
        }
        setIsInitialised(true)
      })
    , [])

  const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    return await signOut(auth).then(()=> {
      setToken(null)
      setUserData(null)
    })
  }
  return <AuthContext.Provider value={{
    token,
    login,
    logout,
    user : userData,
    setUserData,
    auth,
    isInitialised
  }}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('AuthContext must be placed within AuthProvider')

  return context
}

export { AuthProvider , AuthContext , useAuth }
