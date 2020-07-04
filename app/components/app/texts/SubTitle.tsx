import React from 'react'
import { Text as NativeText } from 'react-native'
import { TextStyles } from './styles'

const SubTitle = (props) => (<NativeText style={{ ...TextStyles.subtitle, ...props.style }} {...props} />)

export default SubTitle
