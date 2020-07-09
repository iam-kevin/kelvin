import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, StyleSheet, Text } from 'react-native'
import { color } from '../../../../theme'
import { TouchableRipple } from 'react-native-paper'
import HeaderLogo from '../../../../assets/svg/AltMiniHeaderLogo'

export const VIEW_STYLE = { flex: 1, backgroundColor: color.palette.white }

const layoutStyles = StyleSheet.create({
  appHeader: {
    backgroundColor: color.palette.white,
    // flex: 1,
    height: 70,
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
    borderRadius: 30,
  }
})

const textStyle = StyleSheet.create({
  headerTitle: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 24,
    marginHorizontal: 24
  }
})

const AppHeader = ({ onLogoPress }) => {
  return (
    <View style={layoutStyles.appHeader}>
      {/* left section */}
      <View style={layoutStyles.leftHeader}>
        <TouchableRipple
          borderless
          onPress={onLogoPress}
          rippleColor="rgba(0, 0, 0, .32)"
          style={{
            width: 42,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
            borderRadius: 26
          }}>
          <HeaderLogo />
        </TouchableRipple>
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

export default function MainContainer ({ children, onLogoPress }) {
  return (
    <WrapperContainer>
      <AppHeader onLogoPress={onLogoPress} />
      {children}
    </WrapperContainer>
  )
}
