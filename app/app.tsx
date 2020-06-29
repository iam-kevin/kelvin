/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import "mobx-react-lite/batchingForReactNative"
import React, { useState, useEffect, useRef, Component } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { observer } from 'mobx-react'
// import 'mobx-react-lite'

import { SafeAreaProvider, initialWindowSafeAreaInsets } from "react-native-safe-area-context"
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigation"

import { canExit as rootCanExit, RootNavigator } from './navigation/root-navigator'
import { canExit as mainCanExit, MainNavigator } from './navigation/main-navigator'

import { RootStore, RootStoreProvider, setupRootStore,
  AuthStore, AuthStoreProvider, useAuthStore } from "./models"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from 'react-native-screens'
import SplashScreen from 'react-native-splash-screen'

enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */

const App = () => {
  const navigationRef = useRef<NavigationContainerRef>()

  // store for the main application
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  setRootNavigation(navigationRef)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )
  // TODO: ensure there is only ONE
  //  Set back button handler to be dealt by the navigator
  // useBackButtonHandler(navigationRef, rootCanExit)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null

  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <RootStoreProvider value={new RootStore()}>
        {/* You might want to move `new AuthStore()` else where */}
        <AuthStoreProvider value={new AuthStore()}>
          <AuthenticatedApp
            navRef={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange} />
        </AuthStoreProvider>
      </RootStoreProvider>
    </SafeAreaProvider>
  )
}

export const AuthenticatedApp = observer(({ navRef, initialState, onStateChange }) => {
  const authStore = useAuthStore()

  // Dont render anything if authentication isn't done
  if (!authStore.isReady) return null

  // otherwise, we're ready to render the app
  SplashScreen.hide()

  // ready to authenticate, render the page
  if (authStore.authenticated) {
    return (
      // For logged in user
      <MainNavigator
        ref={navRef}
        initialState={initialState}
        onStateChange={onStateChange}
      />
    )
  } else {
    return (
      <RootNavigator
        ref={navRef}
        initialState={initialState}
        onStateChange={onStateChange}
      />
    )
  }
})

export default App
