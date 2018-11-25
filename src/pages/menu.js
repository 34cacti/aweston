import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'
import accountActivity from '../widgets/account-activity'

export default function view(requestPageTransition, account) {
  return html.div(
    {
      id: 'page-menu',
      class: 'page',
    },
    [
      html.div(`Hi ${account.holder}`),
      accountActivity(account.accounts, account.activity),
      html.hr(),
      html.div(
        {
          class: 'menu-buttons',
        },
        [
          html.button(
            {
              onclick: () => requestPageTransition(PageTypes.TRANSFER),
            },
            'Transfer'
          ),
          html.button(
            {
              onclick: () => requestPageTransition(PageTypes.DEPOSIT)
            },
            'Deposit'
          ),
          html.button(
            {
              onclick: () => requestPageTransition(PageTypes.WITHDRAW)
            },
            'Withdraw'
          ),
        ],
      )
    ],
  )
}
