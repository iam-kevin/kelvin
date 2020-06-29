import { computed, action, observable, IObservableArray } from "mobx"
import { GiftedChat, IMessage } from "react-native-gifted-chat"

import io from 'socket.io-client'
import { fromString } from 'uuidv4'
import { act } from "react-test-renderer"

export const initialMessages: Array<IMessage> = [
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

function normalizeMessage(message: PMessage, sender: SenderType): IMessage {
  const { text, createdAt } = message

  return {
    _id: sender === 'kelvin' ? this.selfId : this.userId,
    text,
    createdAt: createdAt === undefined ? new Date() : createdAt,
    system: message.type === 'system'
  } as IMessage
}

function normalizeMessageToServer(message: IMessage): PMessage {
  const { text, createdAt } = message

  return {
    text,
    type: message.system === true ? 'system' : 'normal',
    createdAt
  } as PMessage
}

export class RootStore {
  /**
   * TODO: make the messages get pulled up from the apps state store
   */
  messages: IObservableArray<IMessage> = observable(initialMessages)

  selfId: string | number
  userId: string | number
  chatSocket: SocketIOClient.Socket

  constructor() {
    this.selfId = 1 // fromString('kelvin')
    this.userId = 2 // fromString('user')

    // connect to the server related to python
    this.chatSocket = io.connect('http://178.62.101.62:5000')
    this.chatSocket.on('connect', () => {
      console.info('Connected to KELVIN')
    })
  }

  /**
   * Sending a single message
   * @param message message from user
   * @param GiftedChatOptions (optional). Options specific to `GiftedChat.append` method
   */
  // @action.bound
  // private sendMessage(message: PMessage, sender: SenderType, ...GiftedChatOptions) {
  //   // Convert message to normal message
  //   const _msg = this.normalizeMessage(message, sender)

  //   // add to message board
  //   this.updateMessageBoard([_msg], ...GiftedChatOptions)
  // }

  // @action.bound
  // private updateMessageBoard(newMessages: IMessage[], ...GiftedChatOptions) {
  //   this.messages.replace(GiftedChat.append(this.messages, newMessages, ...GiftedChatOptions))
  // }

  @action
  registerOnConnect(renderCallback: (message: IMessage) => void) {
    const message = normalizeMessage({
      text: 'You are connected',
      type: 'system'
    }, 'kelvin')
    this.chatSocket.on('connect', function () {
      renderCallback(message)

      console.log('Connected to the host')
    })
  }

  @action
  registerOnDisconnect(renderCallback: (message: IMessage) => void) {
    const message = normalizeMessage({
      text: 'Disconnected from server',
      type: 'system'
    }, 'kelvin')
    this.chatSocket.on('disconnect', function () {
      renderCallback(message)
      console.log('Disconnected from the host')
    })
  }

  @action
  registerOnReply(renderCallback: (message: IMessage) => void) {
    this.chatSocket.on('reply', function (message) {
      const normMessage: IMessage = normalizeMessage(message, 'user')
      renderCallback(normMessage)
    })
  }

  sendToServer(message: IMessage) {
    const normMsg = normalizeMessageToServer(message)
    this.chatSocket.emit('message', normMsg)
  }

  // @action.bound
  // onSend(messages: IMessage[]) {
  //   // Send data to server
  //   messages.forEach(message => {
  //     const normMessage = this.normalizeMessageToServer(message)
  //     console.log(normMessage)

  //     this.chatSocket.emit('message', normMessage)
  //   })

  //   // update the board
  //   this.updateMessageBoard(messages)
  // }
}
