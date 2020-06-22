import React from 'react'

/**
 * Navigation component geared towards first-time app users.
 * This will include a screen to introduce them as well as collect needed info
 */
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

// Include the screens
import WelcomeScreen from '../screens/WelcomeScreen'
import RegisterScreen from '../screens/RegisterScreen'
import VerifyScreen from '../screens/VerifyScreen'

export type WelcomeParamList = {
  welcome: undefined,
  register: undefined,
  verify: { phoneNumber: string }
}

const Stack = createNativeStackNavigator<WelcomeParamList>()

export function WelcomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name='welcome' component={WelcomeScreen} />
      <Stack.Screen name='register' component={RegisterScreen} />
      <Stack.Screen name='verify' component={VerifyScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
