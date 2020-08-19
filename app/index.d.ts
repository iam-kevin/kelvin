import { type } from "ramda"

interface PMessage {
  text: string
  type? : 'normal' | 'system'
  createdAt?: Date
}

interface MessageHandler {
  [eventName: string]: (...args: any[]) => void
}

type SenderType = 'user' | 'kelvin'

type Status = 'online' | 'offline' | 'connecting'
