import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import MainContainer from '../../components/app/container/main'
import ChatArea from './chat-area'
import { IMessage, GiftedChat } from 'react-native-gifted-chat'
import database from '@react-native-firebase/database'
import { useAuthStore } from '../../models'

import { v4 as uuidv4 } from 'uuid'

const KELVIN_BOT_ID = 1

export default function Main() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [chatId, setChatId] = useState<string>(undefined)
  const [canLoadData, setCanLoadData] = useState(false)

  const authStore = useAuthStore()

  // const chatId = '-MBjcSrqsuMyQcL7fQxe'
  const onSend = async (message = []) => {
    console.log('Sending message', message)

    // firebase.database().ref().child('posts').push().key
    database()
      .ref(`chats/${chatId}/messages`)
      .push().once('value', snap => {
        const { _id, ...others } = message[0]

        snap.ref.set({
          ...others,
          createdAt: database.ServerValue.TIMESTAMP
        })
      })

    setMessages(prevMessage => GiftedChat.append(prevMessage, message))
  }

  useEffect(() => {
    // Load the chat Session bound to the user
    database().ref(`users/${authStore.userId}`)
      .once('value', snap => {
        setChatId(snap.val().chatId)
      })
  }, [])

  useLayoutEffect(() => {
    database().ref(`chats/${chatId}/messages`)
      .once('value', snap => {
        if (snap.exists()) {
          console.log('Initial Load:', snap.val())
          const retrMessage = snap.val()

          // FIXME: Watchout for the last message
          const messages = Object.keys(snap.val()).reverse().slice(0, Object.keys(snap.val()).length).map((key) => {
            const { createdAt, ...rest } = retrMessage[key]

            return {
              ...rest,
              _id: key,
              user: rest.user === undefined ? {} : { _id: KELVIN_BOT_ID, name: "Kelvin" },
              createdAt: new Date(createdAt),
            }
          })

          setMessages(messages.reverse())
        }
      })

    database().ref(`chats/${chatId}/messages`).limitToLast(1)
      .on('child_added', (snap) => {
        if (canLoadData === false) {
          setCanLoadData(true)
          console.log('Setting data')
          return ;
        }

        console.log('FROM DATABASE (SNAP.VAL):', snap.val())
        const { createdAt, ...rest } = snap.val()

        const message = {
          ...rest,
          _id: snap.ref.key,
          user: rest.user === undefined ? {} : { _id: KELVIN_BOT_ID, name: "Kelvin" },
          createdAt: new Date(createdAt),
        }
        setMessages(prevMessage => GiftedChat.append(prevMessage, message))
      })

    // return database().ref(`chats/${chatId}/messages`).off()
    // return subscribe
  }, [chatId])

  return (
    <MainContainer onLogoPress={() => authStore.logOut()}>
      <ChatArea
        onSend={() => onSend().then(() => {
          // Adding a message after sending
          setMessages(prevMessage => GiftedChat.append(prevMessage, [{
            _id: uuidv4(),
            text: "This was the response",
            createdAt: new Date(),
            user: { _id: KELVIN_BOT_ID, name: 'Kelvin'}
          }]))
        })}
        messages={messages}
        // inverted={false}
      />
    </MainContainer>
  )
}