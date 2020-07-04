import React from 'react'
import { Animated } from 'react-native'
import { NotificationBarProps } from './props'

export default function NotificationBar(props: NotificationBarProps) {
  return (
    <Animated.View {...props}/>
  )
}
