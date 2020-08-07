import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import MainContainer from '../../components/app/container/main'
import ChatArea from './chat-area'
import { IMessage, GiftedChat } from 'react-native-gifted-chat'
import database from '@react-native-firebase/database'
import { useAuthStore } from '../../models'
import { Status, MessageHandler } from '../..'

const KELVIN_BOT_ID = 985

const ChatSessionConnection = (
  userId: string,
  handlers: MessageHandler,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  setChatId: React.Dispatch<React.SetStateAction<string>>) => {
  const chatSocket = new WebSocket('ws://178.62.101.62/chat')
  const socketHandlers = {
    ...handlers,
    updateChatId: function (chatId) {
      // sets the chatId
      setChatId(chatId)
    }
  }

  const regEvents = Object.keys(socketHandlers)

  // setting the connection to the bounce server
  chatSocket.onopen = () => {
    // connection established
    // TODO: add a grin button or something
    setStatus('online')
    chatSocket.send(JSON.stringify({ init: userId }))
  }

  chatSocket.onmessage = (event) => {
    const evts: any = JSON.parse(event.data)
    // If all keys are included
    Object.keys(evts).forEach(e => {
      if (regEvents.includes(e)) {
        socketHandlers[e](evts[e])
      }
    })
  }

  chatSocket.onclose = () => {
    setStatus("offline")
  }

  chatSocket.onerror = (e) => { console.log('Error while connecting. e:', e) }

  return {
    send: (obj: any) => {
      chatSocket.send(JSON.stringify(obj))
    }
  }
}

export default function Main() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [chatId, setChatId] = useState<string | undefined>(undefined)
  // const [canLoadData, setCanLoadData] = useState(false)
  const [status, setStatus] = useState<Status>('connecting')
  const authStore = useAuthStore()

  const socket = ChatSessionConnection(authStore.userId, {
    reply: function (message) {
      // render to the screen
      setMessages(prevMessage => GiftedChat.append(prevMessage, message))
    }
  }, setStatus, setChatId)

  // const chatId = '-MBjcSrqsuMyQcL7fQxe'

  const onSend = async (message = []) => {
    const { _id, user, ...rest } = Array.isArray(message) ? message[0] : message
    const properMessage = {
      ...rest,
      isUser: true
    }

    // send a single message
    socket.send({ message: properMessage })

    // NOTE: The ID's of the messages are NOT consistent, 
    //  since the id of the message is changed (or populated when)
    //  it reaches the server
    setMessages(prevMessage => GiftedChat.append(prevMessage, message))
  }

  useEffect(() => {
    if (chatId !== undefined) {
      database().ref(`chats/${chatId}/messages`)
        .once('value', snap => {
          if (snap.exists()) {
            const retrMessage = snap.val()

            // FIXME: Watchout for the last message
            const messages = Object.keys(snap.val()).reverse().map((key) => {
              const { createdAt, ...rest } = retrMessage[key]

              return {
                ...rest,
                _id: key,
                user: rest.isUser ? {} : { _id: KELVIN_BOT_ID, name: "Kelvin" },
                createdAt: new Date(createdAt),
              }
            })

            setMessages(messages.reverse())
            // console.log(messages)
          }
        })
    } else {
      console.log("Nothing here")
    }
  // @ts-ignore
  }, [chatId])

  return (
    <MainContainer
      onLogoPress={() => authStore.logOut()}
      status={status}>
      <ChatArea
        onSend={onSend}
        messages={messages}
        // inverted={false}
      />
    </MainContainer>
  )
}