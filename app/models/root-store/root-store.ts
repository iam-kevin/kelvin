import { Instance, types, flow, cast } from "mobx-state-tree"
import { IMessage, User } from "react-native-gifted-chat"

import database from '@react-native-firebase/database'
import { normalizeMessage, normalizeMessageFromUser, buildGiftedUserObj, normalizeMessageToServer } from "../../utils/message"

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
      self.messages = messages
    },
    // ----------------------
    // UI-related updates
    // ----------------------
    /**
     * Sending the message
     */
    updateUIMessage: (addMessageCallback: (previousMessage: ChatMessage[]) => ChatMessage[]) => {
      // update the message
      self.messages = addMessageCallback(self.messages)
    },
  }))
  .views(self => ({
    getMessages: () => {
      return self.messages
    },
    getRenderFormatMessages: (messages: Message | Message[] | null, giftedUser: User): ChatMessage[] => {
      // @ts-ignore
      /**
       * { "dasda": {
       *    text: "asdasdasds",
       *    createdAt: "sdadsad"
       * },
       * "sadad": {
       *    text: "asdasdasds",
       *    createdAt: "sdadsad"
       * }}
       */
      if (messages === null) return []

      const msgs = Object.keys(messages).map(key => {
        const msg = {}
        msg[key] = messages[key]

        const out = normalizeMessageFromUser(giftedUser)(msg)
        return out
      })

      // console.warn(msgs)
      // @ts-ignore
      return msgs
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
          if (snap.exists()) {
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
                // console.warn(messages)

                self.updateMessage(self.getRenderFormatMessages(messages, giftedUser))
              })
          }
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

      // Send data to server
      const msgToSvr = normalizeMessageToServer(message, sender, database().getServerTime())
      newMsgRef.set(msgToSvr).then(() => console.log('Data added'))

      // const giftedUser = buildGiftedUserObj(userId)
      return message
    })
  }))
/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
