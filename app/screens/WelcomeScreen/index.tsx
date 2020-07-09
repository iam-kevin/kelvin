import React from 'react'

import { useNavigation } from '@react-navigation/native'

import Button from '../../components/app/button'
import Text from '../../components/app/texts/Text'
import Title from '../../components/app/texts/Title'
import SubTitle from '../../components/app/texts/SubTitle'
import MiniText from '../../components/app/texts/MiniText'
import IntroContainer from '../../components/app/container/intro'

const Header = () => (
  <>
    <Title>Introducing AgroChat</Title>
    <SubTitle>A mobile chat-based agriculture assistant</SubTitle>
  </>
)

const Footer = ({ onButtonPress }) => (
  <>
    <MiniText>By clicking “Continue”, you agree to the terms and conditions.</MiniText>
    <Button
      tx="welcomeScreen.continue"
      onPress={onButtonPress} />
  </>
)

export default function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate('register')

  return (
    <IntroContainer
      header={() => <Header />}
      footer={() => <Footer onButtonPress={nextScreen} />}
      visible>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt neque vel libero laoreet, ac dapibus justo facilisis. Vivamus interdum
      </Text>
    </IntroContainer>
  )
}
