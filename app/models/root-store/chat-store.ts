import { computed, action, observable } from "mobx"
import { GiftedChat, IMessage } from "react-native-gifted-chat"

const initialMessages: Array<IMessage> = [
  {
    _id: 2,
    text: 'Ungependa kujua nini?',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
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
      name: 'React Native',
    },
  },
  {
    _id: 1,
    text: 'Za kwako Kevin James. Mimi ni K.E.L.V.I.N.',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
]
export class ChatStore {
  /**
   * TODO: make the messages get pulled up from the apps state store
   */
  @observable messages: Array<IMessage>

  constructor() {
    this.messages = initialMessages
  }

  /* ----------- SENDING MESSAGES -------------------- */

  /**
   * Sending a single message
   * @param message message from user
   * @param GiftedChatOptions (optional). Options specific to `GiftedChat.append` method
   */
  @action sendMessage(message: IMessage, ...GiftedChatOptions) {
    this.updateMessageBoard([message], ...GiftedChatOptions)
  }

  @action updateMessageBoard(newMessages: IMessage[], ...GiftedChatOptions) {
    this.messages = GiftedChat.append(this.messages, newMessages, ...GiftedChatOptions)
  }
}
