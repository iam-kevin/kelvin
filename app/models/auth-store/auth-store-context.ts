import { createContext, useContext } from "react"
import { AuthStore } from "./auth-store"

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
const AuthStoreContext = createContext<AuthStore>({} as AuthStore)

/**
 * The provider our root component will use to expose the auth store
 */
export const AuthStoreProvider = AuthStoreContext.Provider
export const useAuthStores = () => useContext(AuthStoreContext)
