import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, Text, StyleSheet } from 'react-native'

import { color } from '../../theme'
import HeaderLogo from '../../assets/svg/AltMiniHeaderLogo'
import ChatArea from './chat-area'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

import { useRootStore, useAuthStore } from '../../models'
import { Message } from "../../typings"
import database from '@react-native-firebase/database'
import { normalizeMessage, buildGiftedUserObj } from '../../utils/message'

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

export default function MainScreen() {
  // const rootStore = useStores()
  // @ts-ignore
  const rootStore = useRootStore()
  const authStore = useAuthStore()

  console.log("userKey", authStore.userId)

  const [chatId, setChatId] = useState<string | undefined>(undefined)
  /**
   * Renders messages and addind to state
   * @param newMessages
   */
  const renderMessages = (newMessages: IMessage[]) => {
    rootStore.updateUIMessage((prevMessage) => {
      return GiftedChat.append(prevMessage, newMessages)
    })
  }

  useEffect(() => {
    // load the messages
    rootStore.loadMessages(authStore.userId, setChatId)

    // add listener to listen to
    // added messages on the messages subcollection
    const onAddMessage = database()
      .ref(`chats/${chatId}/messages/`)
      .on('child_added', snap => {
        const gUser = buildGiftedUserObj(authStore.userId)
        const message = normalizeMessage(gUser)(snap.val() as Message)

        // render messages to the screen
        renderMessages([message])
      })

    // remove the listener
    return () => database()
      .ref(`chats/${chatId}/messages/`)
      .off('child_added', onAddMessage)
  }, [])

  /**
   * Action when the message is sent
   * Controls how to rende the message to the screen
   */
  const onSend = (newMessages: IMessage[] = []) => {
    // updates the message render
    rootStore.sendNewMessage(chatId, newMessages[0], 'user').then(() => {
      renderMessages(newMessages)
    })
  }

  return (
    <Container style={{ flex: 1 }}>
      <AppHeader />
      <ChatArea
        onSend={onSend}
        messages={rootStore.messages}/>
    </Container>
  )
}
