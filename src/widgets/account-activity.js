import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'

export default function view(activity) {
  return html.div(
    {
      id: 'widget-account-activity',
    },
    html.table(
      {class: 'primary'},
      [
        html.thead([
          html.tr(
            [
              html.th('Account'),
              html.th('Withdraw'),
              html.th('Deposit'),
              html.th('Date'),
            ]
          ),
        ]),
        html.tbody([
          activity.map(transaction =>
            html.tr([
              html.td(transaction.account),
              html.td(transaction.withdraw ? `$${transaction.withdraw}` : null),
              html.td(transaction.deposit ? `$${transaction.deposit}` : null),
              html.td(transaction.date),
            ])
          ),
        ]),
      ]
    ),
  )
}
