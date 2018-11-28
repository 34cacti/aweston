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
    transferForms(account, updatePendingTransaction, performTransaction),
  )
}

function transferForms(account, updatePendingTransaction, performTransaction) {
  const [firstAccount, secondAccount] = Object.keys(account.accounts)
  const [isTransactionValid, warningMessage] =
    transactionValid(account.accounts, account.pendingTransaction)

  return html.form(
    {
      oncreate: el => {
        updatePendingTransaction({
          type: TransactionTypes.TRANSFER,
          from: firstAccount,
          to: secondAccount,
          amount: null,
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
      // html.div([
      //   html.button(
      //     {
      //       onclick: ev => {
      //         ev.preventDefault()
      //         updatePendingTransaction({
      //           amount: parseFloat(account.pendingTransaction.amount) - 10})
      //       },
      //     },
      //     '- $10'
      //   ),
      //   html.button(
      //     {
      //       onclick: ev => {
      //         ev.preventDefault()
      //         updatePendingTransaction({
      //           amount: parseFloat(account.pendingTransaction.amount) + 10})
      //       },
      //     },
      //     '+ $10'
      //   ),
      //   html.button(
      //     {
      //       onclick: ev => {
      //         ev.preventDefault()
      //         updatePendingTransaction({
      //           amount: parseFloat(account.pendingTransaction.amount) + 20})
      //       },
      //     },
      //     '+ $20'
      //   ),
      //   html.button(
      //     {
      //       onclick: ev => {
      //         ev.preventDefault()
      //         updatePendingTransaction({
      //           amount: parseFloat(account.pendingTransaction.amount) + 50})
      //       },
      //     },
      //     '+ $50'
      //   ),
      //   html.button(
      //     {
      //       onclick: ev => {
      //         ev.preventDefault()
      //         updatePendingTransaction({
      //           amount: parseFloat(account.pendingTransaction.amount) + 100})
      //       },
      //     },
      //     '+ $100'
      //   ),
      // ]),

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
          'Transfer'
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

  if (transaction.from === transaction.to) {
    return [false, 'Can not transfer between same account']
  }

  if (accounts[transaction.from] - transaction.amount < 0) {
    return [false, 'Insufficient funds']
  }

  return [true, null]
}
