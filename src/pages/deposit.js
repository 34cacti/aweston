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
      id: 'page-deposit',
      class: 'page',
    },
    depositForms(account, updatePendingTransaction, performTransaction),
  )
}

function depositForms(account, updatePendingTransaction, performTransaction) {
  const toAccount = 'Checking'
  const [isTransactionValid, warningMessage]
    = transactionValid(account.accounts, account.pendingTransaction)

  return html.form(
    {
      oncreate: el => {
        updatePendingTransaction({
          type: TransactionTypes.DEPOSIT,
          to: toAccount,
          ammount: null,
        })
      },
    },
    [
      html.label('To'),
      html.select(
        {
          value: account.pendingTransaction.to,
          onchange: ev => {
            updatePendingTransaction({to: ev.target.value})
          },
        },
        Object.keys(account.accounts).map(
          accountName =>
          html.option(
            {value: accountName},
            `${accountName}  $${account.accounts[accountName]}`
          )
        )
      ),
      html.label('Enter Amount'),
      html.input(
        {
          oncreate: el => {
            el.focus()
          },
          value: account.pendingTransaction.ammount,
          oninput: ev => {
            updatePendingTransaction({ammount: ev.target.value})
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
          'Deposit'
        ),
        warningMessage ? html.div({class: 'warning'}, warningMessage) : null,
      ]),
    ],
  )
}

function transactionValid(accounts, transaction) {
  if (transaction.ammount === null || transaction.ammount <= 0) {
    return [false, 'Invalid amount']
  }

  return [true, null]
}
