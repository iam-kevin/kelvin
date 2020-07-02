/**
 * This is the user information 
 * as received from the app and sent to
 * users/{userId}
 * 
 * Using the trigger function, this should then be converted
 * to the `User` data
 */
export interface User {
  _id?: string
  username?: string
  uid: string
  name?: string
  services: Service[]
  avatar?: Blob   // This wont be dealt with
}

/**
* User object stored in
* users/{userId}
*/
export interface PostUser {
  _id: string
  uid: User['uid']
  username?: string
  name? : string
  avatar?: string
  chatId: ChatDocument['_id']
}

/**
* Message object stored in the
* chats/{chatId}/messages/{messageId}
*/
export interface Message {
  _id?: string
  text: string
  createdAt: Date | FirebaseFirestore.FieldValue
  image?: string
  system: boolean,
  isUser: boolean
}

// Utils: interfaces
interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}

interface Reply {
  title: string;
  value: string;
  messageId?: any;
}

/**
* Chat object stored in the
* chats/{chatId}
*/
export interface ChatDocument {
  _id: string
  messages: FirebaseFirestore.CollectionReference<Message>[]
  quickReplies?: QuickReplies
  services: Array<Service>
}

/**
* Services that are enabled in KELVIN
*/
export type Service = 'weather' | 'plant-disease' | 'crop-yield'