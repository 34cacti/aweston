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

const logger = getLogger('main')

const state = {
  page: PageTypes.WELCOME,
}

const actions = {
  transitionPage: (page = PageTypes.FOUR_OH_FOUR) => (state, actions) => {
    logger.log(`Transitioning page: ${state.page} -> ${page}`)
    return {
      ...state,
      page,
    }
  },
}

function view(state, actions) {
  return html.div(
    {
      id: 'app',
    },
    [
      renderPage(state, actions),
    ]
  )
}

function renderPage(state, actions) {
  switch (state.page) {
    case PageTypes.WELCOME:
      return WelcomePage(actions.transitionPage)
    case PageTypes.LOGIN:
      return LoginPage(actions.transitionPage)
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
