interface PMessage {
  text: string
  type? : 'normal' | 'system'
  createdAt?: Date
}

type SenderType = 'user' | 'kelvin'
