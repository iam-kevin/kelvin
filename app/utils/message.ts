/**
 * Converts messages obtained from
 * firebase (%PROJECT_DIR%/app/typings.d.ts -> Messages)
 * into those needed to render in GiftedChat (react-native-gifted-chat -> IMessage)
 */

import { Message } from "../typings"
import { IMessage, User as GiftedUser } from "react-native-gifted-chat"

// TODO: create a dynamic ID that binds itself to the phone 
// when user creates account on the phone
export const DEFAULT_RENDER_KELVIN_ID = 2

export const buildGiftedUserObj = (userId: string, name?: string): GiftedUser => ({
  _id: userId,
  name: name
})

/**
 * Normalize message for rendering
 */
export const normalizeMessage = (user: GiftedUser) => (message: Message): IMessage => {
  // extracting the properties that dont match with IMessage
  const messageId = Object.keys(message)[0]
  const { isUser, createdAt, ...otherProps } = message[messageId]

  const userObj = isUser ? user : { _id: DEFAULT_RENDER_KELVIN_ID } as GiftedUser

  return {
    ...otherProps,
    createdAt: new Date(createdAt),
    isUser,
    system: otherProps.system === undefined ? false : otherProps.system,
    user: userObj,
    _id: messageId
  } as IMessage
}

/**
 * Normalize message for rendering
 */
export const normalizeMessageFromUser = (user: GiftedUser) => (message: Message): IMessage => {
  // extracting the properties that dont match with IMessage
  const messageId = Object.keys(message)[0]
  const { isUser, ...otherProps } = message[messageId]

  const userObj = isUser ? user : { _id: DEFAULT_RENDER_KELVIN_ID } as GiftedUser

  return { ...otherProps, user: userObj, _id: messageId } as IMessage
}

export const normalizeMessageToServer = (message: IMessage, sender: 'kelvin' | 'user', createAtTimestamp): Message => {
  const { text, image, system } = message

  return {
    text,
    image,
    system: system !== undefined && system,
    isUser: sender === 'user',
    createdAt: createAtTimestamp
  } as Message
}