import { Environment } from "../environment"
import { RootStore } from "./root-store"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  const rootStore: RootStore = new RootStore()

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, {})
  }

  return rootStore
}
