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
import keypad from './widgets/keypad'

const logger = getLogger('main')

function view(state, actions) {
  return html.div(
    {
      id: 'app',
    },
    atmShellView([
      displayView(state, actions),
      cardSwiper(state.cardInserterState, actions.onCardInserterClick),
      cardInserter(state.cardInserterState, actions.onCardInserterClick),
      atmBranding(),
      keypad(),
    ])
  )
}

function atmShellView(children) {
  return html.div(
    {
      id: 'atm-shell',
    },
    children,
  )
}

function displayView(state, actions) {
  return html.div(
    {
      id: 'atm-display',
    },
    [
      html.div({id: 'atm-reflection'}),
      html.div(
        {
          id: 'atm-screen',
        },
        [
          headerWidget(
            actions.logUserOut,
            // TODO: Add back button to transfer, withdraw and deposit pages
            null,
            state.page,
          ),
          renderPage(state, actions),
        ],
      ),
    ],
  )
}

function atmBranding() {
  return html.div(
    {
      id: 'atm-branding',
    },
    'Iron Bank of Braavos',
  )
}

function renderPage(state, actions) {
  switch (state.page) {
    case PageTypes.WELCOME:
      return WelcomePage(actions.transitionPage)
    case PageTypes.LOGIN:
      return LoginPage(actions.logUserIn)
    case PageTypes.MENU:
      return MenuPage(actions.transitionPage, state.loggedInAccount)
    case PageTypes.TRANSFER:
      return TransferPage(actions.transitionPage, state.loggedInAccount)
    case PageTypes.WITHDRAW:
      return WithdrawPage(actions.transitionPage, state.loggedInAccount)
    case PageTypes.DEPOSIT:
      return DepositPage(actions.transitionPage, state.loggedInAccount)
    case PageTypes.FOUR_OH_FOUR:
    default:
      return FourOhFour(actions.transitionPage)
  }
}

const app = devtools(hyperapp)(state, actions, view, document.querySelector('#root'))
