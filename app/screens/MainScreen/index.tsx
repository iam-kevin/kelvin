import React, { useState, useEffect, useReducer, useContext, useCallback, Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, Text, StyleSheet } from 'react-native'

import { color } from '../../theme'
import HeaderLogo from '../../assets/svg/AltMiniHeaderLogo'

import ChatArea from './chat-area'
import ChatContextProvider, { ChatContext, SEND_MESSAGE, chatSocket, CONNECTED_MESSAGE, DISCONNECTED_MESSAGE, normalizeMessageToServer, normalizeMessage } from '../../context/chat-context'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { initialMessages } from '../../models/root-store/root-store'

const io = require('socket.io-client')
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
  // const rootStore = useStores()
  const [state, dispatch] = useContext(ChatContext)

  /**
   * Updates the message renders
   */
  const updateMessages = (newMessages: IMessage[]) => {
    dispatch({
      type: SEND_MESSAGE,
      messages: GiftedChat.append(state.messages, newMessages),
      newMessages
    })
  }
  useEffect(() => {

    chatSocket.on('connect', function() {
      updateMessages([CONNECTED_MESSAGE])
      console.log('Connected to host')
    })

    chatSocket.on('disconnect', function() {
      updateMessages([DISCONNECTED_MESSAGE])
      console.log('Disconnected from host')
    })

    chatSocket.on('reply', function(data) {
      const usableMessage = normalizeMessage(data as PMessage, 'kelvin')
      updateMessages([usableMessage])
      console.log('Replied with: ', data)
    })
  }, [])
  // const updateSingleMessage = (message) => updateMessages([message])

  // // Registers renders to update the
  // // message screen at different points
  // rootStore.registerOnConnect(updateSingleMessage)
  // rootStore.registerOnDisconnect(updateSingleMessage)
  // rootStore.registerOnReply(updateSingleMessage)

  const onSend = (newMessages: IMessage[] = []) => {
    // updates the message render
    updateMessages(newMessages)

    // Sends the message to the server
    newMessages.forEach((msg) => chatSocket.emit('message', normalizeMessageToServer(msg)))
  }

  return (
    <Container style={{ flex: 1 }}>
      <AppHeader />
      <ChatArea
        onSend={onSend}
        messages={state.messages}/>
    </Container>
  )
}

export default () => (<ChatContextProvider><MainScreen /></ChatContextProvider>)
