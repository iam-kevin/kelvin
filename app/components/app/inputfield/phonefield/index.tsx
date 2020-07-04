import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { flatten } from 'ramda'
import { TextStyles } from '../../texts/styles'

const styles = {
  input: {
    // backgroundColor: '#87ceeb',
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 0,
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#95FF61',
    backgroundColor: '#95FF61',
    width: 181,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontFamily: 'DMSans-Medium',
  },
}
export default function PhoneNumberField({ wrapperStyle, textInputStyle, ...textInputProps }) {
  return (
    <View style={flatten([styles.input, wrapperStyle])}>
      <Text style={TextStyles.text}>+255</Text>
      <TextInput
        style={flatten([styles.textInput, textInputStyle])}
        keyboardType="phone-pad"
        {...textInputProps} />
    </View>
  )
}
