import { User } from '@/__generated__/graphql'
import { Auth, UserCredential } from '@firebase/auth'

export type FirebaseAuthContextType = {
    token: string | null;
    auth: Auth
    user: Partial<User> | null;
    setUserData: (user: Partial<User> | null) => void;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => void;
    isInitialised: boolean;
}
