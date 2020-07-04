import React, { useState } from 'react'
import { useAuthStore } from '../../models'

import { color } from '../../theme'

import { TextStyles } from '../../components/app/texts/styles'
import Button from '../../components/app/button'
import Text from '../../components/app/texts/Text'
import Title from '../../components/app/texts/Title'
import SubTitle from '../../components/app/texts/SubTitle'
import IntroContainer from '../../components/app/container/intro'
import CodeTextField from '../../components/app/inputfield/codetextfield'

const textStyle = {
  ...TextStyles.text,
  textAlign: 'left',
  paddingVertical: 32,
  color: color.palette.white,
  paddingHorizontal: 5
}

const Header = () => (
  <>
    <Title>Verification</Title>
    <SubTitle>Verify the phone number</SubTitle>
  </>
)

const Footer = ({ onButtonPress }) => (
  <>
    <Button
      tx="welcome.verifyButton"
      onPress={onButtonPress} />
  </>
)

/**
 * Length of the code
 */
const CODE_LENGTH = 6

function VerifyScreen({ route }) {
  //
  const authStore = useAuthStore()
  const [confirm, setConfirm] = useState(null)
  const [code, setCode] = useState('')

  // TODO: bind phone number string with value in store
  const { phoneNumber: userPhoneNumber } = route.params
  const phoneNumber = `+255${userPhoneNumber}`

  // perform code sending
  authStore.signIn(phoneNumber).then((confirm) => setConfirm(confirm))

  // TODO: verify user using phone number
  //  Update the token via async Storage
  const verifyUser = async () => {
    if (code.length !== CODE_LENGTH) {
      console.log('Make sure the code length matched first')
    } else {
      console.log('Verifying')
      authStore.confirmAndLink(confirm, code)
    }
  }

  return (
    <IntroContainer
      header={() => (<Header />)}
      footer={() => <Footer onButtonPress={verifyUser} />}
      visible>
      <Text style={textStyle}>
        Verify the number {phoneNumber} by entering the verification code sent to the number
      </Text>
      <CodeTextField
        length={CODE_LENGTH}
        value={code}
        changeCodeAction={setCode} />
    </IntroContainer>
  )
}

export default VerifyScreen
