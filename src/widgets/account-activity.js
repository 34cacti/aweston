import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'

export default function view(accounts, activity) {
  return html.div(
    {
      id: 'widget-account-activity',
    },
    [
      html.div(
        {class: 'account-balances'},
        [
          html.b('Account Balances'),
          balancesTable(accounts),
        ],
      ),
      html.div(
        {class: 'account-transactions'},
        [
          html.b('Recent Transactions'),
          transactionsTable(activity),
        ],
      ),
    ]
  )
}

function balancesTable(accounts) {
  return html.table(
    {class: 'account-balances primary'},
    [
      html.thead([
        html.tr(
          [
            html.th('Account'),
            html.th('Balance'),
          ]
        ),
      ]),
      html.tbody([
        Object.keys(accounts).map(account =>
          html.tr([
            html.td(account),
            html.td(`$${accounts[account]}`),
          ])
        ),
      ])
    ],
  )
}

function transactionsTable(transactions) {
  return html.table(
    {class: 'account-transactions primary'},
    [
      html.thead([
        html.tr([
          html.th('Account'),
          html.th('Withdraw'),
          html.th('Deposit'),
          html.th('Date'),
        ]),
      ]),
      html.tbody([
        transactions.map(transaction =>
          html.tr([
            html.td(transaction.account),
            html.td(transaction.withdraw ? `$${transaction.withdraw}` : null),
            html.td(transaction.deposit ? `$${transaction.deposit}` : null),
            html.td(transaction.date.toLocaleString()),
          ])
        ),
      ]),
    ]
  )
}
