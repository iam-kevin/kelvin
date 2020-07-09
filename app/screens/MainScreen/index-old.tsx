import React, { useState, useEffect, useLayoutEffect } from 'react'
import ChatArea from './chat-area'
import { IMessage } from 'react-native-gifted-chat'

import { useRootStore, useAuthStore } from '../../models'
import { Message } from "../../typings"
import database from '@react-native-firebase/database'
import { buildGiftedUserObj } from '../../utils/message'
import MainContainer from '../../components/app/container/main'
import { ChatMessage } from '../../models/root-store/chat-model'
import { types } from 'mobx-state-tree'

export default function MainScreen() {
  // const rootStore = useStores()
  // @ts-ignore
  const rootStore = useRootStore()
  const authStore = useAuthStore()

  const [chatId, setChatId] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const giftedUser = buildGiftedUserObj(authStore.userId)
  /**
   * Renders messages and addind to state
   * @param newMessages
   */
  const renderMessages = (newMessages: ChatMessage[]) => {
    // @ts-ignore
    let newMsg = Array.isArray(newMessages) ? newMessages : [newMessages]
    newMsg = rootStore.getMessages().concat(rootStore.getRenderFormatMessages(newMsg, giftedUser))

    console.log("RNDNEWMESSAGE: ", newMsg)
    // console.log("LG_OUTPUT:", withNewMessages)

    // @ts-ignore
    // const out = types.array(ChatMessageModel).create(newMsg)

    // console.log("OUTPUT:", out)
    rootStore.updateMessage(newMsg)
  }

  useEffect(() => {
    // load the messages
    rootStore.loadMessages(authStore.userId, setChatId).then(() => setLoading(false))

    console.log(rootStore.messages)

    // add listener to listen to
    // added messages on the messages subcollection
    const onAddMessage = database()
      .ref(`chats/${chatId}/messages/`)
      .on('child_added', snap => {
        const messageData: Partial<Message> = {}
        messageData[snap.ref.key] = snap.val()

        console.log(messageData)

        // @ts-ignore
        const toRenderMessages = rootStore.getRenderFormatMessages(messageData, giftedUser)

        console.log("NEW LISTENED MESSAGE: ", toRenderMessages)

        // rootStore.renderMessages(toRenderMessages)
        // // const x = ChatMessageModel.create(toRenderMessages[0])
        // // console.log(toRenderMessages[0])
        // // render messages to the screen
        renderMessages(toRenderMessages)
      })

    // // remove the listener
    return () => database()
      .ref(`chats/${chatId}/messages/`)
      .off('child_added', onAddMessage)
  }, [])

  /**
   * Action when the message is sent
   * Controls how to rende the message to the screen
   */
  const onSend = (newMessages: IMessage[] = []) => {
    console.warn("MSG ", newMessages)
    // updates the message render
    rootStore.sendNewMessage(chatId, newMessages[0], 'user') // .then()
  }

  if (!loading) {
    console.log('Loaded', rootStore.getMessages())

    return (
      <MainContainer onLogoPress={() => authStore.logOut()}>
        <ChatArea
          onSend={onSend}
          messages={rootStore.getMessages()}
          // inverted={false}
        />
      </MainContainer>
    )
  } else {
    return null
  }
}
