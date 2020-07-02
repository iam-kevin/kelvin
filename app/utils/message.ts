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
  const { isUser, ...otherProps } = message

  const userObj = isUser ? user : { _id: DEFAULT_RENDER_KELVIN_ID } as GiftedUser

  return { ...otherProps, user: userObj } as IMessage
}

export const normalizeMessageToServer = (message: IMessage, sender: 'kelvin' | 'user', createAtTimestamp): Message => {
  const { text, image, system } = message

  return {
    text,
    image,
    system,
    isUser: sender === 'user',
    createdAt: createAtTimestamp
  } as Message
}