import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, Text as NativeText, StyleSheet } from 'react-native'

import MiniKelvinLogo from '../../assets/svg/MiniLogo'
import { Button } from "../../components"
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

  intro: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 54,
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
    fontFamily: 'DM Sans',
    textAlign: 'center',
    paddingVertical: 32,
  },
  minitext: {
    ...TITLE_COLOR,
    fontFamily: 'DM Sans',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 10,
  },
  subtitle: {
    ...TITLE_COLOR,
    fontFamily: 'DM Sans',
    fontSize: 12,
  },
  title: {
    ...TITLE_COLOR,
    fontFamily: 'Product Sans',
    fontSize: 20,
  },
})

const TEXT = {
  color: color.palette.black,
  fontFamily: "DM Sans",
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

const Title = (props) => (<NativeText style={{ ...textStyles.title, ...props.style }} {...props} />)
const SubTitle = (props) => (<NativeText style={{ ...textStyles.subtitle, ...props.style }} {...props} />)
const Text = (props) => (<NativeText style={{ ...textStyles.text, ...props.style }} {...props} />)
const MiniText = (props) => (<NativeText style={{ ...textStyles.minitext, ...props.style }} {...props} />)

export default function WelcomeScreen() {
  const nextScreen = () => console.log('Moving on...')

  return (
    <Container style={layoutStyles.container}>
      <View style={layoutStyles.info}>
        <MiniKelvinLogo />
        <View style={layoutStyles.intro}>
          <Title>Introducing Kelvin</Title>
          <SubTitle>A mobile chat-based agriculture assistant</SubTitle>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt neque vel libero laoreet, ac dapibus justo facilisis. Vivamus interdum
          </Text>
        </View>
      </View>
      <View style={layoutStyles.footer}>
        <MiniText>By clicking “Continue”, you agree to the terms and conditions.</MiniText>
        <Button
          style={buttonStyle.shell}
          textStyle={buttonStyle.text}
          tx="welcomeScreen.continue"
          onPress={nextScreen} />
      </View>
    </Container>
  )
}
