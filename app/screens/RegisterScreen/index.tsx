import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StatusBar, Text as NativeText, StyleSheet, TextInput } from 'react-native'

import MiniKelvinLogo from '../../assets/svg/MiniLogo'
import { Button } from "../../components"
import { color, spacing } from "../../theme"
import { useNavigation } from '@react-navigation/native'

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

const styles = StyleSheet.create({
  textInput : {
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
    fontSize: 20,
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


const Title = (props) => (<NativeText style={{ ...textStyles.title, ...props.style }} {...props} />)
const SubTitle = (props) => (<NativeText style={{ ...textStyles.subtitle, ...props.style }} {...props} />)
const Text = (props) => (<NativeText style={{ ...textStyles.text, ...props.style }} {...props} />)  

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
    <Container style={layoutStyles.container}>
      <View style={layoutStyles.info}>
        <MiniKelvinLogo />
        <View style={layoutStyles.intro}>
          <Title>You are new here</Title>
          <SubTitle>Register your phone number</SubTitle>
          <Text style={{ ...textStyles.text,
                          textAlign: 'left', 
                          paddingVertical: 32, 
                          color: color.palette.white, 
                          paddingHorizontal: 5
                        }}>
            Enter the phone number you would like to register for Kelvin.
          </Text>
          <View style={layoutStyles.input}>
            <Text>+255</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber} />
          </View>
        </View>
      </View>
      <View style={layoutStyles.footer}>
        <Button
          style={buttonStyle.shell}
          textStyle={buttonStyle.text}
          tx={"welcome.register"}
          onPress={nextScreen} />
      </View>
    </Container>
  )
}
