import React from 'react'
import { CodeTextField as SlCodeTextField } from '../../../text-fields/code-text-field/code-text-field'
import { color } from '../../../../theme'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  cell: {
    backgroundColor: color.app.theme.accent,
    fontFamily: 'DMSans-Medium',
    fontSize: 32,
    height: 'auto',
    margin: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: 54,
  },
  focusedCell: {
    backgroundColor: color.app.theme.yellow,
    elevation: 5,
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
})

export default function CodeTextField({ length, ...otherNonStyleProps }) {
  return (
    <SlCodeTextField
      length={length}
      {...otherNonStyleProps}
      cellStyle={styles.cell}
      focusedCellStyle={styles.focusedCell} />
  )
}