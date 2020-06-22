/**
 * This is the main application navigator
 */
import React from 'react'
import ChatContextProvider from "../context/chat-context"
/**
 * Navigation component geared towards first-time app users.
 * This will include a screen to introduce them as well as collect needed info
 */
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"

// Include the screens
import MainScreen from '../screens/MainScreen'

export type MainParamList = {
  main: undefined
}

const Stack = createNativeStackNavigator<MainParamList>()

function MainUnWrappedNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name='main' component={MainScreen} />
    </Stack.Navigator>
  )
}



// Wrapping the needed information for the chat
// TODO: Pass data for chats and other using mobx instead of ContextAPI
export const MainNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <ChatContextProvider>
          <MainUnWrappedNavigator />
      </ChatContextProvider>
    </NavigationContainer>
  )
})

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["main"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
