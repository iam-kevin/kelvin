import { createEnvironment } from "../root-store/setup-root-store"
import { AuthStore } from "./auth-store"

/**
 * Setup the root state.
 */
export async function setupAuthStore() {
  let authStore: AuthStore

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(authStore, {})
  }

  return authStore
}
