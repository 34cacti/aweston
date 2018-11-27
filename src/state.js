import {PageTypes} from './types/pages'
import {DeviceStates} from './types/device-states'
import {LoginStates} from './types/login-states'

export const state = initialState()

export function initialLoginState() {
  return {
    attempts: 0,
    currentMode: LoginStates.INITIAL,
    message: null,
  }
}

export function fakeAccount() {
  return {
    number: 12334234,
    holder: 'John Cena',
    pendingTransaction: {
      type: null,
      from: null,
      to: null,
      ammount: null,
    },
    accounts: {
      Checking: 12.91,
      Savings: 234.33,
      TFSA: 3243.54,
    },
    activity: [
      {account: 'Savings', withdraw: null, deposit: 323.21, date: new Date()},
    ],
  }
}

export function initialState() {
  return {
    page: PageTypes.WELCOME,
    loggedInAccount: null,
    pendingLogout: false,
    cardInserted: false,
    loginPageState: initialLoginState(),
    cardInserterState: DeviceStates.IDLE,
    cardSwiperState: DeviceStates.IDLE,
    cashSlotState: DeviceStates.IDLE,
    displayedModal: null,
    modalData: null,
    language: 'EN',
    languages: ['EN', 'FR', 'ES'],
  }
}
