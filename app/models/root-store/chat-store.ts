import { computed, action, observable, IObservableArray } from "mobx"
import { GiftedChat, IMessage } from "react-native-gifted-chat"

import io from 'socket.io-client'
import { fromString } from 'uuidv4'
import { act } from "react-test-renderer"

const initialMessages: Array<IMessage> = [
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
  messages: IObservableArray<IMessage> = observable(initialMessages)

  private selfId: string
  private userId: string
  chatSocket: WebSocket | any

  constructor() {
    this.selfId = fromString('kelvin')
    this.userId = fromString('user')

    // connect to the server related to python
    this.chatSocket = io('ws://178.62.101.62:5000')
    this.whenConnectionEstablished((msg) => this.sendMessage(msg, 'kelvin'))
    this.whenReceivedMessage((data) => console.log(data))
  }

  /**
   * Sending a single message
   * @param message message from user
   * @param GiftedChatOptions (optional). Options specific to `GiftedChat.append` method
   */
  @action.bound
  private sendMessage(message: PMessage, sender: SenderType, ...GiftedChatOptions) {
    // Convert message to normal message
    const _msg = this.normalizeMessage(message, sender)

    // add to message board
    this.updateMessageBoard([_msg], ...GiftedChatOptions)
  }

  private normalizeMessage(message: PMessage, sender: SenderType): IMessage {
    const { text, createdAt } = message

    return {
      _id: sender === 'kelvin' ? this.selfId : this.userId,
      text,
      createdAt: createdAt === undefined ? new Date() : createdAt,
      system: message.type === 'system'
    } as IMessage
  }

  private normalizeMessageToServer(message: IMessage): PMessage {
    const { text, createdAt } = message

    return {
      text,
      type: message.system === true ? 'system' : 'normal',
      createdAt
    } as PMessage
  }

  @action.bound
  private updateMessageBoard(newMessages: IMessage[], ...GiftedChatOptions) {
    this.messages.replace(GiftedChat.append(this.messages, newMessages, ...GiftedChatOptions))
  }

  /**
   * Registering evenlister when connection is established
   * @param onConnectCallBack
   */
  private whenConnectionEstablished(...onConnectCallBacks: Function[]) {
    this.chatSocket.on('connect', function () {
      const conMessage: PMessage = {
        text: 'You are connected',
        type: 'system'
      }

      onConnectCallBacks.forEach((onConnectCallBack) => onConnectCallBack(conMessage))
    })
  }

  private whenReceivedMessage(...onReceiveCallbacks: Function[]) {
    this.chatSocket.on('reply', function (data) {
      onReceiveCallbacks.forEach((onReceiveCallback) => onReceiveCallback(data))
    })
  }

  @action.bound
  onSend(message: IMessage) {
    // Send data to server
    const normMessage = this.normalizeMessageToServer(message)
    console.log(normMessage)

    // update the board
    this.updateMessageBoard([message])
    this.chatSocket.emit('message', normMessage)
  }
}
