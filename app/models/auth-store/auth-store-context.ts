import { createContext, useContext } from "react"
import { AuthStore } from "./auth-store"

const AuthStoreContext = createContext<AuthStore>({} as AuthStore)
export const AuthStoreProvider = AuthStoreContext.Provider
export const useAuthStore = () => useContext(AuthStoreContext)
