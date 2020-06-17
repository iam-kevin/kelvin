import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar } from 'react-native'
import KelvinLogoSvg from '../../assets/svg/Logo'

const VIEW_STYLE = { flex: 1, justifyContent: 'center', alignItems: 'center' }
const COLORED_VIEW_STYLE = { ...VIEW_STYLE, backgroundColor: '#009245' }

const STATUS_BAR_COLOR = '#007738'

export default function SplashScreen() {
  return (
    <SafeAreaView style={COLORED_VIEW_STYLE}>
      <StatusBar barStyle='default' backgroundColor={STATUS_BAR_COLOR} />
      <View style={VIEW_STYLE}>
        {/* Main App Logo */}
        <KelvinLogoSvg />
      </View>
    </SafeAreaView>
  )
}
