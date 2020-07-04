import React from 'react'
import { Text as NativeText } from 'react-native'
import { TextStyles } from './styles'

const Text = (props) => (<NativeText style={{ ...TextStyles.text, ...props.style }} {...props} />)

export default Text
