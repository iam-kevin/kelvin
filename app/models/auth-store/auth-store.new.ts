/**
 * This store is in charge for the data involving authentication
 */
import { observable, computed, action } from 'mobx'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import * as storage from '../../utils/storage'

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
  @observable isProcessingAuthentication = true

  /**
   * true, main screen
   * false, user should be redirected to the
   * intro screen
   */
  @computed authenticated () {
    return this.token !== null
  }

  /**
   * the token bound with the app
   */
  @observable token = null

  /**
   * Get the current logged in user
   */
  @computed getUser() {
    return auth().currentUser
  }

  /**
   * [Login]
   * @param phoneNumber
   */
  @computed async signIn(phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> {
    // Ensure the user is confirmed
    return await auth().signInWithPhoneNumber(phoneNumber)
  }

  @action private readyToAuthenticate() {
    this.isProcessingAuthentication = false
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
    } catch (e) {
      console.error('Unable to confirmAndLink')
      console.error(e)
    }
  }

  @action private storeLoginInfo(credentials: FirebaseAuthTypes.AuthCredential, tokenOnly: boolean) {
    if (tokenOnly === true) {
      // Store token
      this.token = this.getUser().uid
      storage.save(KEY_TOKEN, this.token)
      return
    }
    // store the credentials
    storage.save(KEY_USER_CREDENTIALS, credentials)
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
  @action async logIn() {
    // Check if the user exists
    if (this.token !== null) {
      throw new Error("Seems that you have logged in already. set token=null and run this again.")
    }
    // use credentials to log user in
    const credentials: FirebaseAuthTypes.AuthCredential = await storage.load(KEY_USER_CREDENTIALS)

    try {
      // signIn the user
      await auth().signInWithCredential(credentials)
      this.storeLoginInfo(credentials, true)
    } catch (e) {
      console.log('[Main] failed to log you in')
    }
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
