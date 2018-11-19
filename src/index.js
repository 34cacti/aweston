import * as html from '@hyperapp/html'
import {app as hyperapp} from 'hyperapp'
import devtools from 'hyperapp-redux-devtools'

import {PageTypes} from './pages'
import {getLogger} from './logger'
import WelcomePage from './pages/welcome'
import MenuPage from './pages/menu'
import LoginPage from './pages/login'
import FourOhFour from './pages/four-oh-four'
import TransferPage from './pages/transfer'
import WithdrawPage from './pages/withdraw'
import DepositPage from './pages/deposit'
import headerWidget from './widgets/header'
import {state} from './state'
import {actions} from './actions'
import cardSwiper from './widgets/card-swiper'
import cardInserter from './widgets/card-inserter'

const logger = getLogger('main')

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
      cardSwiper(),
      cardInserter(),
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
      return TransferPage(actions.transitionPage)
    case PageTypes.WITHDRAW:
      return WithdrawPage(actions.transitionPage)
    case PageTypes.DEPOSIT:
      return DepositPage(actions.transitionPage)
    case PageTypes.FOUR_OH_FOUR:
    default:
      return FourOhFour(actions.transitionPage)
  }
}

const app = devtools(hyperapp)(state, actions, view, document.querySelector('#root'))
