import { SnapshotIn, SnapshotOut, Instance, types } from "mobx-state-tree"
/**
 * Custom chat object for
 * mobx-state-tree store
 */
export const ChatMessageModel = types.model("ChatMessage", {
  _id: types.string,
  text: types.string,
  createdAt: types.union(types.number, types.Date),
  system: types.boolean,
  user: types.model({
    _id: types.union(types.string, types.number),
    name: types.maybe(types.string),
    avatar: types.maybe(types.string)
  }),
  image: types.maybe(types.string),
  audio: types.maybe(types.string),
  video: types.maybe(types.string),
  sent: types.maybe(types.boolean),
  received: types.maybe(types.boolean),
  pending: types.maybe(types.boolean),
  quickReplies: types.maybe(types.model({
    type: types.string,
    keepIt: types.maybe(types.boolean),
    values: types.model({
      title: types.string,
      value: types.string,
      messageId: types.maybe(types.string)
    })
  }))
})

export interface ChatMessage extends Instance<typeof ChatMessageModel> {} // => { title: string; setTitle: (v: string) => void }
export interface ChatMessageSnapshotIn extends SnapshotIn<typeof ChatMessageModel> {} // => { title?: string }
export interface ChatMessageSnapshotOut extends SnapshotOut<typeof ChatMessageModel> {} // => { title: string }
