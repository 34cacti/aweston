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
    accounts: {
      Checking: 12.91,
      Savings: 234.33,
      TFSA: 3243.54,
    },
    activity: [
      {account: 'Savings', withdraw: null, deposit: 323.21, date: 'Feb 11, 2018'},
      {account: 'Checking', withdraw: null, deposit: 323.21, date: 'Feb 08, 2018'},
      {account: 'TFSA', withdraw: null, deposit: 119.00, date: 'Jan 31, 2018'},
      {account: 'Checking', withdraw: 12.99, deposit: null, date: 'Jan 11, 2018'},
      {account: 'Checking', withdraw: 39.49, deposit: null, date: 'Dec 11, 2017'},
      {account: 'Checking', withdraw: 10.19, deposit: null, date: 'Nov 11, 2017'},
      {account: 'Checking', withdraw: 10.19, deposit: null, date: 'Oct 11, 2017'},
      {account: 'Checking', withdraw: 10.19, deposit: null, date: 'Sep 11, 2017'},
      {account: 'Checking', withdraw: 10.19, deposit: null, date: 'Aug 11, 2017'},
      {account: 'Checking', withdraw: 10.19, deposit: null, date: 'Jul 11, 2017'},
    ],
  }
}

export function initialState() {
  return {
    page: PageTypes.WELCOME,
    loggedInAccount: null,
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
