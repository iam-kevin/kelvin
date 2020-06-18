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

const Stack = createNativeStackNavigator()

/**
 * The list of screens to use for the Stack
 */
export const screenName = {
  WELCOME: 'Welcome',
  REGISTER: 'Register',
  VERIFY: 'Verify'
}

export type RouteParamList = {
  welsom
}

export default function WelcomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={screenName.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={screenName.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={screenName.VERIFY} component={VerifyScreen} />
    </Stack.Navigator>
  )
}
