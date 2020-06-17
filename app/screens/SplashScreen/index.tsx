import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar } from 'react-native'
import KelvinLogoSvg from '../../assets/svg/Logo'

import * as theme from '../../theme'

const VIEW_STYLE = { flex: 1, justifyContent: 'center', alignItems: 'center' }
const COLORED_VIEW_STYLE = { ...VIEW_STYLE, backgroundColor: '#009245' }

export default function SplashScreen() {
  return (
    <SafeAreaView style={COLORED_VIEW_STYLE}>
      <StatusBar barStyle='default' backgroundColor={theme.color.app.statusBar} />
      <View style={VIEW_STYLE}>
        {/* Main App Logo */}
        <KelvinLogoSvg />
      </View>
    </SafeAreaView>
  )
}
