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

  return html.form(
    {
      oncreate: el => {
        updatePendingTransaction({
          type: TransactionTypes.DEPOSIT,
          to: toAccount,
          amount: null,
          cashSlotInteractionRequired: true,
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
            `${accountName} | Available funds: $${account.accounts[accountName].toFixed(2)}`
          )
        )
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
          },
          'Enter cash into slot'
        ),
      ]),
    ],
  )
}
