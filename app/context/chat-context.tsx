import React, { createContext, useReducer } from 'react'
import { IMessage } from 'react-native-gifted-chat'
import io from 'socket.io-client'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const REGISTER_ON_CONNECT = 'REGISTER_ON_CONNECT'
export const REGISTER_ON_DISCONNECT = 'REGISTER_ON_DISCONNECT'
export const REGISTER_ON_REPLY = 'REGISTER_ON_REPLY'

export const chatSocket = io.connect('http://178.62.101.62:5000')
const selfId = 1
const userId = 2

export function normalizeMessage(message: PMessage, sender: SenderType): IMessage {
  const { text, createdAt } = message

  return {
    _id: sender === 'kelvin' ? selfId : userId,
    text,
    createdAt: createdAt === undefined ? new Date() : createdAt,
    system: message.type === 'system'
  } as IMessage
}

export function normalizeMessageToServer(message: IMessage): PMessage {
  const { text, createdAt } = message

  return {
    text,
    type: message.system === true ? 'system' : 'normal',
    createdAt
  } as PMessage
}

export const CONNECTED_MESSAGE = normalizeMessage({ text: 'You are connected', type: 'system' }, 'kelvin')
export const DISCONNECTED_MESSAGE = normalizeMessage({ text: 'Disconnected from server', type: 'system' }, 'kelvin')

const initialState = {
  // Sample Text
  messages: [
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
}

export const ChatContext = createContext(initialState)

interface ChatAction {
  type: 'SEND_MESSAGE' | 'REGISTER_ON_CONNECT' | 'REGISTER_ON_DISCONNECT' | 'REGISTER_ON_REPLY' | unknown
  messages: IMessage[]
  newMessages: IMessage[]
  plainMessage? : PMessage
}

const reducer = (state, action: ChatAction) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return ((newMessages: IMessage[]) => {
        // Send the message to the server
        newMessages.forEach((message) => {
          const normMsg = normalizeMessageToServer(message)
          chatSocket.emit('message', normMsg)
          console.log('Sending', message, " to server")
        })

        return {
          ...state,
          messages: action.messages
        }
      })(action.newMessages)
    default:
      return state
  }
}

export default function ChatContextProvider (props) {
  const chatStateActionPair = useReducer(reducer, initialState)
  return (<ChatContext.Provider value={chatStateActionPair} {...props} />)
}
