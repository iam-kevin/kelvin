import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { GiftedChat, GiftedChatProps, MessageImage } from 'react-native-gifted-chat'
import { Modal, Portal, Text, Button, Provider, Menu, IconButton, Colors } from 'react-native-paper'

import { v1 as uuidv1 } from 'uuid'

import * as KelvinChatTheme from '../../theme/chat'
import UploadImageIcon from '../../assets/svg/UploadImageIcon'

import CloseIcon from '../../assets/svg/CloseIcon'
import InsertPhotoIcon from '../../assets/svg/InsertPhotoIcon'
import CameraAltIcon from '../../assets/svg/CameraAltIcon'

import ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({
  actionStyle: {
    alignSelf: 'center',
    borderRadius: 50,
    padding: 10,
  },
})

const PhotoMenuWrapper = ({ visible, onDismiss, children, onTakePhoto, onUploadFromGallery }) => {
  return (
    <View style={{
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'center'
      }}
    >
      <Menu
        visible={visible}
        onDismiss={onDismiss}
        anchor={children}
      >
        <Menu.Item
          icon={({ size, color }) => (
            <CameraAltIcon />
          )}
          onPress={onTakePhoto}
          title="Take Photo"
        />
        <Menu.Item
          icon={({ size, color }) => (
            <InsertPhotoIcon/>
          )}
          onPress={onUploadFromGallery}
          title="Upload from gallery"
        />
        <Menu.Item
          icon={({ size, color }) => (
            <CloseIcon/>
          )}
          onPress={onDismiss}
          title="Cancel"
        />
      </Menu>
    </View>
  )
}

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

interface ImageSource {
  uri: string
}

const ChatArea: Component<GiftedChatProps> = ({ messages, onSend, ...GiftedChatProps }) => {
  const [visible, setVisible] = React.useState(false)
  const [imageSource, setImageSource] = React.useState<ImageSource|null>(null)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const imageResponseLogic = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton)
    } else {
      // const source = { uri: response.uri }
      // You can also display the image using data:
      // const source: ImageSource = { uri: 'data:image/jpeg;base64,' + response.data }
      // setImageSource(response)

      // Struct for image
      const imageMessage = {
        _id: uuidv1(),
        user: {},
        image: response.uri,
      }
      onSend(imageMessage, response)
    }
  }

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        {...KelvinChatTheme}
        renderActions={_ => (
          <View style={styles.actionStyle}>
            <PhotoMenuWrapper
              visible={visible}
              onDismiss={hideModal}

              // For taking a photo
              onTakePhoto={() => {
                console.log('Taking a photo. Click!')
                ImagePicker.launchCamera(options, imageResponseLogic)
              }}

              // For uploading from gallery
              onUploadFromGallery={() => {
                console.log('Requesting permission to upload from gallery')
                ImagePicker.launchImageLibrary(options, imageResponseLogic)
              }}>
              <IconButton
                icon={({ size, color }) => (
                  <UploadImageIcon/>
                )}
                color={Colors.red500}
                size={18}
                onPress={showModal}
              />
            </PhotoMenuWrapper>
          </View>
        )}
        {...GiftedChatProps}/>
    </>
  )
}

export const chatAppend = (previousMessage, messages = [], ...moreOpts) => {
  return GiftedChat.append(previousMessage, messages, ...moreOpts)
}

export default ChatArea
