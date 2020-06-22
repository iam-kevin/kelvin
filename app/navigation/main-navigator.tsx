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
export function MainNavigator () {
  return (
    <ChatContextProvider>
      <MainUnWrappedNavigator />
    </ChatContextProvider>
  )
}
