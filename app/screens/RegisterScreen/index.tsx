import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import Button from '../../components/app/button'
import Text from '../../components/app/texts/Text'
import MiniText from '../../components/app/texts/MiniText'
import Title from '../../components/app/texts/Title'
import SubTitle from '../../components/app/texts/SubTitle'

import IntroContainer from '../../components/app/container/intro'
import { TextStyles } from '../../components/app/texts/styles'
import { color } from '../../theme'
import PhoneNumberField from '../../components/app/inputfield/phonefield'

const textStyle = {
  ...TextStyles.text,
  textAlign: 'left',
  paddingVertical: 3,
  color: color.palette.white,
  paddingHorizontal: 5
}

const Header = () => (
  <>
    <Title>You are new here</Title>
    <SubTitle>Register your phone number</SubTitle>
    <Text style={textStyle}>
      Enter the phone number you would like to register for Kelvin.
    </Text>
  </>
)

const Footer = ({ onButtonPress }) => (
  <>
    <MiniText>By clicking “Continue”, you agree to the terms and conditions.</MiniText>
    <Button
      tx="welcome.register"
      onPress={onButtonPress} />
  </>
)

export default function RegisterScreen() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigation = useNavigation()

  // TODO: validate and pass phone number to next screen
  //  Also validate phone number
  const nextScreen = () => {
    // send the phone number
    navigation.navigate('verify', {
      phoneNumber
    })
  }

  return (
    <IntroContainer
      header={() => <Header />}
      footer={() => <Footer onButtonPress={nextScreen} />}
      visible>
      <PhoneNumberField
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber} />
    </IntroContainer>
  )
}
