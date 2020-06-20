import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import * as KelvinChatTheme from '../../theme/chat'

export class ChatArea extends React.Component {
  state = {
    messages: [],
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        {...KelvinChatTheme} />
    )
  }

  componentDidMount() {
    this.setState({
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
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
}
