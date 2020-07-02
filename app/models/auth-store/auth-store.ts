/**
 * This store is in charge for the data involving authentication
 */
import { observable, computed, action } from 'mobx'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import * as storage from '../../utils/storage'

import database from '@react-native-firebase/database'

const KEY_USER_PHONE_NUMBER = 'USER_PHONE_NUMBER'
const KEY_USER_CREDENTIALS = 'USER_CREDENTIALS'
const KEY_TOKEN = 'KEY_TOKEN_UUID'

export class AuthStore {
  /**
   * hold value that checks if the code the
   * processing the authentication.
   *
   * false, its done authenticating.
   * true, if processing
   */
  @observable private isProcessingAuthentication = true

  @observable private _userId = null
  /**
   * the token bound with the app
   */
  @observable token = null

  constructor() {
    this.notReadyToAuthenticate()

    // try logging the user in
    this.logIn()
  }

  /**
   * true, main screen
   * false, user should be redirected to the
   * intro screen
   */
  @computed get authenticated () {
    return this.token !== null
  }

  /**
   * Get the current logged in user
   */
  @computed get user() {
    return auth().currentUser
  }

  @computed get isReady() {
    return !this.isProcessingAuthentication
  }

  /**
   * Get the user ID as stored
   * in the firebase database
   * users/{userId}
   */
  @computed get userId(): string {
    // If its stored, return it
    if (this._userId !== null) {
      // If not, fetch from database
      database()
        .ref('users/')
        .once('value')
        .then(snap => {
          this._userId = snap.val().id
        })
    }

    return this._userId
  }

  readyToAuthenticate() {
    this.isProcessingAuthentication = false
  }

  notReadyToAuthenticate() {
    this.isProcessingAuthentication = true
  }

  /**
   * [Login]
   * @param phoneNumber
   */
  @action signIn(phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> {
    // Ensure the user is confirmed
    return auth().signInWithPhoneNumber(phoneNumber)
  }

  /**
   * [Login]
   * Confirms if the code is valid.
   * if true, stores token to app. This will later be used to sign the use up
   *
   * @param confirmationResult
   */
  @action async confirmAndLink(confirmationResult: FirebaseAuthTypes.ConfirmationResult, code: string) {
    try {
      // Send the code
      await confirmationResult.confirm(code)

      // generate credentials
      const credentials = auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code)

      // Store login information
      this.storeLoginInfo(credentials, false)

      // authenticate
      this.readyToAuthenticate()
    } catch (e) {
      console.error('Unable to confirmAndLink')
      console.error(e)
    }
  }

  storeLoginInfo(credentials: FirebaseAuthTypes.AuthCredential, tokenOnly: boolean) {
    // Store token
    this.token = this.user.uid
    storage.save(KEY_TOKEN, this.token)
    console.log('stored the KEY_TOKEN')
    if (tokenOnly === true) return

    // store the credentials
    storage.save(KEY_USER_CREDENTIALS, credentials)
    console.log('stored the KEY_USER_CREDENTIALS')
    console.log('Token:', this.token)
  }

  @action private deleteLoginInfo() {
    this.token = null
    storage.clear()
  }

  /**
   * [Main]
   * Performs login initially when the app loads
   * and checks if the user exists
   */
  async logIn() {
    // Check if the user exists
    if (this.token !== null) {
      throw new Error("Seems that you have logged in already. set token=null and run this again.")
    }

    // use credentials to log user in
    const credentials: FirebaseAuthTypes.AuthCredential = await storage.load(KEY_USER_CREDENTIALS)

    // If not credentials, skip thie part
    if (credentials === null) {
      this.readyToAuthenticate()
      return
    }

    try {
      // signIn the user
      await auth().signInWithCredential(credentials)
      this.storeLoginInfo(credentials, true)

      // authenticate
    } catch (e) {
      console.warn('[Main] failed to log you in')
      console.warn(e.message)
    }
    this.readyToAuthenticate()
  }

  /**
   * [ANY]
   */
  @action async logOut() {
    // log user out
    await auth().signOut()

    this.deleteLoginInfo()
  }
}
