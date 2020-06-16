# Kelvin

A mobile chat-based agriculture assistant

## About

This project is an AI powered chatbot (low-form) that allows users to interface with it using a registered phone number.
The app allows uses to make one of 3 forms of requests.

 - Weather Prediction
 - Plant Disease Detection
 - Crop yield prediction

Each of these request are triggered by some sentence, for instance with the input phrase `Hali ya hewa ya Dar es Salaam ikoje?`, KELVIN understands that this is a request is for weather prediction.

## Getting Started

The application is created using React Native (powered by ignite). The application was created for `android` only.

There are scripts that are setup, to get started with the app..

### `yarn android`

To run the android application. Either for the first time or if you want to re-bundle the application

### `yarn start`

To launch the metro bundler.

## Design

This app doesn't use any design framework like `react-native-paper`. I have created most elements design from scratch, some might be included from the [`ignite-bowser`](https://github.com/infinitered/ignite-bowser) boilerplate or using another package like [`react-native-confirmation-code-field`](https://github.com/retyui/react-native-confirmation-code-field)

##### PS
This app was created as a final year project for the UDSM. 
This is just the first part of the entire 4-man team project. This is create to be well integrated with [`main server`](https://github.com/iam-kevin/kelvin)
