import {PageTypes} from './types/pages'
import {DeviceStates} from './types/device-states'
import {LoginStates} from './types/login-states'

export const state = initialState()

export function initialLoginState() {
  return {
    attempts: 0,
    currentMode: LoginStates.INITIAL,
    message: null,
    accountNumber: null,
    pin: null,
  }
}

export function fakeAccount() {
  return {
    number: '5446124876258746',
    holder: 'John Cena',
    pendingTransaction: initalPendingTransaction(),
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
    time: new Date(),
    page: PageTypes.WELCOME,
    loggedInAccount: null,
    pendingLogout: false,
    cardInserted: false,
    loginPageState: initialLoginState(),
    cardInserterState: DeviceStates.IDLE,
    cardSwiperState: DeviceStates.IDLE,
    cashSlotState: DeviceStates.IDLE,
    waitingForCashCollection: false,
    waitingForCashDeposit: false,
    waitingForCashDepositConfirmation: false,
    displayedModal: null,
    modalData: null,
    language: 'English',
    languages: ['English', 'Français', 'Español'],
  }
}

export function initalPendingTransaction() {
  return {
    type: null,
    from: null,
    to: null,
    amount: null,
    cashSlotInteractionRequired: false,
    confirmed: false,
  }
}
