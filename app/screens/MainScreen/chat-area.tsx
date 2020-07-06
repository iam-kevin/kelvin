import React, { Component } from 'react'
import { GiftedChat, GiftedChatProps } from 'react-native-gifted-chat'

import * as KelvinChatTheme from '../../theme/chat'

const ChatArea: Component<GiftedChatProps> = ({ messages, onSend, ...GiftedChatProps }) => {
  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      {...KelvinChatTheme}
      {...GiftedChatProps} />
  )
}

export const chatAppend = (previousMessage, messages = [], ...moreOpts) => {
  return GiftedChat.append(previousMessage, messages, ...moreOpts)
}

export default ChatArea
