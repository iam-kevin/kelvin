import React from 'react'
import { Text as NativeText } from 'react-native'
import { TextStyles } from './styles'

const MiniText = (props) => (<NativeText style={{ ...TextStyles.minitext, ...props.style }} {...props} />)

export default MiniText
