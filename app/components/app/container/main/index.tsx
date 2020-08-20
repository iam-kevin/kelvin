import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, StyleSheet, Text } from 'react-native'
import { color } from '../../../../theme'
import HeaderLogo from '../../../../assets/svg/AltMiniHeaderLogo'
import { Status } from '../../../..'

import { ProgressBar, TouchableRipple } from 'react-native-paper'

export const VIEW_STYLE = { flex: 1, backgroundColor: color.palette.white }

const layoutStyles = StyleSheet.create({
  appHeader: {
    // backgroundColor: color.palette.white,
    // flex: 1,
    height: 70,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: '#777',
    paddingHorizontal: 27,
    width: '100%',
  },
  leftHeader: {
    // flex: 0.8,
    // backgroundColor: '#555',
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 30,
  },
  rightHeader: {
    flexBasis: 0.2,
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
const StatusCircle = (props: { status: Status }) => (
  <View style={{
    padding: 7,
    backgroundColor: color.app.status[props.status],
    borderRadius: 10
  }}/>
)

const AppHeader = ({ onLogoPress, status }) => {
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
        <Text style={textStyle.headerTitle}>AgroChat</Text>
      </View>

      {/* right section */}
      <View style={layoutStyles.rightHeader}>
        <StatusCircle status={status} />
      </View>
    </View>
  )
}

function WrapperContainer ({ progressVisible, children }) {
  return (
    <SafeAreaView style={VIEW_STYLE}>
      <ProgressBar visible={progressVisible} color={color.app.theme.yellow} indeterminate={true} progress={0.7}/>
      <StatusBar barStyle='default' backgroundColor={color.app.statusBar} />
      <View style={VIEW_STYLE}>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default function MainContainer ({ children, progressVisible, onLogoPress, status }) {
  return (
    <WrapperContainer
      progressVisible={progressVisible !== undefined && progressVisible}>
      <AppHeader onLogoPress={onLogoPress} status={status} />
      {children}
    </WrapperContainer>
  )
}
