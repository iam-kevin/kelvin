import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar, View, StyleSheet } from 'react-native'
import { color } from '../../../../theme'
import { flatten } from 'ramda'
import { ProgressBar } from 'react-native-paper'

import MiniKelvinLogo from '../../../../assets/svg/MiniLogo'
import NotificationBar from '../../notification-bar'

export const VIEW_STYLE = { flex: 1 }
export const COLORED_VIEW_STYLE = { ...VIEW_STYLE, backgroundColor: '#009245' }

const layoutStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 50
    // justifyContent: 'center',
  },

  footer: {
    // flex: 0.4
    paddingHorizontal: 54,
    width: '100%'
  },

  info: {
    ...VIEW_STYLE,
    alignItems: 'center',
    // flex: 1,
  },

  intro: {
    alignItems: 'center',
    paddingHorizontal: 54,
    paddingVertical: 20,
  },
})

function WrapperContainer ({ notificationVisible, progressVisible, style, children }) {
  return (
    <SafeAreaView style={COLORED_VIEW_STYLE}>
      <ProgressBar visible={progressVisible} color={color.app.theme.accent} indeterminate={true} progress={0.7}/>
      <NotificationBar visible={notificationVisible}/>
      <StatusBar barStyle='default' backgroundColor={color.app.statusBar} />
      <View style={flatten([style, layoutStyles.container])}>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default function IntroContainer ({ header, notificationVisible, progressVisible, children, footer }) {
  return (
    <WrapperContainer
      style={layoutStyles.container}
      notificationVisible={notificationVisible}
      progressVisible={progressVisible}>
      <View style={layoutStyles.info}>
        <MiniKelvinLogo />
        <View style={layoutStyles.intro}>
          {header()}
          {children}
        </View>
      </View>
      <View style={layoutStyles.footer}>
        {footer()}
      </View>
    </WrapperContainer>
  )
}
