import React from 'react'
import { Button as IgButton } from '../../../components/button/button'
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
  contentStyle: {
    backgroundColor: color.app.theme.accent,
    elevation: 5,
    // paddingHorizontal: spacing[4],
    // paddingVertical: spacing[4],
    // shadowColor: color.palette.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  outerStyle: {
    borderRadius: 50
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
      outerStyle={buttonStyle.outerStyle}
      style={buttonStyle.contentStyle}
      textStyle={buttonStyle.text}
      tx={tx}
      {...buttonProps} />
  )
}
