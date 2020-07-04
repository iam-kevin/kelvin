import React from 'react'
import IgButton from '../../button/button'
import { StyleSheet } from 'react-native'
import { spacing, color } from '../../../theme'

const TEXT = {
  color: color.palette.black,
  fontFamily: "DMSans-Regular",
}
const BOLD = {
  fontWeight: "bold"
}

const buttonStyle = StyleSheet.create({
  shell: {
    backgroundColor: color.app.theme,
    borderRadius: 50,
    elevation: 5,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    ...TEXT,
    ...BOLD,
    fontFamily: "DMSans-Regular",
    fontSize: 13,
    letterSpacing: 2,
  }
})

export default function Button({ tx, ...buttonProps }) {
  return (
    <IgButton
      {...buttonProps}
      style={buttonStyle.shell}
      textStyle={buttonStyle.text}
      tx={tx} />
  )
}
