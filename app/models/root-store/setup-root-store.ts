import { onSnapshot } from "mobx-state-tree"
import { Environment } from "../environment"
import { RootStoreModel, RootStore } from "./root-store"
import * as storage from "../../utils/storage"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "ROOT_STATE_STORAGE"

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

const sampleMessages = {
  messages: [
    {
      _id: 2,
      text: 'Ungependa kujua nini?',
      createdAt: new Date(),
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        // @ts-ignore
        position: 'right',
        values: [
          {
            title: 'Hali ya hewa',
            value: 'weather',
          },
          {
            title: 'Shida ya mazao yangu',
            value: 'plant_disease',
          },
          {
            title: 'hali zipi zintakiwezesha nioteshe',
            value: 'crop_yield',
          },
        ],
      },
      user: {
        _id: 2,
        name: 'Kelvin',
      },
    },
    {
      _id: 1,
      text: 'Za kwako Kevin James. Mimi ni K.E.L.V.I.N.',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Kelvin',
      },
    },
  ]
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || sampleMessages
    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, snapshot => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))
  return rootStore
}
