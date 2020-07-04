import React from 'react'
import { Text as NativeText } from 'react-native'
import { TextStyles } from './styles'

const Title = (props) => (<NativeText style={{ ...TextStyles.title, ...props.style }} {...props} />)

export default Title
