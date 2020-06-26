import React, { useState, useEffect, useReducer, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, Text, StyleSheet } from 'react-native'

import { color } from '../../theme'
import HeaderLogo from '../../assets/svg/AltMiniHeaderLogo'

import ChatArea, { chatAppend } from './chat-area'
import { ChatContext, SEND_MESSAGE } from '../../context/chat-context'
import { useStores } from '../../models'

const VIEW_STYLE = { flex: 1 }

const Container = ({ children, style }) => {
  return (
    <SafeAreaView style={VIEW_STYLE}>
      <StatusBar barStyle='default' backgroundColor={color.app.statusBar} />
      <View style={style}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const layoutStyles = StyleSheet.create({
  appHeader: {
    // flex: 1,
    height: 80,
    width: '100%',
    // backgroundColor: '#777',
    paddingHorizontal: 27,
    justifyContent: "center",
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

export default function MainScreen() {
  const { chatStore } = useStores()
  const onSend = (messages) => {
    chatStore.sendMessage(messages)
  }

  return (
    <Container style={{ flex: 1 }}>
      <AppHeader />
      <ChatArea
        onSend={onSend}
        messages={chatStore.messages}/>
    </Container>
  )
}
