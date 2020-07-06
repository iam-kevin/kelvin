import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, StyleSheet, Text } from 'react-native'
import { color } from '../../../../theme'

import HeaderLogo from '../../../../assets/svg/AltMiniHeaderLogo'

export const VIEW_STYLE = { flex: 1 }

const layoutStyles = StyleSheet.create({
  appHeader: {
    // flex: 1,
    height: 80,
    justifyContent: "center",
    // backgroundColor: '#777',
    paddingHorizontal: 27,
    width: '100%',
  },
  leftHeader: {
    flex: 1,
    // backgroundColor: '#555',
    flexDirection: 'row',
    alignItems: "center",
  }
})

const textStyle = StyleSheet.create({
  headerTitle: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 24,
    marginHorizontal: 24
  }
})

const AppHeader = () => {
  return (
    <View style={layoutStyles.appHeader}>
      {/* left section */}
      <View style={layoutStyles.leftHeader}>
        <View>
          <HeaderLogo />
        </View>
        <Text style={textStyle.headerTitle}>KELVIN</Text>
      </View>

      {/* right section */}
      <View></View>
    </View>
  )
}

function WrapperContainer ({ children }) {
  return (
    <SafeAreaView style={VIEW_STYLE}>
      <StatusBar barStyle='default' backgroundColor={color.app.statusBar} />
      <View style={VIEW_STYLE}>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default function MainContainer ({ children }) {
  return (
    <WrapperContainer>
      <AppHeader />
      {children}
    </WrapperContainer>
  )
}
