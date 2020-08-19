import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Send as GiftedSend,
  MessageText,
  Bubble,
  SystemMessage,
  InputToolbar } from 'react-native-gifted-chat'
import SendIcon from '../assets/svg/SendIcon'

/**
 * Setting custom styles for the caht
 */
const fontStyles = StyleSheet.create({
  base: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14
  }
})

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  messageTextStyle: {
    paddingHorizontal: 3,
    paddingVertical: 5,
    ...fontStyles.base
  }
})

// custom send
const Send = props => {
  return (
    <GiftedSend {...props} containerStyle={styles.container}>
      <SendIcon />
    </GiftedSend>
  )
}
// renders responsible
export const renderMessageText = props => (
  <MessageText {...props}
    customTextStyle = {styles.messageTextStyle}/>
)

export const renderBubble = props => (
  <Bubble {...props}
    textStyle={{
      left: {
        color: '#FFF',
      },
      right: {
        color: '#000'
      }
    }}
    wrapperStyle={{
      left: {
        borderRadius: 24,
        backgroundColor: '#3E9A3D',
        marginHorizontal: 15
      },
      right: {
        borderRadius: 24,
        backgroundColor: '#DEDEDE',
      }
    }}
    bottomContainerStyle={{
      left: {
        backgroundColor: 'transparent',
      }
    }}
    quickReplyStyle={{
      borderRadius: 26,
      paddingHorizontal: 20,
      fontFamily: 'DMSans-Medium',
      marginHorizontal: 15,
      minHeight: 40,
    }} />
)

export const renderSystemMessage = props => (
  <SystemMessage {...props}
    textStyle={{
      fontFamily: 'DMSans-Regular',
    }} />
)

export const renderTime = _ => null

// Dont render any avatar
export const showUserAvatar = false
export const renderAvatar = null

// responsible for chat input field
export const placeholder = "Unataka kufahamu nini?"
export const renderSend = props => (<Send {...props} />)
export const textInputProps = {
  fontFamily: 'DMSans-Regular',
  fontSize: 18,
  alignItems: 'center',
}
// export const minInputToolbarHeight = 56
const HEIGHT = 56
export const minComposerHeight = HEIGHT - 2
export const minInputToolbarHeight = HEIGHT + 20

export const renderInputToolbar = props => (
  <InputToolbar {...props}
   containerStyle={{
    heigth: HEIGHT,
    padding: 8,
    lineHeight: 0
   }}/>
)
