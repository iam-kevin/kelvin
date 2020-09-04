# AgroChat (or Kelvin)

Stateless Swahili NLP powered chatbot

## About

Project was done as part of a university project

Most of the services (including the main server) were using free tier services (or those we have borrowed only for the purpose of FYP) and how has been disabled. When transitioning to the payed service, please make the change to the socket server (called at  `178.62.101.62`) to a desireable link

This app is an interface for the other projects ([kelvin-bounce-server](https://github.com/iam-kevin/kelvin-bounce-server)) (Socket Server), and other subsystem which are also AI powered. To create a system that would ideally help your local swahili farmer, work with simple agriculture related issues, including.
- Asking for the weather
- Taking a picture of a wheat / tomato leaf, to figure out whether or not it is healthy or not

## Project Build

The project was created with React Native, while looking only at android. So iOS might not work (I don't have a MacOS, but you can give it a shot).

The application needed to be in constant connection with the internet as in its core, it is set-up to communicate with socket server (in [kelvin-bounce-server](https://github.com/iam-kevin/kelvin-bounce-server))

### Getting Started

I have been using `node@12.14.0` and `npm@6.13.4`. To build my projects, I have been using `yarn`. To build my application. I have been using an emulator offered by Android Studio. The application supports from android with `API_LEVEL=21`

Like any other React Native application. 
- First run `yarn install` to make sure you have installed all the dependencies needed by the project
- Make sure you have connected your debug phone, or installed (and powered on) your emulator, then run `yarn android`
- That's it, the application shold be running on the phone (or emulator)

### The app is running, what now?

Now that the application is running, you can get started with the creation of you account. Just follow through the application screens.
