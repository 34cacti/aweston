import {PageTypes} from './types/pages'
import {DeviceStates} from './types/device-states'
import {LoginStates} from './types/login-states'
import {getLogger} from './logger'
import {initialState, initialLoginState, fakeAccount} from './state'

const logger = getLogger('actions')

const CARD_FAILURE_RATE = 0
const BASE_VERIFICATION_TIME = 0

const loginActions = {
  logUserIn: () => (state, actions) => {
    logger.log('Logging in')
    setTimeout(() => actions.transitionPage(PageTypes.MENU), 0)
    return {
      ...state,
      loggedInAccount: fakeAccount(),
      loginPageState: initialLoginState(),
      cardSwiperState: DeviceStates.IDLE,
      cardInserterState: DeviceStates.IDLE,
    }
  },

  loginFailed: reason => (state, actions) => {
    return {
      ...state,
      loginPageState: {
        ...state.loginPageState,
        currentMode: LoginStates.INITIAL,
        attempts: state.loginPageState + 1,
        message: reason,
      },
      cardSwiperState: DeviceStates.WAITING_FOR_USER,
      cardInserterState: DeviceStates.WAITING_FOR_USER,
    }
  },

  verifyPin: () => (state, actions) => {
    logger.log('Verifying pin')
    setTimeout(
      () => {
        if (Math.random() < CARD_FAILURE_RATE)
          return actions.loginFailed('Failed to verify. Please try again')

        return actions.logUserIn()
      },
      cardVerificationTime()
    )

    return {
      ...state,
      cardSwiperState: DeviceStates.IDLE,
      cardInserterState: DeviceStates.IDLE,
      loginPageState: {
        ...state.loginPageState,
        currentMode: LoginStates.VERIFYING,
      },
    }
  },

  onCardInserterClick: () => (state, actions) => {
    if (state.page !== PageTypes.LOGIN)
      return

    logger.log('Card inserted')
    setTimeout(() => actions.verifyPin())
    return {
      ...state,
      cardInserterState: DeviceStates.PROCESSING,
    }
  },

  onCardSwiperClick: () => (state, actions) => {
    if (state.page !== PageTypes.LOGIN)
      return

    logger.log('Card swiped')
    setTimeout(() => actions.verifyPin())
    return {
      ...state,
      cardSwiperState: DeviceStates.PROCESSING,
    }
  },

}

export const actions = {
  transitionPage: (page = PageTypes.FOUR_OH_FOUR) => (state, actions) => {
    logger.log(`Transitioning page: ${state.page} -> ${page}`)

    if (page === PageTypes.WELCOME) {
      logger.warn('Do not use transition page to go to Welcome screen. If you need to'
                  + ' log out use the logUserOut action.')
      return null
    }

    const deviceStates = page === PageTypes.LOGIN
      ? {
          cardSwiperState: DeviceStates.WAITING_FOR_USER,
          cardInserterState: DeviceStates.WAITING_FOR_USER,
        }
      : {
          cardSwiperState: state.cardSwiperState,
          cardInserterState: state.cardInserterState,
        }

    return {
      ...state,
      ...deviceStates,
      page,
    }
  },

  displayModal: ({type, data}) => (state, actions) => {
    logger.log(`Opening modal ${type} with data: ${data}`)
    return {
      ...state,
      displayedModal: type,
      modalData: data,
    }
  },

  closeModal: () => (state, actions) => {
    return {
      ...state,
      displayedModal: null,
      modalData: null,
    }
  },

  setLanguage: language => (state, actions) => {
    return {
      ...state,
      language,
    }
  },

  logUserOut: () => (state, actions) => {
    logger.log('Logging out')
    return initialState()
  },

  ...loginActions,
}

function cardVerificationTime() {
  const factor = Math.random() * 0.5 + 0.75
  return factor * BASE_VERIFICATION_TIME
}
