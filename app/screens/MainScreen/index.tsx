import React, { useState, useEffect, useReducer, useContext, useCallback, Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, Text, StyleSheet } from 'react-native'

import { color } from '../../theme'
import HeaderLogo from '../../assets/svg/AltMiniHeaderLogo'

import ChatArea, { chatAppend } from './chat-area'
import { ChatContext, SEND_MESSAGE } from '../../context/chat-context'
import { useStores, RootStoreProvider } from '../../models'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { observable } from 'mobx'
import { ChatStore, initialMessages } from '../../models/root-store/chat-store'
import { observer } from 'mobx-react'

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

function MainScreen() {
  const { chatStore } = useStores()
  const [messages, setMessages] = useState(initialMessages)

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(GiftedChat.append(messages, newMessages))
    // chatStore.onSend(messages)
  }

  return (
    <Container style={{ flex: 1 }}>
      <AppHeader />
      <ChatArea
        onSend={onSend}
        messages={messages}/>
    </Container>
  )
}

export default observer(MainScreen)
