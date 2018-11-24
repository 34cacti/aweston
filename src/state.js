import {PageTypes} from './types/pages'
import {DeviceStates} from './types/device-states'
import {LoginStates} from './types/login-states'

export const state = {
  page: PageTypes.WELCOME,
  loggedInAccount: null,
  loginPageState: initialLoginState(),
  cardInserterState: DeviceStates.IDLE,
  cardSwiperState: DeviceStates.IDLE,
  cashSlotState: DeviceStates.IDLE,
}

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
    holder: 'lkdsjfaskdljf',
    accounts: {
      Checking: 12.91,
      Savings: 234.33,
      TFSA: 3243.54,
    },
  }
}
