import * as html from '@hyperapp/html'
import {app as hyperapp} from 'hyperapp'
import devtools from 'hyperapp-redux-devtools'

import DepositPage from './pages/deposit'
import FourOhFour from './pages/four-oh-four'
import LoginPage from './pages/login'
import MenuPage from './pages/menu'
import TransferPage from './pages/transfer'
import WelcomePage from './pages/welcome'
import WithdrawPage from './pages/withdraw'
import cardInserter from './widgets/card-inserter'
import cardSwiper from './widgets/card-swiper'
import cashSlot from './widgets/cash-slot'
import headerWidget from './widgets/header'
import modalWidget from './widgets/modal'
import keypad from './widgets/keypad'
import {PageTypes} from './types/pages'
import {ModalTypes} from './types/modals'
import {actions} from './actions'
import {getLogger} from './logger'
import {state} from './state'

const logger = getLogger('main')

function view(state, actions) {
  return html.div(
    {
      id: 'app',
    },
    atmShellView([
      displayView(state, actions),
      cardSwiper(state.cardSwiperState, actions.onCardSwiperClick),
      cardInserter(state.cardInserterState, actions.onCardInserterClick),
      cashSlot(state.cashSlotState, actions.onCashRetrievalClick),
      atmBranding(),
      keypad(),
    ])
  )
}

function atmBranding() {
  return html.div({id: 'atm-branding'}, 'Iron Bank of Braavos')
}

function atmShellView(children) {
  return html.div({id: 'atm-shell'}, children)
}

function displayView(state, actions) {
  return html.div(
    {id: 'atm-display', class: 'crt-effect-container'},
    [
      html.div({id: 'atm-reflection'}),
      html.div(
        {id: 'atm-screen'},
        [
          headerWidget(
            createLogoutButton(state.page, actions.logUserOut),
            createGoBackButton(state.page, actions.transitionPage),
            state.page,
            state.language,
            getLanguageSelectorModalOpenCallback(
              actions.displayModal, state.language, state.languages, actions.setLanguage)
          ),
          renderPage(state, actions),
          renderModal(state, actions),
        ],
      ),
    ],
  )
}

function renderPage(state, actions) {
  switch (state.page) {
    case PageTypes.WELCOME:
      return WelcomePage(actions.transitionPage)
    case PageTypes.LOGIN:
      return LoginPage(state.loginPageState, actions.verifyPin, actions.onLoginCredentialClick)
    case PageTypes.MENU:
      return MenuPage(actions.transitionPage, state.loggedInAccount)
    case PageTypes.TRANSFER:
      return TransferPage(
        actions.transitionPage,
        state.loggedInAccount,
        actions.updatePendingTransaction,
        actions.performTransaction
      )
    case PageTypes.WITHDRAW:
      return WithdrawPage(
        actions.transitionPage, state.loggedInAccount, actions.updatePendingTransaction)
    case PageTypes.DEPOSIT:
      return DepositPage(
        actions.transitionPage, state.loggedInAccount, actions.updatePendingTransaction)
    case PageTypes.FOUR_OH_FOUR:
    default:
      return FourOhFour(actions.transitionPage)
  }
}

function renderModal(state, actions) {
  return state.displayedModal
    ? modalWidget(actions.closeModal, state.displayedModal, state.modalData)
    : null
}

function createGoBackButton(page, transitionPage) {
  switch (page) {
    case PageTypes.TRANSFER:
    case PageTypes.DEPOSIT:
    case PageTypes.WITHDRAW:
      return () => transitionPage(PageTypes.MENU)
    default:
      return null
  }
}

function createLogoutButton(page, transitionPage) {
  switch (page) {
    case PageTypes.MENU:
    case PageTypes.TRANSFER:
    case PageTypes.WITHDRAW:
    case PageTypes.DEPOSIT:
      return () => transitionPage(PageTypes.WELCOME)
    default:
      return null
  }
}

function getLanguageSelectorModalOpenCallback(
  displayModal,
  language,
  languages,
  setLanguage
) {
  const data = [language, languages, setLanguage]
  return () => displayModal({type: ModalTypes.LANGUAGE, data})
}

const app = devtools(hyperapp)(state, actions, view, document.querySelector('#root'))
