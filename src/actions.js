import {PageTypes} from './pages'
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
}
