import React, { useState, Component } from 'react';
import { Text, StyleSheet } from 'react-native'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { CodeTextFieldProps } from './code-text-field.props';

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20
  },
  cell: {
    width: 40,
    height: 40,
    fontSize: 24,
    borderRadius: 5,
    textAlign: 'center',
  },
});


export const CodeTextField: Component<CodeTextFieldProps> = props => {
  const ref = useBlurOnFulfill({ value: props.value, cellCount: props.length })
  const [innerProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: props.value,
    setValue: props.changeCodeAction,
  })

  return (
    <CodeField
      ref={ref}
      {...innerProps}
      value={props.value}
      onChangeText={props.changeCodeAction}
      cellCount={props.length}
      rootStyle={(props.rootStyle || styles.codeFieldRoot)}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[{ ...styles.cell, ...props.cellStyle}, isFocused && props.focusedCellStyle]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}/>
  )
}
