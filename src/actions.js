import {PageTypes} from './types/pages'
import {DeviceStates} from './types/device-states'
import {LoginStates} from './types/login-states'
import {getLogger} from './logger'
import {initialLoginState, fakeAccount} from './state'

const logger = getLogger('actions')

const CARD_FAILURE_RATE = 0.25
const BASE_VERIFICATION_TIME = 1000

const loginActions = {
  logUserOut: () => (state, actions) => {
    logger.log('Logging user out')
    setTimeout(() => actions.transitionPage(PageTypes.WELCOME), 0)
    return {
      ...state,
      loggedInAccount: null,
    }
  },

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

  ...loginActions,
}

function cardVerificationTime() {
  const factor = Math.random() * 0.5 + 0.75
  return factor * BASE_VERIFICATION_TIME
}
