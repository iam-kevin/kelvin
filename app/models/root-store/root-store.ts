import { computed, action, observable, IObservableArray } from "mobx"
import { GiftedChat, IMessage } from "react-native-gifted-chat"
import { types, onSnapshot } from "mobx-state-tree"
import { normalizeMessage } from "../../context/chat-context"

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
 * Store
 */
const RootStoreModel = types.model("RootStore", {
  messages: types.array(ChatMessage),
}).actions(self => ({
  /**
   * Sending the message
   */
  sendMessage: (newMessage: PMessage, sender: SenderType, ...GiftedChatOptions) => {
    const message: IMessage = normalizeMessage(newMessage, sender)

    // update the message
    self.messages.replace(GiftedChat.append(self.messages, [message], ...GiftedChatOptions))
  },

  /**
   * Update
   */
  updateMessageBoard: (newMessages: IMessage[], ...GiftedChatOptions) => {
    // update the message
    self.messages.replace(GiftedChat.append(self.messages, newMessages, ...GiftedChatOptions))
  }
}))

const rootStoreInstance = RootStoreModel.create({
  messages: [
    {
      _id: 2,
      text: 'Ungependa kujua nini?',
      createdAt: new Date(),
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        // @ts-ignore
        position: 'right',
        values: [
          {
            title: 'Hali ya hewa',
            value: 'weather',
          },
          {
            title: 'Shida ya mazao yangu',
            value: 'plant_disease',
          },
          {
            title: 'hali zipi zintakiwezesha nioteshe',
            value: 'crop_yield',
          },
        ],
      },
      user: {
        _id: 2,
        name: 'Kelvin',
      },
    },
    {
      _id: 1,
      text: 'Za kwako Kevin James. Mimi ni K.E.L.V.I.N.',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Kelvin',
      },
    },
  ]
})
