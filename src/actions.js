import {PageTypes} from './pages'
import {DeviceStates} from './device-states'
import {getLogger} from './logger'

const logger = getLogger('actions')

export const actions = {
  transitionPage: (page = PageTypes.FOUR_OH_FOUR) => (state, actions) => {
    logger.log(`Transitioning page: ${state.page} -> ${page}`)
    return {
      ...state,
      page,
    }
  },

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
      loggedInAccount: {number: 12334234, holder: 'lkdsjfaskdljf'},
    }
  },

  onCardInserterClick: () => (state, actions) => {
    logger.log('Card insters click')
    return {
      ...state,
      cardInserterState: state.cardInserterState === DeviceStates.IDLE
        ? DeviceStates.WAITING_FOR_USER
        : DeviceStates.IDLE,
    }
  },
}
