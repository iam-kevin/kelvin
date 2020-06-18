import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, Text as NativeText, StyleSheet, TextInput } from 'react-native'

import MiniKelvinLogo from '../../assets/svg/MiniLogo'
import { Button, CodeTextField } from "../../components"
import { color, spacing } from "../../theme"

const VIEW_STYLE = { flex: 1 }
const COLORED_VIEW_STYLE = { ...VIEW_STYLE, backgroundColor: '#009245' }

const Container = ({ children, style }) => {
  return (
    <SafeAreaView style={COLORED_VIEW_STYLE}>
      <StatusBar barStyle='default' backgroundColor={color.app.statusBar} />
      <View style={style}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const ACCENT_COLOR = '#95FF61'
const styles = StyleSheet.create({
  textInput : {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: ACCENT_COLOR,
    backgroundColor: ACCENT_COLOR,
    width: 181, 
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontFamily: 'DMSans-Medium',
  }
})

/**
 * View Styles
 */
const layoutStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 50
    // justifyContent: 'center',
  },

  footer: {
    // flex: 0.4
    paddingHorizontal: 54,
    width: '100%'
  },

  info: {
    ...VIEW_STYLE,
    alignItems: 'center',
    // flex: 1,
  },

  input: {
    // backgroundColor: '#87ceeb',
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 0,
  },

  intro: {
    alignItems: 'center',
    paddingHorizontal: 54,
    paddingVertical: 20,
  },
})

/**
 * Text Styles
 */
// Color options for the texts
const BASE_COLOR = { color: '#FFF' }
const TITLE_COLOR = { color: '#E8FFA6' }
const textStyles = StyleSheet.create({
  text: {
    ...BASE_COLOR,
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
  },
  minitext: {
    ...TITLE_COLOR,
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 10,
  },
  subtitle: {
    ...TITLE_COLOR,
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
  },
  title: {
    ...TITLE_COLOR,
    fontFamily: 'ProductSans-Regular',
    fontSize: 28,
  },
})

const TEXT = {
  color: color.palette.black,
  fontFamily: 'DMSans-Regular',
}
const BOLD = { fontWeight: "bold" }
const buttonStyle = StyleSheet.create({
  shell: {
    backgroundColor: "#95FF61",
    borderRadius: 50,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    ...TEXT,
    ...BOLD,
    fontSize: 13,
    letterSpacing: 2,
  }
})

const Title = (props) => (<NativeText {...props} style={{ ...textStyles.title, ...props.style }} />)
const SubTitle = (props) => (<NativeText {...props} style={{ ...textStyles.subtitle, ...props.style }} />)
const Text = (props) => (<NativeText {...props} style={{ ...textStyles.text, ...props.style }} />)

export default function VerifyScreen() {
  const nextScreen = () => console.log('Verifying number')
  const [value, setValue] = useState('')

  return (
    <Container style={layoutStyles.container}>
      <View style={layoutStyles.info}>
        <MiniKelvinLogo />
        <View style={layoutStyles.intro}>
          <Title>Verification</Title>
          <SubTitle>Verify the phone number</SubTitle>
          <Text 
            style={{
              ...textStyles.text,
              textAlign: 'left',
              paddingVertical: 32,
              color: color.palette.white,
              paddingHorizontal: 5 }}>
            Verify the number +255 712 324 885 by entering the verification code sent to the number
          </Text>
          <CodeTextField
            length={5}
            value={value}
            changeCodeAction={setValue}
            cellStyle={{
              backgroundColor: ACCENT_COLOR,
              fontFamily: 'DMSans-Medium',
              fontSize: 32,
              height: 'auto',
              width: 54,
              paddingVertical: 20,
              paddingHorizontal: 5,
              margin: 5,
            }} />
        </View>
      </View>
      <View style={layoutStyles.footer}>
        <Button
          style={buttonStyle.shell}
          textStyle={buttonStyle.text}
          tx={"welcome.verifyButton"}
          onPress={nextScreen} />
      </View>
    </Container>
  )
}
