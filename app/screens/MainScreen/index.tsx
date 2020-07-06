import React, { useState, useEffect } from 'react'
import ChatArea from './chat-area'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

import { useRootStore, useAuthStore } from '../../models'
import { Message } from "../../typings"
import database from '@react-native-firebase/database'
import { normalizeMessage, buildGiftedUserObj } from '../../utils/message'
import MainContainer from '../../components/app/container/main'
import { ChatMessage, ChatMessageModel } from '../../models/root-store/chat-model'

export default function MainScreen() {
  // const rootStore = useStores()
  // @ts-ignore
  const rootStore = useRootStore()
  const authStore = useAuthStore()

  const [chatId, setChatId] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * Renders messages and addind to state
   * @param newMessages
   */
  const renderMessages = (newMessages: ChatMessage[]) => {
    // @ts-ignore
    rootStore.updateUIMessage((prevMessage) => {
      // @ts-ignore
      const newMessg = GiftedChat.append(prevMessage, newMessages)

      console.log(newMessg)
      return newMessg
    })
  }

  useEffect(() => {
    (async () => {
      // load the messages
      rootStore.loadMessages(authStore.userId, setChatId).then(() => setLoading(true))

      // add listener to listen to
      // added messages on the messages subcollection
      const onAddMessage = database()
        .ref(`chats/${chatId}/messages/`)
        .on('child_added', snap => {
          const gUser = buildGiftedUserObj(authStore.userId)
          const messageData: Partial<Message> = {}
          messageData[snap.ref.key] = snap.val()

          // @ts-ignore
          const toRenderMessages = rootStore.getRenderFormatMessages(messageData, gUser)

          const x = ChatMessageModel.create(toRenderMessages[0])

          // render messages to the screen
          renderMessages(toRenderMessages)
        })

      // remove the listener
      return () => database()
        .ref(`chats/${chatId}/messages/`)
        .off('child_added', onAddMessage)
    })()
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

  if (loading) {
    console.log("INITIAl REFRESH: ", rootStore.messages)

    return (
      <MainContainer>
        <ChatArea
          onSend={onSend}
          messages={rootStore.messages.slice()}/>
      </MainContainer>
    )
  } else {
    return null
  }
}
