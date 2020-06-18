import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, Text } from 'react-native'

import * as theme from '../../theme'

const VIEW_STYLE = { flex: 1, justifyContent: 'center', alignItems: 'center' }
const COLORED_VIEW_STYLE = { ...VIEW_STYLE, backgroundColor: '#009245' }

export default function RegisterScreen() {
  return (
    <SafeAreaView style={COLORED_VIEW_STYLE}>
      <StatusBar barStyle='default' backgroundColor={theme.color.app.statusBar} />
      <View style={VIEW_STYLE}>
        <Text>This is the Registration Screen</Text>
      </View>
    </SafeAreaView>
  )
}
