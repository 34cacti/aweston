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
      accountActivity(account.activity),
      html.hr(),
      html.button(
        {
          class: 'very-large-button',
          onclick: () => requestPageTransition(PageTypes.TRANSFER),
        },
        'Transfer'
      ),
      html.button(
        {
          class: 'very-large-button',
          onclick: () => requestPageTransition(PageTypes.DEPOSIT)
        },
        'Deposit'
      ),
      html.button(
        {
          class: 'very-large-button',
          onclick: () => requestPageTransition(PageTypes.WITHDRAW)
        },
        'Withdraw'
      ),
    ],
  )
}
