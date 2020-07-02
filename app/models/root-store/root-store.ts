import { Instance, types, flow } from "mobx-state-tree"
import { IMessage } from "react-native-gifted-chat"

import database from '@react-native-firebase/database'
import { Message } from "../../typings"
import { normalizeMessage, buildGiftedUserObj, normalizeMessageToServer } from "../../utils/message"
import { firebase } from "@react-native-firebase/auth"

export interface Reply {
  title: string;
  value: string;
  messageId?: any;
}
export interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}

/**
 * Custom chat object for
 * mobx-state-tree store
 */
const ChatMessage = types.custom<string, IMessage>({
  name: "ChatMessage",
  fromSnapshot(value: string): IMessage {
    return JSON.parse(value) as IMessage
  },
  toSnapshot(value: IMessage): string {
    return JSON.stringify(value)
  },
  isTargetType(value: IMessage | string) {
    return !(typeof value === 'string')
  },
  getValidationMessage(value: string): string {
    let message: IMessage

    try {
      message = JSON.parse(value)
    } catch (e) {
      return `Unable to parse message: ${value}`
    }

    if (message.text !== undefined && message.createdAt !== undefined && message.user !== undefined) return ""
    return `Doesn't seem that the object is a IMessage\n${value}`
  }
})

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore")
  .props({
    messages: types.array(ChatMessage),
  })
  .actions(self => ({
    // ----------------------
    // UI-related updates
    // ----------------------
    /**
     * Sending the message
     */
    updateUIMessage: (addMessageCallback: (previousMessage: IMessage[]) => IMessage[]) => {
      // update the message
      self.messages.replace(addMessageCallback(self.messages))
    },
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
              // load all the images
              const messages: Array<Message> = snap.val()

              const giftedUser = buildGiftedUserObj(userId)
              self.messages.replace(messages.map(normalizeMessage(giftedUser)))
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
