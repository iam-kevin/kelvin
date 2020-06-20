import React, { createContext, useReducer } from 'react'

export const SEND_MESSAGE = 'SEND_MESSAGE'

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

const reducer = (state, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: action.messages
      }
    default:
      return state
  }
}

export default function ChatContextProvider (props) {
  const chatStateActionPair = useReducer(reducer, initialState)

  return (<ChatContext.Provider value={chatStateActionPair} {...props} />)
}
