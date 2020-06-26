import { computed } from "mobx"
import { Message } from "react-native-gifted-chat"
import { ChatStore } from "./chat-store"

const initialMessages = [
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
export class RootStore {
  /**
   * Contains the chat related information and actions
   */
  chatStore = null

  constructor(chatStore: ChatStore) {
    this.chatStore = chatStore
  }
}
