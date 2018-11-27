import {PageTypes} from './types/pages'
import {ModalTypes} from './types/modals'
import {DeviceStates} from './types/device-states'
import {LoginStates} from './types/login-states'
import {TransactionTypes} from './types/transactions'
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
    if (state.pendingLogout) {
      setTimeout(() => actions.logUserOut())
      return {
        ...state,
        cardInserted: false,
      }
    }

    if (state.page !== PageTypes.LOGIN)
      return

    logger.log('Card inserted')
    setTimeout(() => actions.verifyPin())
    return {
      ...state,
      cardInserterState: DeviceStates.PROCESSING,
      cardInserted: true,
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

  onLoginCredentialClick: () => (state, actions) => {
    return {
      ...state,
      loginPageState: {
        ...state.loginPageState,
        accountNumber: '5446124876258746',
        pin: 5463
      }
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
    if (state.cardInserted)
      return {
        ...actions.displayModal({type: ModalTypes.REMOVE_CARD, data: []}),
        cardInserterState: DeviceStates.WAITING_FOR_USER,
        pendingLogout: true,
      }

    return initialState()
  },

  updatePendingTransaction: data => (state, actions) => {
    return {
      loggedInAccount: {
        ...state.loggedInAccount,
        pendingTransaction: {
          ...state.loggedInAccount.pendingTransaction,
          ...data,
        },
      },
    }
  },

  performTransaction: () => (state, actions) => {
    const transaction = state.loggedInAccount.pendingTransaction
    const ammount = parseFloat(transaction.ammount)

    switch (state.loggedInAccount.pendingTransaction.type) {
      case TransactionTypes.TRANSFER:
        const recordFrom = transactionRecord(transaction.from, ammount)
        const recordTo = transactionRecord(transaction.to, null, ammount)
        return {
          ...state,
          loggedInAccount: {
            ...state.loggedInAccount,
            accounts: {
              ...state.loggedInAccount.accounts,
              [transaction.from]:
                state.loggedInAccount.accounts[transaction.from] - ammount,
              [transaction.to]:
                state.loggedInAccount.accounts[transaction.to] + ammount,
            },
            activity: [
              recordTo,
              recordFrom,
              ...state.loggedInAccount.activity,
            ],
          },
        }

      case TransactionTypes.DEPOSIT:
        break

      case TransactionTypes.WITHDRAW:
        break

      default:
        logger.warn(`Unknown transaction type: ${transaction.type}`)
        return null
    }
  },

  ...loginActions,
}

function cardVerificationTime() {
  const factor = Math.random() * 0.5 + 0.75
  return factor * BASE_VERIFICATION_TIME
}

function transactionRecord(account, withdraw = null, deposit = null, date = new Date()) {
  return {
    account,
    withdraw,
    deposit,
    date,
  }
}
