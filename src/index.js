import * as html from '@hyperapp/html'
import {app as hyperapp} from 'hyperapp'
import devtools from 'hyperapp-redux-devtools'

import {PageTypes} from './pages'
import {getLogger} from './logger'
import keypad from './widgets/keypad'
import WelcomePage from './pages/welcome'
import MenuPage from './pages/menu'
import LoginPage from './pages/login'
import FourOhFour from './pages/four-oh-four'
import headerWidget from './widgets/header'

const logger = getLogger('main')

const state = {
  page: PageTypes.WELCOME,
  loggedInAccount: null,
}

const actions = {
  transitionPage: (page = PageTypes.FOUR_OH_FOUR) => (state, actions) => {
    logger.log(`Transitioning page: ${state.page} -> ${page}`)
    return {
      ...state,
      page,
    }
  },

  logUserOut: () => (state, actions) => {
    logger.log('Logging user out')
    // setTimeout(() => actions.transitionPage(PageTypes.WELCOME), 0)
    return {
      ...state,
      ...actions.transitionPage(PageTypes.WELCOME),
      loggedInAccount: null,
    }
  },

  logUserIn: () => (state, actions) => {
    logger.log('Logging in')
    // setTimeout(() => actions.transitionPage(PageTypes.MENU), 0)
    return {
      ...state,
      ...actions.transitionPage(PageTypes.MENU),
      loggedInAccount: {number: 6969696969, holder: '6ixy9ine'},
    }
  },
}

function view(state, actions) {
  return html.div(
    {
      id: 'app',
    },
    [
      headerWidget(
        actions.logUserOut,
        state.loggedInAccount,
      ),
      renderPage(state, actions),
    ]
  )
}

function renderPage(state, actions) {
  switch (state.page) {
    case PageTypes.WELCOME:
      return WelcomePage(actions.transitionPage)
    case PageTypes.LOGIN:
      return LoginPage(actions.logUserIn)
    case PageTypes.MENU:
      return MenuPage(actions.transitionPage)
    case PageTypes.TRANSFER:
    case PageTypes.WITHDRAW:
    case PageTypes.DEPOSIT:
    case PageTypes.FOUR_OH_FOUR:
    default:
      return FourOhFour(actions.transitionPage)
  }
}

const app = devtools(hyperapp)(state, actions, view, document.querySelector('#root'))
