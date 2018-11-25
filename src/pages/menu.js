import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'

export default function view(requestPageTransition, account) {
  return html.div(
    {
      id: 'page-menu',
      class: 'page',
    },
    [
      html.button(
        {
          class: 'menu-button',
          onclick: () => requestPageTransition(PageTypes.TRANSFER),
        },
        'Transfer'
      ),
      html.button(
        {
          class: 'menu-button',
          onclick: () => requestPageTransition(PageTypes.DEPOSIT)
        },
        'Deposit'
      ),
      html.button(
        {
          class: 'menu-button',
          onclick: () => requestPageTransition(PageTypes.WITHDRAW)
        },
        'Withdraw'
      ),
    ],
  )
}
