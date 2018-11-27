import languageSelectorWidget from '../widgets/language-selector'
import removeCardWidget from '../widgets/remove-card'
import collectCashWidget from '../widgets/collect-cash'
import depositCashWidget from '../widgets/deposit-cash'

export const ModalTypes = Object.freeze({
  LANGUAGE: languageSelectorWidget,
  REMOVE_CARD: removeCardWidget,
  COLLECT_CASH: collectCashWidget,
  DEPOSIT_CASH: depositCashWidget,
})