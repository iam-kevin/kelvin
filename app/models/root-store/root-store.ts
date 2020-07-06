import { Instance, types, flow } from "mobx-state-tree"
import { IMessage, User } from "react-native-gifted-chat"

import database from '@react-native-firebase/database'
import { normalizeMessage, buildGiftedUserObj, normalizeMessageToServer } from "../../utils/message"
import { firebase } from "@react-native-firebase/auth"

import { ChatMessageModel, ChatMessage } from './chat-model'
import { Message } from "../../typings"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore")
  .props({
    messages: types.array(ChatMessageModel),
  })
  .actions(self => ({
    updateMessage: (messages: ChatMessage[]) => {
      self.messages.replace(messages)
    },
    // ----------------------
    // UI-related updates
    // ----------------------
    /**
     * Sending the message
     */
    updateUIMessage: (addMessageCallback: (previousMessage: ChatMessage[]) => ChatMessage[]) => {
      // update the message
      self.messages.replace(addMessageCallback(self.messages))
    },
  }))
  .views(self => ({
    getRenderFormatMessages: (messages: Message | Message[], giftedUser: User): ChatMessage[] => {
      let toRenderMessages = Array.isArray(messages) ? messages : [messages]

      // @ts-ignore
      toRenderMessages = toRenderMessages.map(normalizeMessage(giftedUser))
      // // @ts-ignore
      // toRenderMessages = toRenderMessages.map(ChatMessageModel.create)

      // @ts-ignore
      return toRenderMessages
    }
  }))
  .actions(self => ({
    // ----------------------
    // API-related updates
    // ----------------------
    /**
     * Load the messages from the database
     */
    loadMessages: flow(function * loadMessages(userId: string, chatAction: React.Dispatch<React.SetStateAction<string>>) {
      // Initial message loading
      database()
        .ref(`users/${userId}`)
        .once('value')
        .then(snap => {
          // check to obtain the chatId value
          const chatId: string = snap.val().chatId
          chatAction(chatId)

          // load all messages from values
          database()
            .ref(`chats/${chatId}/messages`)
            .once('value')
            .then(snap => {
              const giftedUser = buildGiftedUserObj(userId)
              // load all the images
              const messages = snap.val()

              self.updateMessage(self.getRenderFormatMessages(messages, giftedUser))
            })
        })
    }),

    /**
     * Send message to the firebase server
     */
    sendNewMessage: flow(function * sendNewMessage(chatId: string, message: IMessage, sender: 'kelvin' | 'user') {
      // send message
      const newMsgRef = database()
        .ref(`chats/${chatId}/messages/`)
        .push()

      // generate key
      console.log('Generated key', newMsgRef.key)

      // Send data to server
      const msgToSvr = normalizeMessageToServer(message, sender, firebase.database().getServerTime())
      newMsgRef.set(msgToSvr).then(() => console.log('Data added'))
    })
  }))
/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
