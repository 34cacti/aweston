import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'
import {TransactionTypes} from '../types/transactions'

export default function view(
  requestPageTransition,
  account,
  updatePendingTransaction,
  performTransaction
) {
  if (account === null) {
    requestPageTransition(PageTypes.WELCOME)
    return null
  }

  return html.div(
    {
      id: 'page-withdraw',
      class: 'page',
    },
    withdrawForms(account, updatePendingTransaction, performTransaction),
  )
}

function withdrawForms(account, updatePendingTransaction, performTransaction) {
  const fromAccount = 'Checking'
  const [isTransactionValid, warningMessage] = 
    transactionValid(account.accounts, account.pendingTransaction)

  return html.form(
    {
      oncreate: el => {
        updatePendingTransaction({
          type: TransactionTypes.WITHDRAW,
          from: fromAccount,
          amount: null,
          cashSlotInteractionRequired: true,
        })
      },
    },
    [
      html.label('From'),
      html.select(
        {
          value: account.pendingTransaction.from,
          onchange: ev => {
            updatePendingTransaction({from: ev.target.value})
          },
        },
        Object.keys(account.accounts).map(
          accountName =>
          html.option(
            {value: accountName},
            `${accountName} | Available funds: $${account.accounts[accountName].toFixed(2)}`
          )
        )
      ),
      html.label('Enter Amount'),
      html.input(
        {
          oncreate: el => {
            el.focus()
          },
          value: account.pendingTransaction.amount,
          oninput: ev => {
            updatePendingTransaction({amount: ev.target.value})
          },
        },
      ),

      html.div(
        {
          style: {
            display: 'flex',
          },
        },
        [
        html.button(
          {
            onclick: ev => {
              ev.preventDefault()
              performTransaction()
            },
            disabled: !isTransactionValid,
          },
          'Withdraw'
        ),
        warningMessage ? html.div({class: 'warning-text'}, warningMessage) : null,
      ]),
    ],
  )
}

function transactionValid(accounts, transaction) {
  if (transaction.amount === null || transaction.amount <= 0) {
    return [false, 'Invalid amount']
  }

    if (accounts[transaction.from] - transaction.amount < 0) {
    return [false, 'Insufficient funds']
  }

  return [true, null]
}
